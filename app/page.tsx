import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import ImagePlaceholder from "@/components/ImagePlaceholder";

const CARDS = [
  {
    href: "/cross-country/",
    icon: "🗺️",
    title: "The Cross-Country Route",
    body: "633 km from Incheon to Busan on the Gukto Jongju (국토종주) — day-by-day stage plans, the Ihwaryeong climb, and every stamp booth on the way.",
  },
  {
    href: "/certification/",
    icon: "📔",
    title: "Bike Passport & Medals",
    body: "How Korea's stamp-rally certification works: buying the ₩4,000 passport, the red booths, and getting your medal as a foreigner.",
  },
  {
    href: "/gpx/",
    icon: "📍",
    title: "GPX Downloads",
    body: "Free GPX with every certification center as a waypoint — never overshoot a stamp booth and backtrack 20 km again.",
  },
  {
    href: "/guides/",
    icon: "🧭",
    title: "Practical Guides",
    body: "Why Google Maps won't work, trains & buses with a bike, motels, packing, seasons, rentals, and surviving Busan traffic.",
  },
];

const REASONS = [
  {
    n: "01",
    icon: "🛣️",
    claim: "Car-free by design",
    body: "633 km of dedicated bike path with a painted line to follow the whole way. No trucks, no shoulders, no guesswork — just ride.",
  },
  {
    n: "02",
    icon: "🛡️",
    claim: "Safe like almost nowhere else",
    body: "One of the world's lowest-crime countries. Solo women tour here unbothered, and your loaded bike waits outside the store — untouched.",
  },
  {
    n: "03",
    icon: "🏪",
    claim: "Comfort is never far",
    body: "A convenience store every few kilometers, a clean $45–65 motel in every town, no booking and no camping gear required. Tour on a credit card and a change of clothes.",
  },
  {
    n: "04",
    icon: "🏞️",
    claim: "Scenery that keeps changing",
    body: "River mist at dawn, rice paddies, a mountain pass with a victory gate, and the sea to finish. Four bike paths, four moods, one week.",
  },
  {
    n: "05",
    icon: "🏅",
    claim: "It's a game you can win",
    body: "Stamp a passport at red booths across the country and ride home with an actual medal. No other country turns touring into this.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="py-6">
        <HeroCarousel />
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">
          Korea has something no other country does — and this site is the
          practical English-language guide to planning it, riding it, and
          getting it certified.
        </p>
      </section>

      <section className="py-10">
        <p className="text-center text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
          Why Korea
        </p>
        <h2 className="mt-1 text-center text-2xl font-bold tracking-tight">
          If you love bike touring, there's no reason not to come
        </h2>
        <ul className="mx-auto mt-8 max-w-3xl divide-y">
          {REASONS.map((r) => (
            <li key={r.n} className="flex gap-5 py-5">
              <span className="text-2xl font-bold text-gray-300 tabular-nums dark:text-gray-700">
                {r.n}
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
          Start here
        </p>
        <h2 className="mt-1 text-center text-2xl font-bold tracking-tight">
          Everything you need, in riding order
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-2xl border bg-white p-6 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg dark:bg-gray-900 dark:hover:border-gray-700"
            >
              <span className="text-2xl" aria-hidden>
                {c.icon}
              </span>
              <h3 className="mt-3 font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {c.body}
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-blue-600 transition group-hover:translate-x-0.5 dark:text-blue-400">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ImagePlaceholder
        description="Triptych or single shot of the reward chain: opened Bike Passport full of stamps + completion stickers + the Cross-Country medal, laid flat on a map or handlebar bag. This sells the gamification instantly without words."
      />

      <section className="rounded-xl bg-gray-50 dark:bg-gray-900 p-5 text-sm text-gray-700 dark:text-gray-300">
        <h2 className="font-semibold">Cross-Country ≠ Four Rivers</h2>
        <p className="mt-2">
          The two names get mixed up constantly. The <strong>Cross-Country
          Route</strong> (국토종주) is the continuous Incheon→Busan ride. The{" "}
          <strong>Four Rivers</strong> certification requires riding the Han,
          Nakdong, <em>Geum and Yeongsan</em> river paths — finishing
          Incheon→Busan does <em>not</em> complete it, despite the "Four Rivers"
          marker at the Busan finish line.
        </p>
      </section>
    </div>
  );
}
