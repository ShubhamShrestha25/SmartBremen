import Image from "next/image";
import { useMemo, useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";

const MapFilter = ({ categories, activeCategory, onCategorySelect }) => {
  const [hoverColor, setHoverColor] = useState(null);

  const selectedColor = useMemo(() => {
    if (!activeCategory) return null;
    const cat = categories.find((c) => c.id === activeCategory);
    return cat?.color ?? null;
  }, [activeCategory, categories]);

  const barColor = selectedColor || hoverColor || "#6BEE32";

  return (
    <div className="flex items-center gap-2.5 absolute z-30 right-0 bottom-1/2">
      <div className="flex flex-col gap-1 items-end">
        {categories.map((cat) => {
          const isOpen = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              className={`group flex items-center h-6 rounded-3xl overflow-hidden cursor-pointer transition-all duration-200 w-6 text-white hover:h-7 hover:pr-1 hover:w-fit ${
                isOpen ? "isOpen h-7 pr-1 w-fit" : ""
              }`}
              style={{ backgroundColor: cat.color || "#6BEE32" }}
              onClick={() => onCategorySelect(cat.id)}
              onMouseEnter={() => setHoverColor(cat.color || "#6BEE32")}
              onMouseLeave={() => setHoverColor(null)}
              aria-pressed={isOpen}
              aria-label={cat.title || cat.name || "Category"}
            >
              <span className="hidden group-hover:block group-[.isOpen]:block text-xs whitespace-nowrap px-2">
                {isOpen ? (
                  <IoCheckmarkDone className="text-lg lg:text-xl" />
                ) : (
                  cat.title || cat.name
                )}
              </span>

              {!!cat.img && (
                <Image
                  src={cat.img}
                  alt=""
                  width={20}
                  height={20}
                  className="w-6 h-6"
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        className="w-2 h-58 rounded-l-[5px] transition-colors duration-200 lg:w-2.5"
        style={{ backgroundColor: barColor }}
      />
    </div>
  );
};

export default MapFilter;
