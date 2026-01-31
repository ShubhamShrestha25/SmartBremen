import ImageSlider from "../Slider";
import { FaCameraRetro } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { PiPersonArmsSpreadFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { MdCategory } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";

const MapPopup = ({ marker, category }) => {
  // Build images array from marker data - Slider expects array of URL strings
  const images =
    marker?.images?.length > 0
           ? marker.images.map((img) => img?.imageUrl || img?.url || img).filter(Boolean)
      : marker?.imageUrl
        ? [marker.imageUrl]
        : ["/images/marker-popup-default.png"];

  // Get subcategory name
  const getSubcategoryName = () => {
    if (!marker?.subcategoryId || !category?.subcategories) return null;
    const subcategory = category.subcategories.find(
      (sub) => sub.id === marker.subcategoryId,
    );
    return subcategory?.name || null;
  };

  const subcategoryName = getSubcategoryName();

  // Open location in Google Maps
  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${marker.lat},${marker.lng}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

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
      <div className="relative left-1.5 z-10 bg-white rounded-[18px] p-2 w-[330px] mx-auto  border-2 border-[#6BEE32] sm:mx-0 sm:left-10  lg:w-[350px]">
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
            {subcategoryName && (
              <p className="flex items-center gap-1 text-xs text-gray-600 mt-0.5">
                <MdCategory className="text-sm" />
                {subcategoryName}
              </p>
            )}
          </div>
          <div className="flex items-center gap-x-4 gap-y-1 flex-wrap">
            <button
              onClick={openInGoogleMaps}
              className="flex items-center gap-1 text-xs lg:text-sm hover:text-blue-600 hover:underline cursor-pointer transition-colors"
              title="Open in Google Maps"
            >
              <IoLocationSharp className="text-lg text-black" />{" "}
              {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
              <FiExternalLink className="text-xs" />
            </button>
            {marker?.createdAt && (
              <p className="flex items-center gap-1 text-xs lg:text-sm">
                <SlCalender className="text-lg" />
                {formatDate(marker.createdAt)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-x-4 gap-y-1 flex-wrap">
            {(marker?.metadata?.authorName || marker?.author) && (
              <p className="flex items-center gap-1 text-xs lg:text-sm">
                <PiPersonArmsSpreadFill className="lg:text-lg" />{" "}
                {marker?.metadata?.authorName || marker?.author}
              </p>
            )}
            <p className="flex items-center gap-1 text-xs lg:text-sm">
              <FaCameraRetro className="text-lg" /> Apple iPhone 14
            </p>
          </div>
        </div>

        {/* Metadata section */}
        {marker?.metadata?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb">
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

        {marker?.description && (
          <p className="text-xs mt-2.5 lg:text-sm">
            {marker?.description || "No description available."}
          </p>
        )}
      </div>
    </div>
  );
};

export default MapPopup;
