// 홈 여정 배경 — 파란 선(도로)을 따라 세로로 붙는 지형 스트립.
// 본문 위에 깔리는 가로 띠가 아니라, 라인 양옆 좁은 폭(w-14)에만 코스 순서대로
// 강줄기→숲→산(새재)→들(논)→강→바다를 작은 실루엣으로 배치한다.
// 전부 장식(aria-hidden), 라인이 숨는 sm 미만에서는 함께 숨김

/** 세로로 흐르는 물줄기 — 라인과 나란히 */
function Stream({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 200"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M6 0 q-5 12 0 25 t0 25 t0 25 t0 25 t0 25 t0 25 t0 25 t0 25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 소나무 — 삼각 2단 + 둥치 */
function Tree({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 26" className={className} aria-hidden="true">
      <path d="M12 1 L19 10 H15 L21 19 H3 L9 10 H5 Z" fill="currentColor" />
      <rect x="10.5" y="19" width="3" height="6" fill="currentColor" />
    </svg>
  );
}

/** 산 능선 */
function Mountain({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 20" className={className} aria-hidden="true">
      <path d="M0 20 L10 5 L15 11 L23 1 L34 20 Z" fill="currentColor" />
    </svg>
  );
}

/** 논두렁(들) — 줄어드는 가로줄 */
function Field({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 14" className={className} aria-hidden="true" fill="none">
      <path
        d="M2 3 H20 M4 7.5 H18 M6.5 12 H15.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 바다 — 해 + 물결 */
function Sea({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 26" className={className} aria-hidden="true" fill="none">
      <circle cx="29" cy="8" r="5" fill="currentColor" opacity="0.8" />
      <path
        d="M2 17 q4 -5 8 0 t8 0 t8 0 t8 0 M6 23 q4 -5 8 0 t8 0 t8 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function JourneyScenery() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-0 bottom-0 left-[9px] hidden w-14 -translate-x-1/2 sm:block"
    >
      {/* 강 (아라뱃길·한강) — 도로 왼쪽을 따라 흐름 */}
      <Stream className="absolute top-[4%] left-1 h-[17%] w-3 text-sky-500/40 dark:text-sky-300/30" />

      {/* 숲 — 강변 수풀 */}
      <Tree className="absolute top-[24%] right-0.5 h-5 w-5 text-emerald-600/40 dark:text-emerald-300/30" />
      <Tree className="absolute top-[28%] left-1 h-4 w-4 text-emerald-600/35 dark:text-emerald-300/25" />
      <Tree className="absolute top-[32%] right-1.5 h-4 w-4 text-emerald-600/30 dark:text-emerald-300/25" />

      {/* 산 (새재·이화령) */}
      <Mountain className="absolute top-[44%] left-0 h-6 w-9 text-gray-500/40 dark:text-gray-300/30" />
      <Mountain className="absolute top-[49%] right-0 h-5 w-7 text-gray-500/30 dark:text-gray-300/25" />
      <Mountain className="absolute top-[54%] left-1 h-4 w-6 text-gray-500/25 dark:text-gray-300/20" />

      {/* 들 (낙동강변 논) */}
      <Field className="absolute top-[65%] right-0.5 h-4 w-6 text-lime-600/40 dark:text-lime-300/30" />
      <Field className="absolute top-[70%] left-1 h-4 w-6 text-lime-600/30 dark:text-lime-300/25" />

      {/* 강 (낙동강) */}
      <Stream className="absolute top-[76%] right-1 h-[14%] w-3 text-sky-500/40 dark:text-sky-300/30" />

      {/* 바다 (부산 낙동강 하굿둑 피니시) */}
      <Sea className="absolute bottom-[2.5%] left-1/2 h-7 w-10 -translate-x-1/2 text-blue-600/40 dark:text-blue-300/30" />
    </span>
  );
}
