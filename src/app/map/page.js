"use client";

import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import MapFilter from "@/components/MapFilter";
import MapPopup from "@/components/popup/MapPopup";
import PopupSkeleton from "@/components/popup/PopupSkeleton";

export default function Map() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const bremen = { lng: 8.8017, lat: 53.0793 };
  const zoom = 14;

  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAP_ID;

  // Initialize map
  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [bremen.lng, bremen.lat],
      zoom: zoom,
    });

    const marker = new maptilersdk.Marker()
      .setLngLat([bremen.lng, bremen.lat])
      .addTo(map.current);

    marker.getElement().addEventListener("click", () => {
      setIsOpen(true);
    });
  }, [bremen.lng, bremen.lat]);

  return (
    <div className="relative w-full h-screen">
      <MapFilter />
      <div ref={mapContainer} className="absolute w-full h-full" />
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center">
          <div
            onClick={() => setIsOpen(false)}
            className="absolute w-full h-full bg-transparent"
          />
          {isLoading ? <PopupSkeleton /> : <MapPopup />}
        </div>
      )}
    </div>
  );
}
