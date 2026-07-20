import type { ReactNode } from "react";

// 가이드 문자열용 초경량 인라인 마크업:
//   `텍스트`  → 칩 스타일 (한글·로마자 용어 구분용)
//   **텍스트** → 강조 (예시 단어 속 대상 음절 하이라이트: Han**gang**)
export function renderInline(text: string): ReactNode {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;
  return parts.map((p, i) => {
    if (p.startsWith("`") && p.endsWith("`"))
      return (
        <code
          key={i}
          className="rounded bg-gray-100 px-1 py-0.5 font-sans text-[0.925em] dark:bg-gray-800"
        >
          {p.slice(1, -1)}
        </code>
      );
    if (p.startsWith("**") && p.endsWith("**"))
      return (
        <strong key={i} className="font-semibold text-blue-600 dark:text-blue-400">
          {p.slice(2, -2)}
        </strong>
      );
    return p;
  });
}
