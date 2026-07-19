import certCentersJson from "@/data/cert-centers.json";
import stagesJson from "@/data/stages.json";

export type BikePath = "ara" | "hangang" | "saejae" | "nakdonggang";

export interface CertCenter {
  id: string;
  nameEn: string;
  nameKo: string;
  path: BikePath;
  staffed: boolean;
  sellsPassport: boolean;
  lat: number;
  lng: number;
  address: string;
  notes: string;
}

export interface StageDay {
  day: number;
  from: string;
  to: string;
  km: number;
  notes: string;
}

export interface StagePlan {
  id: string;
  title: string;
  blurb: string;
  days: StageDay[];
}

export const certCenters = certCentersJson.centers as CertCenter[];
export const certCentersLastVerified = certCentersJson._meta.lastVerified;
export const stagePlans = stagesJson.plans as StagePlan[];
export const stagesLastVerified = stagesJson._meta.lastVerified;

export const PATH_LABELS: Record<BikePath, string> = {
  ara: "Ara Bike Path (21 km)",
  hangang: "Hangang Bike Path (~192 km)",
  saejae: "Saejae Bike Path (~100 km)",
  nakdonggang: "Nakdonggang Bike Path (~324 km)",
};

export const SITE_URL = "https://koreabiketrail.com";
export const SITE_NAME = "Korea Bike Trail";
// 대용량 미디어는 Vercel이 아닌 Cloudflare R2에서 서빙 (CLAUDE.md 절대 규칙 1)
export const MEDIA_URL = "https://media.koreabiketrail.com";
