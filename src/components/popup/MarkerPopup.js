import { categoryData } from "@/data/categoryData";
import { useEffect, useState } from "react";
import { MiniMapPopup } from "./MiniMapPopup";

import { FaLocationCrosshairs } from "react-icons/fa6";
import useAuthStore from "@/store/useAuthStore";

export default function MarkerPopup({ show, onClose, marker }) {
  const [formData, setFormData] = useState(null);
  const [showMiniMap, setShowMiniMap] = useState(false);

  const { role } = useAuthStore();

  useEffect(() => {
    const initializeForm = () => {
      if (marker) {
        setFormData({
          title: marker.title || "",
          location: {
            name: marker.location?.name || "",
            lat: marker.location?.lat || "",
            lng: marker.location?.lng || "",
          },
          category: marker.category?.name || "",
          description: marker.description || "",
          images: marker.images || [],
          status: marker.status || "PENDING",
          author: marker.author?.name || "",
        });
      } else {
        setFormData({
          title: "",
          location: { name: "", lat: "", lng: "" },
          category: "",
          description: "",
          images: [],
          status: "PENDING",
          author: "",
        });
      }
    };
    initializeForm();
  }, [marker]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({ ...prev, images: files.map((f) => f.name) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  if (!show || !formData) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="flex min-h-dvh items-center justify-center p-3 sm:p-6">
        <div className="relative w-full sm:max-w-lg bg-white rounded-xl shadow-lg max-h-[90dvh] overflow-y-auto p-4 sm:p-6">
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-[#FF4B4B] cursor-pointer text-xl"
            aria-label="Close"
            type="button"
          >
            ✕
          </button>

          <h2 className="font-bold mb-4 text-lg md:text-xl pr-8">
            {marker ? "Edit Marker" : "Add Marker"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 text-sm md:text-base"
          >
            {/* Title */}
            <div>
              <label className="block font-medium text-sm">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            {/* Location Name */}
            <div>
              <label className="block font-medium text-sm">
                Location Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.location.name}
                onChange={handleLocationChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            {/* Latitude & Longitude */}
            <div>
              <label className="block font-medium text-sm">Coordinates *</label>
              <div className="flex gap-2 ">
                <input
                  type="number"
                  step="any"
                  name="lat"
                  placeholder="Latitude"
                  value={formData.location.lat}
                  onChange={handleLocationChange}
                  className="w-full sm:w-1/2 border px-3 py-2 rounded"
                  required
                />

                <input
                  type="number"
                  step="any"
                  name="lng"
                  placeholder="Longitude"
                  value={formData.location.lng}
                  onChange={handleLocationChange}
                  className="w-full sm:w-1/2 border px-3 py-2 rounded"
                  required
                />
              </div>
            </div>

            {/* location selection via map */}
            <div className="w-full bg-[#0000FF] text-white py-2 flex justify-center rounded hover:border hover:border-[#0000FF] hover:text-black hover:bg-transparent">
              <button
                type="button"
                onClick={() => setShowMiniMap(true)}
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <FaLocationCrosshairs className="text-lg text-[#FF4B4B]" />
                Select Location on Map (Optional)
              </button>
            </div>

            {/* Category */}
            <div>
              <label className="block font-medium text-sm">Category *</label>
              <select
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categoryData.map((cat) => (
                  <option key={cat.id} value={cat.title}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            {role.toLowerCase() === "admin" && (
              <div>
                <label className="block font-medium text-sm">Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            )}

            {/* Author */}
            <div>
              <label className="block font-medium text-sm">Author *</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium text-sm">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded resize-none"
                rows={4}
                required
              />
            </div>

            {/* Images */}
            <div>
              <label className="block font-medium text-sm">Images</label>

              {formData.images.length === 0 && (
                <label className="w-full flex justify-center items-center border border-gray-300 rounded px-3 py-2 cursor-pointer hover:bg-gray-100">
                  Click here to upload images
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                    className="hidden"
                  />
                </label>
              )}

              {formData.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded max-w-full"
                    >
                      <span className="text-sm truncate max-w-[220px] sm:max-w-[320px]">
                        {typeof img === "string" ? img : img?.filename}
                      </span>

                      <button
                        type="button"
                        className="text-red-500 font-bold hover:text-red-700"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== idx),
                          }))
                        }
                        aria-label="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#6BEE32] text-black py-2 rounded hover:border hover:border-[#6BEE32] hover:bg-transparent"
            >
              {marker ? "Save Changes" : "Add Marker"}
            </button>
          </form>
        </div>
      </div>

      {showMiniMap && (
        <MiniMapPopup
          setShowMiniMap={setShowMiniMap}
          lat={formData.location.lat}
          lng={formData.location.lng}
          onChange={({ lat, lng }) =>
            setFormData((prev) => ({
              ...prev,
              location: {
                ...prev.location,
                lat: lat.toFixed(6),
                lng: lng.toFixed(6),
              },
            }))
          }
        />
      )}
    </div>
  );
}
