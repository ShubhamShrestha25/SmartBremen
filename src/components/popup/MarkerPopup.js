import { categoryData } from "@/data/categoryData";
import { useEffect, useState } from "react";
import { createImageSubmission, getCategories } from "@/lib/firestore";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { MiniMapPopup } from "./MiniMapPopup";

import { FaLocationCrosshairs } from "react-icons/fa6";

import useAuthStore from "@/store/useAuthStore";

export default function MarkerPopup({ show, onClose, marker, onRefresh }) {
  const [formData, setFormData] = useState(null);
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [firestoreCategories, setFirestoreCategories] = useState([]);

  const { role, userId } = useAuthStore();

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories();
      setFirestoreCategories(cats);
    };
    fetchCategories();
  }, []);
  


  useEffect(() => {
    const initializeForm = () => {
      if (marker) {
        setFormData({
          title: marker.title || "",
          location: marker.location?.name || "",
          lat: marker.location?.lat || marker._original?.lat || "",
          lng: marker.location?.lng || marker._original?.lng || "",
          category: marker.category?.name || "",
          categoryId: marker.category?.informalityCategoryId || marker._original?.categoryId || "",
          description: marker.description || "",
          images: marker.images || [],
          imageFiles: [],
          status: marker.status || "pending",
          author: {
            firstName: marker.author?.firstName || "",
            lastName: marker.author?.lastName || "",
          },
        });
      } else {
        setFormData({
          title: "",
          location: "",
          lat: "53.0793",
          lng: "8.8017",
          category: "",
          categoryId: "",
          description: "",
          images: [],
          imageFiles: [],
          status: "pending",
          author: {
            firstName: "",
            lastName: "",
          },
        });
      }
    };
    initializeForm();
    setError("");
  }, [marker, show]);

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

  const handleCategoryChange = (e) => {
    const selectedName = e.target.value;
    // Find matching Firestore category
    const firestoreCat = firestoreCategories.find((c) => c.name === selectedName);
    setFormData((prev) => ({
      ...prev,
      category: selectedName,
      categoryId: firestoreCat?.id || "",
    }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files.map((f) => f.name),
      imageFiles: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.lat || !formData.lng) {
        setError("Please fill in Title, Latitude, and Longitude");
        setLoading(false);
        return;
      }

      if (!formData.categoryId) {
        setError("Please select a category");
        setLoading(false);
        return;
      }

      // Upload image to Cloudinary if file selected
      let imageUrl = "/images/marker-popup-default.png";
      let thumbnailUrl = "/images/marker-popup-default.png";
      let markerUrl = "/images/marker-popup-default.png";
      let mediaType = "image";

      if (formData.imageFiles && formData.imageFiles.length > 0) {
        try {
          const categoryName = firestoreCategories.find(c => c.id === formData.categoryId)?.name || "general";
          const uploadResult = await uploadToCloudinary(formData.imageFiles[0], categoryName);
          imageUrl = uploadResult.imageUrl;
          thumbnailUrl = uploadResult.thumbnailUrl;
          markerUrl = uploadResult.markerUrl;
          mediaType = uploadResult.mediaType || "image";
        } catch (uploadError) {
          console.error("Cloudinary upload failed:", uploadError);
          setError("Failed to upload image. Please try again.");
          setLoading(false);
          return;
        }
      }

      // Create the image submission data
      const imageData = {
        title: formData.title,
        description: formData.description || "",
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        categoryId: formData.categoryId,
        artistId: userId,
        metadata: {
          locationName: formData.location || "",
          authorName: `${formData.author.firstName} ${formData.author.lastName}`.trim(),
        },
        imageUrl,
        thumbnailUrl,
        markerUrl,
        mediaType,
      };

      if (marker) {
        // TODO: Update existing marker
        console.log("Update marker:", imageData);
        alert("Update functionality coming soon!");
      } else {
        // Create new marker
        const newId = await createImageSubmission(imageData);
        if (!newId) {
          throw new Error("Failed to create marker");
        }
        console.log("✅ Created new marker with ID:", newId);
        alert("Marker created successfully! It will appear after admin approval.");
      }

      onRefresh?.();
      onClose();
    } catch (err) {
      console.error("Error saving marker:", err);
      setError(err.message || "Failed to save marker. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!show || !formData) return null;

  return (

        <h2 className="font-bold mb-4 md:text-xl">
          {marker ? "Edit Marker" : "Add Marker"}
        </h2>

      

        <form
          onSubmit={handleSubmit}
          className="space-y-3 text-sm md:text-base"
        >
         
        

          <select
            name="category"
            value={formData.category || ""}
            onChange={handleCategoryChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {firestoreCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

      

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

          {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 text-sm rounded">
            {error}
          </div>
        )}

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
            name="location"
            placeholder="Location Name (optional)"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
            </div>

            {/* Latitude & Longitude */}
            <div>
              <label className="block font-medium text-sm">Coordinates *</label>
                <input
              type="text"
              name="lat"
              placeholder="Latitude"
              value={formData.lat}
              onChange={handleChange}
              className="w-1/2 border px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              name="lng"
              placeholder="Longitude"
              value={formData.lng}
              onChange={handleChange}
              className="w-1/2 border px-3 py-2 rounded"
              required
            />
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
            disabled={loading}
            className="w-full bg-[#6BEE32] text-black py-2 rounded hover:border hover:border-[#6BEE32] hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : marker ? "Save Changes" : "Add Marker"}
          </button>
        </form>
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
