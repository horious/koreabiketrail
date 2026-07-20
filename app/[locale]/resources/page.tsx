import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DICTS, isLocale, languageAlternates } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = DICTS[locale].resources;
  return {
    title: d.title,
    description: d.metaDesc,
    alternates: { canonical: "./", languages: languageAlternates("/resources/") },
  };
}

export default async function LocaleResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = DICTS[locale].resources;

  return (
    <article>
      <h1 className="text-3xl font-bold">{d.title}</h1>
      <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">{d.intro}</p>

      {d.groups.map((g) => (
        <section key={g.title} className="mt-8">
          <h2 className="text-xl font-semibold">{g.title}</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{g.blurb}</p>
          <ul className="mt-3 space-y-3">
            {g.links.map((l) => (
              <li key={l.href} className="rounded-xl border p-4">
                <a href={l.href} className="font-medium underline" rel="noopener" target="_blank">
                  {l.name}
                </a>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{l.desc}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
