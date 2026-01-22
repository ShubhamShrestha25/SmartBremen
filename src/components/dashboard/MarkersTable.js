"use client";

import Image from "next/image";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { FaRegTrashAlt } from "react-icons/fa";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import { MdAddCircle, MdEdit } from "react-icons/md";
import MarkerPopup from "@/components/popup/MarkerPopup";
import useAuthStore from "@/store/useAuthStore";

const Markers = ({ markersData }) => {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { role } = useAuthStore();

  const slides = useMemo(() => {
    return (selectedMarker?.images ?? [])
      .filter((img) => img?.url)
      .map((img) => ({ src: img.url }));
  }, [selectedMarker]);

  const handleDeleteMarker = () => {
    console.log("marker removed");
  };

  const handleMarkerApprove = () => {
    console.log("marker approved");
  };

  const handleMarkerDecline = () => {
    console.log("marker declined");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 ">Markers</h1>
        <button onClick={() => setShowModal(true)}>
          <MdAddCircle className="text-3xl" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Author
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Location
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                category
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Description
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {markersData?.map((marker) => (
              <tr key={marker.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedMarker(marker);
                    }}
                    className="relative w-20 h-15 border border-[#6BEE32] rounded-xl flex justify-center items-center cursor-pointer"
                  >
                    <Image
                      src={marker?.images[0].url}
                      alt=""
                      width={16}
                      height={16}
                      className="w-full h-full rounded-xl"
                    />
                    <div className="absolute -top-2.5 -right-2.5 flex justify-center items-center w-6 h-6 bg-black text-white rounded-full text-sm">
                      +{marker?.images.length - 1}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  {marker.title}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {marker.author.firstName + " " + marker.author.lastName}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {marker.location.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 ">
                  {marker.category.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                  {marker.description}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
                         ${
                           marker.status?.toLowerCase() === "pending"
                             ? "bg-yellow-100 text-yellow-800"
                             : "bg-green-100 text-green-800"
                         }`}
                  >
                    {marker.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-right">
                  {role === "ADMIN" &&
                  marker.status?.toLowerCase() === "pending" ? (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleMarkerApprove}
                        className="rounded-md bg-[#6BEE32] p-2.5 text-white"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={handleMarkerDecline}
                        className="rounded-md bg-[#FF4B4B] p-2.5 text-white"
                      >
                        <RxCross1 />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setSelectedMarker(marker);
                        }}
                        className="rounded-md bg-black p-2.5 text-white"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={handleDeleteMarker}
                        className="rounded-md bg-[#FF4B4B] p-2.5 text-white"
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
      <MarkerPopup
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedMarker(null);
        }}
        marker={selectedMarker}
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
