import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { DICTS, isLocale, languageAlternates } from "@/lib/i18n";
import { getLocaleGuide } from "@/lib/guides-i18n";
import { getGuide, guides } from "@/lib/guides";
import { MEDIA_URL } from "@/lib/data";
import { renderInline } from "@/lib/renderInline";

export function generateStaticParams() {
  // locale은 상위 세그먼트의 generateStaticParams와 곱집합으로 생성됨
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const guide = getLocaleGuide(locale, slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: "./",
      languages: languageAlternates(`/guides/${slug}/`),
    },
  };
}

export default async function LocaleGuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const guide = getLocaleGuide(locale, slug);
  if (!guide) notFound();
  const ui = DICTS[locale].guidesUi;
  // 이미지 플레이스홀더(촬영 안내문)는 EN 원문을 단일 소스로 공유 — 번역판 섹션 구조는 EN과 1:1 평행
  const enGuide = getGuide(slug);

  return (
    <article>
      <p className="text-sm">
        <Link href={`/${locale}/guides/`} className="text-gray-500 dark:text-gray-400 underline">
          {ui.back}
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold">{guide.title}</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {ui.lastVerified}: {guide.lastVerified}
      </p>

      {guide.sections.map((s, i) => (
        <section key={s.heading} className="mt-6">
          <h2 className="text-xl font-semibold">{s.heading}</h2>
          {s.paragraphs?.map((p) => (
            <p key={p.slice(0, 40)} className="mt-2 text-gray-700 dark:text-gray-300">
              {renderInline(p)}
            </p>
          ))}
          {s.list && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
              {s.list.map((item) => (
                <li key={item.slice(0, 40)}>{renderInline(item)}</li>
              ))}
            </ul>
          )}
          {s.figures && (
            <div className="mt-4 flex flex-wrap gap-6">
              {s.figures.map((f) => (
                <figure key={f.src} className="w-40 text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.src} alt={f.alt} loading="lazy" className="mx-auto h-24 w-auto" />
                  <figcaption className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {f.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
          {s.imageSrc && (
            <figure className="my-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${MEDIA_URL}${s.imageSrc}`}
                alt={s.imageAlt ?? ""}
                loading="lazy"
                className="w-full rounded-xl border"
              />
              {s.imageCaption && (
                <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {s.imageCaption}
                </figcaption>
              )}
            </figure>
          )}
          {!s.imageSrc && enGuide?.sections[i]?.image && (
            <ImagePlaceholder description={enGuide.sections[i].image!} />
          )}
        </section>
      ))}

      {/* 입문 게이트웨이 컨셉 — 깊이는 링크아웃 */}
      <aside className="mt-10 rounded-xl bg-gray-50 dark:bg-gray-900 p-5 text-sm">
        <p className="font-semibold">{ui.goDeeperTitle}</p>
        <p className="mt-1 text-gray-600 dark:text-gray-400">{ui.goDeeperBody}</p>
        <Link
          href={`/${locale}/resources/`}
          className="mt-2 inline-block font-medium text-blue-600 underline dark:text-blue-400"
        >
          {ui.goDeeperLink}
        </Link>
      </aside>
    </article>
  );
}
