export default function Help() {
  return (
    <div className="flex justify-center">
      <div
        style={{
          backgroundImage: `
            linear-gradient(269.99deg, rgba(255, 255, 255, 0) 0.01%, rgba(255, 255, 255, 0.853714) 50.73%, #FFFFFF 99.99%),
            linear-gradient(136.47deg, rgba(255, 255, 255, 0.2) 26.45%, rgba(0, 0, 0, 0) 93.15%),
            url('/images/help-bg.png')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          minHeight: "calc(100vh - 80px)",
        }}
        className="relative"
      >
        <div className="flex justify-center">
          <div className="mainContainer">
            <div className="w-1/2 mt-14 mb-6">
              <div>
                <h1 className="text-[#FF4B4B] text-2xl font-medium mb-1.5">
                  Moin!
                </h1>
                <p className="text-sm">
                  This page helps you understand how to use the map and explore
                  the city’s informal side.
                </p>
              </div>
              <div className="mt-4 bg-white/80 p-5 rounded-[20px]">
                <h1 className="font-medium mb-1">How to Use the Map</h1>
                <ul className="list-disc text-sm ml-5">
                  <li>
                    Use the map to explore informal places and everyday
                    activities across Bremen
                  </li>
                  <li>
                    Click on a location to learn why it is considered informal
                  </li>
                  <li>
                    Each place is based on real observations and experiences
                  </li>
                </ul>
                <p className="text-sm mt-1">
                  There is no right or wrong way to explore — just follow your
                  curiosity.
                </p>
              </div>
              <div className="mt-4 bg-white/80 p-5 rounded-[20px]">
                <h1 className="font-medium mb-1">
                  What Is an “Informal” Place?
                </h1>
                <ul className="list-disc text-sm ml-5">
                  <li>
                    Informal places are locations that people use in their own
                    way, even if they were not officially designed for it.
                  </li>
                  <li>This can include:</li>
                  <li className="ml-5">
                    Places where people casually meet or hang out
                  </li>
                  <li className="ml-5">
                    Spaces used creatively or differently than intended
                  </li>
                  <li className="ml-5">
                    Everyday spots that are meaningful to locals
                  </li>
                </ul>
              </div>
              <div className="mt-4 bg-white/80 p-5 rounded-[20px]">
                <h1 className="font-medium mb-1">Who Is This For?</h1>
                <p className="text-sm">This website is for:</p>
                <ul className="list-disc text-sm ml-5">
                  <li>People living in Bremen</li>
                  <li>Newcomers and visitors</li>
                  <li>
                    Anyone curious about how the city is used in everyday life
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between mt-4 bg-white/80 h-20 px-5 rounded-[20px]">
                <h1 className="font-medium">Need More Help?</h1>
                <button className="w-[152px] h-9 bg-[#6BEE32] rounded-[10px] font-semibold">
                  CONTACT US
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
