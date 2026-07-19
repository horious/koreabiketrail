import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What Korea Bike Trail stores on your device and how analytics are used. Short version: preferences only, no ads, no data sales.",
};

export default function PrivacyPage() {
  return (
    <article className="max-w-2xl">
      <h1 className="text-3xl font-bold">Privacy</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Last updated: 2026-07-20
      </p>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Short version: we store your preferences, count visits, and nothing
        else. No accounts, no ads, no selling data.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Stored on your device</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Language choice</strong> — a first-party cookie
            (<code>lang</code>, 12 months) set only when you pick a language,
            so we can send you to your language on your next visit. It contains
            the language code and nothing else.
          </li>
          <li>
            <strong>Theme choice</strong> — light/dark preference in your
            browser's localStorage. Never leaves your device.
          </li>
        </ul>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          These are user-preference settings, not tracking — which is why you
          don't see a cookie banner here.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Analytics</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Cloudflare Web Analytics</strong> — cookieless, aggregate
            page-view counts only.
          </li>
          <li>
            <strong>Google Analytics 4</strong> — helps us understand which
            guides are useful. GA sets its own cookies; see{" "}
            <a
              href="https://policies.google.com/privacy"
              className="underline"
              rel="noopener"
            >
              Google's privacy policy
            </a>{" "}
            or block it with the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              className="underline"
              rel="noopener"
            >
              GA opt-out add-on
            </a>{" "}
            — the site works identically without it.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Third-party embeds</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          The GPX page embeds an interactive map from RideWithGPS, which loads
          from their servers under{" "}
          <a
            href="https://ridewithgps.com/privacy"
            className="underline"
            rel="noopener"
          >
            their privacy policy
          </a>
          . Media files are served from our own domain via Cloudflare.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Questions</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Email{" "}
          <a href="mailto:contact@koreabiketrail.com" className="underline">
            contact@koreabiketrail.com
          </a>{" "}
          — we read everything.
        </p>
      </section>
    </article>
  );
}
