import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DICTS, isLocale, languageAlternates } from "@/lib/i18n";
import { MEDIA_URL } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = DICTS[locale].gpx;
  return {
    title: d.metaTitle,
    description: d.metaDesc,
    alternates: { canonical: "./", languages: languageAlternates("/gpx/") },
  };
}

export default async function LocaleGpx({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = DICTS[locale].gpx;

  return (
    <article>
      <h1 className="text-3xl font-bold">{d.title}</h1>
      <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">{d.intro}</p>

      <div className="mt-6 rounded-xl border p-5">
        <h2 className="font-semibold">{d.trackTitle}</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{d.trackDesc}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`${MEDIA_URL}/gpx/cross-country-route.gpx`}
            download
            className="inline-block rounded-lg bg-gray-900 px-5 py-2.5 font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            {d.dlGpx}
          </a>
          <a
            href={`${MEDIA_URL}/gpx/cross-country-route.tcx`}
            download
            className="inline-block rounded-lg border px-5 py-2.5 font-medium hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            {d.dlTcx}
          </a>
        </div>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{d.ttukseom}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-500 dark:text-gray-400">
          {d.caveats.map((c) => (
            <li key={c.slice(0, 20)}>{c}</li>
          ))}
        </ul>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">{d.previewTitle}</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{d.previewDesc}</p>
        <iframe
          src="https://ridewithgps.com/embeds?type=route&id=56205968&title=Korea%20Cross-Country%20Route&metricUnits=true&sampleGraph=true&privacyCode=W8UuRMByvk97SbdCOswzdIV7uBCgML54"
          title="Korea Cross-Country Route on RideWithGPS"
          loading="lazy"
          scrolling="no"
          className="mt-4 h-[700px] w-full min-w-full rounded-xl border"
          style={{ width: "1px" }}
        />
      </section>
    </article>
  );
}
