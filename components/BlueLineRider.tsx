"use client";

import { useEffect, useRef } from "react";

// 홈 파란 선 여정을 스크롤에 따라 달리는 라이더 — 뷰포트 중앙 살짝 위 지점을
// 추적하며 선 위를 이동한다 (rAF + lerp). 부모(relative 여정 컨테이너)의 직계
// 자식으로 두어야 함. reduced-motion에서는 스크롤 연동 이동 자체가 모션이므로 숨김
export default function BlueLineRider() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const track = el?.parentElement;
    if (!el || !track) return;
    let raf = 0;
    let cur = -1;

    const frame = () => {
      raf = 0;
      const r = track.getBoundingClientRect();
      const target = Math.min(
        Math.max(window.innerHeight * 0.45 - r.top, 10),
        r.height - 42,
      );
      cur = cur < 0 ? target : cur + (target - cur) * 0.18;
      if (Math.abs(target - cur) < 0.5) cur = target;
      el.style.transform = `translate(-50%, ${cur}px)`;
      if (cur !== target) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className="absolute top-0 left-[9px] z-10 hidden sm:motion-safe:block"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-base shadow-md dark:border-blue-500 dark:bg-gray-950">
        {/* 기본 이모지는 왼쪽을 봄 — 반전해서 진행 방향(오른쪽) */}
        <span className="inline-block -scale-x-100">🚴</span>
      </span>
    </span>
  );
}
