import Image from "next/image";
import { useMemo, useState } from "react";
import { categoryData } from "@/data/categoryData";
import { IoCheckmarkDone } from "react-icons/io5";

const MapFilter = ({ activeCategory, onChangeCategory }) => {
  const [hoverColor, setHoverColor] = useState(null);

  const selectedColor = useMemo(() => {
    if (!activeCategory) return null;
    const cat = categoryData.find((c) => c.title === activeCategory);
    return cat ? cat.color : null;
  }, [activeCategory]);

  const barColor = selectedColor || hoverColor || "#6BEE32";

  return (
    <div className="flex items-center gap-2.5 absolute z-30 right-0 bottom-1/2">
      <div className="flex flex-col gap-1 items-end">
        {categoryData.map((cat) => {
          const isOpen = activeCategory === cat.title;

          return (
            <button
              key={cat.title}
              type="button"
              className={`group flex items-center h-6 rounded-3xl overflow-hidden cursor-pointer transition-all duration-200 w-6 text-white hover:h-7 hover:pr-1 hover:w-fit ${
                isOpen ? "isOpen h-7 pr-1 w-fit" : ""
              }`}
              style={{ backgroundColor: cat.color }}
              onClick={() => onChangeCategory(isOpen ? null : cat.title)}
              onMouseEnter={() => setHoverColor(cat.color)}
              onMouseLeave={() => setHoverColor(null)}
              aria-pressed={isOpen}
              aria-label={cat.title}
            >
              <span className="hidden group-hover:block group-[.isOpen]:block text-xs whitespace-nowrap px-2">
                {isOpen ? (
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
        style={{ backgroundColor: barColor }}
      />
    </div>
  );
};

export default MapFilter;
