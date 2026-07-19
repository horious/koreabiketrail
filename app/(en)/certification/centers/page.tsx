import type { Metadata } from "next";
import CertCenterMap from "@/components/CertCenterMap";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import {
  certCenters,
  certCentersLastVerified,
  PATH_LABELS,
  type BikePath,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Certification Centers — every stamp booth, Incheon to Busan",
  description:
    "Map and list of all certification centers (stamp booths) on Korea's Cross-Country cycling route, with staffed/unstaffed status and passport sales points.",
};

const PATH_ORDER: BikePath[] = ["ara", "hangang", "saejae", "nakdonggang"];

export default function CentersPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold">Certification centers</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
        <ImagePlaceholder
          aspect="tall"
          description="A STAFFED certification center: building exterior with signage and the service counter visible (e.g., Ara West Sea Lock or a weir center). Riders need to recognize 'this is where I can buy the passport / get verified'."
          caption="Staffed center — passports sold, completions verified."
        />
        <ImagePlaceholder
          aspect="tall"
          description="An UNSTAFFED red stamp booth standing alone on the path (weir or riverside backdrop). Contrast shot so riders can tell the two types apart at a glance."
          caption="Unstaffed booth — stamp anytime, 24/7."
        />
      </div>

      {PATH_ORDER.map((path) => (
        <section key={path} className="mt-8">
          <h2 className="text-xl font-semibold">{PATH_LABELS[path]}</h2>
          <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500 dark:text-gray-400">
                <th className="py-1 pr-3">Center</th>
                <th className="py-1 pr-3">Type</th>
                <th className="py-1">Notes</th>
              </tr>
            </thead>
            <tbody>
              {certCenters
                .filter((c) => c.path === path)
                .map((c) => (
                  <tr key={c.id} className="border-b align-top">
                    <td className="py-1.5 pr-3">
                      <span className="whitespace-nowrap">{c.nameEn}</span>
                      <span className="block text-xs text-gray-400 dark:text-gray-500">{c.nameKo}</span>
                      {c.address && (
                        <span className="block text-xs text-gray-400 dark:text-gray-500">{c.address}</span>
                      )}
                    </td>
                    <td className="py-1.5 pr-3 whitespace-nowrap">
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
                    <td className="py-1.5 text-gray-600 dark:text-gray-400">{c.notes}</td>
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
