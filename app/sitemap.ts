import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { SITE_URL } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/cross-country",
    "/certification",
    "/certification/centers",
    "/guides",
    "/gpx",
    "/resources",
  ];
  return [
    ...staticPaths.map((p) => ({
      url: `${SITE_URL}${p}/`,
      changeFrequency: "monthly" as const,
    })),
    ...guides.map((g) => ({
      url: `${SITE_URL}/guides/${g.slug}/`,
      changeFrequency: "monthly" as const,
    })),
  ];
}
