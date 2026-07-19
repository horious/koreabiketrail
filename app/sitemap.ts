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
  ];
}
