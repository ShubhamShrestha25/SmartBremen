"use client";

import CategoryPopup from "@/components/popup/CategoryPopup";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import { useState, useMemo } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdAddCircle, MdEdit } from "react-icons/md";

const CategoriesTable = ({ categoriesData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate paginated data
  const totalItems = categoriesData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return categoriesData?.slice(startIndex, startIndex + itemsPerPage) || [];
  }, [categoriesData, currentPage, itemsPerPage]);

  // Reset to page 1 when items per page changes
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const openAdd = () => {
    setActiveCategory(null);
    setShowPopup(true);
  };

  const openEdit = (cat) => {
    setActiveCategory(cat);
    setShowPopup(true);
  };

  const handleSubmit = (payload) => {
    // call your create/update API here
    // if (activeCategory) updateCategory(activeCategory.id, payload)
    // else createCategory(payload)
    console.log("Category submit:", { activeCategory, payload });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold text-gray-800 lg:text-2xl">
          Categories
        </h1>

        <button onClick={openAdd} type="button" title="Add Category">
          <MdAddCircle className="text-3xl" />
        </button>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm">
                Icon
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm">
                Color
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {paginatedCategories?.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="relative w-8 h-8 cursor-pointer">
                    <Image
                      src={cat?.iconUrl || "/images/marker-popup-default.png"}
                      alt={cat?.name || "Category"}
                      width={80}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

                <td className="px-4 py-3 text-xs font-medium text-gray-800 whitespace-nowrap md:text-sm">
                  {cat?.name || "Untitled"}
                </td>

                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  <span
                    className="px-2 py-1 rounded text-xs"
                    style={{ color: cat?.color }}
                  >
                    {cat?.color || "-"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      className="rounded-md bg-black p-2.5 text-white hover:bg-gray-800 transition-colors"
                      title="Edit"
                      type="button"
                      onClick={() => openEdit(cat)}
                    >
                      <MdEdit />
                    </button>

                    <button
                      className="rounded-md bg-[#FF4B4B] p-2.5 text-white hover:bg-red-600 transition-colors"
                      title="Delete"
                      type="button"
                      onClick={() => console.log("delete", cat.id)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-center text-sm 2xl:hidden">
        Swipe left or right to view the table 👉📱
      </p>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        totalItems={totalItems}
      />

      <CategoryPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        category={activeCategory}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CategoriesTable;
