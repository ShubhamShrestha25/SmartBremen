"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

import MapFilter from "@/components/MapFilter";
import MapPopup from "@/components/popup/MapPopup";

import { getApprovedImages, getCategories } from "@/lib/firestore";

export default function Map() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Firestore data
  const [markers, setMarkers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const mapContainer = useRef(null);
  const map = useRef(null);

  // store created markers + handlers so we can cleanly remove them
  const markersRef = useRef([]);

  const bremen = { lng: 8.8017, lat: 53.0793 };
  const zoom = 14;

  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAP_ID || "";

  useEffect(() => setIsClient(true), []);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [imagesData, categoriesData] = await Promise.all([
          getApprovedImages(),
          getCategories(),
        ]);
        setMarkers(imagesData || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error("Error fetching map data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

    const onLoad = () => setMapReady(true);
    m.on("load", onLoad);

    return () => {
      // remove markers + listeners
      markersRef.current.forEach(({ marker, el, onClick }) => {
        el.removeEventListener("click", onClick);
        marker.remove();
      });
      markersRef.current = [];

      m.off("load", onLoad);
      m.remove();
      map.current = null;
      setMapReady(false);
    };
  }, [isClient]);

  // Filter markers by category
  const filteredMarkers = useMemo(() => {
    if (!activeCategory) return markers;
    return markers.filter((m) => m.categoryId === activeCategory);
  }, [markers, activeCategory]);

  // Add markers once the map is ready and data is loaded
  useEffect(() => {
    if (!mapReady || !map.current || isLoading) return;

    // clean old markers + listeners
    markersRef.current.forEach(({ marker, el, onClick }) => {
      el.removeEventListener("click", onClick);
      marker.remove();
    });
    markersRef.current = [];

    const entries = filteredMarkers.map((data) => {
      const cat = categories.find((c) => c.id === data.categoryId);

      // custom marker element
      const el = document.createElement("div");

      if (data.markerUrl) {
        const img = document.createElement("img");
        img.src = data.markerUrl;
        img.alt = data.title || "Marker";
        img.style.width = "40px";
        img.style.height = "40px";
        img.style.borderRadius = "50%";
        img.style.objectFit = "cover";
        img.style.border = `3px solid ${cat?.color || "#6BEE32"}`;
        img.style.cursor = "pointer";
        el.appendChild(img);
      } else {
        el.style.width = "30px";
        el.style.height = "30px";
        el.style.borderRadius = "50%";
        el.style.backgroundColor = (cat && cat.color) || "#6BEE32";
        el.style.border = "3px solid white";
        el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
        el.style.cursor = "pointer";
      }

      const marker = new maptilersdk.Marker({ element: el })
        .setLngLat([data.lng, data.lat])
        .addTo(map.current);

      const onClick = () => {
        setSelectedMarker(data);
        setIsOpen(true);
      };

      el.addEventListener("click", onClick);

      return { marker, el, onClick };
    });

    markersRef.current = entries;

    return () => {
      entries.forEach(({ marker, el, onClick }) => {
        el.removeEventListener("click", onClick);
        marker.remove();
      });
    };
  }, [mapReady, filteredMarkers, categories, isLoading]);

  const handleCategoryFilter = useCallback((categoryId) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
  }, []);

  if (!isClient) return null;

  return (
    <div className="relative w-full h-screen">
      <MapFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategorySelect={handleCategoryFilter}
      />

      <div ref={mapContainer} className="absolute w-full h-full" />

      {isOpen && selectedMarker && (
        <div className="fixed inset-0 z-50 flex items-center">
          <div
            onClick={() => {
              setIsOpen(false);
              setSelectedMarker(null);
            }}
            className="absolute w-full h-full bg-transparent"
          />

          <MapPopup
            marker={selectedMarker}
            category={categories.find(
              (c) => c.id === selectedMarker.categoryId,
            )}
          />
        </div>
      )}
    </div>
  );
}
