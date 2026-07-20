import type { Metadata } from "next";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Korea Bike Passport & Certification Guide",
  description:
    "Buying the ₩4,000 Bike Passport, stamping at red booths, getting certified and ordering the medal — including the parts that are hard as a foreigner.",
  alternates: { canonical: "./", languages: languageAlternates("/certification/") },
};

const STEPS = [
  {
    title: "1. Buy the Bike Passport (₩4,000, cash)",
    body: "Sold at staffed certification centers on the paths — NOT at the airport. Starting in Incheon, buy it at the Ara West Sea Lock center (daily 09:00–18:00). Bring Korean won in cash; foreign cards often fail. The paper route map is ₩500 extra and worth it. Note: since 2022 it's one passport per person with ID verification — bring your actual passport.",
    image:
      "The Bike Passport itself: cover + an opened spread showing the stamp grid and route map, held in hand at the Ara West Sea Lock counter. Foreigners have never seen this document — show exactly what they're asking to buy.",
  },
  {
    title: "2. Stamp at every red booth",
    body: "Certification centers are red phone-booth-style boxes every 10–30 km, open 24/7. Each holds a unique stamp and ink pad. Carry a spare ink pad: pads dry out, especially on remote sections. If a stamp is missing or broken, take a photo of yourself at the booth — staffed centers accept it as proof.",
    image:
      "The iconic red phone-booth stamp station: exterior wide shot on the path + inset/second frame of the hand pressing the stamp inside. This is the most-searched visual of the whole system — make it unmistakable.",
  },
  {
    title: "3. Get verified at a staffed center",
    body: "At the finish (Nakdong Estuary Bank in Busan, or wherever you complete a path), staff review your stamps, certify the passport, and issue completion stickers. A certificate follows by mail.",
    image:
      "A staff member at a counter checking a filled passport and applying the completion sticker (Nakdong Estuary center if possible). Shows the human step so riders know what 'verification' physically looks like.",
  },
  {
    title: "4. Order your medal",
    body: "Finishing the Cross-Country, Four Rivers or Grand Slam lets you buy an Olympic-style medal (₩7,500, display case ₩4,000). Two catches for foreigners: the online shop (riverguide.go.kr, '우리강 이용 도우미') generally needs Korean payment methods, and medals ship to KOREAN ADDRESSES ONLY, taking 2–4 weeks. Plan ahead: order via the finish-line staff or a Korean friend, and use a hotel/friend's address — or budget a return visit.",
    image:
      "The medal, front and back, next to the certificate. If available, the three medals (Cross-Country / Four Rivers / Grand Slam) side by side for the collector instinct.",
  },
];

// HowTo 리치 결과용 — 가시 콘텐츠(STEPS)와 1:1 일치
const HOWTO_JSONLD = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to get certified riding Korea's Cross-Country Route",
  description:
    "Buy the Bike Passport, stamp at every red booth, get verified at a staffed center and order your medal.",
  step: STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title.replace(/^\d+\.\s*/, ""),
    text: s.body,
  })),
};

export default function CertificationPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOWTO_JSONLD) }}
      />
      <h1 className="text-3xl font-bold">
        Korea's Bike Passport &amp; certification system
      </h1>
      <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
        Korea's cycling network is gamified: collect stamps in a paper passport
        as you ride, get paths certified, earn stickers, certificates and
        medals. It sounds silly until you're 400 km in and would sooner die
        than miss a booth.
      </p>

      <ol className="mt-8 space-y-5">
        {STEPS.map((s) => (
          <li key={s.title} className="rounded-xl border p-5">
            <h2 className="font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{s.body}</p>
            <ImagePlaceholder description={s.image} />
          </li>
        ))}
      </ol>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Certification levels</h2>
        <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500 dark:text-gray-400">
              <th className="py-1 pr-3">Level</th>
              <th className="py-1 pr-3">What you ride</th>
              <th className="py-1">Reward</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-1.5 pr-3">Individual path</td>
              <td className="py-1.5 pr-3">Any one certification path</td>
              <td className="py-1.5">Path sticker</td>
            </tr>
            <tr className="border-b">
              <td className="py-1.5 pr-3">Cross-Country</td>
              <td className="py-1.5 pr-3">Ara + Hangang + Saejae + Nakdonggang</td>
              <td className="py-1.5">Cross-Country medal</td>
            </tr>
            <tr className="border-b">
              <td className="py-1.5 pr-3">Four Rivers</td>
              <td className="py-1.5 pr-3">Han, Nakdong, Geum, Yeongsan rivers</td>
              <td className="py-1.5">Four Rivers medal</td>
            </tr>
            <tr className="border-b">
              <td className="py-1.5 pr-3">Grand Slam</td>
              <td className="py-1.5 pr-3">Every certification center in the country</td>
              <td className="py-1.5">Grand Slam medal</td>
            </tr>
          </tbody>
        </table>
        </div>
      </section>

      <p className="mt-8">
        <Link href="/certification/centers/" className="underline">
          See every certification center on the Cross-Country Route →
        </Link>
      </p>
    </article>
  );
}
