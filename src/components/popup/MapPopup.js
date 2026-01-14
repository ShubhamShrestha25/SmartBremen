import Image from "next/image";

const MapPopup = () => {
  return (
    <div className="relative z-10 bg-white rounded-[18px] p-2 w-[350px] left-10 border-2 border-[#6BEE32]">
      <div className="w-full h-[150px]">
        <Image
          src="/images/marker-popup-default.png"
          alt=""
          width={149}
          height={80}
          className="w-full h-full"
        />
      </div>
      <div className="border-b pb-2 my-2">
        <h1 className="text-2xl font-medium">Bürgerpark</h1>
        <p className="text-sm">COUNTRY PARK</p>
      </div>
      <p className="text-[13px]">
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
        <p className="text-sm mb-2">Highlights</p>
        <ul className="text-xs ml-4 list-disc space-y-2">
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
