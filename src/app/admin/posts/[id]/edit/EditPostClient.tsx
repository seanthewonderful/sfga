'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BlogPostForm from '../../components/BlogPostForm';
import { CreateBlogPostData } from '@/lib/blog';

interface EditPostClientProps {
    id: string;
}

export default function EditPostClient({ id }: EditPostClientProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState<CreateBlogPostData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/blog/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await response.json();
                setPost(data.post);
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to load post. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (data: CreateBlogPostData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/blog/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to update post');
            }

            router.push('/admin/posts');
            router.refresh();
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Failed to update post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="text-center text-gray-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="text-center text-red-600">{error}</div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="text-center text-red-600">Post not found</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-green-800 mb-6">Edit Post</h1>
            <BlogPostForm
                post={post}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    );
} 