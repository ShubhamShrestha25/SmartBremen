"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdAddCircle, MdEdit } from "react-icons/md";

import MarkerPopup from "@/components/popup/MarkerPopup";
import useAuthStore from "@/store/useAuthStore";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";

// Check if the URL is an image or a video
const getMediaType = (url = "") => {
  if (/\.(mp4|webm|ogg|mov)$/i.test(url)) return "video";
  if (/\.(png|jpe?g|webp|gif|svg)$/i.test(url)) return "image";
  return "unknown";
};

const Markers = ({ markersData }) => {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { role } = useAuthStore();

  // Used by the lightbox to display images or videos in fullscreen
  const slides = useMemo(() => {
    return (selectedMarker?.images ?? [])
      .map((img) => img?.url)
      .filter(Boolean)
      .map((url) => {
        const type = getMediaType(url);

        if (type === "video") {
          return {
            type: "video",
            sources: [{ src: url }],
          };
        }
        return { src: url };
      });
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
            {markersData?.map((marker) => (
              <tr key={marker.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedMarker(marker);
                    }}
                    className="relative w-18 h-14 border border-[#6BEE32] rounded-xl flex justify-center items-center cursor-pointer md:w-20 md:h-15"
                  >
                    {getMediaType(marker?.images[0].url) === "image" ? (
                      <Image
                        src={marker?.images[0].url}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 80px, 72px"
                        className="w-full h-full rounded-xl"
                      />
                    ) : (
                      <video
                        src={marker?.images[0].url}
                        className="w-full h-full object-cover rounded-xl"
                        playsInline
                        muted
                      />
                    )}
                    <div className="absolute -top-2.5 -right-2.5 flex justify-center items-center w-6 h-6 bg-black text-white rounded-full text-sm">
                      +{marker?.images.length - 1}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-xs font-medium text-gray-800 whitespace-nowrap md:text-sm">
                  {marker.title}
                </td>

                <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap md:text-sm">
                  {marker.author.firstName + " " + marker.author.lastName}
                </td>

                <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap md:text-sm">
                  {marker.location.name}
                </td>
                <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap md:text-sm">
                  {marker.category.name}
                </td>
                <td className="px-4 py-3 text-xs text-gray-600 max-w-xs truncate md:text-sm">
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

                <td className="px-4 py-3 text-center">
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
      <p className="mt-3 text-center 2xl:hidden">
        Swipe left or right to view the table 👉📱
      </p>
      <div className="space-x-2 my-4 text-center">
        <button className="px-3 py-1 text-sm border rounded border-[#6BEE32]">
          1
        </button>

        <button className="px-3 py-1 text-sm border rounded border-gray-300 hover:bg-gray-100">
          2
        </button>

        <button className="px-3 py-1 text-sm border rounded border-gray-300 hover:bg-gray-100">
          3
        </button>
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
        plugins={[Video]}
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
