import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Practical guides for cycling Korea",
  description:
    "Navigation apps, transport, motels, packing, seasons, rentals and city riding — everything foreign riders ask before the Cross-Country Route.",
  alternates: { canonical: "./", languages: languageAlternates("/guides/") },
};

export default function GuidesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Guides</h1>
      <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
        The questions every foreign rider asks, answered from actual ride
        reports — not brochures.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}/`}
            className="rounded-xl border p-5 transition hover:shadow-md"
          >
            <h2 className="font-semibold">{g.title}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{g.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
