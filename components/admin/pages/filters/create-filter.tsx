"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FilterForm from "./filter-form";

interface formData {
    name: string;
    category: string;
    status: "active" | "inactive";
  };

const filterCategories = [
  "Pricing",
  "Brand",
  "Appearance",
  "Specifications",
  "Reviews",
  "Inventory",
  "Delivery",
];

export default function CreateFilterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<formData>({
    name: "",
    category: "",
    status: "active",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category) {
      toast.error("Filter name and category are required.");
      return;
    }

    setSubmitting(true);
    await new Promise((res) => setTimeout(res, 800)); // simulate API
    toast.success("Filter created successfully!");
    setSubmitting(false);
    router.push("/dashboard/filters");
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 once-h-screen">
      <FilterForm
        isEditMode={false}
        submitButtonLabel="Create Filter"
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        filterCategories={filterCategories}
        submitting={submitting}
      />
    </div>
  );
}