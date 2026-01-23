import ImageSlider from "../Slider";
import { FaCameraRetro } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { PiPersonArmsSpreadFill } from "react-icons/pi";

const MapPopup = ({ data }) => {
  console.log(data);

  return (
    <div className="relative z-10 bg-white rounded-[18px] p-2 w-[330px] mx-auto border-2 border-[#6BEE32] sm:mx-0 sm:left-10  lg:w-[350px]">
      <ImageSlider images={data?.images} />
      <div className="border-b pb-2 my-2 space-y-2">
        <h1 className="font-medium text-sm lg:text-lg">{data?.title}</h1>
        <div className="flex items-center gap-x-4 gap-y-1 flex-wrap">
          <p className="flex items-center gap-1 text-xs lg:text-sm">
            <IoLocationSharp className="lg:text-lg" /> {data?.location?.name}
          </p>
          <p className="flex items-center gap-1 text-xs lg:text-sm">
            <FaCameraRetro className="lg:text-lg" /> {data?.device?.brand} {" "}
            {data?.device?.model}
          </p>
        </div>
        <p className="flex items-center gap-1 text-xs lg:text-sm">
          <PiPersonArmsSpreadFill className="lg:text-lg" />
          {data.author.firstName + " " + data.author.lastName}
        </p>
      </div>
      <p className="text-[11px] lg:text-[13px]">{data.description}</p>
    </div>
  );
};

export default MapPopup;
