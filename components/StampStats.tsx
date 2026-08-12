import { INK } from "./stamps";

// 숫자 스탯 그리드 — 인증수첩의 스탬프 칸처럼: 얇은 괘선 상자에 잉크색 모노 숫자가
// 제각기 살짝 기울어 '찍힌' 모양. 홈·cross-country의 EN/로케일 페이지가 공유

/** 셀별 기울기 — 손으로 찍은 느낌. 고정 배열(동적 클래스 금지) */
const TILTS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export default function StampStats({
  items,
  className = "",
}: {
  items: readonly (readonly [string, string])[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-4 ${className}`}>
      {items.map(([big, small], i) => (
        <div
          key={big}
          className="rounded-md border border-gray-200 p-4 text-center dark:border-gray-800"
        >
          <div
            className={`font-mono text-xl font-bold whitespace-nowrap ${TILTS[i % TILTS.length]} ${INK}`}
          >
            {big}
          </div>
          <div className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
            {small}
          </div>
        </div>
      ))}
    </div>
  );
}
