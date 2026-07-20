import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { MEDIA_URL } from "@/lib/data";
import { getGuide, guides } from "@/lib/guides";
import { languageAlternates } from "@/lib/i18n";
import { renderInline } from "@/lib/renderInline";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
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

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  return (
    <article>
      <p className="text-sm">
        <Link href="/guides/" className="text-gray-500 dark:text-gray-400 underline">
          ← All guides
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold">{guide.title}</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Last verified: {guide.lastVerified}
      </p>

      {guide.sections.map((s) => (
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
                  <img
                    src={f.src}
                    alt={f.alt}
                    loading="lazy"
                    className="mx-auto h-24 w-auto"
                  />
                  <figcaption className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {f.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
          {s.imageSrc ? (
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
          ) : (
            s.image && <ImagePlaceholder description={s.image} />
          )}
        </section>
      ))}

      {/* 입문 게이트웨이 컨셉 — 깊이는 링크아웃 */}
      <aside className="mt-10 rounded-xl bg-gray-50 dark:bg-gray-900 p-5 text-sm">
        <p className="font-semibold">Going deeper?</p>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          We keep this site light on purpose — it's the front door, not the
          library. For route-by-route manuals and up-to-the-minute local intel,
          the official sites and specialist communities are the place.
        </p>
        <Link href="/resources/" className="mt-2 inline-block font-medium text-blue-600 underline dark:text-blue-400">
          Head to Resources →
        </Link>
      </aside>
    </article>
  );
}
