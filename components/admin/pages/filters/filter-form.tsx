'use client'
import React from "react";
import CustomInput from "../../shared/custom-input";
import CustomSelect from "../../shared/custom-select";
import Button from "../../shared/custom-btn";

interface FilterFormProps {
  isEditMode: boolean;
  submitButtonLabel: string;
  handleSubmit: (e: React.FormEvent) => void;
  formData: {
    name: string;
    category: string;
    status: "active" | "inactive";
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      category: string;
      status: "active" | "inactive";
    }>
  >;
  filterCategories: string[];
  submitting: boolean;
}

const FilterForm = ({
  isEditMode,
  submitButtonLabel,
  handleSubmit,
  formData,
  setFormData,
  filterCategories,
  submitting,
}: FilterFormProps) => {
  return (
    <div className="mx-auto shadow-lg border border-gray-200 rounded-2xl bg-white">
      <div className="px-8 pt-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditMode ? "Update Filter" : "Create Filter"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isEditMode
            ? "Update the filter details below."
            : "Fill out the details below to add a new filter."}
        </p>
      </div>

      <div className="p-8 space-y-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* --- Basic Info --- */}
          <div className="grid md:grid-cols-2 gap-6">
            <CustomInput
              placeholder="Enter filter name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={submitting}
            />

            <CustomSelect
              placeholder="Select category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              disabled={submitting}
            >
              <option value="">None</option>
              {filterCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </CustomSelect>

            <CustomSelect
              placeholder="Select status"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "active" | "inactive",
                })
              }
              disabled={submitting}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </CustomSelect>
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

export default FilterForm;