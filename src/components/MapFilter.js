import Image from "next/image";
import { useMemo, useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdSubdirectoryArrowRight } from "react-icons/md";

const MapFilter = ({ 
  categories, 
  activeCategory, 
  onCategorySelect,
  activeSubcategory,
  onSubcategorySelect,
  onCategoryHover,
  onSubcategoryHover
}) => {
  const [hoverColor, setHoverColor] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const selectedColor = useMemo(() => {
    if (!activeCategory) return null;
    const cat = categories.find((c) => c.id === activeCategory);
    return cat?.color ?? null;
  }, [activeCategory, categories]);

  const barColor = selectedColor || hoverColor || "#6BEE32";

  const handleCategoryClick = (catId) => {
    // Toggle expansion
    if (expandedCategory === catId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(catId);
    }
    
    // If clicking the same category that's active, deselect it
    if (activeCategory === catId && !activeSubcategory) {
      onCategorySelect(null);
    } else {
      onCategorySelect(catId);
      // Clear subcategory when selecting a new category
      if (onSubcategorySelect) {
        onSubcategorySelect(null);
      }
    }
  };

  const handleSubcategoryClick = (e, catId, subId) => {
    e.stopPropagation();
    
    // If clicking the same subcategory, deselect it
    if (activeSubcategory === subId) {
      if (onSubcategorySelect) onSubcategorySelect(null);
    } else {
      onCategorySelect(catId);
      if (onSubcategorySelect) onSubcategorySelect(subId);
    }
  };

  return (
    <div className="flex items-center gap-2.5 absolute z-30 right-0 top-1/2 -translate-y-1/2">
      <div className="flex flex-col gap-1 items-end max-h-[70vh] overflow-y-auto pr-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const isExpanded = expandedCategory === cat.id;
          const hasSubcategories = cat.subcategories && cat.subcategories.length > 0;

          return (
            <div key={cat.id} className="flex flex-col items-end gap-0.5">
              {/* Main Category Button */}
              <button
                type="button"
                className={`group flex items-center justify-end h-8 rounded-3xl overflow-hidden cursor-pointer transition-all duration-200 w-8 text-white hover:h-9 hover:pl-2.5 hover:w-fit hover:scale-105 ${
                  isActive && !activeSubcategory ? "isOpen h-9 pl-2.5 w-fit" : ""
                }`}
                style={{ backgroundColor: cat.color || "#6BEE32" }}
                onClick={() => handleCategoryClick(cat.id)}
                onMouseEnter={() => {
                  setHoverColor(cat.color || "#6BEE32");
                  if (onCategoryHover) onCategoryHover(cat.id);
                }}
                onMouseLeave={() => {
                  setHoverColor(null);
                  if (onCategoryHover) onCategoryHover(null);
                }}
                aria-pressed={isActive}
                aria-label={cat.title || cat.name || "Category"}
              >
                <span className="hidden group-hover:block group-[.isOpen]:block text-xs whitespace-nowrap mr-1.5">
                  {isActive && !activeSubcategory ? (
                    <IoCheckmarkDone className="text-lg lg:text-xl" />
                  ) : (
                    cat.title || cat.name
                  )}
                </span>

                {cat.iconUrl ? (
                  <Image
                    src={cat.iconUrl}
                    alt=""
                    width={28}
                    height={28}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: cat.color || "#6BEE32" }}
                  >
                    {(cat.name || cat.title || "?").charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              {/* Subcategories (shown when expanded) */}
              {hasSubcategories && isExpanded && (
                <div className="flex flex-col gap-0.5 items-end mr-2.5 animate-fadeIn">
                  {cat.subcategories.map((sub, index) => {
                    const subId = sub.id || sub.name || `sub-${index}`;
                    const isSubActive = activeSubcategory === subId;
                    
                    return (
                      <button
                        key={subId}
                        type="button"
                        className={`group flex items-center h-6 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 text-white text-[11px] px-2.5 hover:scale-105 ${
                          isSubActive ? "opacity-100 font-semibold shadow-md" : "opacity-80 hover:opacity-100"
                        }`}
                        style={{ 
                          backgroundColor: cat.color || "#6BEE32",
                          filter: isSubActive ? "brightness(0.85) contrast(1.1)" : "brightness(1.15)"
                        }}
                        onClick={(e) => handleSubcategoryClick(e, cat.id, subId)}
                        onMouseEnter={() => {
                          if (onSubcategoryHover) onSubcategoryHover(cat.id, subId);
                        }}
                        onMouseLeave={() => {
                          if (onSubcategoryHover) onSubcategoryHover(null, null);
                        }}
                        aria-pressed={isSubActive}
                        aria-label={sub.name}
                      >
                        <MdSubdirectoryArrowRight className={`mr-1 text-xs ${isSubActive ? "text-white" : ""}`} />
                        <span className="whitespace-nowrap">
                          {sub.name}
                        </span>
                        {isSubActive && (
                          <IoCheckmarkDone className="text-sm ml-1.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        className="w-2 h-60 rounded-l-[5px] transition-colors duration-200 lg:w-2.5"
        style={{ backgroundColor: barColor }}
      />
    </div>
  );
};

export default MapFilter;
