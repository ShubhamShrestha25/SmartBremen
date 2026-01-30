import { FaMapMarkerAlt, FaImage } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";

const MapIconToggle = ({ markerMode, setMarkerMode }) => {
  return (
    <div className="absolute z-30 left-2 bottom-15 text-xl bg-white p-1 rounded-lg space-y-2">
      <BiCategoryAlt
        onClick={() => setMarkerMode("icon")}
        className={markerMode === "icon" ? "text-[#FF4B4B]" : "text-black"}
      />
      <FaImage
        onClick={() => setMarkerMode("image")}
        className={markerMode === "image" ? "text-[#FF4B4B]" : "text-black"}
      />
    </div>
  );
};

export default MapIconToggle;
