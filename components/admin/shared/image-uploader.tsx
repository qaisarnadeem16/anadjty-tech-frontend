import React, { useRef } from "react";
import { Plus, X } from "lucide-react";

interface ImageUploaderProps {
    images: string[];
    setImages: (images: string[]) => void;
    onImageUpload?: (files: File[]) => Promise<void>; // optional: for custom upload (Cloudinary etc.)
    maxImages?: number; // max number of images allowed
    maxFileSizeMB?: number; // max file size per image in MB
    uploading?: boolean;
    disabled?: boolean;
    title?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    images,
    setImages,
    onImageUpload,
    maxImages = 10,
    maxFileSizeMB = 5,
    uploading = false,
    disabled = false,
    title,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = async (files: FileList | null) => {
        if (!files) return;

        const fileArray = Array.from(files);

        const remainingSlots = maxImages - images.length;
        if (remainingSlots <= 0) {
            alert(`Maximum ${maxImages} image(s) allowed. Please remove some images first.`);
            return;
        }

        const validFiles: File[] = [];
        for (const file of fileArray) {
            if (file.size > maxFileSizeMB * 1024 * 1024) {
                alert(`${file.name} is too large. Maximum size is ${maxFileSizeMB}MB.`);
                continue;
            }
            validFiles.push(file);
        }

        const filesToProcess = validFiles.slice(0, remainingSlots);

        if (filesToProcess.length === 0) return;

        if (onImageUpload) {
            try {
                await onImageUpload(filesToProcess);
            } catch (error: any) {
                alert(error.message || "Failed to upload images");
            }
        } else {
            // Fallback: preview only
            filesToProcess.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageUrl = reader.result as string;
                    if (!images.includes(imageUrl)) {
                        setImages([...images, imageUrl]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }

        if (fileArray.length > remainingSlots) {
            alert(`Only ${remainingSlots} image(s) added. Maximum ${maxImages} allowed.`);
        }

        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <section className="w-full">
            <h2 className="font-semibold text-gray-700 mb-3">{title || 'Upload Image'}</h2>
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple={maxImages > 1} // allow multiple only if maxImages > 1
                        onChange={(e) => handleFiles(e.target.files)}
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
                        {maxImages === 1 ? "Upload Image" : "Upload Images"}
                    </button>
                </div>

                {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="relative group aspect-square border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-100"
                            >
                                <img
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "/placeholder.svg";
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    disabled={uploading || disabled}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                                    aria-label={`Remove image ${index + 1}`}
                                >
                                    <X size={14} />
                                </button>
                                {index === 0 && images.length > 1 && (
                                    <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                        Primary
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                    {maxImages === 1
                        ? "Max file size: " + maxFileSizeMB + "MB."
                        : `Max file size: ${maxFileSizeMB}MB per image.`}
                </p>
            </div>
        </section>
    );
};

export default ImageUploader;
