"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { CertCenter } from "@/lib/data";
import routeLine from "@/data/route-line.json";

// 타일은 외부(OSM) 서빙 — Vercel 대역폭에 잡히면 안 됨 (CLAUDE.md 절대 규칙 1).
// TODO(M1): 트래픽 붙기 전에 Protomaps PMTiles @ Cloudflare R2로 교체 (OSM 타일 정책상 프로덕션 고트래픽 불가)
const OSM_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm", type: "raster", source: "osm" }],
};

export default function CertCenterMap({ centers }: { centers: CertCenter[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: OSM_STYLE,
      center: [127.8, 36.4],
      zoom: 6,
    });
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      // 공식 노선 폴리라인 (bike.go.kr getLineList.do, 상풍교 이후 낙동강만)
      map.addSource("route", {
        type: "geojson",
        data: routeLine as GeoJSON.FeatureCollection,
      });
      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        paint: { "line-color": "#2563eb", "line-width": 3, "line-opacity": 0.8 },
        layout: { "line-cap": "round", "line-join": "round" },
      });
    });

    for (const c of centers) {
      const popup = new maplibregl.Popup({ offset: 24 }).setHTML(
        `<strong>${c.nameEn}</strong> (${c.nameKo})<br/>` +
          `${c.staffed ? "Staffed — passport & verification" : "Unstaffed stamp booth (24/7)"}` +
          (c.address ? `<br/><span style="font-size:12px">${c.address}</span>` : "") +
          (c.notes ? `<br/><span style="font-size:12px">${c.notes}</span>` : ""),
      );
      new maplibregl.Marker({ color: c.staffed ? "#dc2626" : "#f59e0b" })
        .setLngLat([c.lng, c.lat])
        .setPopup(popup)
        .addTo(map);
    }
    return () => map.remove();
  }, [centers]);

  return (
    <div>
      <div ref={containerRef} className="h-[480px] w-full rounded-lg border" />
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="text-red-600">●</span> staffed center&nbsp;&nbsp;
        <span className="text-amber-500">●</span> unstaffed booth&nbsp;&nbsp;
        <span className="text-blue-600">—</span> official route line — all from
        bike.go.kr map data.
      </p>
    </div>
  );
}
