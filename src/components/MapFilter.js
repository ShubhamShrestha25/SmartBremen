import { categoryData } from "@/data/categoryData";
import Image from "next/image";
import { useState } from "react";

const MapFilter = () => {
  const [activeColor, setActiveColor] = useState("#6BEE32");

  return (
    <div className="flex items-center gap-2.5 absolute z-30 right-0 bottom-1/2">
      <div className="flex flex-col gap-1 items-end">
        {categoryData.map((cat, index) => (
          <div
            key={index}
            className="group flex items-center h-6 rounded-3xl overflow-hidden cursor-pointer transition-all duration-200 
              w-6 text-white hover:h-7 hover:pr-1 hover:w-fit"
            style={{
              backgroundColor:
                activeColor === cat.color ? cat.color : "#6BEE32",
            }}
            onMouseEnter={() => setActiveColor(cat.color)}
            onMouseLeave={() => setActiveColor("#6BEE32")}
          >
            <span className="hidden group-hover:block text-xs whitespace-nowrap px-2">
              {cat.title}
            </span>

            <Image
              src={cat.img}
              alt=""
              width={20}
              height={20}
              className="w-6 h-6"
            />
          </div>
        ))}
      </div>

      <div
        className="w-2.5 h-58 rounded-l-[5px] transition-colors duration-200"
        style={{ backgroundColor: activeColor }}
      />
    </div>
  );
};

export default MapFilter;
