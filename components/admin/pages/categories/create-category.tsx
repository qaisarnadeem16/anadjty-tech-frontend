"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createCategory } from "@/lib/api/categories";
import CategoryForm from "./category-form";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    featured: false,
    published: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Category name is required.");
      return;
    }

    setSubmitting(true);

    try {
      const categoryData = {
        name: formData.name,
        description: formData.description || undefined,
        image: formData.image || undefined,
        featured: formData.featured,
        published: formData.published,
      };

      const response = await createCategory(categoryData);
      toast.success("Category created successfully!");
      // Use router.replace to avoid back button issues
      router.replace("/admin/categories");
    } catch (error: any) {
      toast.error(error.message || "Failed to create category");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <CategoryForm
        isEditMode={false}
        submitButtonLabel="Create Category"
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        submitting={submitting}
      />
    </div>
  );
}