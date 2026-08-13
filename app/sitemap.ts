import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { LOCALES, type Locale } from "@/lib/i18n";
import { certCentersLastVerified, SITE_URL } from "@/lib/data";

export const dynamic = "force-static";

// lastModified는 콘텐츠의 Last verified 기준 (빌드 시각 아님 — 매 빌드마다 바뀌면 신호가 무의미해짐)
const STATIC_PATHS: [path: string, lastModified: string][] = [
  ["", "2026-07-19"], // Why Korea 섹션 추가일
  ["/cross-country", certCentersLastVerified],
  ["/certification", certCentersLastVerified],
  ["/certification/centers", certCentersLastVerified],
  ["/guides", "2026-07-19"],
  ["/gpx", certCentersLastVerified],
  ["/resources", "2026-07-17"],
  ["/privacy", "2026-07-20"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PATHS.map(([p, lastModified]) => ({
      url: `${SITE_URL}${p}/`,
      lastModified,
      changeFrequency: "monthly" as const,
    })),
    ...guides.map((g) => ({
      url: `${SITE_URL}/guides/${g.slug}/`,
      lastModified: g.lastVerified,
      changeFrequency: "monthly" as const,
    })),
    // 번역판 (LOCALES × 코어 4페이지 + guides + resources)
    ...LOCALES.flatMap((l: Locale) => [
      ...["", "/cross-country", "/certification", "/gpx", "/guides", "/resources"].map(
        (p) => ({
          url: `${SITE_URL}/${l}${p}/`,
          lastModified: "2026-08-13", // 전 로케일 번역 감수·zh 개편일
          changeFrequency: "monthly" as const,
        }),
      ),
      ...guides.map((g) => ({
        url: `${SITE_URL}/${l}/guides/${g.slug}/`,
        lastModified: "2026-08-13",
        changeFrequency: "monthly" as const,
      })),
    ]),
  ];
}
