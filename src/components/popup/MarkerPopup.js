import { categoryData } from "@/data/categoryData";
import { useEffect, useState } from "react";

export default function MarkerPopup({ show, onClose, marker }) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const initializeForm = () => {
      if (marker) {
        setFormData({
          title: marker.title || "",
          location: marker.location.name || "",
          category: marker.category.name || "",
          description: marker.description || "",
          images: marker.images || [],
          status: marker.status || "PENDING",
        });
      } else {
        setFormData({
          title: "",
          location: "",
          category: "",
          description: "",
          images: [],
          status: "PENDING",
        });
      }
    };

    initializeForm();
  }, [marker]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files.map((f) => f.name) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //// either add new marker or update existing marker
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white p-6 rounded-xl w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-[#FF4B4B] cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">
          {marker ? "Edit Marker" : "Add Marker"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

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

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded resize-none"
            rows={4}
            required
          />

          {/* Image Upload / Display */}
          <div>
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
                    className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
                  >
                    <span className="text-sm">{img.url}</span>
                    <button
                      type="button"
                      className="text-red-500 font-bold hover:text-red-700"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          images: formData.images.filter((_, i) => i !== idx),
                        })
                      }
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
  );
}
