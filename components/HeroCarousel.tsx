"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MEDIA_URL } from "@/lib/data";

// 이미지 확보 시 slide.image에 경로를 넣고 배경 div를 <img>로 교체 (next/image 금지)
const SLIDES: {
  id: string;
  gradient: string;
  label: string;
  imageNote?: string;
  image?: string;
  video?: { mp4: string; webm: string };
}[] = [
  {
    id: "path",
    gradient:
      "from-amber-200 via-orange-100 to-sky-200 dark:from-amber-800 dark:via-orange-900 dark:to-sky-900",
    label: "The car-free blue line, Incheon → Busan",
    image: `${MEDIA_URL}/images/hero-carfree.jpg`,
  },
  {
    id: "booth",
    gradient:
      "from-rose-200 via-red-100 to-amber-100 dark:from-rose-900 dark:via-red-950 dark:to-amber-900",
    label: "Stamp every red booth on the way",
    video: {
      mp4: `${MEDIA_URL}/video/cert-booth.mp4`,
      webm: `${MEDIA_URL}/video/cert-booth.webm`,
    },
  },
  {
    id: "pass",
    gradient:
      "from-emerald-200 via-teal-100 to-slate-200 dark:from-emerald-900 dark:via-teal-950 dark:to-slate-900",
    label: "One real climb: Ihwaryeong",
    video: {
      mp4: `${MEDIA_URL}/video/ihwaryeong.mp4`,
      webm: `${MEDIA_URL}/video/ihwaryeong.webm`,
    },
  },
  {
    id: "nakdong",
    gradient:
      "from-lime-200 via-emerald-100 to-cyan-200 dark:from-lime-900 dark:via-emerald-950 dark:to-cyan-900",
    label: "Long, calm days along the Nakdong valley",
    video: {
      mp4: `${MEDIA_URL}/video/nakdonggang.mp4`,
      webm: `${MEDIA_URL}/video/nakdonggang.webm`,
    },
  },
  {
    id: "finish",
    gradient:
      "from-sky-200 via-blue-100 to-indigo-200 dark:from-sky-900 dark:via-blue-950 dark:to-indigo-900",
    label: "Finish at the Nakdong estuary, medal earned",
    imageNote:
      "IMAGE: rider holding the stamped passport/medal at the Busan finish line",
  },
];

const INTERVAL_MS = 5000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // 비디오는 해당 슬라이드가 처음 활성화될 때만 개별 마운트 — 홈 진입만으로 수 MB를 내려받지 않게 함
  const [mountedVideos, setMountedVideos] = useState<Record<string, boolean>>({});
  const reducedMotion = useRef(false);

  useEffect(() => {
    const s = SLIDES[index];
    if (s.video && !mountedVideos[s.id])
      setMountedVideos((m) => ({ ...m, [s.id]: true }));
  }, [index, mountedVideos]);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (paused || reducedMotion.current) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      INTERVAL_MS,
    );
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Korea Bike Trail highlights"
      className="relative h-[440px] overflow-hidden rounded-2xl sm:h-[500px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 배경 슬라이드 */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== index}
          className={`absolute inset-0 bg-gradient-to-br ${s.gradient} transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {s.image && (
            // 첫 슬라이드 배경 — LCP 요소이므로 lazy 없이 즉시 로드
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={s.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {s.video && mountedVideos[s.id] && (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              // React가 muted를 HTML 속성으로 내보내지 않는 이슈 대응 — 속성 직접 지정 후 재생
              ref={(el) => {
                if (el) {
                  el.muted = true;
                  el.play().catch(() => {});
                }
              }}
            >
              <source src={s.video.mp4} type="video/mp4" />
              <source src={s.video.webm} type="video/webm" />
            </video>
          )}
          {s.imageNote && (
            <p className="absolute top-4 right-4 max-w-xs rounded-lg bg-white/60 p-2 text-right text-[11px] leading-snug text-gray-500 dark:bg-gray-900/60 dark:text-gray-400">
              📷 {s.imageNote}
            </p>
          )}
        </div>
      ))}

      {/* 가독성용 하단 그라디언트 */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />

      {/* 고정 오버레이: 헤드라인 + CTA */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
        <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Cycle the length of South Korea.
        </h1>
        <p className="mt-3 max-w-xl text-sm text-gray-100 sm:text-base">
          633 km of mostly car-free riding from Incheon to Busan, a
          stamp-collecting passport, and a medal at the end.
        </p>
        <p
          className="mt-2 h-5 text-sm font-medium text-white/90"
          aria-live="polite"
        >
          {SLIDES[index].label}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/cross-country/"
            className="rounded-lg bg-white px-5 py-2.5 font-medium text-gray-900 shadow hover:bg-gray-100"
          >
            Plan the ride
          </Link>
          <Link
            href="/certification/"
            className="rounded-lg border border-white/70 px-5 py-2.5 font-medium text-white backdrop-blur-sm hover:bg-white/10"
          >
            How certification works
          </Link>
        </div>
      </div>

      {/* 인디케이터 */}
      <div className="absolute right-6 bottom-6 flex gap-2 sm:right-10">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Slide ${i + 1}: ${s.label}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
