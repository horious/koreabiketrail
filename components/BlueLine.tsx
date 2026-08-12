// 홈 시그니처 — 노면에 칠해진 파란 유도선이 페이지를 따라 흐른다.
// 히어로(인천) 아래에서 시작해 마지막 섹션(부산)에서 끝나고, 각 섹션이 경유지.
// 라벨은 로마자 지명·숫자뿐 → EN/로케일 공용 (장식, aria-hidden). sm 미만은 숨김

/** 세로 파란 선 + 시작/끝 캡. 부모는 relative + sm:pl-12 */
export function BlueLineRail() {
  return (
    <span aria-hidden className="absolute top-2 bottom-2 left-[9px] hidden sm:block">
      <span className="absolute inset-y-3 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-400 via-blue-600 to-blue-800 dark:from-sky-500 dark:via-blue-500 dark:to-blue-700" />
      {/* 출발: 속 빈 링 (아직 안 달린 길) */}
      <span className="absolute top-0 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-[3px] border-sky-400 bg-white dark:border-sky-500 dark:bg-gray-950" />
      <span className="absolute top-5 left-2 font-mono text-[10px] tracking-widest whitespace-nowrap text-gray-400 [writing-mode:vertical-rl] dark:text-gray-500">
        INCHEON · KM 0
      </span>
      {/* 도착: 꽉 찬 점 (완주) */}
      <span className="absolute bottom-0 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-blue-800 dark:bg-blue-600" />
      <span className="absolute bottom-5 left-2 font-mono text-[10px] tracking-widest whitespace-nowrap text-gray-400 [writing-mode:vertical-rl] dark:text-gray-500">
        KM 633 · BUSAN
      </span>
    </span>
  );
}

/** 섹션 경유지 점 — 각 섹션(relative)에 하나씩 */
export function Waypoint() {
  return (
    <span
      aria-hidden
      className="absolute top-[46px] -left-[39px] hidden h-2.5 w-2.5 rounded-full border-2 border-blue-600 bg-white sm:block dark:border-blue-500 dark:bg-gray-950"
    />
  );
}
