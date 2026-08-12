import { useId } from "react";

// 사이트 공용 도장 그래픽 — 실제 인증부스 스탬프(주홍 인주)의 잉크 질감을
// feTurbulence 마스크로 재현. 전부 장식용(aria-hidden), 카피 없음 → i18n 부담 없음
// 색 체계: 파랑 = 노면의 파란 선(길·이동), 인주 = 도장(숫자·보상·인증)

/** 인주(주홍) 잉크색 라이트/다크 페어 — 도장 모티프 요소에만 사용 */
export const INK = "text-[#c03325] dark:text-[#ea6a58]";

/** 잉크 질감 필터: 가장자리를 살짝 일그러뜨리고 노이즈로 잉크를 군데군데 깎음 */
function InkFilter({ id, seed }: { id: string; seed: number }) {
  return (
    <filter id={id} x="-8%" y="-8%" width="116%" height="116%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.05"
        numOctaves="2"
        seed={seed}
        result="warp"
      />
      <feDisplacementMap in="SourceGraphic" in2="warp" scale="3" result="warped" />
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.55"
        numOctaves="2"
        seed={seed + 3}
        result="grain"
      />
      <feColorMatrix
        in="grain"
        type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 3 -0.45"
        result="mask"
      />
      <feComposite in="warped" in2="mask" operator="in" />
    </filter>
  );
}

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

/** 스텝 번호 도장 — 이중 링 + 번호. 색은 부모의 currentColor를 따름 */
export function StepStamp({ n }: { n: number }) {
  const fid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
      <defs>
        <InkFilter id={fid} seed={n * 11} />
      </defs>
      <g filter={`url(#${fid})`} stroke="currentColor" fill="none">
        <circle cx="48" cy="48" r="44" strokeWidth="5" />
        <circle cx="48" cy="48" r="36" strokeWidth="1.5" />
        <circle cx="17.5" cy="48" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="78.5" cy="48" r="2.2" fill="currentColor" stroke="none" />
        <text
          x="48"
          y="49"
          fill="currentColor"
          stroke="none"
          fontSize="38"
          fontWeight="700"
          fontFamily={MONO}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {n}
        </text>
      </g>
    </svg>
  );
}

/** 히어로 도장 — 원형 텍스트 "CROSS-COUNTRY ROUTE · INCHEON → BUSAN" + 중앙 633 km */
export function RouteStamp({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const fid = `${uid}f`;
  const pid = `${uid}p`;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <InkFilter id={fid} seed={42} />
        {/* 반지름 71 원 경로 (12시 방향 시작) */}
        <path
          id={pid}
          d="M 100,29 a 71,71 0 1,1 -0.01,0"
          fill="none"
        />
      </defs>
      <g filter={`url(#${fid})`} stroke="currentColor" fill="none">
        <circle cx="100" cy="100" r="94" strokeWidth="6" />
        <circle cx="100" cy="100" r="85" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="56" strokeWidth="1.5" />
        <text
          fill="currentColor"
          stroke="none"
          fontSize="13.5"
          fontWeight="600"
          letterSpacing="2.5"
          fontFamily={MONO}
        >
          <textPath href={`#${pid}`} startOffset="2">
            CROSS-COUNTRY ROUTE ✦ INCHEON → BUSAN ✦
          </textPath>
        </text>
        <text
          x="100"
          y="97"
          fill="currentColor"
          stroke="none"
          fontSize="42"
          fontWeight="700"
          fontFamily={MONO}
          textAnchor="middle"
          dominantBaseline="central"
        >
          633
        </text>
        <text
          x="100"
          y="127"
          fill="currentColor"
          stroke="none"
          fontSize="15"
          fontWeight="600"
          letterSpacing="6"
          fontFamily={MONO}
          textAnchor="middle"
        >
          KM
        </text>
      </g>
    </svg>
  );
}
