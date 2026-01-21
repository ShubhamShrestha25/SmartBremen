"use client";

import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

import MapFilter from "@/components/MapFilter";
import MapPopup from "@/components/popup/MapPopup";
import PopupSkeleton from "@/components/popup/PopupSkeleton";

import { fakeData } from "@/data/fakeData";
import { categoryData } from "@/data/categoryData";

export default function Map() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);

  const bremen = { lng: 8.8017, lat: 53.0793 };
  const zoom = 14;

  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAP_ID;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Init map once
  useEffect(() => {
    if (!isClient) return;
    if (map.current) return;
    if (!mapContainer.current) return;

    const m = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.BASIC,
      center: [bremen.lng, bremen.lat],
      zoom,
      navigationControl: false,
    });

    map.current = m;

    m.on("load", () => setMapReady(true));

    return () => {
      markersRef.current.forEach((mk) => mk.remove());
      markersRef.current = [];
      m.remove();
      map.current = null;
      setMapReady(false);
    };
  }, [isClient, zoom]);

  // Add markers once the map is ready
  useEffect(() => {
    if (!mapReady || !map.current) return;

    // clean old markers
    markersRef.current.forEach((mk) => mk.remove());
    markersRef.current = [];

    const newMarkers = fakeData.map((data) => {
      // simplest matching: categoryData.title === fakeData.category.name
      const cat = categoryData.find((c) => c.title === data.category.name);

      // custom marker element (image)
      const el = document.createElement("img");
      el.src = (cat && cat.img) || "/images/default-marker.png";
      el.alt = (cat && cat.title) || "Marker";
      el.style.width = "30px";
      el.style.height = "30px";
      el.style.cursor = "pointer";

      const mk = new maptilersdk.Marker({ element: el })
        .setLngLat([data.location.lng, data.location.lat])
        .addTo(map.current);

      el.addEventListener("click", () => {
        setIsOpen(true);
        // setIsLoading(true) 
        // setSelected(data) 
      });

      return mk;
    });

    markersRef.current = newMarkers;

    // cleanup listeners + markers on rerun/unmount
    return () => {
      newMarkers.forEach((mk) => mk.remove());
      markersRef.current = [];
    };
  }, [mapReady]);

  if (!isClient) return null;

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
