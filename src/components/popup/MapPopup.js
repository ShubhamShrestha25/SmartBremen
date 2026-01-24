import ImageSlider from "../Slider";
import { IoClose } from "react-icons/io5";

const MapPopup = ({ marker, category, onClose }) => {
  // Build images array from marker data
  const images = marker?.imageUrl 
    ? [marker.imageUrl, marker.thumbnailUrl].filter(Boolean)
    : ["/images/marker-popup-default.png"];

  // Format date
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="relative z-10 bg-white rounded-[18px] p-2 w-[330px] mx-auto border-2 border-[#6BEE32] sm:mx-0 sm:left-10 lg:w-[350px]">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-20 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
      >
        <IoClose className="text-xl text-gray-600" />
      </button>

      <ImageSlider images={images} />
      
      <div className="border-b pb-2 my-2">
        <h1 className="font-medium text-lg lg:text-2xl pr-8">
          {marker?.title || "Untitled"}
        </h1>
        <p 
          className="text-xs lg:text-sm font-medium"
          style={{ color: category?.color || "#4A4A4A" }}
        >
          {category?.name || "Uncategorized"}
        </p>
      </div>
      
      <p className="text-[11px] lg:text-[13px] text-gray-700">
        {marker?.description || "No description available."}
      </p>

      {/* Metadata section */}
      <div className="my-2 pt-2 border-t">
        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
          {marker?.createdAt && (
            <span>Added: {formatDate(marker.createdAt)}</span>
          )}
          {marker?.metadata?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {marker.metadata.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="bg-gray-100 px-2 py-0.5 rounded-full text-[10px]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Location info if available */}
      {(marker?.lat && marker?.lng) && (
        <div className="text-[10px] text-gray-400 mt-1">
          📍 {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
        </div>
      )}
    </div>
  );
};

export default MapPopup;
