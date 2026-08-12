// Cross-country 페이지 시그니처 — 4개 길을 실제 거리 비율의 리본으로.
// 구조가 곧 정보: 새재(산악 구간)만 경고색, 이화령 위치에 ▲ 마커.
// 라벨은 전부 로마자 고유명사·숫자 → 로케일 공용 (장식, aria-hidden)

const SEGS = [
  { name: "ARA", km: 21, cls: "bg-sky-400 dark:bg-sky-500" },
  { name: "HANGANG", km: 192, cls: "bg-blue-500 dark:bg-blue-500" },
  { name: "SAEJAE", km: 100, cls: "bg-amber-500 dark:bg-amber-500" },
  { name: "NAKDONGGANG", km: 324, cls: "bg-blue-700 dark:bg-blue-600" },
] as const;

const TOTAL = SEGS.reduce((s, x) => s + x.km, 0);
// 이화령 정상 ≈ km 265 (새재 구간 중반)
const IHWARYEONG_PCT = (265 / TOTAL) * 100;

export default function RouteRibbon({ className = "" }: { className?: string }) {
  return (
    <figure aria-hidden className={className}>
      <div className="flex items-baseline justify-between font-mono text-[10px] tracking-widest text-gray-500 dark:text-gray-400">
        <span>INCHEON · KM 0</span>
        <span>KM 633 · BUSAN</span>
      </div>
      <div className="relative mt-1.5">
        <div className="flex h-3 w-full overflow-hidden rounded-full">
          {SEGS.map((s) => (
            <span
              key={s.name}
              style={{ flexGrow: s.km }}
              className={`${s.cls} min-w-0 basis-0 border-r border-white/70 last:border-r-0 dark:border-gray-950/70`}
            />
          ))}
        </div>
        {/* 이화령 — 유일한 진짜 고개 */}
        <span
          style={{ left: `${IHWARYEONG_PCT}%` }}
          className="absolute -top-4 -translate-x-1/2 font-mono text-[9px] tracking-wider whitespace-nowrap text-amber-600 dark:text-amber-500"
        >
          ▲ IHWARYEONG
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] tracking-wider text-gray-500 dark:text-gray-400">
        {SEGS.map((s) => (
          <span key={s.name} className="inline-flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${s.cls}`} />
            {s.name} {s.km}
          </span>
        ))}
      </div>
    </figure>
  );
}
