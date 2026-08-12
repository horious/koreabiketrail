import type { Metadata } from "next";
import Link from "next/link";
import { INK, StepStamp } from "@/components/stamps";
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
      <h1 className="text-3xl font-bold">Korea bike touring guides</h1>
      <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
        The questions every foreign rider asks, answered from actual ride
        reports — not brochures.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {guides.map((g, i) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}/`}
            className="group relative rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg dark:bg-gray-900 dark:hover:border-gray-700"
          >
            {/* 호버하면 도장이 '수집'됨 — 번호 위에 잉크 도장이 찍힌다 */}
            <span
              aria-hidden
              className="absolute top-4 right-4 font-mono text-sm text-gray-300 transition group-hover:opacity-0 dark:text-gray-700"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              aria-hidden
              className={`pointer-events-none absolute top-2 right-2 h-12 w-12 -rotate-12 scale-125 opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none ${INK}`}
            >
              <StepStamp n={i + 1} />
            </span>
            <h2 className="pr-10 font-semibold">{g.title}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{g.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
