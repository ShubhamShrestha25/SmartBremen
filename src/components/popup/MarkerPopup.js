import { categoryData } from "@/data/categoryData";
import { useEffect, useState } from "react";

export default function MarkerPopup({ show, onClose, marker }) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const initializeForm = () => {
      if (marker) {
        setFormData({
          title: marker.title || "",
          location: marker.location?.name || "",
          category: marker.category?.name || "",
          description: marker.description || "",
          images: marker.images || [],
          status: marker.status || "PENDING",
          author: {
            firstName: marker.author?.firstName || "",
            lastName: marker.author?.lastName || "",
          },
        });
      } else {
        setFormData({
          title: "",
          location: "",
          category: "",
          description: "",
          images: [],
          status: "PENDING",
          author: {
            firstName: "",
            lastName: "",
          },
        });
      }
    };

    initializeForm();
  }, [marker]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAuthorChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      author: {
        ...prev.author,
        [name]: value,
      },
    }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    // keeping your current behavior (store names). If you want actual File objects, tell me.
    setFormData((prev) => ({ ...prev, images: files.map((f) => f.name) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // either add new marker or update existing marker
    onClose();
  };

  if (!show || !formData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white p-6 rounded-xl w-85 relative sm:w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-[#FF4B4B] cursor-pointer text-xl"
        >
          ✕
        </button>

        <h2 className="font-bold mb-4 md:text-xl">
          {marker ? "Edit Marker" : "Add Marker"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 text-sm md:text-base"
        >
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

          {/* Author */}
          <div className="flex gap-2">
            <input
              type="text"
              name="firstName"
              placeholder="Author First Name"
              value={formData.author.firstName}
              onChange={handleAuthorChange}
              className="w-1/2 border px-3 py-2 rounded"
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Author Last Name"
              value={formData.author.lastName}
              onChange={handleAuthorChange}
              className="w-1/2 border px-3 py-2 rounded"
              required
            />
          </div>

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
                    <span className="text-sm">
                      {typeof img === "string" ? img : img?.url}
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
