import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources — official sites and English-language links",
  description:
    "Official Korean government cycling sites, the K-water center operator, medal ordering, and the best English-language guides and communities.",
};

const GROUPS: {
  title: string;
  blurb: string;
  links: { href: string; name: string; desc: string }[];
}[] = [
  {
    title: "Official",
    blurb: "The primary sources — route data, certification rules, medal orders.",
    links: [
      {
        href: "https://www.bike.go.kr",
        name: "bike.go.kr (자전거행복나눔)",
        desc: "The government cycling portal: route maps, certification center list, passport rules. Korean-first; the English pages are thinner and less current.",
      },
      {
        href: "https://www.bike.go.kr/eng/index.do",
        name: "bike.go.kr — English",
        desc: "Official English pages on the certification system and passport. Good for rules, weak on maps.",
      },
      {
        href: "https://www.riverguide.go.kr/eng/index.do",
        name: "우리강 이용 도우미 (riverguide.go.kr)",
        desc: "Where completion medals are ordered after your passport is verified. Korean payment methods and domestic delivery only — see our certification guide for workarounds.",
      },
      {
        href: "https://www.kwateromc.co.kr",
        name: "K-water O&M (케이워터운영관리)",
        desc: "The K-water subsidiary that operates many weir certification centers. Center operating notices sometimes appear here first.",
      },
    ],
  },
  {
    title: "English-language guides",
    blurb: "Independent sites that cover the routes in depth.",
    links: [
      {
        href: "https://koreabybike.com",
        name: "Korea by Bike",
        desc: "The most complete independent English guide: every certification path, center lists, passport app walkthrough.",
      },
      {
        href: "https://kojects.com/long-distance-cycling/",
        name: "Kojects — Long-Distance Cycling",
        desc: "Concise overview of the long routes with transport tips (buses, trains).",
      },
      {
        href: "https://bikebuskorea.com",
        name: "Bike Bus Korea",
        desc: "Recent ride reports and center lists, strongest on the East Coast route.",
      },
      {
        href: "https://www.crazyguyonabike.com",
        name: "CrazyGuyOnABike — Korea journals",
        desc: "Long-form touring journals including several Incheon–Busan rides; search 'Korea 4 rivers'.",
      },
    ],
  },
  {
    title: "Communities",
    blurb: "Where the freshest on-the-ground info lives.",
    links: [
      {
        href: "https://www.facebook.com/groups/543187712445164/",
        name: "Seoul to Busan and Beyond (SBB) — Facebook",
        desc: "The English-speaking group for exactly this ride: daily splits, lodging picks, GPX swaps, current path conditions.",
      },
      {
        href: "https://www.facebook.com/groups/koreacyclingcommunity/",
        name: "Korea Cycling Community — Facebook",
        desc: "Broad expat riding group with active Q&A and a well-maintained FAQ. (Han River Riders is the related Seoul riding group — search the name on Facebook.)",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold">Resources</h1>
      <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
        We keep this site practical and current, but you should know the
        primary sources too. Last verified: 2026-07-17.
      </p>

      {GROUPS.map((g) => (
        <section key={g.title} className="mt-8">
          <h2 className="text-xl font-semibold">{g.title}</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{g.blurb}</p>
          <ul className="mt-3 space-y-3">
            {g.links.map((l) => (
              <li key={l.href} className="rounded-xl border p-4">
                <a
                  href={l.href}
                  className="font-medium underline"
                  rel="noopener"
                  target="_blank"
                >
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
