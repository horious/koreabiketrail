import type { Metadata } from "next";
import Link from "next/link";
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

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${MEDIA_URL}/images/korea-cycling-paths-map.jpg`}
        alt="Korea certification bike path network map (Korean/English labels)"
        loading="lazy"
        className="mt-6 w-full rounded-xl border bg-white"
      />

      <section className="mt-8">
        <h2 className="text-xl font-semibold">{d.whatTitle}</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{d.whatP1}</p>
        <ul className="mt-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
          {d.paths.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="mt-3 text-gray-700 dark:text-gray-300">{d.whatP2}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${MEDIA_URL}/images/blueline.jpg`}
          alt=""
          loading="lazy"
          className="my-6 w-full rounded-xl border"
        />
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">{d.stagesTitle}</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${MEDIA_URL}/images/elevation-profile-v2.jpg`}
          alt="Elevation and gradient profile: flat with twin peaks around km 240–260 (Saejae passes)"
          loading="lazy"
          className="mt-3 w-full rounded-lg border bg-white"
        />
        {d.plans.map((plan) => (
          <div key={plan.title} className="mt-4">
            <h3 className="font-semibold">{plan.title}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{plan.blurb}</p>
            <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
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
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-xl bg-amber-50 dark:bg-amber-950/30 p-5">
        <h2 className="text-xl font-semibold">{d.hardTitle}</h2>
        {/* EN 페이지와 동일 미디어 — muted 속성을 정적 HTML에 보장하기 위해 raw HTML */}
        <div
          className="my-4"
          dangerouslySetInnerHTML={{
            __html: `<video class="w-full rounded-xl border" autoplay muted loop playsinline preload="metadata"><source src="${MEDIA_URL}/video/ihwaryeong-summit-v3.mp4" type="video/mp4" /><source src="${MEDIA_URL}/video/ihwaryeong-summit-v3.webm" type="video/webm" /></video>`,
          }}
        />
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
