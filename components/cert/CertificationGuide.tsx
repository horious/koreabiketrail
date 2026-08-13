import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import StampingVideo from "@/components/StampingVideo";
import { MEDIA_URL } from "@/lib/data";
import { CERT_STEP_IMAGES } from "@/lib/imagePlaceholders";
import { INK, RouteStamp, StepStamp } from "@/components/stamps";

// 인증 페이지 공유 레이아웃 — EN·로케일 페이지가 카피만 주입해 같은 디자인을 공유.
// 모티프: 인주 도장(빨간 부스 스탬프). 잉크색 외 장식은 기존 그레이 시스템 유지

/** 스텝 도장 기울기 — 손으로 찍은 느낌. 배열 고정(동적 클래스 금지) */
const TILTS = ["-rotate-6", "rotate-3", "-rotate-3", "rotate-6"];

/** 제목의 "N. " 접두 제거 — 번호는 도장이 담당 (전 로케일 공통 형식) */
const stripNo = (t: string) => t.replace(/^\d+\.\s*/, "");

export type CertGuideProps = {
  title: string;
  intro: string;
  steps: { title: string; body: string }[];
  stampVideoCaption: string;
  levelsTitle: string;
  levelsHead: { level: string; what: string; reward: string };
  levels: readonly (readonly [string, string, string])[];
  /** EN 전용 인증센터 목록 링크 (로케일 미제공 페이지) */
  centersLink?: { href: string; label: string };
};

export default function CertificationGuide({
  title,
  intro,
  steps,
  stampVideoCaption,
  levelsTitle,
  levelsHead,
  levels,
  centersLink,
}: CertGuideProps) {
  return (
    <>
      <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 sm:text-lg">{intro}</p>
        </div>
        <span
          className={`stamp-in mx-auto block h-36 w-36 shrink-0 -rotate-6 sm:mx-0 sm:mt-1 sm:h-44 sm:w-44 ${INK}`}
        >
          <RouteStamp className="h-full w-full" />
        </span>
      </div>

      <ol className="relative mt-12 space-y-10">
        {/* 점선 스파인 — 도장들을 꿰는 트레일. 도장 중심선에 맞춤 (w-14/2, sm: w-[4.5rem]/2) */}
        <span
          aria-hidden
          className="absolute top-4 bottom-4 left-[27px] border-l-2 border-dashed border-gray-200 sm:left-[35px] dark:border-gray-800"
        />
        {steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-4 sm:gap-6">
            <span
              className={`z-10 mt-0.5 block h-14 w-14 shrink-0 transition-transform duration-300 hover:rotate-0 motion-reduce:transition-none sm:h-[4.5rem] sm:w-[4.5rem] ${TILTS[i % TILTS.length]} ${INK}`}
            >
              <StepStamp n={i + 1} />
            </span>
            <div className="min-w-0 flex-1 rounded-xl border bg-white p-5 sm:p-6 dark:bg-gray-950">
              <h2 className="font-semibold">{stripNo(s.title)}</h2>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{s.body}</p>
              {i === 1 && <StampingVideo caption={stampVideoCaption} />}
              {/* 4단계 보상 실사진 — 캡션 없이 이미지만 (로케일 공유, 본문이 맥락 설명) */}
              {i === 3 && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${MEDIA_URL}/images/certificate-medal.webp`}
                  alt="Stamped bike passports, Cross-Country and Grand Slam certificates, completion stickers, and three gold medals including the Grand Slam medal in its wooden case"
                  loading="lazy"
                  className="my-6 w-full rounded-xl border"
                />
              )}
              {CERT_STEP_IMAGES[i] && (
                <ImagePlaceholder description={CERT_STEP_IMAGES[i]!} />
              )}
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-14">
        <h2 className="text-xl font-semibold">{levelsTitle}</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr className="text-left font-mono text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
                <th className="px-4 py-2.5 font-semibold">{levelsHead.level}</th>
                <th className="px-4 py-2.5 font-semibold">{levelsHead.what}</th>
                <th className="px-4 py-2.5 font-semibold">{levelsHead.reward}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {levels.map(([level, what, reward]) => (
                <tr key={level}>
                  <td className="px-4 py-3 font-medium">{level}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{what}</td>
                  <td className="px-4 py-3">{reward}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {centersLink && (
        <p className="mt-10">
          <Link
            href={centersLink.href}
            className={`inline-flex items-center rounded-full border border-current/30 px-5 py-2.5 text-sm font-semibold hover:bg-current/5 ${INK}`}
          >
            {centersLink.label}
          </Link>
        </p>
      )}
    </>
  );
}
