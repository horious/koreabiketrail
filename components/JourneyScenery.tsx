// 홈 여정 배경 — 파란 선을 90도로 세운 도로로 보고, 지형을 90도 눕혀서
// 밑동이 선(=지면)에 닿게 오른쪽에 세운다. 페이지를 옆으로 눕히면 평면 위에
// 나무·산·물·들이 서 있는 한 장의 풍경이 되는 구조.
// 그림: Google Noto Emoji (Apache 2.0, public/journey/LICENSE.txt) — 귀여운 플랫 스타일.
// 전부 장식(aria-hidden), 라인이 숨는 sm 미만에서는 함께 숨김

function Glyph({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/journey/${src}.svg`}
      alt=""
      loading="lazy"
      className={`absolute left-0 rotate-90 ${className}`}
    />
  );
}

export default function JourneyScenery() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-0 bottom-0 left-[9px] hidden w-12 sm:block"
    >
      {/* 강 (아라뱃길·한강) */}
      <Glyph src="wave" className="top-[6%] h-8 w-8" />
      <Glyph src="wave" className="top-[10%] h-6 w-6 opacity-70" />

      {/* 숲 (강변 수풀) */}
      <Glyph src="tree" className="top-[24%] h-8 w-8" />
      <Glyph src="pine" className="top-[28.5%] h-7 w-7" />
      <Glyph src="tree" className="top-[33%] h-6 w-6 opacity-80" />

      {/* 산 (새재·이화령) */}
      <Glyph src="mountain" className="top-[46%] h-9 w-9" />
      <Glyph src="pine" className="top-[52%] h-6 w-6 opacity-80" />

      {/* 들 (낙동강변 논) */}
      <Glyph src="rice" className="top-[64%] h-7 w-7" />
      <Glyph src="rice" className="top-[68.5%] h-6 w-6 opacity-75" />

      {/* 강 (낙동강) */}
      <Glyph src="wave" className="top-[78%] h-7 w-7" />

      {/* 바다 (부산 낙동강 하굿둑 피니시) */}
      <Glyph src="sunrise" className="bottom-[2%] h-9 w-9" />
    </span>
  );
}
