// 홈 여정 배경 — 코스의 실제 지형 서사를 따라 강→숲→산→강→바다 실루엣을
// 아주 옅게 깐다 (아라뱃길→한강→새재/이화령→낙동강→부산 바다).
// 전부 장식(aria-hidden), 카드·본문이 위에 그려지므로 가독성 영향 없음

const WAVE_D = "M0 70 " + "q15 -26 30 0 t30 0 ".repeat(20);

function Waves({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 140"
      preserveAspectRatio="none"
      className={`h-20 w-full ${className}`}
      aria-hidden="true"
    >
      <path d={WAVE_D} fill="none" stroke="currentColor" strokeWidth="4" />
      <path
        d={WAVE_D}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        transform="translate(30 34)"
      />
    </svg>
  );
}

function Forest({ className = "" }: { className?: string }) {
  let d = "";
  for (let i = 0; i < 20; i++) {
    const x = i * 62;
    const h = [56, 88, 68, 96, 62][i % 5];
    d += `M${x} 140 L${x + 26} ${140 - h} L${x + 52} 140 Z `;
  }
  return (
    <svg
      viewBox="0 0 1200 140"
      preserveAspectRatio="none"
      className={`h-24 w-full ${className}`}
      aria-hidden="true"
    >
      <path d={d} fill="currentColor" />
    </svg>
  );
}

function Mountains({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 140"
      preserveAspectRatio="none"
      className={`h-28 w-full ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 140 L90 70 L170 112 L290 28 L400 100 L490 58 L610 124 L720 36 L840 104 L940 66 L1060 122 L1150 84 L1200 140 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Sea({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 140"
      preserveAspectRatio="none"
      className={`h-20 w-full ${className}`}
      aria-hidden="true"
    >
      <circle cx="1020" cy="52" r="30" fill="currentColor" opacity="0.9" />
      <path d={WAVE_D} fill="none" stroke="currentColor" strokeWidth="4" />
      <path
        d={WAVE_D}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        transform="translate(30 34)"
      />
    </svg>
  );
}

export default function JourneyScenery() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 강 (아라뱃길·한강) */}
      <Waves className="absolute top-[3%] text-sky-600/[0.08] dark:text-sky-300/[0.07]" />
      {/* 숲 (강변 수풀) */}
      <Forest className="absolute top-[27%] text-emerald-700/[0.07] dark:text-emerald-300/[0.06]" />
      {/* 산 (새재·이화령) */}
      <Mountains className="absolute top-[48%] text-gray-600/[0.08] dark:text-gray-300/[0.07]" />
      {/* 강 (낙동강) */}
      <Waves className="absolute top-[72%] text-sky-600/[0.08] dark:text-sky-300/[0.07]" />
      {/* 바다 (부산 낙동강 하굿둑) */}
      <Sea className="absolute bottom-[1%] text-blue-700/[0.09] dark:text-blue-300/[0.07]" />
    </span>
  );
}
