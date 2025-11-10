'use client'
import React from "react";
import CustomInput from "../../shared/custom-input";
import Button from "../../shared/custom-btn";

interface CategoryFormProps {
  isEditMode: boolean;
  submitButtonLabel: string;
  handleSubmit: (e: React.FormEvent) => void;
  formData: { 
    name: string;
    description?: string;
    image?: string;
    featured?: boolean;
    published?: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  submitting: boolean;
}

const CategoryForm = ({
  isEditMode,
  submitButtonLabel,
  handleSubmit,
  formData,
  setFormData,
  submitting,
}: CategoryFormProps) => {
  return (
    <div className="mx-auto shadow-lg border border-gray-200 rounded-2xl bg-white">
      <div className="px-8 pt-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditMode ? "Update Category" : "Create Category"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isEditMode
            ? "Update the category name below."
            : "Fill out the details below to add a new category."}
        </p>
      </div>

      <div className="p-8 space-y-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* --- Name --- */}
          <div className="grid md:grid-cols-2 gap-6">
            <CustomInput
              placeholder="Enter category name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={submitting}
            />
          </div>

          {/* --- Description --- */}
          <div className="relative">
            <textarea
              placeholder="Enter category description (optional)"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="
                w-full px-4 py-3 border-2 border-[#B0B0B0] rounded-md
                focus:outline-none focus:ring-[1px] focus:ring-[#1A3447] focus:border-[#1A3447]
                min-h-[100px] peer
              "
              disabled={submitting}
            />
            <label
              className="
                absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-sm text-gray-600
                peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white 
                peer-focus:px-1 peer-focus:text-sm peer-focus:text-gray-600
                pointer-events-none
              "
            >
              Description (Optional)
            </label>
          </div>

          {/* --- Options --- */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published !== undefined ? formData.published : true}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                disabled={submitting}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured || false}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                disabled={submitting}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">Featured</span>
            </label>
          </div>

          {/* --- Submit --- */}
          <div className="flex justify-end">
            <Button
              label={submitButtonLabel}
              loading={submitting}
              disabled={submitting}
              type="submit"
              loadingLabel={isEditMode ? "Updating..." : "Creating..."}
              style="px-8 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;