"use client";

import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { MdAddCircle, MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import MarkerPopup from "@/components/popup/MarkerPopup";

const Markers = () => {
  const [markers, setMarkers] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/60",
      title: "Broken Road",
      location: "Downtown Street",
      category: "Cat1",
      description: "Road damage near the bridge",
      status: "PENDING",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/60",
      title: "New Park",
      location: "Green Avenue",
      category: "Cat2",
      description: "Newly opened park",
      status: "APPROVED",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleAddMarker = (newMarker) => {
    setMarkers([...markers, { id: markers.length + 1, ...newMarker }]);
  };

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
                Location
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
            {markers.map((marker) => (
              <tr key={marker.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div
                    href="/"
                    className="w-16 h-16 border border-[#6BEE32] rounded-xl flex justify-center items-center"
                  >
                    <Image
                      src="/images/logo1.png"
                      alt=""
                      width={16}
                      height={16}
                      className="w-full h-auto"
                    />
                  </div>
                </td>

                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  {marker.title}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {marker.location}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                  {marker.description}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
                         ${
                           marker.status === "PENDING"
                             ? "bg-yellow-100 text-yellow-800"
                             : "bg-green-100 text-green-800"
                         }`}
                  >
                    {marker.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-right">
                  {marker.status === "PENDING" ? (
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
        onAdd={handleAddMarker}
        marker={selectedMarker}
      />
    </div>
  );
};

export default Markers;
