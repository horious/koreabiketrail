// prebuild: data/cert-centers.json → public/gpx/cross-country-cert-centers.gpx
// 인증센터 웨이포인트 GPX — "지나쳐서 10~20km 회귀" 페인포인트 대응 (prd.md F-03)
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { centers, _meta } = JSON.parse(
  readFileSync(join(root, "data", "cert-centers.json"), "utf8"),
);

const esc = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const wpts = centers
  .map(
    (c) => `  <wpt lat="${c.lat}" lon="${c.lng}">
    <name>${esc(`${c.staffed ? "[STAFFED] " : ""}${c.nameEn} (${c.nameKo})`)}</name>
    <desc>${esc([c.staffed ? "Staffed certification center" : "Unstaffed stamp booth", c.sellsPassport ? "Sells Bike Passport" : "", c.notes].filter(Boolean).join(". "))}</desc>
    <sym>Flag</sym>
  </wpt>`,
  )
  .join("\n");

const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="koreabiketrail.com" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>Korea Cross-Country Route - Certification Centers</name>
    <desc>All stamp booths Incheon to Busan. Official bike.go.kr coordinates; last verified ${_meta.lastVerified}.</desc>
  </metadata>
${wpts}
</gpx>
`;

const outDir = join(root, "public", "gpx");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "cross-country-cert-centers.gpx"), gpx);
console.log(`GPX written: ${centers.length} waypoints`);
