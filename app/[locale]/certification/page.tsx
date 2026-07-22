import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import StampingVideo from "@/components/StampingVideo";
import { DICTS, isLocale, languageAlternates } from "@/lib/i18n";
import { CERT_STEP_IMAGES } from "@/lib/imagePlaceholders";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = DICTS[locale].certification;
  return {
    title: d.metaTitle,
    description: d.metaDesc,
    alternates: { canonical: "./", languages: languageAlternates("/certification/") },
  };
}

export default async function LocaleCertification({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = DICTS[locale].certification;

  return (
    <article>
      <h1 className="text-3xl font-bold">{d.title}</h1>
      <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">{d.intro}</p>

      <ol className="mt-8 space-y-5">
        {d.steps.map((s, i) => (
          <li key={s.title} className="rounded-xl border p-5">
            <h2 className="font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{s.body}</p>
            {i === 1 && <StampingVideo caption={d.stampVideoCaption} />}
            {/* 플레이스홀더 안내문은 EN 공유 — d.steps는 EN STEPS와 1:1 */}
            {CERT_STEP_IMAGES[i] && <ImagePlaceholder description={CERT_STEP_IMAGES[i]!} />}
          </li>
        ))}
      </ol>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">{d.levelsTitle}</h2>
        <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500 dark:text-gray-400">
              <th className="py-1 pr-3">{d.levelsHead.level}</th>
              <th className="py-1 pr-3">{d.levelsHead.what}</th>
              <th className="py-1">{d.levelsHead.reward}</th>
            </tr>
          </thead>
          <tbody>
            {d.levels.map(([level, what, reward]) => (
              <tr key={level} className="border-b">
                <td className="py-1.5 pr-3">{level}</td>
                <td className="py-1.5 pr-3">{what}</td>
                <td className="py-1.5">{reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </section>
    </article>
  );
}
