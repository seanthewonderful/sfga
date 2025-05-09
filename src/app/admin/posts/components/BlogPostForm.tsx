'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost, CreateBlogPostData } from '@/lib/blog';
import ImageUpload from '@/app/components/ImageUpload';

interface BlogPostFormProps {
    post?: CreateBlogPostData;
    onSubmit: (data: CreateBlogPostData) => Promise<void>;
    isSubmitting: boolean;
}

export default function BlogPostForm({ post, onSubmit, isSubmitting }: BlogPostFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<CreateBlogPostData>({
        title: post?.title || '',
        slug: post?.slug || '',
        content: post?.content || '',
        excerpt: post?.excerpt || '',
        featured_image: post?.featured_image || '',
        meta_description: post?.meta_description || '',
        meta_keywords: post?.meta_keywords || '',
        status: post?.status || 'draft'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await onSubmit(formData);
            router.push('/admin/posts');
        } catch (error) {
            console.error('Failed to save post:', error);
            alert(error instanceof Error ? error.message : 'Failed to save post. Please try again.');
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        setFormData(prev => ({
            ...prev,
            title,
            slug
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl text-green-950">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                />
            </div>

            <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-600">
                    Slug
                </label>
                <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-600">
                    Content (Markdown)
                </label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={15}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                />
            </div>

            <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-600">
                    Excerpt
                </label>
                <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows={2}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                    Featured Image
                </label>
                <ImageUpload
                    currentImage={formData.featured_image}
                    onImageUpload={(url) => {
                        setFormData(prev => ({
                            ...prev,
                            featured_image: url
                        }));
                    }}
                />
            </div>

            <div>
                <label htmlFor="meta_description" className="block text-sm font-medium text-gray-600">
                    Meta Description
                </label>
                <textarea
                    id="meta_description"
                    name="meta_description"
                    value={formData.meta_description}
                    onChange={handleInputChange}
                    rows={2}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                />
            </div>

            <div>
                <label htmlFor="meta_keywords" className="block text-sm font-medium text-gray-600">
                    Meta Keywords
                </label>
                <input
                    type="text"
                    id="meta_keywords"
                    name="meta_keywords"
                    value={formData.meta_keywords}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                />
            </div>

            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-600">
                    Status
                </label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                    Save as Draft
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                    {isSubmitting ? 'Saving...' : 'Publish Post'}
                </button>
            </div>
        </form>
    );
} 