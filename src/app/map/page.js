"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

import MapFilter from "@/components/MapFilter";
import MapPopup from "@/components/popup/MapPopup";
import PopupSkeleton from "@/components/popup/PopupSkeleton";

import { fakeData } from "@/data/fakeData";
import { categoryData } from "@/data/categoryData";

export default function Map() {
  const [isClient, setIsClient] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedMarker, setSelectedMarker] = useState(null);

  // ✅ filter state lives here
  const [activeCategory, setActiveCategory] = useState(null);

  const mapContainer = useRef(null);
  const map = useRef(null);

  const markersRef = useRef([]);

  const bremen = { lng: 8.8017, lat: 53.0793 };
  const zoom = 14;

  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAP_ID || "";

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
      // remove markers + listeners
      markersRef.current.forEach(({ marker, el, onClick }) => {
        el.removeEventListener("click", onClick);
        marker.remove();
      });
      markersRef.current = [];

      m.remove();
      map.current = null;
      setMapReady(false);
    };
  }, [isClient]);

  // ✅ compute filtered dataset
  const filteredData = useMemo(() => {
    if (!activeCategory) return fakeData;
    return fakeData.filter((d) => d.category?.name === activeCategory);
  }, [activeCategory]);

  // Add markers whenever mapReady OR filter changes
  useEffect(() => {
    if (!mapReady || !map.current) return;

    // clean old markers + listeners
    markersRef.current.forEach(({ marker, el, onClick }) => {
      el.removeEventListener("click", onClick);
      marker.remove();
    });
    markersRef.current = [];

    const entries = filteredData.map((data) => {
      // match category icon
      const cat = categoryData.find((c) => c.title === data.category?.name);

      const el = document.createElement("img");
      el.src = (cat && cat.img) || "/images/default-marker.png";
      el.alt = (cat && cat.title) || "Marker";
      el.style.width = "30px";
      el.style.height = "30px";
      el.style.cursor = "pointer";

      const marker = new maptilersdk.Marker({ element: el })
        .setLngLat([data.location.lng, data.location.lat])
        .addTo(map.current);

      const onClick = () => {
        setSelectedMarker(data);
        setIsOpen(true);
      };

      el.addEventListener("click", onClick);

      return { marker, el, onClick, data };
    });

    markersRef.current = entries;

    return () => {
      entries.forEach(({ marker, el, onClick }) => {
        el.removeEventListener("click", onClick);
        marker.remove();
      });
    };
  }, [mapReady, filteredData]);

  const closePopup = () => {
    setIsOpen(false);
    setSelectedMarker(null);
    setIsLoading(false);
  };

  if (!isClient) return null;


  return (
    <div className="relative w-full h-screen">
      <MapFilter
        activeCategory={activeCategory}
        onChangeCategory={setActiveCategory}
      />

      <div ref={mapContainer} className="absolute w-full h-full" />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center">
          <div
            onClick={closePopup}
            className="absolute w-full h-full bg-transparent"
          />
          {isLoading ? <PopupSkeleton /> : <MapPopup data={selectedMarker} />}
        </div>
      )}
    </div>
  );
}
