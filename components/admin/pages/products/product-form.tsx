'use client'
import { Plus, X } from "lucide-react";
import React from "react";
import CustomInput from "../../shared/custom-input";
import CustomSelect from "../../shared/custom-select";
import Button from "@/components/ui/button";

interface ProductFormProps {
  isEditMode: boolean;
  submitButtonLabel: string;
  handleSubmit: (e: React.FormEvent) => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  categories: { id: string; name: string }[];
  tagInput: string;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
  addFeature: () => void;
  removeFeature: (tag: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  uploading: boolean;
  submitting: boolean;
  loadingCategories: boolean;
  onImageUpload?: (files: File[]) => Promise<void>;
}

const ProductForm = ({
  isEditMode,
  submitButtonLabel,
  handleSubmit,
  formData,
  setFormData,
  categories,
  tagInput,
  setTagInput,
  addFeature,
  removeFeature,
  fileInputRef,
  uploading,
  submitting,
  loadingCategories,
  onImageUpload,
}: ProductFormProps) => {
  return (
    <div className="mx-auto shadow-lg border border-gray-200 rounded-2xl bg-white">
      <div className="px-8 pt-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditMode ? "Update Product" : "Create Product"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isEditMode
            ? "Update the details below to modify the product."
            : "Fill out the details below to add a new product."}
        </p>
      </div>

      <div className="p-8 space-y-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* --- Basic Info --- */}
          <div className="grid md:grid-cols-2 gap-6">
            <CustomInput
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={uploading || submitting || loadingCategories}
              required
            />

            <CustomSelect
              placeholder={
                loadingCategories ? "Loading categories..." : "Select category"
              }
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              disabled={uploading || submitting || loadingCategories}
            >
              <option value="">None</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </CustomSelect>

            <CustomInput
              placeholder="Enter price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              disabled={uploading || submitting || loadingCategories}
              required
            />

            <CustomInput
              placeholder="Enter quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              disabled={uploading || submitting || loadingCategories}
            />

            <CustomSelect
              placeholder="Select status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              disabled={uploading || submitting || loadingCategories}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </CustomSelect>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                  disabled={uploading || submitting || loadingCategories}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Published</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  disabled={uploading || submitting || loadingCategories}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Featured</span>
              </label>
            </div>
          </div>

          {/* --- Description --- */}
          <div className="relative">
            <textarea
              placeholder="Enter product description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="
                w-full px-4 py-3 border-2 border-[#B0B0B0] rounded-md
                focus:outline-none focus:ring-[1px] focus:ring-[#1A3447] focus:border-[#1A3447]
                min-h-[100px] peer
              "
              disabled={uploading || submitting || loadingCategories}
              required
            />
            <label
              className="
                absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-sm text-gray-600
                peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white 
                peer-focus:px-1 peer-focus:text-sm peer-focus:text-gray-600
                pointer-events-none
              "
            >
              Description
            </label>
          </div>

          {/* --- Images --- */}
          <section className="w-full">
            <h2 className="font-semibold text-gray-700 mb-3">Product Images</h2>
            <div className="space-y-4">
              {/* Image Upload Input */}
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={async (e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) {
                      // Limit total images to 10
                      const remainingSlots = 10 - formData.images.length;
                      if (remainingSlots <= 0) {
                        alert("Maximum 10 images allowed. Please remove some images first.");
                        if (e.target) {
                          e.target.value = "";
                        }
                        return;
                      }

                      // Validate file sizes
                      const validFiles: File[] = [];
                      for (const file of files) {
                        if (file.size > 5 * 1024 * 1024) {
                          alert(`${file.name} is too large. Maximum size is 5MB.`);
                          continue;
                        }
                        validFiles.push(file);
                      }

                      const filesToProcess = validFiles.slice(0, remainingSlots);
                      
                      if (filesToProcess.length > 0) {
                        // If onImageUpload callback is provided, use it (Cloudinary upload)
                        if (onImageUpload) {
                          try {
                            await onImageUpload(filesToProcess);
                          } catch (error: any) {
                            alert(error.message || "Failed to upload images");
                          }
                        } else {
                          // Fallback: use base64 (for preview only)
                          filesToProcess.forEach((file) => {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const imageUrl = reader.result as string;
                              if (!formData.images.includes(imageUrl)) {
                                setFormData({
                                  ...formData,
                                  images: [...formData.images, imageUrl],
                                });
                              }
                            };
                            reader.readAsDataURL(file);
                          });
                        }

                        if (files.length > remainingSlots) {
                          alert(`Only ${remainingSlots} image(s) added. Maximum 10 images allowed.`);
                        }
                      }
                    }
                    // Reset input
                    if (e.target) {
                      e.target.value = "";
                    }
                  }}
                  className="hidden"
                  disabled={uploading || submitting || loadingCategories}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || submitting || loadingCategories}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md border border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Plus size={16} />
                  {uploading ? "Uploading..." : "Upload Images"}
                </button>
              </div>

              {/* Image Preview Grid */}
              {formData.images && formData.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                  {formData.images.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="relative group aspect-square border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-100"
                    >
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            images: formData.images.filter((_: string, i: number) => i !== index),
                          });
                        }}
                        disabled={uploading || submitting || loadingCategories}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                        aria-label={`Remove image ${index + 1}`}
                      >
                        <X size={14} />
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Primary
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                First image will be used as the primary product image. Maximum 10 images. Max file size: 5MB per image. Supported formats: JPG, JPEG, PNG, WEBP.
              </p>
            </div>
          </section>

          {/* --- Tags --- */}
          <section className="w-full ">
            <h2 className="font-semibold text-gray-700 mb-3">Features</h2>
            <div className="flex items-center gap-3 w-full">
              <CustomInput
                placeholder="Add Feature"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                disabled={uploading || submitting || loadingCategories}
                className="sm:w-[80%] w-full"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-3 flex-1 bg-[#1A3447] justify-center text-white rounded-md hover:bg-[#2c4a6b] flex items-center gap-2"
                disabled={uploading || submitting || loadingCategories}
              >
                <Plus size={16} />
                Add Feature
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.features.map((feature: string, i: number) => (
                <div
                  key={i}
                  className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 flex items-center gap-2"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(feature)}
                    className="text-gray-500 hover:text-red-500"
                    disabled={uploading || submitting || loadingCategories}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* --- Submit --- */}
          <div className="flex justify-end">
            <button
              disabled={uploading || submitting || loadingCategories}
              type="submit"
              className="px-8 py-4 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-950"
            >
              {submitting ? (isEditMode ? "Updating..." : "Creating...") : submitButtonLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;