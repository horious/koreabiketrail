// 이미지 확보 전 임시 표시. 실제 이미지 교체 시 <img>로 바꾸되
// next/image 최적화는 쓰지 않음 — 빌드 전 수동 리사이즈 (CLAUDE.md 절대 규칙 3)
const ASPECTS = {
  wide: "aspect-[21/9]",
  video: "aspect-video",
  tall: "aspect-[4/5]",
} as const;

export default function ImagePlaceholder({
  description,
  aspect = "video",
  caption,
}: {
  /** 어떤 이미지가 들어가야 하는지 — 촬영/수급 가이드 */
  description: string;
  aspect?: keyof typeof ASPECTS;
  /** 게시 시 실제로 보일 캡션 (선택) */
  caption?: string;
}) {
  return (
    <figure className="my-6">
      <div
        className={`flex ${ASPECTS[aspect]} w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6`}
      >
        <div className="max-w-md text-center">
          <div className="text-3xl" aria-hidden>
            📷
          </div>
          <p className="mt-1 text-xs font-semibold tracking-wide text-gray-400 dark:text-gray-500 uppercase">
            Image placeholder
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400">{caption}</figcaption>
      )}
    </figure>
  );
}
