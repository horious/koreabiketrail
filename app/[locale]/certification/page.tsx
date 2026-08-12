import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CertificationGuide from "@/components/cert/CertificationGuide";
import { DICTS, isLocale, languageAlternates } from "@/lib/i18n";

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
      <CertificationGuide
        title={d.title}
        intro={d.intro}
        steps={d.steps}
        stampVideoCaption={d.stampVideoCaption}
        levelsTitle={d.levelsTitle}
        levelsHead={d.levelsHead}
        levels={d.levels}
      />
    </article>
  );
}
