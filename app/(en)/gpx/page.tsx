import type { Metadata } from "next";
import Link from "next/link";
import { certCenters, certCentersLastVerified, MEDIA_URL } from "@/lib/data";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "GPX & TCX downloads — full Cross-Country Route track + stamp-booth waypoints",
  description:
    "Free GPX/TCX of Korea's full 633km Cross-Country cycling route plus every certification center as a named waypoint — Garmin, Wahoo and Komoot compatible.",
  alternates: { canonical: "./", languages: languageAlternates("/gpx/") },
};

export default function GpxPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold">Maps & GPX</h1>
      <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
        The single most common way to ruin a day on this route is sailing past
        a stamp booth and backtracking 20 km. Load these waypoints and your GPS
        will warn you instead.
      </p>

      <div className="mt-6 rounded-xl border p-5">
        <h2 className="font-semibold">Full route track — Incheon → Busan</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          The complete Cross-Country track, start gate to estuary — with{" "}
          <strong>
            all {certCenters.filter((c) => c.id !== "ttukseom").length} required
            certification centers embedded
          </strong>{" "}
          as named waypoints (GPX) / course points (TCX), staffed centers
          flagged. Load one file and your GPS warns you before every booth.
          Booth coordinates from the official bike.go.kr map data (last
          verified {certCentersLastVerified}). GPX works everywhere; TCX if
          your Garmin ecosystem prefers it.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`${MEDIA_URL}/gpx/cross-country-route.gpx`}
            download
            className="inline-block rounded-lg bg-gray-900 px-5 py-2.5 font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Download GPX (1.9 MB)
          </a>
          <a
            href={`${MEDIA_URL}/gpx/cross-country-route.tcx`}
            download
            className="inline-block rounded-lg border px-5 py-2.5 font-medium hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            Download TCX (3.9 MB)
          </a>
        </div>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Heads-up: the track skips the <strong>Ttukseom Viewpoint booth</strong>{" "}
          (north bank). That stamp is optional — it is{" "}
          <strong>not required for Cross-Country certification</strong>, and
          skipping it doesn't affect your certificate or medal. Want it anyway?
          It's a short bridge detour in eastern Seoul.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-500 dark:text-gray-400">
          <li>
            This is a <strong>recommended</strong> line, not a mandatory one —
            certification only cares about the stamps. As long as you pass the
            certification centers, any route you like is fine.
          </li>
          <li>
            Some older GPS units can't display a route this long. If yours
            struggles, split the file into day-sized chunks before uploading
            (RideWithGPS, Komoot or gpx.studio can cut it).
          </li>
          <li>
            No GPS? KakaoMap has built-in bicycle routing — it can navigate you
            between certification centers on the fly.
          </li>
        </ul>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Preview the route</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          The same track on RideWithGPS — pan the map, check the elevation
          profile, or send it straight to your device from there.
        </p>
        <iframe
          src="https://ridewithgps.com/embeds?type=route&id=56205968&title=Korea%20Cross-Country%20Route&metricUnits=true&sampleGraph=true&privacyCode=W8UuRMByvk97SbdCOswzdIV7uBCgML54"
          title="Korea Cross-Country Route on RideWithGPS"
          loading="lazy"
          scrolling="no"
          className="mt-4 h-[700px] w-full min-w-full rounded-xl border"
          style={{ width: "1px" }}
        />
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Loading it</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Garmin:</strong> drop the file in <code>Garmin/NewFiles</code>{" "}
            via USB, or import in Garmin Connect → Courses.
          </li>
          <li>
            <strong>Komoot:</strong> Profile → Tours → Import GPX. Waypoints
            become highlights.
          </li>
          <li>
            <strong>Phone only?</strong> OsmAnd opens GPX directly and shows
            booth alerts offline — see the{" "}
            <Link href="/guides/navigation-apps/" className="underline">
              navigation guide
            </Link>
            .
          </li>
        </ul>
      </section>
    </article>
  );
}
