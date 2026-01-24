"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

import MapFilter from "@/components/MapFilter";
import MapPopup from "@/components/popup/MapPopup";
import PopupSkeleton from "@/components/popup/PopupSkeleton";

import { getApprovedImages, getCategories } from "@/lib/firestore";

export default function Map() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Real data from Firestore
  const [markers, setMarkers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);

  const bremen = { lng: 8.8017, lat: 53.0793 };
  const zoom = 14;

  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAP_ID;

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [imagesData, categoriesData] = await Promise.all([
          getApprovedImages(),
          getCategories(),
        ]);
        setMarkers(imagesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching map data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // Filter markers by category
  const filteredMarkers = activeCategory
    ? markers.filter((m) => m.categoryId === activeCategory)
    : markers;

  // Add markers once the map is ready and data is loaded
  useEffect(() => {
    if (!mapReady || !map.current || isLoading) return;

    // clean old markers
    markersRef.current.forEach((mk) => mk.remove());
    markersRef.current = [];

    const newMarkers = filteredMarkers.map((data) => {
      // Find category for this marker
      const cat = categories.find((c) => c.id === data.categoryId);

      // custom marker element (image or colored circle)
      const el = document.createElement("div");
      
      if (data.markerUrl) {
        // Use marker image if available
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
        // Fallback to colored circle with category color
        el.style.width = "30px";
        el.style.height = "30px";
        el.style.borderRadius = "50%";
        el.style.backgroundColor = cat?.color || "#6BEE32";
        el.style.border = "3px solid white";
        el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
        el.style.cursor = "pointer";
      }

      const mk = new maptilersdk.Marker({ element: el })
        .setLngLat([data.lng, data.lat])
        .addTo(map.current);

      el.addEventListener("click", () => {
        setSelectedMarker(data);
        setIsOpen(true);
      });

      return mk;
    });

    markersRef.current = newMarkers;

    // cleanup listeners + markers on rerun/unmount
    return () => {
      newMarkers.forEach((mk) => mk.remove());
      markersRef.current = [];
    };
  }, [mapReady, filteredMarkers, categories, isLoading]);

  // Handle category filter change
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
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute top-4 left-4 z-40 bg-white px-4 py-2 rounded-lg shadow-md">
          <span className="text-sm text-gray-600">Loading markers...</span>
        </div>
      )}

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
            category={categories.find(c => c.id === selectedMarker.categoryId)}
            onClose={() => {
              setIsOpen(false);
              setSelectedMarker(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
