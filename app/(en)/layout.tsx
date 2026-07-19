import Link from "next/link";
import SiteHeader, { type NavItem } from "@/components/SiteHeader";
import { LANG_OPTIONS } from "@/lib/langs";
import { SITE_NAME } from "@/lib/data";

const NAV: NavItem[] = [
  { href: "/cross-country/", label: "Cross-Country Route" },
  { href: "/certification/", label: "Certification" },
  { href: "/guides/", label: "Guides" },
  { href: "/gpx/", label: "Maps & GPX" },
  { href: "/resources/", label: "Resources" },
];

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader
        brand={`🚲 ${SITE_NAME}`}
        homeHref="/"
        nav={NAV}
        langs={LANG_OPTIONS}
        currentLang="en"
      />
      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      <footer className="border-t bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto grid max-w-4xl gap-8 px-4 py-10 sm:grid-cols-3">
          <div>
            <p className="font-bold">🚲 {SITE_NAME}</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              The practical English guide to riding Incheon → Busan: plan it,
              ride it, get it certified.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">
              Explore
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">
              Official sources
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li>
                <a
                  href="https://www.bike.go.kr/eng/index.do"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  bike.go.kr (English)
                </a>
              </li>
              <li>
                <a
                  href="https://www.riverguide.go.kr/eng/index.do"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  riverguide.go.kr (medals)
                </a>
              </li>
            </ul>
            <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
              Independent guide — not affiliated with the Korean government.
            </p>
          </div>
        </div>
        <div className="border-t">
          <p className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-4 text-sm text-gray-400 dark:text-gray-500">
            <span>© {new Date().getFullYear()} {SITE_NAME}</span>
            <span>
              Ideas to make this site better? We read every email —{" "}
              <a
                href="mailto:contact@koreabiketrail.com"
                className="underline hover:text-gray-600 dark:hover:text-gray-300"
              >
                contact@koreabiketrail.com
              </a>
            </span>
          </p>
        </div>
      </footer>
    </>
  );
}
