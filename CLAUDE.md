# Korea Bike Trail (koreabiketrail.com)

외국인 대상 한국 자전거길·국토종주(633km, 인천→부산) 정보 사이트.
컨셉: "계획(Plan) → 주행(Ride) → 인증(Certify)을 한 곳에서".
현재 상태: **Phase 1 MVP 구현됨** (Next.js 15, 정적 export). 요구사항 변경 시 아래 두 문서를 먼저 읽을 것.

## 코드 구조

- `app/` — 페이지 (홈, cross-country, certification, certification/centers, guides/[slug], gpx, sitemap, robots). 전부 정적 생성
- `data/cert-centers.json` — 인증센터 DB 26곳 (유인 6곳). 좌표: bike.go.kr 지도 API
  (`POST /map/getStampList.do?key=2006176973258`, body `roadSn=1..5`, stampType=1만 스탬프).
  **유인/수첩판매는 지도 API의 authCenter가 아니라 안내 페이지(content.do?key=2006176999425)의
  아이콘(01=수첩판매, 02=종주인증센터, 03=무인)이 정본** — API 플래그는 구버전
- `data/route-line.json` — 공식 노선 폴리라인 GeoJSON (갱신: `node scripts/fetch-route-line.mjs`, 네트워크 필요)
- 다크모드: 클래스 기반 (`@custom-variant dark` in globals.css). `layout.tsx`의 인라인 스크립트가
  첫 페인트 전 `<html class="dark">` 적용(FOUC 방지), `components/ThemeToggle.tsx`가
  light/dark/system 선택을 localStorage `theme`에 저장. **새 UI에는 반드시 `dark:` 변형 포함**
- 디자인: Cruip Simple Light 스타일 참조 (스티키 블러 헤더, 카드 호버, 3열 푸터)
- 미디어(이미지·비디오): **Cloudflare R2 서빙** (`MEDIA_URL` = media.koreabiketrail.com, 버킷
  `koreabiketrail-media`). **추가는 반드시 `npm run media:add -- <원본> <video|images>/<이름>`**
  (scripts/media.mjs — ffmpeg/sharp 변환 → public/ 로컬 미러 → R2 업로드까지 자동, wrangler 로그인 필요).
  - R2 객체는 1년 immutable 캐시 → **같은 key 덮어쓰기 금지**, 수정본은 `-v2` 새 이름 (스크립트가 가드함)
  - 로컬 dev는 `.env.development.local`의 `NEXT_PUBLIC_MEDIA_URL=""` 덕에 public/ 미러에서 로드.
    미러가 비었으면 `npm run media:pull -- video/ihwaryeong.mp4 video/ihwaryeong.webm`
  - 원본은 `assets-src/`(git 제외). 히어로 비디오는 슬라이드 첫 활성화 시에만 마운트(대역폭 보호).
    M1의 PMTiles도 같은 버킷 사용 예정
  - 예외: 소형 UI 그래픽(공식 표지판 도안 등, 개당 ~20KB)은 `public/signs/`에 git 커밋 —
    R2 규칙은 사진·영상 같은 대용량용. 표지판 도안 출처: 도로교통법 시행규칙 공식 도안(Wikimedia Commons SVG 렌더)
- `components/ImagePlaceholder.tsx` — 이미지 확보 전 자리표시(수급 가이드 설명 포함). 교체 시 `<img>` 사용, next/image 금지.
  (참고: Wikimedia Commons 무료 사진으로 채웠다가 품질 문제로 원복함 — 자체 촬영/제작 이미지로 채울 것)
- `data/stages.json` — 5일/7일 스테이지 분할 (거리 근사값)
- `lib/guides.ts` — 가이드 7편 콘텐츠 (구조화 데이터)
- `scripts/build-gpx.mjs` — prebuild에서 인증센터 웨이포인트 GPX 생성 → `public/gpx/`
- `components/CertCenterMap.tsx` — MapLibre 지도. 현재 OSM 타일 임시 사용 — **M1에서 PMTiles@R2로 교체 필요** (고트래픽 시 OSM 정책 위반)
- 빌드: `npm run build` → `out/` (정적). 배포: Vercel.
  이 Windows 환경에서 `PageNotFoundError`/`pages-manifest.json ENOENT`/`Cannot find module './NNN.js'` 같은
  빌드 오류가 간헐 발생 — 코드 문제 아님. `rm -rf .next` 후 재시도(때로 2회)로 해결됨

