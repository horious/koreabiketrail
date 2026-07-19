// 미디어 파이프라인: 변환 → 로컬 미러(public/) → R2 업로드
//
// 사용법:
//   npm run media:add -- <원본파일> <key>     예: npm run media:add -- assets-src/foo.mp4 video/foo
//   npm run media:pull -- <key...>            예: npm run media:pull -- video/ihwaryeong.mp4
//
// 규칙:
//   - key는 확장자 없이: video/이름 또는 images/이름 (확장자는 자동 결정)
//   - R2 객체는 1년 immutable 캐시 → 같은 key 덮어쓰기 금지. 수정본은 -v2 등 새 이름 사용
//     (덮어써야만 하면 --force)
//   - 로컬 미러(public/video, public/images)는 gitignore됨 — dev 미리보기 전용
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";

const BUCKET = "koreabiketrail-media";
const PUBLIC_BASE = "https://media.koreabiketrail.com";
const VIDEO_EXT = [".mp4", ".mov", ".webm", ".mkv", ".avi"];
const IMAGE_EXT = [".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"];

const argv = process.argv.slice(2);
const force = argv.includes("--force");
const [cmd, ...rest] = argv.filter((a) => a !== "--force");

const die = (msg) => {
  console.error(`✘ ${msg}`);
  process.exit(1);
};

const run = (command) => execSync(command, { stdio: "inherit" });

const mirrorPath = (key) => join("public", key);

const ensureDir = (p) => mkdirSync(dirname(p), { recursive: true });

async function remoteExists(key) {
  // 쿼리 파라미터로 CDN 캐시 키를 분리 — 실제 URL에 404가 네거티브 캐시되는 것을 방지
  const res = await fetch(`${PUBLIC_BASE}/${key}?exists-check=${Date.now()}`, {
    method: "HEAD",
  });
  return res.ok;
}

function upload(key, file, contentType) {
  run(
    `npx wrangler r2 object put "${BUCKET}/${key}" --file "${file}" ` +
      `--content-type "${contentType}" ` +
      `--cache-control "public, max-age=31536000, immutable" --remote`,
  );
}

async function add() {
  const [src, keyRaw] = rest;
  if (!src || !keyRaw) die("사용법: media:add -- <원본파일> <video|images>/<이름>");
  if (!existsSync(src)) die(`원본 없음: ${src}`);
  if (!/^(video|images)\//.test(keyRaw))
    die("key는 video/ 또는 images/ 로 시작해야 합니다");
  const key = keyRaw.replace(/\.[a-z0-9]+$/i, ""); // 확장자 제거
  const ext = extname(src).toLowerCase();

  // 산출물 목록 결정
  let outputs; // [key, contentType, encode(dest)]
  if (VIDEO_EXT.includes(ext)) {
    outputs = [
      [
        `${key}.mp4`,
        "video/mp4",
        (dest) =>
          run(
            `ffmpeg -y -v error -i "${src}" -vf "scale='min(960,iw)':-2,fps=30" -an ` +
              `-c:v libx264 -crf 32 -preset slow -pix_fmt yuv420p -movflags +faststart "${dest}"`,
          ),
      ],
      [
        `${key}.webm`,
        "video/webm",
        (dest) =>
          run(
            `ffmpeg -y -v error -i "${src}" -vf "scale='min(960,iw)':-2,fps=30" -an ` +
              `-c:v libvpx-vp9 -crf 50 -b:v 0 -row-mt 1 -deadline good "${dest}"`,
          ),
      ],
    ];
  } else if (IMAGE_EXT.includes(ext)) {
    outputs = [
      [
        `${key}.jpg`,
        "image/jpeg",
        async (dest) => {
          const { default: sharp } = await import("sharp");
          await sharp(src)
            .resize({ width: 1600, withoutEnlargement: true })
            .jpeg({ quality: 72, mozjpeg: true })
            .toFile(dest);
        },
      ],
    ];
  } else {
    die(`지원하지 않는 확장자: ${ext}`);
  }

  // 덮어쓰기 가드 (immutable 캐시 때문에 같은 key 재사용 금지)
  for (const [outKey] of outputs) {
    if (!force && (await remoteExists(outKey)))
      die(
        `R2에 이미 존재: ${outKey}\n` +
          `  1년 캐시가 걸려 있어 덮어써도 방문자에겐 반영되지 않습니다.\n` +
          `  새 이름(예: ${key}-v2)을 쓰거나, 정말 덮어쓰려면 --force`,
      );
  }

  for (const [outKey, contentType, encode] of outputs) {
    const dest = mirrorPath(outKey);
    ensureDir(dest);
    console.log(`▸ 변환: ${src} → ${dest}`);
    await encode(dest);
    console.log(`▸ 업로드: ${outKey}`);
    upload(outKey, dest, contentType);
  }

  console.log("\n✔ 완료. 코드에서 사용:");
  for (const [outKey] of outputs)
    console.log(`  \${MEDIA_URL}/${outKey}   (${PUBLIC_BASE}/${outKey})`);
}

async function pull() {
  if (rest.length === 0) die("사용법: media:pull -- <key...> (확장자 포함)");
  for (const key of rest) {
    const res = await fetch(`${PUBLIC_BASE}/${key}`);
    if (!res.ok) die(`R2에 없음 (HTTP ${res.status}): ${key}`);
    const dest = mirrorPath(key);
    ensureDir(dest);
    writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`✔ ${key} → ${dest}`);
  }
}

if (cmd === "add") await add();
else if (cmd === "pull") await pull();
else die("사용법: media.mjs add|pull ...");
