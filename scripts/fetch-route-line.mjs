// 공식 bike.go.kr 노선 폴리라인 → data/route-line.json (단일 연속 LineString)
// 네트워크 필요: 수동 실행 (node scripts/fetch-route-line.mjs). prebuild 아님.
//
// 원본 API(getLineList.do)는 lineSn 순서가 노선 전체 순서를 보장하지 않고,
// 한강 남/북안·충주댐·안동댐 지선이 섞여 있다. 처리:
//   1) 노선별 점열을 1.5km 초과 점프에서 세그먼트로 분리
//   2) 아라서해갑문에서 시작해 끝점이 가장 가까운 세그먼트를 그리디로 연결(3km 이내만)
//   3) 연결에 쓰이지 않은 세그먼트(지선)는 폐기 → 인천→부산 단일 경로
//   4) 26개 인증센터가 경로에서 3km 이내인지 검증 후 저장
import { readFileSync, writeFileSync } from "node:fs";

const KEY = "2006176973258";
const ROAD_SNS = [1, 2, 3, 4, 5];
const START = [126.606, 37.558]; // 아라서해갑문 [lng,lat]
const END = [128.948, 35.1084]; // 낙동강하굿둑
const SPLIT_KM = 1.5; // 세그먼트 분리 기준
const JOIN_KM = 3.0; // 세그먼트 연결 허용 간격

