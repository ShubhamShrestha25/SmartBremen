"use client";

import { useEffect, useMemo, useState } from "react";

const DEFAULT_FORM = {
  name: "",
  color: "#000000",
  icon: "",
};

export default function CategoryPopup({ show, onClose, category, onSubmit }) {
  const [formData, setFormData] = useState(DEFAULT_FORM);

  const isEdit = useMemo(() => Boolean(category), [category]);

  useEffect(() => {
    if (!show) return;

    const initializeForm = () => {
      if (category) {
        setFormData({
          name: category?.name ?? "",
          color: category?.color ?? "#000000",
          icon: category?.iconUrl ?? "",
        });
      } else {
        setFormData(DEFAULT_FORM);
      }
    };
    initializeForm();
  }, [category, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...(prev ?? DEFAULT_FORM),
      [name]: value,
    }));
  };

  const handleIconChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({
      ...(prev ?? DEFAULT_FORM),
      icon: file,
    }));
  };

  const removeIcon = () => {
    setFormData((prev) => ({
      ...(prev ?? DEFAULT_FORM),
      icon: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      color: formData.color,
      icon: formData.icon,
    };

    onSubmit?.(payload);
    onClose?.();
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
          >
            ✕
          </button>

          <h2 className="font-bold mb-4 text-lg md:text-xl pr-8">
            {isEdit ? "Edit Category" : "Add Category"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 text-sm md:text-base"
          >
            <div>
              <label className="block font-medium text-sm">Title *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-sm">Color *</label>

              <div className="flex items-center gap-3">
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="h-10 w-12 border rounded cursor-pointer"
                  aria-label="Pick color"
                />

                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="flex-1 border px-3 py-2 rounded"
                  placeholder="#000000"
                  required
                />

                <span
                  className="px-2 py-1 rounded text-xs border"
                  style={{ color: formData.color }}
                >
                  {formData.color}
                </span>
              </div>
            </div>

            <div>
              <label className="block font-medium text-sm">Icon</label>

              {!formData.icon && (
                <label className="w-full flex justify-center items-center border border-gray-300 rounded px-3 py-2 cursor-pointer hover:bg-gray-100">
                  Click here to upload icon
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleIconChange}
                    className="hidden"
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
                    />
                  </label>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#6BEE32] text-black py-2 rounded hover:border hover:border-[#6BEE32] hover:bg-transparent"
            >
              {isEdit ? "Save Changes" : "Add Category"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
