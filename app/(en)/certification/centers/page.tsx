import type { Metadata } from "next";
import CertCenterMap from "@/components/CertCenterMap";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { INK } from "@/components/stamps";
import {
  certCenters,
  certCentersLastVerified,
  MEDIA_URL,
  PATH_LABELS,
  type BikePath,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Certification Centers — all 26 stamp booths",
  description:
    "Map and list of all certification centers (stamp booths) on Korea's Cross-Country cycling route, with staffed/unstaffed status and passport sales points.",
};

const PATH_ORDER: BikePath[] = ["ara", "hangang", "saejae", "nakdonggang"];

// 주행 순서 번호 (인천→부산) — certCenters 배열 순서가 곧 주행 순서
const ORDER = new Map(certCenters.map((c, i) => [c.id, i + 1]));

export default function CentersPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold">Certification centers</h1>
      <p className="mt-2 font-mono text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
        Last verified: {certCentersLastVerified} · positions from the official
        bike.go.kr map data
      </p>
      <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
        Every stamp booth between Incheon and Busan, in riding order.{" "}
        <strong>Staffed</strong> centers sell the Bike Passport and verify
        completions; unstaffed booths are open 24/7.
      </p>

      <div className="mt-6">
        <CertCenterMap centers={certCenters} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <figure className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${MEDIA_URL}/images/nakdong-estuary-center.webp`}
            alt="Glass building of the Nakdong River Culture Pavilion with its entrance sign, home of the staffed Nakdong Estuary Bank certification center in Busan"
            loading="lazy"
            className="aspect-video w-full rounded-xl border object-cover"
          />
          <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Staffed center — passports sold, completions verified. Pictured:
            Nakdong Estuary Bank, the route finish in Busan.
          </figcaption>
        </figure>
        <ImagePlaceholder
          aspect="video"
          description="An UNSTAFFED red stamp booth standing alone on the path (weir or riverside backdrop). Contrast shot so riders can tell the two types apart at a glance."
          caption="Unstaffed booth — stamp anytime, 24/7."
        />
      </div>

      <figure className="my-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${MEDIA_URL}/images/nakdong-estuary-exhibits.webp`}
          alt="Display shelf inside the Nakdong Estuary center showing sample Cross-Country, Four Rivers, and Grand Slam certificates alongside completion medals in wooden cases"
          loading="lazy"
          className="w-full rounded-xl border"
        />
        <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Inside the finish-line center: sample certificates and medals for
          every completion level, on display next to the counter.
        </figcaption>
      </figure>

      {PATH_ORDER.map((path) => (
        <section key={path} className="mt-8">
          <h2 className="text-xl font-semibold">{PATH_LABELS[path]}</h2>
          <div className="mt-3 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr className="text-left font-mono text-[11px] tracking-widest text-gray-500 uppercase dark:text-gray-400">
                <th className="px-3 py-2 font-semibold">#</th>
                <th className="px-3 py-2 font-semibold">Center</th>
                <th className="px-3 py-2 font-semibold">Type</th>
                <th className="px-3 py-2 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {certCenters
                .filter((c) => c.path === path)
                .map((c) => (
                  <tr key={c.id} className="align-top">
                    <td className={`px-3 py-2 font-mono font-semibold ${INK}`}>
                      {ORDER.get(c.id)}
                    </td>
                    <td className="px-3 py-2">
                      <span className="whitespace-nowrap">{c.nameEn}</span>
                      <span className="block text-xs text-gray-400 dark:text-gray-500">{c.nameKo}</span>
                      {c.address && (
                        <span className="block text-xs text-gray-400 dark:text-gray-500">{c.address}</span>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {c.staffed ? (
                        <span className="rounded bg-red-100 dark:bg-red-900/40 px-1.5 py-0.5 text-xs font-medium text-red-700 dark:text-red-300">
                          staffed{c.sellsPassport ? " · passport" : ""}
                        </span>
                      ) : (
                        <span className="rounded bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                          booth
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{c.notes}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
        </section>
      ))}
    </article>
  );
}
