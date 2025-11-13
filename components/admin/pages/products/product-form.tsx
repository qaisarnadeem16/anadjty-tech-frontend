'use client'
import { Plus, X } from "lucide-react";
import React from "react";
import CustomInput from "../../shared/custom-input";
import CustomSelect from "../../shared/custom-select";
import Button from "@/components/ui/button";
import ImageUploader from "../../shared/image-uploader";

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

  console.log(formData)

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
          <ImageUploader
            images={formData.images}
            setImages={(images) => setFormData({ images })}
            onImageUpload={onImageUpload}
            maxImages={1}
            title="Upload Product Image"
            uploading={uploading}
          />

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