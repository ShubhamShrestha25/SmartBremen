import ImageSlider from "../Slider";
import { FaCameraRetro } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { PiPersonArmsSpreadFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";

const MapPopup = ({ marker, category }) => {
  // Build images array from marker data
  const images = marker?.imageUrl
    ? [marker.imageUrl, marker.thumbnailUrl].filter(Boolean)
    : ["/images/marker-popup-default.png"];

  // Format date
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="relative z-10 bg-white rounded-[18px] p-2 w-[330px] mx-auto border-2 border-[#6BEE32] sm:mx-0 sm:left-10  lg:w-[350px]">
        <ImageSlider images={images} />
        <div className="border-b pb-2 my-2 space-y-2">
          <div>
            <h1 className="font-medium text-sm lg:text-lg">
              {marker?.title || "Untitled"}
            </h1>
            <p
              className="text-xs lg:text-sm"
              style={{ color: category?.color || "#4A4A4A" }}
            >
              {category?.name || "Uncategorized"}
            </p>
          </div>
          <div className="flex items-center gap-x-4 gap-y-1 flex-wrap">
            <p className="flex items-center gap-1 text-xs lg:text-sm">
              <IoLocationSharp className="text-lg text-black" />{" "}
              {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
            </p>
            {marker?.createdAt && (
              <p className="flex items-center gap-1 text-xs lg:text-sm">
                <SlCalender className="text-lg" />
                {formatDate(marker.createdAt)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-x-4 gap-y-1 flex-wrap">
            {marker?.author && (
              <p className="flex items-center gap-1 text-xs lg:text-sm">
               <PiPersonArmsSpreadFill className="lg:text-lg" /> {marker?.metadata?.authorName || marker?.author}
              </p>
            )}
            <p className="flex items-center gap-1 text-xs lg:text-sm">
              <FaCameraRetro className="text-lg" /> Apple iPhone 14
            </p>
          </div>
          {/* Metadata section */}
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
        <p className="text-xs lg:text-sm">
          {marker?.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default MapPopup;
