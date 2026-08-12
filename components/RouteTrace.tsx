import routeLine from "@/data/route-line.json";
import { certCenters } from "@/lib/data";

// GPX 페이지 시그니처 — 장식이 아니라 진짜 데이터: 내려받을 트랙(route-line.json)의
// 실제 폴리라인 + 인증센터 26곳을 그대로 그린다. 빌드 타임 계산, 정적 SVG 출력

const COORDS = routeLine.features[0].geometry.coordinates as [number, number][];

// ~250점으로 다운샘플 (시작·끝 보존)
const STEP = Math.max(1, Math.floor(COORDS.length / 250));
const PTS = COORDS.filter((_, i) => i % STEP === 0).concat([
  COORDS[COORDS.length - 1],
]);

// 등장방형 근사 투영 — 장식용으로 충분
const LONS = PTS.map((p) => p[0]);
const LATS = PTS.map((p) => p[1]);
const MIN_LON = Math.min(...LONS);
const MAX_LON = Math.max(...LONS);
const MIN_LAT = Math.min(...LATS);
const MAX_LAT = Math.max(...LATS);
const K = Math.cos(((MIN_LAT + MAX_LAT) / 2) * (Math.PI / 180));
const W = 200;
const PAD = 14;
const SCALE = (W - PAD * 2) / ((MAX_LON - MIN_LON) * K);
const H = Math.round((MAX_LAT - MIN_LAT) * SCALE + PAD * 2);

const px = (lon: number) => PAD + (lon - MIN_LON) * K * SCALE;
const py = (lat: number) => PAD + (MAX_LAT - lat) * SCALE;

const POLYLINE = PTS.map((p) => `${px(p[0]).toFixed(1)},${py(p[1]).toFixed(1)}`).join(
  " ",
);

const START = PTS[0];
const END = PTS[PTS.length - 1];

export default function RouteTrace({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true">
      {/* 트랙 본선 — 노면의 파란 선 */}
      <polyline
        points={POLYLINE}
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="stroke-blue-600 dark:stroke-blue-500"
      />
      {/* 인증센터 웨이포인트 — 유인은 크게 */}
      {certCenters.map((c) => (
        <circle
          key={c.id}
          cx={px(c.lng)}
          cy={py(c.lat)}
          r={c.staffed ? 3 : 1.8}
          className={
            c.staffed
              ? "fill-[#c03325] dark:fill-[#ea6a58]"
              : "fill-[#c03325]/70 dark:fill-[#ea6a58]/70"
          }
        />
      ))}
      {/* 시작·끝 라벨 */}
      <text
        x={px(START[0]) + 6}
        y={py(START[1]) - 6}
        fontSize="9"
        letterSpacing="1.5"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        className="fill-gray-500 dark:fill-gray-400"
      >
        INCHEON
      </text>
      <text
        x={px(END[0]) - 4}
        y={py(END[1]) + 12}
        fontSize="9"
        letterSpacing="1.5"
        textAnchor="end"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        className="fill-gray-500 dark:fill-gray-400"
      >
        BUSAN
      </text>
    </svg>
  );
}
