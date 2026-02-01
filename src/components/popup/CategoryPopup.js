"use client";

import { useEffect, useMemo, useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const DEFAULT_FORM = {
  name: "",
  color: "#3498db",
  icon: "",
  description: "",
  subcategories: [],
};

const PRESET_COLORS = [
  { name: "Red", value: "#e74c3c" },
  { name: "Blue", value: "#3498db" },
  { name: "Green", value: "#27ae60" },
  { name: "Purple", value: "#9b59b6" },
  { name: "Orange", value: "#f39c12" },
  { name: "Teal", value: "#1abc9c" },
  { name: "Pink", value: "#e91e63" },
  { name: "Indigo", value: "#673ab7" },
  { name: "Brown", value: "#8d6e63" },
  { name: "Deep Orange", value: "#ff5722" },
];

export default function CategoryPopup({ show, onClose, category, onSubmit, loading }) {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [newSubcategory, setNewSubcategory] = useState("");

  const isEdit = useMemo(() => Boolean(category), [category]);

  useEffect(() => {
    if (!show) return;

    if (category) {
      setFormData({
        name: category?.name ?? "",
        color: category?.color ?? "#3498db",
        icon: category?.iconUrl ?? "",
        description: category?.description ?? "",
        subcategories: category?.subcategories ?? [],
      });
    } else {
      setFormData(DEFAULT_FORM);
    }
    setNewSubcategory("");
  }, [category, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      icon: file,
    }));
  };

  const removeIcon = () => {
    setFormData((prev) => ({
      ...prev,
      icon: "",
    }));
  };

  const handleAddSubcategory = () => {
    const trimmed = newSubcategory.trim();
    if (!trimmed) return;
    
    // Check if already exists
    if (formData.subcategories.some(s => s.name.toLowerCase() === trimmed.toLowerCase())) {
      alert("Subcategory already exists");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      subcategories: [...prev.subcategories, { name: trimmed, description: "" }],
    }));
    setNewSubcategory("");
  };

  const handleRemoveSubcategory = (index) => {
    setFormData((prev) => ({
      ...prev,
      subcategories: prev.subcategories.filter((_, i) => i !== index),
    }));
  };

  const handleSubcategoryDescChange = (index, description) => {
    setFormData((prev) => ({
      ...prev,
      subcategories: prev.subcategories.map((sub, i) => 
        i === index ? { ...sub, description } : sub
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      color: formData.color,
      icon: formData.icon,
      description: formData.description.trim(),
      subcategories: formData.subcategories,
    };

    onSubmit?.(payload);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSubcategory();
    }
  };

  if (!show) return null;

  const iconLabel =
    typeof formData.icon === "string"
      ? formData.icon
        ? formData.icon.split("/").pop()
        : ""
      : formData.icon?.name;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="flex min-h-dvh items-center justify-center p-3 sm:p-6">
        <div className="relative w-full sm:max-w-lg bg-white rounded-xl shadow-lg max-h-[90dvh] overflow-y-auto p-4 sm:p-6">
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-[#FF4B4B] cursor-pointer text-xl"
            aria-label="Close"
            type="button"
            disabled={loading}
          >
            ✕
          </button>

          <h2 className="font-bold mb-4 text-lg md:text-xl pr-8">
            {isEdit ? "Edit Category" : "Add Category"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm md:text-base">
            {/* Category Name */}
            <div>
              <label className="block font-medium text-sm mb-1">Category Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Street Art, Historic Buildings"
                required
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium text-sm mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Brief description of this category..."
                rows={2}
                disabled={loading}
              />
            </div>

            {/* Color */}
            <div>
              <label className="block font-medium text-sm mb-1">Color *</label>
              
              {/* Preset Colors */}
              <div className="flex flex-wrap gap-2 mb-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, color: c.value }))}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                      formData.color === c.value ? 'border-black ring-2 ring-offset-1 ring-black' : 'border-white'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                    disabled={loading}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="h-10 w-12 border rounded cursor-pointer"
                  aria-label="Pick color"
                  disabled={loading}
                />
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#3498db"
                  required
                  disabled={loading}
                />
                <span
                  className="px-3 py-1.5 rounded text-sm font-medium text-white"
                  style={{ backgroundColor: formData.color }}
                >
                  Preview
                </span>
              </div>
            </div>

            {/* Icon */}
            <div>
              <label className="block font-medium text-sm mb-1">Icon</label>

              {!formData.icon && (
                <label className="w-full flex justify-center items-center border border-dashed border-gray-300 rounded px-3 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-gray-500">Click to upload icon image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleIconChange}
                    className="hidden"
                    disabled={loading}
                  />
                </label>
              )}

              {formData.icon && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded max-w-full">
                    <span className="text-sm truncate max-w-[220px] sm:max-w-[320px]">
                      {iconLabel || "icon"}
                    </span>
                    <button
                      type="button"
                      className="text-red-500 font-bold hover:text-red-700"
                      onClick={removeIcon}
                      aria-label="Remove icon"
                      disabled={loading}
                    >
                      ×
                    </button>
                  </div>
                  <label className="border rounded px-3 py-1 cursor-pointer hover:bg-gray-50 text-sm">
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIconChange}
                      className="hidden"
                      disabled={loading}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Subcategories */}
            <div>
              <label className="block font-medium text-sm mb-1">
                Subcategories <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              
              {/* Add new subcategory */}
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add subcategory name..."
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={handleAddSubcategory}
                  className="px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors flex items-center gap-1"
                  disabled={loading || !newSubcategory.trim()}
                >
                  <MdAdd className="text-lg" />
                  Add
                </button>
              </div>

              {/* Subcategories list */}
              {formData.subcategories.length > 0 && (
                <div className="space-y-2 mt-3 max-h-48 overflow-y-auto">
                  {formData.subcategories.map((sub, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-2 bg-gray-50 p-2 rounded border"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-3 h-3 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: formData.color }}
                          />
                          <span className="font-medium text-sm">{sub.name}</span>
                        </div>
                        <input
                          type="text"
                          value={sub.description}
                          onChange={(e) => handleSubcategoryDescChange(index, e.target.value)}
                          className="w-full mt-1 text-xs border px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Description (optional)"
                          disabled={loading}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubcategory(index)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                        aria-label="Remove subcategory"
                        disabled={loading}
                      >
                        <MdClose />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {formData.subcategories.length === 0 && (
                <p className="text-xs text-gray-400 mt-1">
                  No subcategories added. Leave empty if this category doesn&apos;t need subcategories.
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !formData.name.trim()}
              className="w-full bg-[#6BEE32] text-black font-medium py-2.5 rounded hover:bg-[#5dd428] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  {isEdit ? "Saving..." : "Creating..."}
                </>
              ) : (
                isEdit ? "Save Changes" : "Create Category"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
