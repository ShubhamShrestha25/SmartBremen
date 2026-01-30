"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdAddCircle, MdEdit } from "react-icons/md";

import MarkerPopup from "@/components/popup/MarkerPopup";
import Pagination from "@/components/Pagination";
import useAuthStore from "@/store/useAuthStore";
import { updateImageStatus, deleteImage } from "@/lib/firestore";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Markers = ({ markersData, categories = [], onRefresh }) => {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { role, userId } = useAuthStore();

  // Helper to get subcategory name
  const getSubcategoryName = (marker) => {
    if (!marker?._original?.subcategoryId) return null;
    const categoryId =
      marker?.category?.informalityCategoryId || marker?._original?.categoryId;
    const category = categories.find((c) => c.id === categoryId);
    if (!category?.subcategories) return null;
    const subcategory = category.subcategories.find(
      (sub) => sub.id === marker._original.subcategoryId,
    );
    return subcategory?.name || null;
  };

  // Calculate paginated data
  const totalItems = markersData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedMarkers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return markersData?.slice(startIndex, startIndex + itemsPerPage) || [];
  }, [markersData, currentPage, itemsPerPage]);

  // Reset to page 1 when items per page changes
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Used by the lightbox to display images in fullscreen
  const slides = useMemo(() => {
    return (selectedMarker?.images ?? [])
      .map((img) => img?.url)
      .filter(Boolean)
      .map((url) => ({ src: url }));
  }, [selectedMarker]);

  const handleDeleteMarker = async (markerId) => {
    if (!confirm("Are you sure you want to delete this marker?")) return;

    setActionLoading(markerId);
    try {
      const success = await deleteImage(markerId);
      if (success) {
        onRefresh?.();
      } else {
        alert("Failed to delete marker");
      }
    } catch (error) {
      console.error("Error deleting marker:", error);
      alert("Error deleting marker");
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkerApprove = async (markerId) => {
    setActionLoading(markerId);
    try {
      const success = await updateImageStatus(markerId, "approved", userId);
      if (success) {
        onRefresh?.();
      } else {
        alert("Failed to approve marker");
      }
    } catch (error) {
      console.error("Error approving marker:", error);
      alert("Error approving marker");
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkerDecline = async (markerId) => {
    setActionLoading(markerId);
    try {
      const success = await updateImageStatus(markerId, "rejected", userId);
      if (success) {
        onRefresh?.();
      } else {
        alert("Failed to reject marker");
      }
    } catch (error) {
      console.error("Error rejecting marker:", error);
      alert("Error rejecting marker");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold text-gray-800 lg:text-2xl">
          Markers
        </h1>
        <button onClick={() => setShowModal(true)}>
          <MdAddCircle className="text-3xl" />
        </button>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm">
                Image
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm">
                Author
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 md:text-sm">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 md:text-sm">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {paginatedMarkers?.map((marker) => (
              <tr key={marker.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedMarker(marker);
                    }}
                    className="relative w-18 h-14 border border-[#6BEE32] rounded-xl flex justify-center items-center cursor-pointer md:w-20 md:h-15"
                  >
                    <Image
                      src={
                        marker?.images?.[0]?.url ||
                        marker?._original?.thumbnailUrl ||
                        "/images/marker-popup-default.png"
                      }
                      alt={marker?.title || "Marker"}
                      width={80}
                      height={60}
                      className="w-full h-full rounded-xl object-cover"
                    />
                    {marker?.images.length > 1 && (
                      <div className="absolute -top-2.5 -right-2.5 flex justify-center items-center w-6 h-6 bg-black text-white rounded-full text-sm">
                        +{marker?.images.length - 1}
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3 text-xs font-medium text-gray-800 whitespace-nowrap md:text-sm">
                  {marker?.title || "Untitled"}
                </td>

                <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap md:text-sm">
                  {(marker?.author?.firstName || "") +
                    " " +
                    (marker?.author?.lastName || "")}
                </td>

                <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap md:text-sm">
                  {marker?.location?.name ||
                    `${marker?.location?.lat?.toFixed(4) || "?"}, ${marker?.location?.lng?.toFixed(4) || "?"}`}
                </td>
                <td className="px-4 py-3  text-gray-600 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <span
                      className="px-2 py-1 rounded text-xs "
                      style={{
                        backgroundColor: marker?.category?.color + "20",
                        color: marker?.category?.color,
                      }}
                    >
                      {marker?.category?.name || "Uncategorized"}
                    </span>
                    {getSubcategoryName(marker) && (
                      <span className="text-xs text-gray-500 pl-1">
                        ↳ {getSubcategoryName(marker)}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-600 max-w-xs truncate md:text-sm">
                  {marker?.description || "No description"}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold 
                         ${
                           marker.status?.toLowerCase() === "pending"
                             ? "bg-yellow-100 text-yellow-800"
                             : marker.status?.toLowerCase() === "rejected"
                               ? "bg-red-100 text-red-800"
                               : "bg-green-100 text-green-800"
                         }`}
                  >
                    {marker.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  {actionLoading === marker.id ? (
                    <div className="flex justify-end">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                  ) : role === "ADMIN" &&
                    marker.status?.toLowerCase() === "pending" ? (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleMarkerApprove(marker.id)}
                        className="rounded-md bg-[#6BEE32] p-2.5 text-white hover:bg-green-600 transition-colors"
                        title="Approve"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleMarkerDecline(marker.id)}
                        className="rounded-md bg-[#FF4B4B] p-2.5 text-white hover:bg-red-600 transition-colors"
                        title="Reject"
                      >
                        <RxCross1 />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setSelectedMarker(marker);
                        }}
                        className="rounded-md bg-black p-2.5 text-white hover:bg-gray-800 transition-colors"
                        title="Edit"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteMarker(marker.id)}
                        className="rounded-md bg-[#FF4B4B] p-2.5 text-white hover:bg-red-600 transition-colors"
                        title="Delete"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  )}
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

      <MarkerPopup
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedMarker(null);
        }}
        marker={selectedMarker}
        onRefresh={onRefresh}
      />
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        index={current}
        view={{ closeOnBackdropClick: true }}
        on={{
          view: ({ index }) => setCurrent(index),
        }}
      />
    </div>
  );
};

export default Markers;
