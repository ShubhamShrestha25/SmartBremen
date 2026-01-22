import Image from "next/image";
import { useState } from "react";
import { categoryData } from "@/data/categoryData";
import { IoCheckmarkDone } from "react-icons/io5";

const MapFilter = () => {
  const [activeColor, setActiveColor] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="flex items-center gap-2.5 absolute z-30 right-0 bottom-1/2">
      <div className="flex flex-col gap-1 items-end">
        {categoryData.map((cat, index) => {
          const isOpen = activeIndex === index;

          return (
            <button
              key={index}
              type="button"
              className={`group flex items-center h-6 rounded-3xl overflow-hidden cursor-pointer transition-all duration-200 w-6 text-white hover:h-7 hover:pr-1 hover:w-fit ${isOpen ? "isOpen h-7 pr-1 w-fit" : ""}`}
              style={{
                backgroundColor: cat.color,
              }}
              onClick={() =>
                setActiveIndex((prev) => (prev === index ? null : index))
              }
              onMouseEnter={() => setActiveColor(cat.color)}
              onMouseLeave={() => setActiveColor(cat.color)}
              aria-pressed={isOpen}
              aria-label={cat.title}
            >
              <span className="hidden group-hover:block group-[.isOpen]:block text-xs whitespace-nowrap px-2">
                {activeIndex === index ? (
                  <IoCheckmarkDone className="text-lg lg:text-xl" />
                ) : (
                  cat.title
                )}
              </span>

              <Image
                src={cat.img}
                alt=""
                width={20}
                height={20}
                className="w-6 h-6"
              />
            </button>
          );
        })}
      </div>

      <div
        className="w-2 h-58 rounded-l-[5px] transition-colors duration-200 lg:w-2.5"
        style={{ backgroundColor: activeColor ? activeColor : "#6BEE32" }}
      />
    </div>
  );
};

export default MapFilter;
