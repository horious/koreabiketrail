import type { Metadata } from "next";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import {
  certCenters,
  PATH_LABELS,
  SITE_URL,
  stagePlans,
  stagesLastVerified,
} from "@/lib/data";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Cross-Country Route (Gukto Jongju) — 633km Incheon to Busan",
  description:
    "Stage-by-stage guide to Korea's 633km Cross-Country cycling route: 5 and 7-day plans, the Ihwaryeong climb, certification stamps, and where to sleep.",
  alternates: { canonical: "./", languages: languageAlternates("/cross-country/") },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Korea Cross-Country Cycling Route (Gukto Jongju)",
  description:
    "633km cycling route from Ara West Sea Lock in Incheon to the Nakdong Estuary Bank in Busan, South Korea.",
  url: `${SITE_URL}/cross-country/`,
  touristType: "Cyclists",
};

export default function CrossCountryPage() {
  return (
    <article className="prose-headings:tracking-tight">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-bold">The Cross-Country Route (국토종주)</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Last verified: {stagesLastVerified} · distances approximate
      </p>

      <section className="mt-6 grid gap-3 sm:grid-cols-4">
        {[
          ["633 km", "Incheon → Busan"],
          ["5–9 days", "typical duration"],
          ["1 big climb", "Ihwaryeong, 5km @ up to ~12%"],
          [`${certCenters.length} booths`, "stamps to collect"],
        ].map(([big, small]) => (
          <div key={big} className="rounded-lg border p-4 text-center">
            <div className="text-xl font-bold">{big}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{small}</div>
          </div>
        ))}
      </section>

      <ImagePlaceholder
        aspect="wide"
        description="Simple schematic route map of Korea (illustration, not a web map): Incheon → Seoul → Chungju → Ihwaryeong → Daegu → Busan with the 4 path segments in different colors and distances labeled. Foreigners need to place the route on the peninsula at a glance."
        caption="The Cross-Country Route: Incheon to Busan, 633 km."
      />

      <section className="mt-8">
        <h2 className="text-xl font-semibold">What it is</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Four certification bike paths strung together into one continuous,
          mostly car-free ride: a blue line painted on the tarmac leads from the
          Ara West Sea Lock near Incheon Airport to the Nakdong Estuary Bank in
          Busan. Collect a stamp at every booth on the way and you can claim the
          Cross-Country medal.
        </p>
        <ul className="mt-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
          {Object.values(PATH_LABELS).map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
        <p className="mt-3 text-gray-700 dark:text-gray-300">
          Ride it in either direction — many riders arriving by ferry from
          Fukuoka start in Busan instead. Note that this is <em>not</em> the
          same as the Four Rivers certification (that needs the Geum and
          Yeongsan rivers too).
        </p>
        <ImagePlaceholder
          description="Close-up of the painted blue line on the path surface with a wheel/shadow of a bike in frame — the single most reassuring navigation fact on the route. Alternatively: a route signpost with '부산/Busan' distance marker."
          caption="Follow the blue line. It really does go all the way to Busan."
        />
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Stage plans</h2>
        <ImagePlaceholder
          aspect="wide"
          description="Elevation profile chart of the full 633 km (generated from GPS data, not a photo): mostly flat with the Ihwaryeong spike around km 340 clearly annotated. Riders decide their daily splits off this one graphic."
        />
        {stagePlans.map((plan) => (
          <div key={plan.id} className="mt-4">
            <h3 className="font-semibold">{plan.title}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{plan.blurb}</p>
            <table className="mt-2 w-full border-collapse text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500 dark:text-gray-400">
                  <th className="py-1 pr-2">Day</th>
                  <th className="py-1 pr-2">From → To</th>
                  <th className="py-1 pr-2">~km</th>
                  <th className="py-1">Notes</th>
                </tr>
              </thead>
              <tbody>
                {plan.days.map((d) => (
                  <tr key={d.day} className="border-b align-top">
                    <td className="py-1.5 pr-2">{d.day}</td>
                    <td className="py-1.5 pr-2 whitespace-nowrap">
                      {d.from} → {d.to}
                    </td>
                    <td className="py-1.5 pr-2">{d.km}</td>
                    <td className="py-1.5 text-gray-600 dark:text-gray-400">{d.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-xl bg-amber-50 dark:bg-amber-950/30 p-5">
        <h2 className="text-xl font-semibold">The hard parts, honestly</h2>
        <ImagePlaceholder
          description="The Ihwaryeong climb: switchbacks seen from above, or a rider pushing near the top with the gradient visible. Pair with the summit gate/monument photo where everyone takes their victory shot. Sets honest expectations for the only real climb."
        />
        <ul className="mt-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Ihwaryeong pass</strong> — the one serious climb. Sleep in
            Suanbo and do it fresh in the morning.
          </li>
          <li>
            <strong>City traffic in Busan (and leaving Seoul)</strong> — the
            paths are superb, the city streets are not. Read the{" "}
            <Link href="/guides/city-riding/" className="underline">
              city riding guide
            </Link>{" "}
            before your last day.
          </li>
          <li>
            <strong>Monotony</strong> — riverside paths bypass villages, and
            some riders find days 3–5 repetitive. Plan short detours (hot
            springs at Suanbo, markets in Sangju) to break it up.
          </li>
          <li>
            <strong>Construction and darkness</strong> — on 633 km something is
            always being repaired, and rural sections are unlit after sunset.
            The{" "}
            <Link href="/guides/roads-safety/" className="underline">
              roads &amp; safety guide
            </Link>{" "}
            covers both.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Next steps</h2>
        <ul className="mt-2 list-disc pl-5">
          <li>
            <Link href="/certification/" className="underline">
              How the Bike Passport works
            </Link>
          </li>
          <li>
            <Link href="/certification/centers/" className="underline">
              All certification centers on the map
            </Link>
          </li>
          <li>
            <Link href="/gpx/" className="underline">
              Download the GPX (with every stamp booth as a waypoint)
            </Link>
          </li>
        </ul>
      </section>
    </article>
  );
}
