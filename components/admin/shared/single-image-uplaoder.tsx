import React, { useRef } from "react";
import { Plus, X } from "lucide-react";

interface SingleImageUploaderProps {
    image: string;
    setImage: (image: string) => void;
    onImageUpload?: (files: File[]) => Promise<void>; // optional (Cloudinary upload, etc.)
    maxFileSizeMB?: number;
    uploading?: boolean;
    disabled?: boolean;
}

const SingleImageUploader: React.FC<SingleImageUploaderProps> = ({
    image,
    setImage,
    onImageUpload,
    maxFileSizeMB = 5,
    uploading = false,
    disabled = false,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        const file = files[0];

        // File size validation
        if (file.size > maxFileSizeMB * 1024 * 1024) {
            alert(`File is too large. Maximum size is ${maxFileSizeMB}MB.`);
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }

        if (onImageUpload) {
            try {
                await onImageUpload([file]);
            } catch (error: any) {
                alert(error.message || "Failed to upload image");
            }
        } else {
            // Base64 fallback preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }

        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const removeImage = () => {
        setImage("");
    };

    return (
        <section className="w-full">
            <h2 className="font-semibold text-gray-700 mb-3">Image</h2>
            <div className="space-y-4">
                {!image && (
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e.target.files)}
                            className="hidden"
                            disabled={uploading || disabled}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading || disabled}
                            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md border border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Plus size={16} />
                            Upload Image
                        </button>
                    </div>
                )}

                {image && (
                    <div className="relative group w-40 h-40 sm:w-48 sm:h-48 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-100">
                        <img
                            src={image}
                            alt="Uploaded"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg";
                            }}
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            disabled={uploading || disabled}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                            aria-label="Remove image"
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}

                <p className="text-xs text-gray-500 mt-2">
                    Max file size: {maxFileSizeMB}MB.
                </p>
            </div>
        </section>
    );
};

export default SingleImageUploader;
