import Image from "next/image";
import { useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";

// Default fallback categories (used while loading from Firestore)
const defaultCategories = [
  { id: "1", name: "Social & Cultural Practices", color: "#F59B2D" },
  { id: "2", name: "Informal Economies & Exchanges", color: "#4CAF50" },
  { id: "3", name: "Material & Spatial Informality", color: "#3A7BD5" },
  { id: "4", name: "Landscape & Environmental Informality", color: "#6C63B8" },
  { id: "5", name: "Other", color: "#4A4A4A" },
];

const MapFilter = ({ categories = [], activeCategory, onCategorySelect }) => {
  const [activeColor, setActiveColor] = useState(null);

  // Use provided categories or fallback to defaults
  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="flex items-center gap-2.5 absolute z-30 right-0 bottom-1/2">
      <div className="flex flex-col gap-1 items-end">
        {displayCategories.map((cat) => {
          const isOpen = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              className={`group flex items-center h-6 rounded-3xl overflow-hidden cursor-pointer transition-all duration-200 w-6 text-white hover:h-7 hover:pr-1 hover:w-fit ${isOpen ? "isOpen h-7 pr-1 w-fit" : ""}`}
              style={{
                backgroundColor: cat.color || "#4A4A4A",
              }}
              onClick={() => onCategorySelect?.(cat.id)}
              onMouseEnter={() => setActiveColor(cat.color)}
              onMouseLeave={() => setActiveColor(null)}
              aria-pressed={isOpen}
              aria-label={cat.name}
            >
              <span className="hidden group-hover:block group-[.isOpen]:block text-xs whitespace-nowrap px-2">
                {isOpen ? (
                  <IoCheckmarkDone className="text-lg lg:text-xl" />
                ) : (
                  cat.name
                )}
              </span>

              {/* Category icon - use color circle if no image */}
              <div
                className="w-6 h-6 rounded-full flex-shrink-0"
                style={{ backgroundColor: cat.color || "#4A4A4A" }}
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
