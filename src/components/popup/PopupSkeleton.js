import React from "react";

const PopupSkeleton = () => {
  return (
    <div className="relative z-10 bg-white rounded-[18px] p-2 w-[350px] left-10 border-2 border-[#6BEE32]">
      <div className="w-full h-[150px] bg-gray-400 rounded-md animate-pulse" />

      <div className="pb-2 my-2 animate-pulse">
        <div className="h-6 w-40 bg-gray-400 rounded mb-2" />
        <div className="h-4 w-24 bg-gray-400 rounded" />
      </div>

      <div className="space-y-2 animate-pulse">
        <div className="h-3 w-full bg-gray-400 rounded" />
        <div className="h-3 w-full bg-gray-400 rounded" />
        <div className="h-3 w-5/6 bg-gray-400 rounded" />
        <div className="h-3 w-4/6 bg-gray-400 rounded" />
      </div>

      <div className="my-4 animate-pulse">
        <div className="h-4 w-24 bg-gray-400 rounded mb-3" />
        <ul className="space-y-2">
          <li className="h-3 w-32 bg-gray-400 rounded" />
          <li className="h-3 w-28 bg-gray-400 rounded" />
          <li className="h-3 w-36 bg-gray-400 rounded" />
          <li className="h-3 w-24 bg-gray-400 rounded" />
        </ul>
      </div>
    </div>
  );
};

export default PopupSkeleton;
