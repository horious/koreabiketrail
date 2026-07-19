import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import { SITE_NAME, SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Cycle Korea's Cross-Country Route`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "The practical English guide to cycling South Korea: the 633km Cross-Country Route from Incheon to Busan, the Bike Passport stamp system, certification centers, GPX files and trip planning.",
  // "./"는 metadataBase 기준으로 페이지별 자기 URL로 해석됨 — 전 페이지 canonical/og:url 자동 생성
  alternates: { canonical: "./" },
  openGraph: { siteName: SITE_NAME, type: "website", url: "./", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "The practical English guide to cycling South Korea's Cross-Country Route.",
};

const NAV = [
  { href: "/cross-country/", label: "Cross-Country Route" },
  { href: "/certification/", label: "Certification" },
  { href: "/guides/", label: "Guides" },
  { href: "/gpx/", label: "Maps & GPX" },
  { href: "/resources/", label: "Resources" },
];

// 첫 페인트 전에 테마 적용 (FOUC 방지) — ThemeToggle과 같은 규칙
const THEME_INIT = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||((!t||t==="system")&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
        />
        <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md dark:bg-gray-950/80">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
            <Link href="/" className="text-lg font-bold tracking-tight">
              🚲 {SITE_NAME}
            </Link>
            <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-gray-900 dark:hover:text-gray-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
        <footer className="border-t bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto grid max-w-4xl gap-8 px-4 py-10 sm:grid-cols-3">
            <div>
              <p className="font-bold">🚲 {SITE_NAME}</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                The practical English guide to riding Incheon → Busan: plan it,
                ride it, get it certified.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">
                Explore
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">
                Official sources
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                <li>
                  <a
                    href="https://www.bike.go.kr/eng/index.do"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    bike.go.kr (English)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.riverguide.go.kr/eng/index.do"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    riverguide.go.kr (medals)
                  </a>
                </li>
              </ul>
              <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                Independent guide — not affiliated with the Korean government.
              </p>
            </div>
          </div>
          <div className="border-t">
            <p className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-4 text-sm text-gray-400 dark:text-gray-500">
              <span>© {new Date().getFullYear()} {SITE_NAME}</span>
              <span>
                Ideas to make this site better? We read every email —{" "}
                <a
                  href="mailto:contact@koreabiketrail.com"
                  className="underline hover:text-gray-600 dark:hover:text-gray-300"
                >
                  contact@koreabiketrail.com
                </a>
              </span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
