// 페이지 공용 이미지 플레이스홀더(촬영/수급 안내문) — EN·로케일 페이지가 단일 소스로 공유.
// 실제 이미지 확보 시 해당 페이지에서 <img>로 교체하고 여기서 항목 제거 (docs/images.md 함께 갱신)

/** 홈: Start here 카드 아래 보상 체인 컷 */
export const HOME_REWARD_IMAGE =
  "Triptych or single shot of the reward chain: opened Bike Passport full of stamps + completion stickers + the Cross-Country medal, laid flat on a map or handlebar bag. This sells the gamification instantly without words.";

/** 인증 페이지: 4단계 스텝별 컷 (STEPS 배열과 1:1). null = 실미디어 확보됨(2단계: stamping 영상) */
export const CERT_STEP_IMAGES: (string | null)[] = [
  "The Bike Passport itself: cover + an opened spread showing the stamp grid and route map, held in hand at the Ara West Sea Lock counter. Foreigners have never seen this document — show exactly what they're asking to buy.",
  null,
  "A staff member at a counter checking a filled passport and applying the completion sticker (Nakdong Estuary center if possible). Shows the human step so riders know what 'verification' physically looks like.",
  "The medal, front and back, next to the certificate. If available, the three medals (Cross-Country / Four Rivers / Grand Slam) side by side for the collector instinct.",
];
