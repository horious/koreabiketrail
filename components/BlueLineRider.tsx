"use client";

import { useEffect, useRef, useState } from "react";
import { INK, RouteStamp } from "@/components/stamps";

// 홈 파란 선 여정을 스크롤에 따라 달리는 라이더 — 선에 걸친 원형 칩,
// 이모지만 90도 눕혀서 진행 방향(아래=부산)을 향한다. 뷰포트 중앙 살짝 위
// 지점을 추적하며 이동(rAF + lerp). reduced-motion에서는 숨김.
//
// 이스터에그: 클릭하면 자전거 벨(WebAudio 합성, 에셋 없음) + 윌리 + 💨,
// 5번째 클릭마다 633km 도장이 화면에 쾅 찍힌다

/** 따르릉 — 금속성 2음 벨을 오실레이터로 합성 */
function ring(ctx: AudioContext) {
  const ding = (at: number) => {
    for (const freq of [2093, 2637]) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.08, ctx.currentTime + at);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + at + 0.22);
      o.connect(g).connect(ctx.destination);
      o.start(ctx.currentTime + at);
      o.stop(ctx.currentTime + at + 0.25);
    }
  };
  ding(0);
  ding(0.13);
}

export default function BlueLineRider() {
  const ref = useRef<HTMLSpanElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const [clicks, setClicks] = useState(0);
  const [wheelie, setWheelie] = useState(false);
  const [slam, setSlam] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const track = el?.parentElement;
    if (!el || !track) return;
    let raf = 0;
    let cur = -1;

    const frame = () => {
      raf = 0;
      const r = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      // 진행률: 앵커(뷰포트 45%)가 컨테이너 상단을 지날 때 0, 문서 끝까지
      // 스크롤하면 1 — 페이지 바닥에서 라이더가 반드시 부산(선 끝)에 도착한다
      const start = r.top + scrollY - vh * 0.45;
      const end =
        (document.scrollingElement?.scrollHeight ?? document.body.scrollHeight) - vh;
      const p =
        end > start
          ? Math.min(Math.max((scrollY - start) / (end - start), 0), 1)
          : 1;
      const target = 10 + p * (r.height - 52);
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

  const onClick = () => {
    try {
      audioRef.current ??= new AudioContext();
      ring(audioRef.current);
    } catch {
      /* 오디오 미지원이어도 시각 효과는 진행 */
    }
    const n = clicks + 1;
    setClicks(n);
    setWheelie(true);
    setTimeout(() => setWheelie(false), 350);
    if (n % 5 === 0) {
      setSlam(n);
      setTimeout(() => setSlam(0), 1300);
    }
  };

  return (
    <>
      <span
        ref={ref}
        aria-hidden
        className="absolute top-0 left-[9px] z-10 hidden sm:motion-safe:block"
      >
        <button
          type="button"
          onClick={onClick}
          aria-label="Ring the bike bell"
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-blue-600 bg-white text-base shadow-md transition-transform duration-300 hover:scale-110 dark:border-blue-500 dark:bg-gray-950 ${
            wheelie ? "-rotate-[24deg] scale-110" : ""
          }`}
        >
          {/* 반전(진행 방향) + 90도 눕혀서 선을 따라 아래(부산)로 달리는 자세 */}
          <span className="inline-block -scale-x-100 rotate-90">🚴</span>
        </button>
        {/* 클릭마다 다시 마운트되어 퍼지는 먼지 */}
        {clicks > 0 && (
          <span
            key={clicks}
            className="rider-puff pointer-events-none absolute -top-2 -left-3 text-sm"
          >
            💨
          </span>
        )}
      </span>
      {/* 5번째 클릭 보상 — 화면 한가운데 도장이 쾅 */}
      {slam > 0 && (
        <span
          aria-hidden
          className={`stamp-slam pointer-events-none fixed top-1/2 left-1/2 z-50 h-52 w-52 -translate-x-1/2 -translate-y-1/2 -rotate-12 ${INK}`}
        >
          <RouteStamp className="h-full w-full drop-shadow-lg" />
        </span>
      )}
    </>
  );
}
