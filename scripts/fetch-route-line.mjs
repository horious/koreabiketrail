// 공식 bike.go.kr 노선 폴리라인 → data/route-line.json (GeoJSON)
// 네트워크 필요: 수동 실행 (node scripts/fetch-route-line.mjs). prebuild 아님.
import { writeFileSync } from "node:fs";

const KEY = "2006176973258";
const ROADS = [
  { roadSn: 1, path: "ara" },
  { roadSn: 2, path: "hangang" }, // 서울 구간
  { roadSn: 3, path: "hangang" }, // 남한강
  { roadSn: 4, path: "saejae" },
  { roadSn: 5, path: "nakdonggang" }, // 안동댐~하굿둑 (상풍교 이후만 사용)
];
const SANGPUNG = [36.4988, 128.266]; // 국토종주 낙동강 시작점

const dist = (a, b, c, d) => {
  const R = 6371, r = Math.PI / 180;
  const h =
    Math.sin(((c - a) * r) / 2) ** 2 +
    Math.cos(a * r) * Math.cos(c * r) * Math.sin(((d - b) * r) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

const features = [];
for (const { roadSn, path } of ROADS) {
  const res = await fetch(
    `https://www.bike.go.kr/map/getLineList.do?key=${KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: "https://www.bike.go.kr/map/roadMap.do",
        "User-Agent": "koreabiketrail-route/0.1",
      },
      body: `roadSn=${roadSn}`,
    },
  );
  const json = await res.json();
  let pts = json[0].roadList
    .sort((a, b) => a.lineSn - b.lineSn)
    .map((p) => [parseFloat(p.lineXp), parseFloat(p.lineYp)]) // [lat,lng]
    .filter((p) => Number.isFinite(p[0]) && Number.isFinite(p[1]));

  // 낙동강: 상주상풍교에 가장 가까운 점부터 (안동댐 구간은 국토종주 아님)
  if (roadSn === 5) {
    let best = 0, bestD = Infinity;
    pts.forEach((p, i) => {
      const d = dist(p[0], p[1], ...SANGPUNG);
      if (d < bestD) { bestD = d; best = i; }
    });
    pts = pts.slice(best);
  }

  // 100m 간격 간축 (클라이언트 번들 크기 억제)
  const kept = [pts[0]];
  for (const p of pts) {
    const last = kept[kept.length - 1];
    if (dist(last[0], last[1], p[0], p[1]) > 0.1) kept.push(p);
  }
  kept.push(pts[pts.length - 1]);

  features.push({
    type: "Feature",
    properties: { path, roadSn },
    geometry: {
      type: "LineString",
      coordinates: kept.map(([lat, lng]) => [lng, lat]),
    },
  });
  console.log(`roadSn=${roadSn}: ${pts.length} → ${kept.length} pts`);
}

writeFileSync(
  "data/route-line.json",
  JSON.stringify({ type: "FeatureCollection", features }) + "\n",
);
console.log("data/route-line.json written");
