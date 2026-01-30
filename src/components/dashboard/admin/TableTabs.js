import React from "react";

const TableTabs = ({ activeTable, setActiveTable }) => {
  const baseBtn = "px-4 py-2 rounded  text-sm transition cursor-pointer";
  const activeBtn = "bg-[#0000FF] text-white";
  const inactiveBtn = "bg-white text-black border-gray-300 hover:bg-gray-50";

  return (
    <div className="flex justify-center flex-wrap gap-3 my-15">
      <button
        type="button"
        onClick={() => setActiveTable("markers")}
        className={`${baseBtn} ${
          activeTable === "markers" ? activeBtn : inactiveBtn
        }`}
      >
        Markers
      </button>
      <button
        type="button"
        onClick={() => setActiveTable("users")}
        className={`${baseBtn} ${
          activeTable === "users" ? activeBtn : inactiveBtn
        }`}
      >
        Users
      </button>
      <button
        type="button"
        onClick={() => setActiveTable("categories")}
        className={`${baseBtn} ${
          activeTable === "categories" ? activeBtn : inactiveBtn
        }`}
      >
        Categories
      </button>
    </div>
  );
};

export default TableTabs;
