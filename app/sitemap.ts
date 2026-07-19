import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
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
    // 번역판 (JA/ZH-Hant/TH/ES × 코어 4페이지)
    ...(["ja", "zh", "th", "es"] as const).flatMap((l) =>
      ["", "/cross-country", "/certification", "/gpx"].map((p) => ({
        url: `${SITE_URL}/${l}${p}/`,
        lastModified: "2026-07-19",
        changeFrequency: "monthly" as const,
      })),
    ),
  ];
}
