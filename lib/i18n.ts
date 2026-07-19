// i18n 핵심 4페이지(홈·국토종주·인증·GPX)만 번역. 영어는 루트(기본), 번역판은 /{locale}/.
//
// 지명 정책 (신중 적용):
//  - 기본: 로마자 표기 유지 + 필요시 한글 병기 (현지 표지판 대조 실용성)
//  - JA: 널리 통용되는 대도시만 현지 표기 (ソウル·釜山·仁川), 나머지 로마자
//  - ZH-Hant: 정착된 한자 지명만 (首爾·釜山·仁川·漢江·洛東江·梨花嶺), 애매하면 로마자
//  - TH/ES: 전부 로마자
export const LOCALES = ["ja", "zh", "th", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export interface HeroTexts {
  headline: string;
  sub: string;
  cta1: string;
  cta2: string;
  labels: [string, string, string, string, string];
}

export interface LocaleDict {
  code: Locale;
  /** hreflang/lang 속성용 (zh → zh-Hant) */
  htmlLang: string;
  /** 언어 전환 UI에 표시할 자기 이름 */
  name: string;
  nav: { route: string; cert: string; gpx: string; english: string };
  hero: HeroTexts;
  home: {
    whyEyebrow: string;
    whyTitle: string;
    reasons: { icon: string; claim: string; body: string }[];
    startEyebrow: string;
    startTitle: string;
    cards: { icon: string; title: string; body: string; href: string; en?: boolean }[];
    enNote: string; // "(English)" 표기
    regions: {
      eyebrow: string;
      title: string;
      closing: string;
      /** 해당 로케일의 타깃 카드를 맨 앞에 배치 (zh는 대만 전용 카드 추가) */
      items: { flag: string; who: string; body: string }[];
    };
    confusionTitle: string;
    confusionBody: string;
  };
  crossCountry: {
    title: string;
    metaTitle: string;
    metaDesc: string;
    stats: [string, string][];
    whatTitle: string;
    whatP1: string;
    paths: string[];
    whatP2: string;
    stagesTitle: string;
    plans: {
      title: string;
      blurb: string;
      days: { day: number; from: string; to: string; km: number; notes: string }[];
    }[];
    tableHead: { day: string; fromTo: string; km: string; notes: string };
    hardTitle: string;
    hard: string[];
    nextTitle: string;
    nextCert: string;
    nextGpx: string;
  };
  certification: {
    title: string;
    metaTitle: string;
    metaDesc: string;
    intro: string;
    steps: { title: string; body: string }[];
    levelsTitle: string;
    levelsHead: { level: string; what: string; reward: string };
    levels: [string, string, string][];
  };
  gpx: {
    title: string;
    metaTitle: string;
    metaDesc: string;
    intro: string;
    trackTitle: string;
    trackDesc: string;
    dlGpx: string;
    dlTcx: string;
    ttukseom: string;
    caveats: string[];
    previewTitle: string;
    previewDesc: string;
  };
  footer: { tagline: string };
}

import ja from "./locales/ja";
import zh from "./locales/zh";
import th from "./locales/th";
import es from "./locales/es";

export const DICTS: Record<Locale, LocaleDict> = { ja, zh, th, es };

export const isLocale = (v: string): v is Locale =>
  (LOCALES as readonly string[]).includes(v);

/** EN 페이지 메타데이터용 hreflang 매핑 */
export const languageAlternates = (path: string) => ({
  "x-default": `${path}`,
  en: `${path}`,
  ja: `/ja${path === "/" ? "/" : path}`,
  "zh-Hant": `/zh${path === "/" ? "/" : path}`,
  th: `/th${path === "/" ? "/" : path}`,
  es: `/es${path === "/" ? "/" : path}`,
});
