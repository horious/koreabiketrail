import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader, { type NavItem } from "@/components/SiteHeader";
import { DICTS, isLocale, LOCALES } from "@/lib/i18n";
import { LANG_OPTIONS } from "@/lib/langs";
import { SITE_NAME } from "@/lib/data";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = DICTS[locale];

  const nav: NavItem[] = [
    { href: `/${locale}/cross-country/`, label: d.nav.route },
    { href: `/${locale}/certification/`, label: d.nav.cert },
    { href: `/${locale}/guides/`, label: d.nav.guides },
    { href: `/${locale}/gpx/`, label: d.nav.gpx },
    { href: `/${locale}/resources/`, label: d.nav.resources },
  ];

  return (
    // 루트 <html lang="en">은 고정이므로 컨테이너에 lang 지정 (hreflang은 메타데이터로 제공)
    <div lang={d.htmlLang}>
      <SiteHeader
        brand={SITE_NAME}
        homeHref={`/${locale}/`}
        nav={nav}
        langs={LANG_OPTIONS}
        currentLang={locale}
      />
      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      <footer className="border-t bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <p className="flex items-center gap-2 font-bold">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/koreabiketrail.svg" alt="" className="h-6 w-6" />
            {SITE_NAME}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {d.footer.tagline}
          </p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 dark:text-gray-500">
            <span>© {new Date().getFullYear()} {SITE_NAME}</span>
            <Link href="/" className="underline hover:text-gray-600 dark:hover:text-gray-300">
              {d.nav.english}
            </Link>
            <Link
              href="/privacy/"
              className="underline hover:text-gray-600 dark:hover:text-gray-300"
            >
              Privacy
            </Link>
            <a
              href="mailto:contact@koreabiketrail.com"
              className="underline hover:text-gray-600 dark:hover:text-gray-300"
            >
              contact@koreabiketrail.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
