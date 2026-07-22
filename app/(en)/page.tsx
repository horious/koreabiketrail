import type { Metadata } from "next";
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { languageAlternates } from "@/lib/i18n";
import { HOME_REWARD_IMAGE } from "@/lib/imagePlaceholders";

export const metadata: Metadata = {
  alternates: { canonical: "./", languages: languageAlternates("/") },
};

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

const REGIONS = [
  {
    flag: "🇪🇺",
    who: "If you're a European rider...",
    body: "You've done EuroVelo — now imagine a route with the Danube's infrastructure but zero cars for 600 km, a stamp passport, and a medal at the end. Motels at $45 a night mean you tour lighter than you ever could at home.",
  },
  {
    flag: "🇺🇸",
    who: "If you're riding in North America...",
    body: "Tired of sharing a 12-inch shoulder with trucks? Here the entire country crossing is car-free, and there's a town with food and a bed every 20 km — credit-card touring without the RV traffic or the 100-mile empty stretches.",
  },
  {
    flag: "🇦🇺",
    who: "If you're from Australia or New Zealand...",
    body: "Your spring is Korea's autumn — the best riding season here (Sep–Nov, dry and golden). Swap the outback's empty distances for a route where a convenience store is never more than a few km away, one direct flight north.",
  },
  {
    flag: "🇯🇵",
    who: "If you're in Japan...",
    body: "You're one ferry ride away: Fukuoka to Busan overnight, riding by morning. If you loved the Shikoku 88 or Shimanami Kaido, Korea's stamp-and-medal system is the same joy — stretched across an entire country.",
  },
  {
    flag: "🌏",
    who: "If you're in Southeast Asia...",
    body: "A 5–6 hour LCC flight trades tropical heat for crisp river mornings. Spring cherry blossoms or autumn colors, flat riding, and a finisher's medal to bring home — the perfect first overseas tour.",
  },
  {
    flag: "🌎",
    who: "If you're from South America...",
    body: "You've earned your stripes on Andean climbs and Carretera gravel. Korea is the other kind of joy: smooth tarmac, zero traffic, a motel and hot food every evening — the tour where the country does the hard work for you.",
  },
  {
    flag: "🛸",
    who: "If you're visiting from outer space...",
    body: "Welcome, traveler. The blue line is basically a 633 km landing strip, the red stamp booths look suspiciously like teleport pods, and the finisher's medal is accepted in every galaxy we've checked. Helmets are required by law — exoskeletons included.",
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
          By the numbers
        </p>
        <h2 className="mt-1 text-center text-2xl font-bold tracking-tight">
          The whole trip in eight numbers
        </h2>
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["633 km", "Incheon → Busan"],
            ["26", "stamps to collect"],
            ["5–9 days", "typical duration"],
            ["1", "serious climb"],
            ["~12%", "steepest gradient"],
            ["₩4,000", "passport price"],
            ["0 words", "of Korean needed"],
            ["1 medal", "to take home"],
          ].map(([big, small]) => (
            <div key={big} className="rounded-2xl border bg-white p-4 text-center dark:bg-gray-900">
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{big}</div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{small}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10">
        <p className="text-center text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
          Wherever you ride
        </p>
        <h2 className="mt-1 text-center text-2xl font-bold tracking-tight">
          If this is you, Korea is your next tour
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {REGIONS.map((r) => (
            <div
              key={r.who}
              className={`rounded-2xl border bg-white p-6 dark:bg-gray-900 ${
                REGIONS.indexOf(r) === REGIONS.length - 1 ? "sm:col-span-2" : ""
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
          Wherever you start — any continent, any planet — the blue line ends
          in Busan.
        </p>
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

      <ImagePlaceholder description={HOME_REWARD_IMAGE} />

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
