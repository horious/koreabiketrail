// 로케일별 가이드 번역 레지스트리 (서버 전용 — 클라이언트에서 임포트 금지)
// ⚠ lib/guides.ts(영어 원문)를 수정하면 아래 4개 번역 파일도 함께 갱신할 것
import type { Guide } from "./guides";
import type { Locale } from "./i18n";
import ja from "./locales/guides-ja";
import zh from "./locales/guides-zh";
import th from "./locales/guides-th";
import es from "./locales/guides-es";

export const GUIDE_DICTS: Record<Locale, Guide[]> = { ja, zh, th, es };

export const getLocaleGuide = (locale: Locale, slug: string): Guide | undefined =>
  GUIDE_DICTS[locale].find((g) => g.slug === slug);
