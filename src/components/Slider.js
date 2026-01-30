"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ImageSlider = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const slides = useMemo(() => {
    return images.filter(Boolean).map((img) => ({ src: img }));
  }, [images]);

  if (!images.length) return null;

  const currentUrl = images[current];
  if (!currentUrl) return null;

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="relative w-full h-40 overflow-hidden rounded-xl">
        <Image
          src={currentUrl}
          alt={images[current]?.filename ?? ""}
          fill
          className="object-cover cursor-pointer"
          onClick={() => setIsOpen(true)}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 px-2 py-1 rounded-full text-sm"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 px-2 py-1 rounded-full text-sm"
            >
              ›
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((img, i) => (
                <span
                  key={img?.imageId ?? i}
                  className={`w-2 h-2 rounded-full border ${
                    i === current ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        index={current}
        view={{ closeOnBackdropClick: true }}
        on={{
          view: ({ index }) => setCurrent(index),
        }}
      />
    </>
  );
};

export default ImageSlider;
