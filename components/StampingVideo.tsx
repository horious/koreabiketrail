import { MEDIA_URL } from "@/lib/data";

// 인증 2단계 스탬프 찍기 실영상. React가 정적 HTML에 muted 속성을 내보내지 않는 문제 때문에
// raw <video>를 사용 (cross-country 페이지의 summit 영상과 같은 패턴)
export default function StampingVideo({ caption }: { caption: string }) {
  return (
    <figure className="mt-4">
      <div
        dangerouslySetInnerHTML={{
          __html: `<video class="w-full rounded-xl border" autoplay muted loop playsinline preload="metadata"><source src="${MEDIA_URL}/video/stamping.mp4" type="video/mp4" /><source src="${MEDIA_URL}/video/stamping.webm" type="video/webm" /></video>`,
        }}
      />
      <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {caption}
      </figcaption>
    </figure>
  );
}
