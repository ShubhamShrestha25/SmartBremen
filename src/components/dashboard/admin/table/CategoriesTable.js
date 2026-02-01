"use client";

import CategoryPopup from "@/components/popup/CategoryPopup";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import { useState, useMemo, Fragment } from "react";
import { FaRegTrashAlt, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MdAddCircle, MdEdit } from "react-icons/md";
import { 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from "@/lib/firestore";
import { uploadToCloudinary } from "@/lib/cloudinary";

const CategoriesTable = ({ categoriesData, onRefresh }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

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

  const toggleExpand = (catId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const openAdd = () => {
    setActiveCategory(null);
    setShowPopup(true);
  };

  const openEdit = (cat) => {
    setActiveCategory(cat);
    setShowPopup(true);
  };

  const handleSubmit = async (payload) => {
    setLoading(true);
    try {
      let iconUrl = payload.icon;
      
      // Upload icon if it's a file
      if (payload.icon instanceof File) {
        const uploadResult = await uploadToCloudinary(payload.icon, 'category_icons');
        iconUrl = uploadResult.imageUrl;
      }

      const categoryData = {
        name: payload.name,
        color: payload.color,
        iconUrl: typeof iconUrl === 'string' ? iconUrl : '',
        description: payload.description || '',
        subcategories: payload.subcategories || [],
      };

      if (activeCategory) {
        // Update existing category
        const success = await updateCategory(activeCategory.id, categoryData);
        if (success) {
          setShowPopup(false);
          onRefresh?.();
        } else {
          alert('Failed to update category');
        }
      } else {
        // Create new category
        const categoryId = await createCategory(categoryData);
        if (categoryId) {
          setShowPopup(false);
          onRefresh?.();
        } else {
          alert('Failed to create category');
        }
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error saving category: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (catId) => {
    setLoading(true);
    try {
      const success = await deleteCategory(catId);
      if (success) {
        setDeleteConfirm(null);
        onRefresh?.();
      } else {
        alert('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold text-gray-800 lg:text-2xl">
          Categories
        </h1>

        <button onClick={openAdd} type="button" title="Add Category">
          <MdAddCircle className="text-3xl hover:text-gray-600 transition-colors" />
        </button>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm w-10">
                
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm">
                Icon
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm">
                Subcategories
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
            {paginatedCategories?.map((cat) => {
              const hasSubcategories = cat.subcategories && cat.subcategories.length > 0;
              const isExpanded = expandedCategories[cat.id];
              
              return (
                <Fragment key={cat.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {hasSubcategories && (
                        <button
                          onClick={() => toggleExpand(cat.id)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          {isExpanded ? (
                            <FaChevronDown className="text-gray-500 text-xs" />
                          ) : (
                            <FaChevronRight className="text-gray-500 text-xs" />
                          )}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative w-8 h-8">
                        <Image
                          src={cat?.iconUrl || "/images/marker-popup-default.png"}
                          alt={cat?.name || "Category"}
                          width={80}
                          height={60}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    </td>

                    <td className="px-4 py-3 text-xs font-medium text-gray-800 whitespace-nowrap md:text-sm">
                      {cat?.name || "Untitled"}
                    </td>

                    <td className="px-4 py-3 text-xs text-gray-600 md:text-sm">
                      {hasSubcategories ? (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {cat.subcategories.length} subcategor{cat.subcategories.length === 1 ? 'y' : 'ies'}
                        </span>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-6 h-6 rounded-full border border-gray-200"
                          style={{ backgroundColor: cat?.color }}
                        />
                        <span className="text-xs text-gray-500">{cat?.color || "-"}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          className="rounded-md bg-black p-2.5 text-white hover:bg-gray-800 transition-colors"
                          title="Edit"
                          type="button"
                          onClick={() => openEdit(cat)}
                          disabled={loading}
                        >
                          <MdEdit />
                        </button>

                        {deleteConfirm === cat.id ? (
                          <div className="flex gap-1">
                            <button
                              className="rounded-md bg-red-600 px-2 py-1 text-white text-xs hover:bg-red-700 transition-colors"
                              onClick={() => handleDelete(cat.id)}
                              disabled={loading}
                            >
                              {loading ? '...' : 'Yes'}
                            </button>
                            <button
                              className="rounded-md bg-gray-500 px-2 py-1 text-white text-xs hover:bg-gray-600 transition-colors"
                              onClick={() => setDeleteConfirm(null)}
                              disabled={loading}
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            className="rounded-md bg-[#FF4B4B] p-2.5 text-white hover:bg-red-600 transition-colors"
                            title="Delete"
                            type="button"
                            onClick={() => setDeleteConfirm(cat.id)}
                            disabled={loading}
                          >
                            <FaRegTrashAlt />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  
                  {/* Subcategories rows */}
                  {isExpanded && hasSubcategories && cat.subcategories.map((sub, idx) => (
                    <tr key={`${cat.id}-sub-${idx}`} className="bg-gray-50/50">
                      <td className="px-4 py-2"></td>
                      <td className="px-4 py-2">
                        <div className="pl-4 flex items-center">
                          <span 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: cat?.color }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-600 md:text-sm pl-8" colSpan={2}>
                        <span className="text-gray-400 mr-2">└</span>
                        {sub.name}
                        {sub.description && (
                          <span className="text-gray-400 ml-2 text-xs">
                            - {sub.description}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2"></td>
                      <td className="px-4 py-2"></td>
                    </tr>
                  ))}
                </Fragment>
              );
            })}
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
        onClose={() => !loading && setShowPopup(false)}
        category={activeCategory}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default CategoriesTable;
