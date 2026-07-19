"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import type { LangOption } from "@/lib/langs";

export interface NavItem {
  href: string;
  label: string;
}

// 번역판이 존재하는 코어 경로 — 그 외 페이지에서 언어 전환 시 해당 언어 홈으로
const CORE_PATHS = ["/", "/cross-country/", "/certification/", "/gpx/"];

export default function SiteHeader({
  brand,
  homeHref,
  nav,
  langs,
  currentLang,
}: {
  brand: string;
  homeHref: string;
  nav: NavItem[];
  langs: LangOption[];
  currentLang: string;
}) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const langMenuRef = useRef<HTMLDetailsElement>(null);

  // 경로가 바뀌면 모바일 패널·언어 메뉴 닫기
  useEffect(() => {
    setOpen(false);
    langMenuRef.current?.removeAttribute("open");
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        langMenuRef.current?.removeAttribute("open");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 현재 경로에서 언어 프리픽스를 벗겨 대상 언어의 대응 URL 계산
  const currentPrefix = langs.find((l) => l.code === currentLang)?.prefix ?? "";
  const rest =
    currentPrefix && pathname.startsWith(currentPrefix)
      ? pathname.slice(currentPrefix.length) || "/"
      : pathname;
  const langHref = (l: LangOption) => {
    if (l.prefix === "") return rest; // 영어는 전 페이지 보유
    return CORE_PATHS.includes(rest) ? `${l.prefix}${rest}` : `${l.prefix}/`;
  };

  // 명시적 언어 선택을 쿠키에 저장 — vercel.json의 Accept-Language 자동 리다이렉트가
  // 사용자 선택을 존중하게 함 (환경설정 쿠키: 추적 아님, 동의 불요, 12개월)
  const rememberLang = (code: string) => {
    document.cookie = `lang=${code};path=/;max-age=31536000;SameSite=Lax`;
  };

  const linkCls = (href: string) =>
    `transition hover:text-gray-900 dark:hover:text-gray-100 ${
      pathname === href
        ? "font-semibold text-gray-900 dark:text-gray-100"
        : "text-gray-600 dark:text-gray-400"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md dark:bg-gray-950/80">
      <div className="mx-auto flex h-14 max-w-4xl items-center gap-4 px-4">
        <Link href={homeHref} className="shrink-0 text-lg font-bold tracking-tight">
          {brand}
        </Link>

        {/* 데스크톱 내비 */}
        <nav className="ml-2 hidden flex-1 items-center gap-x-4 text-sm md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={linkCls(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          {/* 언어 스위처 */}
          <details ref={langMenuRef} className="relative">
            <summary
              className="flex cursor-pointer list-none items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-gray-600 select-none hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 [&::-webkit-details-marker]:hidden"
              aria-label="Language"
            >
              <span aria-hidden>🌐</span>
              {langs.find((l) => l.code === currentLang)?.label}
            </summary>
            <ul className="absolute right-0 z-50 mt-2 w-36 rounded-xl border bg-white py-1 text-sm shadow-lg dark:bg-gray-900">
              {langs.map((l) => (
                <li key={l.code}>
                  <Link
                    href={langHref(l)}
                    onClick={() => rememberLang(l.code)}
                    className={`block px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                      l.code === currentLang ? "font-semibold" : ""
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <ThemeToggle />
        </div>

        {/* 모바일: 햄버거 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-auto rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* 모바일 드롭 패널 */}
      {open && (
        <div id="mobile-menu" className="border-t md:hidden">
          <nav className="mx-auto max-w-4xl px-4 py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2.5 text-sm ${linkCls(item.href)}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-3 text-sm">
              <span aria-hidden>🌐</span>
              {langs.map((l) => (
                <Link
                  key={l.code}
                  href={langHref(l)}
                  onClick={() => rememberLang(l.code)}
                  className={
                    l.code === currentLang
                      ? "font-semibold"
                      : "text-gray-600 dark:text-gray-400"
                  }
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="border-t py-3 mt-3">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
