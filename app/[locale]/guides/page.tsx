import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INK, StepStamp } from "@/components/stamps";
import { DICTS, isLocale, languageAlternates } from "@/lib/i18n";
import { GUIDE_DICTS } from "@/lib/guides-i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = DICTS[locale].guidesUi;
  return {
    title: d.title,
    description: d.intro,
    alternates: { canonical: "./", languages: languageAlternates("/guides/") },
  };
}

export default async function LocaleGuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const ui = DICTS[locale].guidesUi;
  const guides = GUIDE_DICTS[locale];

  return (
    <div>
      <h1 className="text-3xl font-bold">{ui.title}</h1>
      <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">{ui.intro}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {guides.map((g, i) => (
          <Link
            key={g.slug}
            href={`/${locale}/guides/${g.slug}/`}
            className="group relative rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg dark:bg-gray-900 dark:hover:border-gray-700"
          >
            {/* 호버하면 도장이 '수집'됨 — EN 가이드 목록과 동일 */}
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
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {g.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
