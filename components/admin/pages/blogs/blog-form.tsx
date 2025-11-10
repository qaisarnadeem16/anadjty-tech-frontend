'use client'
import { Upload, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import React Quill (client-side only)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import CustomInput from "../../shared/custom-input";
import CustomSelect from "../../shared/custom-select";
import Button from "../../shared/custom-btn";

interface BlogFormProps {
  isEditMode: boolean;
  submitButtonLabel: string;
  handleSubmit: (e: React.FormEvent) => void;
  formData: {
    title: string;
    description: string;
    excerpt?: string;
    heroImage: string;
    content: string;
    status: "draft" | "published";
    category?: string;
    tags?: string[];
    difficulty?: "Beginner" | "Intermediate" | "Advanced";
    badges?: string[];
    keyTakeaways?: string[];
    pros?: string[];
    cons?: string[];
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: () => void;
  uploading: boolean;
  submitting: boolean;
}

const BlogForm = ({
  isEditMode,
  submitButtonLabel,
  handleSubmit,
  formData,
  setFormData,
  fileInputRef,
  handleImageUpload,
  removeImage,
  uploading,
  submitting,
}: BlogFormProps) => {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <div className="mx-auto shadow-lg border border-gray-200 rounded-2xl bg-white">
      <div className="px-8 pt-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditMode ? "Update Blog" : "Create Blog"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isEditMode
            ? "Update the blog details below."
            : "Fill out the details below to add a new blog."}
        </p>
      </div>

      <div className="p-8 space-y-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* --- Title & Status --- */}
          <div className="grid md:grid-cols-2 gap-6">
            <CustomInput
              placeholder="Enter blog title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              disabled={uploading || submitting}
            />

            <CustomSelect
              placeholder="Select status"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "draft" | "published",
                })
              }
              disabled={uploading || submitting}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </CustomSelect>
          </div>

          {/* --- Category --- */}
          <div className="grid md:grid-cols-2 gap-6">
            <CustomSelect
              placeholder="Select category"
              value={formData.category || ""}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              disabled={uploading || submitting}
            >
              <option value="">None</option>
              <option value="Guides">Guides</option>
              <option value="Reviews">Reviews</option>
              <option value="How-tos">How-tos</option>
            </CustomSelect>
          </div>

          {/* --- Description --- */}
          <div className="relative">
            <textarea
              placeholder="Enter short description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="
                w-full px-4 py-3 border-2 border-[#B0B0B0] rounded-md
                focus:outline-none focus:ring-[1px] focus:ring-[#1A3447] focus:border-[#1A3447]
                min-h-[100px] peer
              "
              disabled={uploading || submitting}
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

          {/* --- Hero Image --- */}
          <section>
            <h2 className="font-semibold text-gray-700 mb-3">Hero Image</h2>
            <div className="flex flex-wrap gap-5">
              {formData.heroImage && (
                <div className="relative group">
                  <Image
                    src={formData.heroImage}
                    alt="hero preview"
                    width={160}
                    height={100}
                    className="rounded-xl object-cover border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    disabled={uploading || submitting}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading || submitting}
                className={`w-40 h-28 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-xl hover:bg-gray-100 transition ${
                  uploading || submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Upload size={26} className="text-gray-500" />
                <span className="text-sm text-gray-500 mt-1">
                  {uploading ? "Uploading..." : "Upload Image"}
                </span>
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading || submitting}
              />
            </div>
          </section>

          {/* --- Content (React Quill) --- */}
          <section>
            <h2 className="font-semibold text-gray-700 mb-3">Content</h2>
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                modules={quillModules}
                className="h-96"
                placeholder="Write your blog content here..."
                readOnly={uploading || submitting}
              />
            </div>
          </section>

          {/* --- Submit --- */}
          <div className="flex justify-end pt-10">
            <Button
              label={submitButtonLabel}
              loading={submitting}
              disabled={uploading || submitting}
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

export default BlogForm;