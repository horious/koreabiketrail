import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { getGuide, guides } from "@/lib/guides";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.description };
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
              {p}
            </p>
          ))}
          {s.list && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
              {s.list.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ul>
          )}
          {s.image && <ImagePlaceholder description={s.image} />}
        </section>
      ))}
    </article>
  );
}
