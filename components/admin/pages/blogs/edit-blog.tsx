"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { getBlogById, updateBlog } from "@/lib/api/blogs";
import BlogForm from "./blog-form";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id as string;
  const fileInputRef = useRef<HTMLInputElement | any>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    excerpt: "",
    heroImage: "",
    content: "",
    status: "draft" as "draft" | "published",
    category: "",
    tags: [] as string[],
    difficulty: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    badges: [] as string[],
    keyTakeaways: [] as string[],
    pros: [] as string[],
    cons: [] as string[],
  });

  useEffect(() => {
    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await getBlogById(blogId);
      const blog = response.blog;
      
      setFormData({
        title: blog.title || "",
        description: blog.excerpt || blog.description || "",
        excerpt: blog.excerpt || "",
        heroImage: blog.hero || blog.thumbnail || blog.image || "",
        content: blog.content || "",
        status: blog.published ? "published" : "draft",
        category: blog.category || "",
        tags: blog.tags || [],
        difficulty: blog.difficulty || "Beginner",
        badges: blog.badges || [],
        keyTakeaways: blog.keyTakeaways || [],
        pros: blog.pros || [],
        cons: blog.cons || [],
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch blog");
      router.push("/admin/blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // For now, convert to base64. In production, upload to Cloudinary
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, heroImage: reader.result as string });
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      toast.error("Failed to upload image");
      setUploading(false);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, heroImage: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || !formData.content.trim()) {
      toast.error("Title, description, and content are required.");
      return;
    }

    setSubmitting(true);

    try {
      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt || formData.description,
        content: formData.content,
        published: formData.status === "published",
        category: formData.category || "Guides",
        tags: formData.tags,
        difficulty: formData.difficulty,
        badges: formData.badges,
        keyTakeaways: formData.keyTakeaways,
        pros: formData.pros,
        cons: formData.cons,
        hero: formData.heroImage || undefined,
        thumbnail: formData.heroImage || undefined,
        image: formData.heroImage || undefined,
        publishedAt: formData.status === "published" ? new Date() : undefined,
        readTime: `${Math.ceil(formData.content.length / 1000)} min read`,
        readMins: Math.ceil(formData.content.length / 1000),
      };

      const response = await updateBlog(blogId, blogData);
      toast.success("Blog updated successfully!");
      // Use router.replace to avoid back button issues
      router.replace("/admin/blogs");
    } catch (error: any) {
      toast.error(error.message || "Failed to update blog");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 bg-gray-50 flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading blog...</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <BlogForm
        isEditMode={true}
        submitButtonLabel="Update Blog"
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        fileInputRef={fileInputRef}
        handleImageUpload={handleImageUpload}
        removeImage={removeImage}
        uploading={uploading}
        submitting={submitting}
      />
    </div>
  );
}

