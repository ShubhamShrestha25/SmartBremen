import { useEffect, useState } from "react";
import {
  createImageSubmission,
  getCategories,
  updateImageSubmission,
} from "@/lib/firestore";
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
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const { role, userId } = useAuthStore();

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories();
      setFirestoreCategories(cats);
    };
    fetchCategories();
  }, []);

  //setting form for new marker or selected marker
  useEffect(() => {
    const initializeForm = () => {
      if (marker) {
        setFormData({
          title: marker.title || "",
          location: marker.location?.name || "",
          lat: marker.location?.lat || marker._original?.lat || "",
          lng: marker.location?.lng || marker._original?.lng || "",
          category: marker.category?.name || "",
          categoryId:
            marker.category?.informalityCategoryId ||
            marker._original?.categoryId ||
            "",
          subcategoryId: marker._original?.subcategoryId || "",
          description: marker.description || "",
          images: marker.images || [],
          imageFiles: [],
          status: marker.status || "pending",
          author: {
            firstName: marker.author?.firstName || "",
            lastName: marker.author?.lastName || "",
          },
        });
        // Set available subcategories for existing marker
        const catId =
          marker.category?.informalityCategoryId ||
          marker._original?.categoryId;
        if (catId) {
          const cat = firestoreCategories.find((c) => c.id === catId);
          setAvailableSubcategories(cat?.subcategories || []);
        }
      } else {
        setFormData({
          title: "",
          location: "",
          lat: "53.0793",
          lng: "8.8017",
          category: "",
          categoryId: "",
          subcategoryId: "",
          description: "",
          images: [],
          imageFiles: [],
          status: "pending",
          author: {
            firstName: "",
            lastName: "",
          },
        });
        setAvailableSubcategories([]);
      }
    };

    initializeForm();
    setError("");
  }, [marker, show]);

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

  const handleCategoryChange = (e) => {
    const selectedName = e.target.value;
    // Find matching Firestore category
    const firestoreCat = firestoreCategories.find(
      (c) => c.name === selectedName,
    );

    setFormData((prev) => ({
      ...prev,
      category: selectedName,
      categoryId: firestoreCat?.id || "",
      subcategoryId: "", // Reset subcategory when category changes
    }));

    // Update available subcategories
    const subcats = firestoreCat?.subcategories || [];
    setAvailableSubcategories(subcats);
  };

  const handleSubcategoryChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      subcategoryId: e.target.value,
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
      let imageUrl = marker?._original?.imageUrl || "/images/marker-popup-default.png";
      let thumbnailUrl = marker?._original?.thumbnailUrl || "/images/marker-popup-default.png";
      let markerUrl = marker?._original?.markerUrl || "/images/marker-popup-default.png";
      let mediaType = marker?._original?.mediaType || "image";

      // Handle multiple images (imageUrls array)
      let imageUrls = marker?._original?.imageUrls || null;
      let thumbnailUrls = marker?._original?.thumbnailUrls || null;
      let markerUrls = marker?._original?.markerUrls || null;

      if (formData.imageFiles && formData.imageFiles.length > 0) {
        try {
          const categoryName =
            firestoreCategories.find((c) => c.id === formData.categoryId)
              ?.name || "general";
          const subcategoryName =
            availableSubcategories.find((s) => s.id === formData.subcategoryId)
              ?.name || null;
          const uploadResult = await uploadToCloudinary(
            formData.imageFiles[0],
            categoryName,
            subcategoryName,
          );
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
      const lat = parseFloat(formData.lat);
      const lng = parseFloat(formData.lng);
      
      // Validate lat/lng are valid numbers
      if (isNaN(lat) || isNaN(lng)) {
        setError("Invalid coordinates. Please check latitude and longitude.");
        setLoading(false);
        return;
      }

      const imageData = {
        title: formData.title,
        description: formData.description || "",
        lat,
        lng,
        categoryId: formData.categoryId,
        subcategoryId: formData.subcategoryId || null,
        artistId: marker?._original?.artistId || userId,
        metadata: {
          locationName: formData.location || "",
          authorName:
            `${formData.author.firstName} ${formData.author.lastName}`.trim(),
        },
        // Always use lowercase status for Firestore queries
        status: role.toLowerCase() === "admin" 
          ? formData.status.toLowerCase() 
          : (marker?._original?.status || marker?.status?.toLowerCase() || "pending"),
        imageUrl,
        thumbnailUrl,
        markerUrl,
        mediaType,
        // Preserve multiple images if they exist
        ...(imageUrls && { imageUrls }),
        ...(thumbnailUrls && { thumbnailUrls }),
        ...(markerUrls && { markerUrls }),
        // Preserve createdAt timestamp
        ...(marker?._original?.createdAt && { createdAt: marker._original.createdAt }),
      };

      if (marker) {
        // TODO: Update existing marker
        const success = await updateImageSubmission(marker.id, imageData);

        if (!success) {
          throw new Error("Failed to update marker");
        }
        alert("Marker updated successfully!");
      } else {
        // Create new marker
        const newId = await createImageSubmission(imageData);
        if (!newId) {
          throw new Error("Failed to create marker");
        }
        console.log("✅ Created new marker with ID:", newId);
        alert(
          "Marker created successfully! It will appear after admin approval.",
        );
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
              <label className="block font-medium mb-1 text-sm">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-sm"
                required
              />
            </div>

            {/* Location Name */}
            <div>
              <label className="block font-medium mb-1 text-sm">
                Location Name *
              </label>
              <input
                type="text"
                name="location"
                placeholder="Location Name (optional)"
                value={formData.location}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-sm"
              />
            </div>

            {/* Latitude & Longitude */}
            <div>
              <label className="block font-medium mb-1 text-sm">
                Coordinates *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="lat"
                  placeholder="Latitude"
                  value={formData.lat}
                  onChange={handleChange}
                  className="w-1/2 border px-3 py-2 rounded text-sm"
                  required
                />
                <input
                  type="text"
                  name="lng"
                  placeholder="Longitude"
                  value={formData.lng}
                  onChange={handleChange}
                  className="w-1/2 border px-3 py-2 rounded text-sm"
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
              <label className="block font-medium mb-1 text-sm">
                Category *
              </label>
              <select
                name="category"
                value={formData.category || ""}
                onChange={handleCategoryChange}
                className="w-full border px-3 py-2 rounded text-sm"
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
            </div>

            {/* Subcategory - only show if category has subcategories */}
            {availableSubcategories.length > 0 && (
              <div>
                <label className="block font-medium mb-1 text-sm">
                  Subcategory
                </label>
                <select
                  name="subcategoryId"
                  value={formData.subcategoryId || ""}
                  onChange={handleSubcategoryChange}
                  className="w-full border px-3 py-2 rounded text-sm"
                >
                  <option value="">Select Subcategory (optional)</option>
                  {availableSubcategories.map((sub, index) => (
                    <option key={sub.id || sub.name || index} value={sub.id || sub.name}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Status */}
            {role.toLowerCase() === "admin" && marker && (
              <div>
                <label className="block font-medium mb-1 text-sm">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded text-sm"
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
              <label className="block font-medium mb-1 text-sm">Author*</label>
              <div className="flex gap-2 text-sm">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Author First Name"
                  value={formData.author.firstName}
                  onChange={handleAuthorChange}
                  className="w-1/2 border px-3 py-2 rounded"
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Author Last Name"
                  value={formData.author.lastName}
                  onChange={handleAuthorChange}
                  className="w-1/2 border px-3 py-2 rounded"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium text-sm">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-sm"
                rows={4}
                placeholder="Optional description..."
              />
            </div>

            {/* Images */}
            {!marker && (
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
            )}

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
            lat={formData.lat}
            lng={formData.lng}
            onChange={({ lat, lng }) =>
              setFormData((prev) => ({
                ...prev,
                lat: lat.toFixed(4),
                lng: lng.toFixed(4),
              }))
            }
          />
        )}
      </div>
    </div>
  );
}