const R = 6371, r = Math.PI / 180;
const dist = (a, b) => {
  const h =
    Math.sin(((b[1] - a[1]) * r) / 2) ** 2 +
    Math.cos(a[1] * r) * Math.cos(b[1] * r) * Math.sin(((b[0] - a[0]) * r) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

// 1) 수집 + 세그먼트 분리
const segments = [];
for (const roadSn of ROAD_SNS) {
  const res = await fetch(`https://www.bike.go.kr/map/getLineList.do?key=${KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Referer: "https://www.bike.go.kr/map/roadMap.do",
      "User-Agent": "koreabiketrail-route/0.2",
    },
    body: `roadSn=${roadSn}`,
  });
  const pts = (await res.json())[0].roadList
    .sort((a, b) => a.lineSn - b.lineSn)
    .map((p) => [parseFloat(p.lineYp), parseFloat(p.lineXp)]) // [lng,lat]
    .filter((p) => Number.isFinite(p[0]) && Number.isFinite(p[1]));

  let cur = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    if (dist(pts[i - 1], pts[i]) > SPLIT_KM) {
      if (cur.length > 1) segments.push({ roadSn, pts: cur });
      cur = [];
    }
    cur.push(pts[i]);
  }
  if (cur.length > 1) segments.push({ roadSn, pts: cur });
  console.log(`roadSn=${roadSn}: ${pts.length}점 → 세그먼트 누적 ${segments.length}개`);
}

// 2) CP 쌍(인접 인증센터 25개 구간)별 독립 조립.
//    도로 경계(아라한강갑문·탄금대·상풍교)가 전부 CP라서 각 구간은 대개 한 세그먼트 안에 있고,
//    한강 서울·남한강처럼 조각난 구간만 소규모 그리디로 잇는다. 지선은 애초에 선택되지 않음.
const cps = JSON.parse(readFileSync("data/cert-centers.json", "utf8")).centers.map(
  (c) => [c.lng, c.lat],
);

const nearestIdx = (pts, p) => {
  let j = 0, d = Infinity;
  for (let i = 0; i < pts.length; i++) {
    const dd = dist(pts[i], p);
    if (dd < d) { d = dd; j = i; }
  }
  return [j, d];
};

const sliceDir = (pts, from, to) =>
  from <= to ? pts.slice(from, to + 1) : pts.slice(to, from + 1).reverse();

let straightFallbacks = 0;

function pairPath(a, b) {
  // 1) 두 CP를 모두 포함하는 단일 세그먼트에서 잘라내기 (대부분의 구간)
  let best = null;
  for (const s of segments) {
    const [ja, da] = nearestIdx(s.pts, a);
    const [jb, db] = nearestIdx(s.pts, b);
    if (da > JOIN_KM || db > JOIN_KM || ja === jb) continue;
    const score = da + db;
    if (!best || score < best.score) best = { s, ja, jb, score };
  }
  if (best) return sliceDir(best.s.pts, best.ja, best.jb);

  // 2) 조각난 구간: b를 향해 세그먼트를 갈아타는 소규모 그리디 (구간 내 세그먼트 재사용 금지)
  const used = new Set();
  let cursor = a;
  const path = [];
  for (let step = 0; step < 12; step++) {
    let att = null;
    segments.forEach((s, i) => {
      if (used.has(i)) return;
      const [j, d] = nearestIdx(s.pts, cursor);
      if (d > JOIN_KM) return;
      for (const fwd of [true, false]) {
        const part = fwd ? s.pts.slice(j) : s.pts.slice(0, j + 1).reverse();
        if (part.length < 2) continue;
        // b를 지나치면 b 최근접점에서 절단
        const [jb, db] = nearestIdx(part, b);
        const trimmed = db <= JOIN_KM ? part.slice(0, jb + 1) : part;
        const score = d * 2 + dist(trimmed[trimmed.length - 1], b);
        if (!att || score < att.score) att = { i, part: trimmed, score };
      }
    });
    if (!att) break;
    used.add(att.i);
    path.push(...att.part);
    cursor = path[path.length - 1];
    if (dist(cursor, b) <= JOIN_KM) return path;
  }
  straightFallbacks++;
  console.log(`  ⚠ 직선 대체: [${a}] → [${b}] (${dist(a, b).toFixed(1)}km)`);
  return [a, b];
}

const chain = [cps[0]];
for (let i = 0; i < cps.length - 1; i++) {
  chain.push(...pairPath(cps[i], cps[i + 1]));
}
console.log(`\n체인 완성: ${chain.length}점 · 직선 대체 ${straightFallbacks}구간`);

// 3) 검증
let total = 0, maxGap = 0;
for (let i = 1; i < chain.length; i++) {
  const d = dist(chain[i - 1], chain[i]);
  total += d;
  if (d > maxGap) maxGap = d;
}
const endGap = dist(chain[chain.length - 1], END);
console.log(`총 길이 ${total.toFixed(0)}km · 최대 내부 간격 ${maxGap.toFixed(2)}km · 종점(하굿둑)까지 ${endGap.toFixed(2)}km`);
if (total < 550 || total > 700) throw new Error("총 길이가 국토종주(~633km) 범위를 벗어남 — 체이닝 실패");
if (endGap > 3) throw new Error("경로가 낙동강하굿둑에 도달하지 못함");

const centers = JSON.parse(readFileSync("data/cert-centers.json", "utf8")).centers;
let worst = ["", 0];
for (const c of centers) {
  let min = Infinity;
  for (const p of chain) {
    const d = dist([c.lng, c.lat], p);
    if (d < min) min = d;
  }
  if (min > worst[1]) worst = [c.nameEn, min];
  if (min > 3) console.log(`  ⚠ CP 원거리: ${c.nameEn} ${min.toFixed(2)}km`);
}
console.log(`CP 근접 검증: 최대 이탈 ${worst[0]} ${worst[1].toFixed(2)}km (26곳 전부 3km 이내면 정상)`);

// 4) 100m 간축 후 단일 LineString 저장
const kept = [chain[0]];
for (const p of chain) {
  if (dist(kept[kept.length - 1], p) > 0.1) kept.push(p);
}
kept.push(chain[chain.length - 1]);
writeFileSync(
  "data/route-line.json",
  JSON.stringify({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Cross-Country Route (Incheon→Busan)" },
        geometry: { type: "LineString", coordinates: kept.map((p) => [
          Math.round(p[0] * 1e5) / 1e5,
          Math.round(p[1] * 1e5) / 1e5,
        ]) },
      },
    ],
  }) + "\n",
);
console.log(`저장: ${kept.length}점 단일 LineString → data/route-line.json`);
