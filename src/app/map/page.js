"use client";

import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import Image from "next/image";

export default function Map() {
  const [isOpen, setIsOpen] = useState(false);
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
      <div ref={mapContainer} className="absolute w-full h-full" />
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center">
          <div
            onClick={() => setIsOpen(false)}
            className="absolute w-full h-full bg-transparent"
          />
          <div className="relative z-10 bg-white rounded-[18px] p-2 w-[350px] left-10 border-2 border-[#6BEE32]">
            <div className="w-full h-[150px]">
              <Image
                src="/images/marker-popup-default.png"
                alt=""
                width={149}
                height={80}
                className="w-full h-full"
              />
            </div>
            <div className="border-b pb-2 my-2">
              <h1 className="text-2xl font-medium">Bürgerpark</h1>
              <p className="text-sm">COUNTRY PARK</p>
            </div>
            <p className="text-[13px]">
              Located in the heart of Bremen, the Bürgerpark is one of Germany’s
              most significant 19th-century landscape gardens. Spanning over 200
              hectares, this "green lung" was uniquely established and funded by
              local citizens rather than royalty. Visitors can enjoy winding
              paths, picturesque lakes for rowing, and charming architecture
              like the Meierei and Emma am See. With its animal enclosures,
              mini-golf, and the popular Finnbahn running track, it offers a
              peaceful yet active retreat just steps from the main train
              station.
            </p>

            <div className="my-2">
              <p className="text-sm mb-2">Highlights</p>
              <ul className="text-xs ml-4 list-disc space-y-2">
                <li>Nature Heritage</li>
                <li>Family Place</li>
                <li>Bio diversity</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
