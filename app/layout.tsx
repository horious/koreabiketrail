import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
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
        {children}
        {/* Cloudflare Web Analytics — 쿠키리스, 프로덕션 빌드에서만 (dev 트래픽 오염 방지) */}
        {process.env.NODE_ENV === "production" && (
          <script
            type="module"
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "9c980d8f43c34b409aa09e7e77528850"}'
          />
        )}
        {/* GA4 — CF WA와 병행. GA는 쿠키 사용: EU 트래픽 본격화·수익화 시 Consent Mode 배너 필요 */}
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId="G-VB4RWGE68G" />
        )}
        {/* Vercel Web Analytics — 쿠키리스, Hobby 월 5만 이벤트 무료(초과 시 수집만 중지) */}
        <Analytics />
      </body>
    </html>
  );
}