## 핵심 문서

- `docs/private/기획.md` (v0.4) — 배경, 페르소나, 기능 정의, 실제 방문 사례·해외 커뮤니티 검증, 로드맵
- `docs/private/prd.md` (v0.3) — 도메인 검증, Vercel 검토, 동적 기능 검증, P0/P1/P2 요구사항, 마일스톤
- `docs/private/`는 gitignore된 내부 문서 폴더 — GitHub 클론에는 없음. 공개 가능 문서(images.md)만 `docs/` 루트에 둔다

기능 ID(F-01~F-22)와 섹션 참조(§)는 두 문서 간 상호 연동되어 있으므로, 요구사항
변경 시 양쪽을 함께 갱신한다.

## 확정된 기술 결정 (prd.md §4)

- Next.js App Router, **SSG/ISR만 사용 — SSR 금지** (Vercel 함수 비용 절감)
- 호스팅: Vercel Hobby (무료) → 수익화 시점에 Pro 전환
- 지도: MapLibre GL + Protomaps PMTiles를 **Cloudflare R2에서 서빙** (Vercel 아님)
- DB/인증: Supabase 무료 티어 (제보 기능 전용, Phase 3에서 커뮤니티로 확장)
- 콘텐츠: MDX + 코스·인증센터 데이터는 Git 관리 JSON
- 검색: Pagefind (빌드 타임 인덱스) / 스팸 방지: Cloudflare Turnstile / 메일: Resend

## 절대 규칙 (비용·약관 가드레일)

1. **지도 타일·대용량 파일을 Vercel에서 서빙하지 않는다** — 대역폭 100GB/월
   하드캡 초과 시 사이트가 중단된다 (초과 과금이 아니라 다운)
2. **광고·제휴 링크는 Vercel Pro 전환 전에 절대 배포하지 않는다** — Hobby 플랜은
   상업적 이용 금지 (약관 위반 시 계정 차단)
3. Next.js `<Image>` 최적화 사용 금지 방향 (변환 5천/월 한도) — 빌드 타임
   사전 리사이즈로 대체
4. 모든 코스·인증센터 페이지에 `Last verified` 날짜 필수
5. **수정 단위로 commit/push 금지** — main 푸시 = 즉시 프로덕션 배포이므로, 파일 수정 + 빌드
   검증까지만 하고 멈춘다. 사용자가 배포를 지시할 때만 변경을 의미 단위로 모아 커밋·푸시

## 콘텐츠·데이터 원칙

- 1차 언어는 **영어** (i18n 구조로 시작, JA/ZH는 Phase 2~3)
- 코스·인증센터 원천 데이터는 bike.go.kr 등 공식 출처 기반, 출처 표기
- 타 사이트(Korea by Bike 등) 콘텐츠 표절 금지 — 인용 시 출처 명시
- 도메인: **koreabiketrail.com** (확정, 사이트명 "Korea Bike Trail" — 구매는 prd.md M0)

## 용어

| 용어 | 의미 |
|------|------|
| 국토종주 (Cross-Country Route) | 인천 아라서해갑문→부산 낙동강하굿둑 633km. 아라+한강+새재+낙동강 4개 길 연결 |
| 4대강 종주 (Four Rivers) | 한강·낙동강·금강·영산강 — 국토종주와 **다른 인증** (혼동 주의, 외국인 단골 질문) |
| 인증센터 (Certification Center) | 빨간 부스 스탬프 지점. 유인(수첩 판매·인증)/무인 구분 |
| 인증수첩 (Bike Passport) | ₩4,000, 현금, 공항에서 판매 안 함 |
| 그랜드슬램 | 전국 인증센터 전체 완주 |

## 오픈 이슈 (prd.md §8)

Vercel 함수 한도 공식 수치, 공공데이터 재가공 법률 검토, Supabase 무료 티어
비활성 정지 정책 — 3건, 구현 착수 전 M0~M1에서 해소 예정.
