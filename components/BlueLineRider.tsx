"use client";

import { useEffect, useRef, useState } from "react";
import { INK, RouteStamp } from "@/components/stamps";

// 홈 파란 선 여정을 스크롤에 따라 달리는 라이더.
// 선을 90도로 세운 도로로 보고 자전거도 90도 눕혀서(머리가 아래=부산 방향)
// 바퀴가 선에 닿은 채 달린다. 스크롤로 이동 중일 때만 바퀴·크랭크·다리가
// 굴러간다(.rider-riding, globals.css). reduced-motion에서는 숨김.
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

/** 페달 도는 자전거 — 옆모습(오른쪽 진행), 래퍼가 90도 회전시킴 */
function Bike() {
  return (
    <svg
      viewBox="0 0 64 46"
      className="h-full w-full"
      aria-hidden="true"
      fill="none"
      strokeLinecap="round"
    >
      {/* 뒷바퀴 */}
      <g className="rider-wheel">
        <circle
          cx="15"
          cy="33"
          r="11"
          strokeWidth="2.5"
          className="stroke-gray-700 dark:stroke-gray-300"
        />
        <path
          d="M15 23.5 V42.5 M5.5 33 H24.5 M8.3 26.3 L21.7 39.7 M8.3 39.7 L21.7 26.3"
          strokeWidth="1.3"
          className="stroke-gray-400 dark:stroke-gray-500"
        />
      </g>
      {/* 앞바퀴 */}
      <g className="rider-wheel">
        <circle
          cx="49"
          cy="33"
          r="11"
          strokeWidth="2.5"
          className="stroke-gray-700 dark:stroke-gray-300"
        />
        <path
          d="M49 23.5 V42.5 M39.5 33 H58.5 M42.3 26.3 L55.7 39.7 M42.3 39.7 L55.7 26.3"
          strokeWidth="1.3"
          className="stroke-gray-400 dark:stroke-gray-500"
        />
      </g>
      {/* 프레임 — 인주색 */}
      <path
        d="M15 33 L31 33 L26 16 M31 33 L43 15 L49 33 M15 33 L26 16 M22.5 15 H29 M41 13 L46.5 11.5"
        strokeWidth="2.4"
        className="stroke-[#c03325] dark:stroke-[#ea6a58]"
      />
      {/* 크랭크 + 페달 */}
      <g className="rider-crank">
        <path
          d="M31 27 V39"
          strokeWidth="2"
          className="stroke-gray-700 dark:stroke-gray-300"
        />
        <path
          d="M27.5 27 H34.5 M27.5 39 H34.5"
          strokeWidth="2.6"
          className="stroke-gray-800 dark:stroke-gray-200"
        />
      </g>
      {/* 다리 — 페달링 스윙 */}
      <path
        d="M26 16 L31 27"
        strokeWidth="2.6"
        className="rider-leg-a stroke-blue-700 dark:stroke-blue-300"
      />
      <path
        d="M26 16 L31 38"
        strokeWidth="2.6"
        className="rider-leg-b stroke-blue-500 dark:stroke-blue-400"
      />
      {/* 몸통·팔·머리 — 파란 저지 */}
      <path
        d="M26 16 Q29 9.5 33 9.5 L41.5 13"
        strokeWidth="2.6"
        className="stroke-blue-600 dark:stroke-blue-400"
      />
      <circle cx="34.5" cy="5" r="4" className="fill-blue-600 dark:fill-blue-400" />
    </svg>
  );
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
      const target = 10 + p * (r.height - 62);
      cur = cur < 0 ? target : cur + (target - cur) * 0.18;
      if (Math.abs(target - cur) < 0.5) cur = target;
      el.style.transform = `translateY(${cur}px)`;
      // 이동 중일 때만 페달링
      el.classList.toggle("rider-riding", Math.abs(target - cur) > 1.5);
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
        className="rider-svg absolute top-0 left-[5px] z-10 hidden sm:motion-safe:block"
      >
        <button
          type="button"
          onClick={onClick}
          aria-label="Ring the bike bell"
          className={`block h-12 w-12 cursor-pointer transition-transform duration-300 hover:scale-110 ${
            wheelie ? "scale-110 rotate-[62deg]" : "rotate-90"
          }`}
        >
          <Bike />
        </button>
        {/* 클릭마다 다시 마운트되어 퍼지는 먼지 */}
        {clicks > 0 && (
          <span
            key={clicks}
            className="rider-puff pointer-events-none absolute -top-3 left-2 text-sm"
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
