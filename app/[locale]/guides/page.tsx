import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/${locale}/guides/${g.slug}/`}
            className="rounded-xl border p-5 transition hover:shadow-md"
          >
            <h2 className="font-semibold">{g.title}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {g.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
