import Image from "next/image";

const MapFilter = () => {
  return (
    <div className="flex items-center gap-2.5 absolute z-30 right-0 bottom-1/2">
      <div className="flex flex-col gap-1 items-end">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="group flex items-center h-6 rounded-3xl overflow-hidden cursor-pointer transition-all duration-200
              w-6 hover:w-30 bg-[#6BEE32]"
          >
            <span className="hidden group-hover:block text-xs whitespace-nowrap px-2">
              Green space
            </span>

            <Image
              src="/images/symble.png"
              alt=""
              width={20}
              height={20}
              className="w-6 h-6"
            />
          </div>
        ))}
      </div>

      <div className="w-2.5 h-58 rounded-l-[5px] bg-[#6BEE32]" />
    </div>
  );
};

export default MapFilter;
