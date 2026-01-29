import { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAP_ID;

export function MiniMapPopup({ lat, lng, onChange, setShowMiniMap }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const initialLng = typeof lng === "number" ? lng : 8.8017;
    const initialLat = typeof lat === "number" ? lat : 53.0793;

    const map = new maptilersdk.Map({
      container: containerRef.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [initialLng, initialLat],
      zoom: 13,
    });

    map.on("error", (e) => {
      const msg = e?.error?.message || "";
      if (msg.includes("signal is aborted") || msg.includes("aborted")) return;
      console.error(e?.error || e);
    });

    const marker = new maptilersdk.Marker({ draggable: true })
      .setLngLat([initialLng, initialLat])
      .addTo(map);

    marker.on("dragend", () => {
      const { lng: newLng, lat: newLat } = marker.getLngLat();
      onChange?.({ lat: newLat, lng: newLng });
    });

    mapRef.current = map;
    markerRef.current = marker;

    return () => {
      try {
        markerRef.current?.remove();
        mapRef.current?.remove();
      } catch {}
      markerRef.current = null;
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 w-full h-full bg-black/80"
        onClick={() => setShowMiniMap(false)}
      />

      <div
        className="fixed top-1/2 left-1/2 min-w-sm h-fit -translate-x-1/2 -translate-y-1/2 border border-black overflow-hidden rounded-lg md:min-w-[480px] z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white text-black flex justify-between items-center p-3">
          <h1 className="text-sm">Select Location on Map</h1>
          <MdClose
            onClick={() => setShowMiniMap(false)}
            className="text-xl cursor-pointer"
          />
        </div>

        <div ref={containerRef} className="w-full h-80" />

        <div className="bg-white text-black flex justify-center gap-5 p-3 text-sm">
          <button
            onClick={() => setShowMiniMap(false)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Set location
          </button>
        </div>
      </div>
    </>
  );
}
