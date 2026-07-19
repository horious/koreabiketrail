import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroCarousel from "@/components/HeroCarousel";
import { DICTS, isLocale, languageAlternates, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = DICTS[locale];
  return {
    title: d.hero.headline,
    description: d.hero.sub,
    alternates: { canonical: "./", languages: languageAlternates("/") },
  };
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = DICTS[locale as Locale];

  return (
    <div>
      <section className="py-6">
        <HeroCarousel
          texts={d.hero}
          cta1Href={`/${locale}/cross-country/`}
          cta2Href={`/${locale}/certification/`}
        />
      </section>

      <section className="py-10">
        <p className="text-center text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
          {d.home.whyEyebrow}
        </p>
        <h2 className="mt-1 text-center text-2xl font-bold tracking-tight">
          {d.home.whyTitle}
        </h2>
        <ul className="mx-auto mt-8 max-w-3xl divide-y">
          {d.home.reasons.map((r, i) => (
            <li key={r.claim} className="flex gap-5 py-5">
              <span className="text-2xl font-bold text-gray-300 tabular-nums dark:text-gray-700">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-semibold">
                  <span className="mr-2" aria-hidden>
                    {r.icon}
                  </span>
                  {r.claim}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {r.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-10">
        <p className="text-center text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
          {d.home.regions.eyebrow}
        </p>
        <h2 className="mt-1 text-center text-2xl font-bold tracking-tight">
          {d.home.regions.title}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {d.home.regions.items.map((r, i) => (
            <div
              key={r.who}
              className={`rounded-2xl border bg-white p-6 dark:bg-gray-900 ${
                i === d.home.regions.items.length - 1 &&
                d.home.regions.items.length % 2 === 1
                  ? "sm:col-span-2"
                  : ""
              }`}
            >
              <h3 className="font-semibold">
                <span className="mr-2" aria-hidden>
                  {r.flag}
                </span>
                {r.who}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {r.body}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm font-medium text-gray-500 italic dark:text-gray-400">
          {d.home.regions.closing}
        </p>
      </section>

      <section className="py-10">
        <p className="text-center text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
          {d.home.startEyebrow}
        </p>
        <h2 className="mt-1 text-center text-2xl font-bold tracking-tight">
          {d.home.startTitle}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {d.home.cards.map((c) => (
            <Link
              key={c.title}
              href={c.en ? c.href : `/${locale}/${c.href}/`}
              className="group rounded-2xl border bg-white p-6 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg dark:bg-gray-900 dark:hover:border-gray-700"
            >
              <span className="text-2xl" aria-hidden>
                {c.icon}
              </span>
              <h3 className="mt-3 font-semibold">
                {c.title}
                {c.en && (
                  <span className="ml-2 text-xs font-normal text-gray-400 dark:text-gray-500">
                    {d.home.enNote}
                  </span>
                )}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {c.body}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-gray-50 dark:bg-gray-900 p-5 text-sm text-gray-700 dark:text-gray-300">
        <h2 className="font-semibold">{d.home.confusionTitle}</h2>
        <p className="mt-2">{d.home.confusionBody}</p>
      </section>
    </div>
  );
}
