'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image } from 'next/image';

interface ImageUploadProps {
    onImageUpload: (url: string) => void;
    currentImage?: string;
}

export default function ImageUpload({ onImageUpload, currentImage }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setIsUploading(true);
        setError(null);

        try {
            // Create form data
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'fagan_golf_blog');

            // Upload to Cloudinary
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            onImageUpload(data.secure_url);
        } catch (err) {
            console.error('Upload error:', err);
            setError(err instanceof Error ? err.message : 'Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    }, [onImageUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
        maxFiles: 1,
        disabled: isUploading
    });

    return (
        <div className="space-y-4">
            {currentImage && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                        src={currentImage}
                        alt="Current featured image"
                        className="object-cover w-full h-full"
                        width={100}
                        height={100}
                    />
                </div>
            )}

            {error && (
                <div className="text-red-600 text-sm">
                    {error}
                </div>
            )}

            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                    ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'}
                    ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <input {...getInputProps()} />
                {isUploading ? (
                    <div className="text-gray-600">Uploading...</div>
                ) : isDragActive ? (
                    <div className="text-green-600">Drop the image here...</div>
                ) : (
                    <div className="text-gray-600">
                        Drag and drop an image here, or click to select one
                    </div>
                )}
            </div>
        </div>
    );
} 