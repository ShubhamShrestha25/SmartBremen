import ImageSlider from "../Slider";

const MapPopup = () => {
  const images = [
    "/images/marker-popup-default.png",
    "/images/city1.png",
    "/images/help-bg.webp",
  ];

  return (
    <div className="relative z-10 bg-white rounded-[18px] p-2 w-[330px] mx-auto border-2 border-[#6BEE32] sm:mx-0 sm:left-10  lg:w-[350px]">
      <ImageSlider images={images} />
      <div className="border-b pb-2 my-2">
        <h1 className="font-medium text-lg lg:text-2xl">Bürgerpark</h1>
        <p className="text-xs lg:text-sm">COUNTRY PARK</p>
      </div>
      <p className="text-[11px] lg:text-[13px]">
        Located in the heart of Bremen, the Bürgerpark is one of Germany’s most
        significant 19th-century landscape gardens. Spanning over 200 hectares,
        this "green lung" was uniquely established and funded by local citizens
        rather than royalty. Visitors can enjoy winding paths, picturesque lakes
        for rowing, and charming architecture like the Meierei and Emma am See.
        With its animal enclosures, mini-golf, and the popular Finnbahn running
        track, it offers a peaceful yet active retreat just steps from the main
        train station.
      </p>

      <div className="my-2">
        <p className="text-xs mb-2 lg:text-sm">Highlights</p>
        <ul className="text-[11px] ml-4 list-disc space-y-2 md:text-xs">
          <li>Nature Heritage</li>
          <li>Family Place</li>
          <li>Bio diversity</li>
          <li>Community</li>
        </ul>
      </div>
    </div>
  );
};

export default MapPopup;
