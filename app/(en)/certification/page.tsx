import type { Metadata } from "next";
import CertificationGuide from "@/components/cert/CertificationGuide";
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
  },
  {
    title: "2. Stamp at every red booth",
    body: "Certification centers are red phone-booth-style boxes every 10–30 km, open 24/7. Each holds a unique stamp and ink pad. Carry a spare ink pad: pads dry out, especially on remote sections. If a stamp is missing or broken, take a photo of yourself at the booth — staffed centers accept it as proof.",
  },
  {
    title: "3. Get verified at a staffed center",
    body: "At the finish (Nakdong Estuary Bank in Busan, or wherever you complete a path), staff review your stamps, certify the passport, and issue completion stickers. A certificate follows by mail.",
  },
  {
    title: "4. Order your medal",
    body: "Finishing the Cross-Country, Four Rivers or Grand Slam lets you buy an Olympic-style medal (₩7,500, display case ₩4,000). Two catches for foreigners: the online shop (riverguide.go.kr, '우리강 이용 도우미') generally needs Korean payment methods, and medals ship to KOREAN ADDRESSES ONLY, taking 2–4 weeks. Plan ahead: order via the finish-line staff or a Korean friend, and use a hotel/friend's address — or budget a return visit.",
  },
];

const LEVELS: [string, string, string][] = [
  ["Individual path", "Any one certification path", "Path sticker"],
  ["Cross-Country", "Ara + Hangang + Saejae + Nakdonggang", "Cross-Country medal"],
  ["Four Rivers", "Han, Nakdong, Geum, Yeongsan rivers", "Four Rivers medal"],
  ["Grand Slam", "Every certification center in the country", "Grand Slam medal"],
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
      <CertificationGuide
        title="Korea's Bike Passport & certification system"
        intro="Korea's cycling network is gamified: collect stamps in a paper passport as you ride, get paths certified, earn stickers, certificates and medals. It sounds silly until you're 400 km in and would sooner die than miss a booth."
        steps={STEPS}
        stampVideoCaption="Stamping at a red booth. Uh-oh — the stamp's rubber has parted ways with its handle. That happens too (see the photo rule above)."
        levelsTitle="Certification levels"
        levelsHead={{ level: "Level", what: "What you ride", reward: "Reward" }}
        levels={LEVELS}
        centersLink={{
          href: "/certification/centers/",
          label: "See every certification center on the Cross-Country Route →",
        }}
      />
    </article>
  );
}
