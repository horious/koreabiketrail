import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DICTS, isLocale, languageAlternates } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = DICTS[locale].crossCountry;
  return {
    title: d.metaTitle,
    description: d.metaDesc,
    alternates: { canonical: "./", languages: languageAlternates("/cross-country/") },
  };
}

export default async function LocaleCrossCountry({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = DICTS[locale].crossCountry;

  return (
    <article>
      <h1 className="text-3xl font-bold">{d.title}</h1>

      <section className="mt-6 grid gap-3 sm:grid-cols-4">
        {d.stats.map(([big, small]) => (
          <div key={big} className="rounded-lg border p-4 text-center">
            <div className="text-xl font-bold">{big}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{small}</div>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">{d.whatTitle}</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{d.whatP1}</p>
        <ul className="mt-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
          {d.paths.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="mt-3 text-gray-700 dark:text-gray-300">{d.whatP2}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">{d.stagesTitle}</h2>
        {d.plans.map((plan) => (
          <div key={plan.title} className="mt-4">
            <h3 className="font-semibold">{plan.title}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{plan.blurb}</p>
            <table className="mt-2 w-full border-collapse text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500 dark:text-gray-400">
                  <th className="py-1 pr-2">{d.tableHead.day}</th>
                  <th className="py-1 pr-2">{d.tableHead.fromTo}</th>
                  <th className="py-1 pr-2">{d.tableHead.km}</th>
                  <th className="py-1">{d.tableHead.notes}</th>
                </tr>
              </thead>
              <tbody>
                {plan.days.map((day) => (
                  <tr key={day.day} className="border-b align-top">
                    <td className="py-1.5 pr-2">{day.day}</td>
                    <td className="py-1.5 pr-2">
                      {day.from} → {day.to}
                    </td>
                    <td className="py-1.5 pr-2">{day.km}</td>
                    <td className="py-1.5 text-gray-600 dark:text-gray-400">{day.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-xl bg-amber-50 dark:bg-amber-950/30 p-5">
        <h2 className="text-xl font-semibold">{d.hardTitle}</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
          {d.hard.map((h) => (
            <li key={h.slice(0, 20)}>{h}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">{d.nextTitle}</h2>
        <ul className="mt-2 list-disc pl-5">
          <li>
            <Link href={`/${locale}/certification/`} className="underline">
              {d.nextCert}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/gpx/`} className="underline">
              {d.nextGpx}
            </Link>
          </li>
        </ul>
      </section>
    </article>
  );
}
