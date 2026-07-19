import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 전 페이지 정적 생성. SSR 금지 — Vercel Hobby 함수/CPU 한도 보호 (CLAUDE.md 절대 규칙)
  output: "export",
  // <Image> 변환 한도(5천/월) 우회 — 이미지는 빌드 전에 수동 리사이즈
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
