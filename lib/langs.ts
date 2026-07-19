// 언어 스위처 옵션 — 클라이언트 번들에 사전이 딸려가지 않도록 i18n.ts와 분리
export interface LangOption {
  code: string;
  label: string;
  /** URL 프리픽스: EN은 "", 나머지는 "/ja" 등 */
  prefix: string;
}

export const LANG_OPTIONS: LangOption[] = [
  { code: "en", label: "English", prefix: "" },
  { code: "ja", label: "日本語", prefix: "/ja" },
  { code: "zh", label: "繁體中文", prefix: "/zh" },
  { code: "th", label: "ไทย", prefix: "/th" },
  { code: "es", label: "Español", prefix: "/es" },
];
