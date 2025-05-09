'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogPostForm from '../components/BlogPostForm';
import { CreateBlogPostData } from '@/lib/blog';

const TEMPLATE_POST: CreateBlogPostData = {
    title: 'How to Master Your Golf Swing: A Step-by-Step Guide',
    slug: 'how-to-master-golf-swing',
    excerpt: 'Learn the essential techniques and drills to improve your golf swing and lower your scores.',
    content: `# How to Master Your Golf Swing: A Step-by-Step Guide

## Introduction
A consistent and powerful golf swing is the foundation of a great golf game. In this comprehensive guide, we'll break down the key components of a proper golf swing and provide actionable tips to help you improve.

## The Fundamentals

### 1. Proper Stance and Posture
- Feet shoulder-width apart
- Slight knee bend
- Straight back
- Arms hanging naturally

### 2. Grip Technique
- Neutral grip position
- Light but secure hold
- Proper hand placement

## The Swing Sequence

### Backswing
1. Start with a smooth takeaway
2. Maintain wrist hinge
3. Rotate shoulders fully

### Downswing
1. Initiate with lower body
2. Maintain lag
3. Square the clubface

## Common Mistakes to Avoid
- Over-swinging
- Poor weight transfer
- Incorrect ball position

## Practice Drills
1. **Mirror Drill**
   - Practice your stance and posture
   - Check alignment
   - Monitor swing plane

2. **Slow Motion Swings**
   - Focus on technique
   - Build muscle memory
   - Improve timing

## Conclusion
Mastering your golf swing takes time and practice. Focus on these fundamentals and incorporate the drills into your practice routine. Remember, consistency is key to improvement.

## Next Steps
- Schedule a lesson to get personalized feedback
- Join our group clinics for additional practice
- Check out our video library for more tips`,
    meta_description: 'Learn the essential techniques and drills to improve your golf swing and lower your scores. Expert tips from Sean Fagan Golf Academy.',
    meta_keywords: 'golf swing, golf technique, golf instruction, golf tips, golf drills, golf fundamentals',
    featured_image: '/images/blog/golf-swing.jpg'
};

export default function NewPostPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data: CreateBlogPostData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/blog/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            router.push('/admin/posts');
            router.refresh();
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-green-800">Create New Post</h1>
                <button
                    onClick={() => {
                        if (confirm('Load template? This will replace any current content.')) {
                            const form = document.querySelector('form');
                            if (form) {
                                const titleInput = form.querySelector('input[name="title"]') as HTMLInputElement;
                                const slugInput = form.querySelector('input[name="slug"]') as HTMLInputElement;
                                const excerptInput = form.querySelector('textarea[name="excerpt"]') as HTMLTextAreaElement;
                                const contentInput = form.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
                                const metaDescInput = form.querySelector('textarea[name="meta_description"]') as HTMLTextAreaElement;
                                const metaKeywordsInput = form.querySelector('input[name="meta_keywords"]') as HTMLInputElement;
                                const featuredImageInput = form.querySelector('input[name="featured_image"]') as HTMLInputElement;

                                if (titleInput) titleInput.value = TEMPLATE_POST.title;
                                if (slugInput) slugInput.value = TEMPLATE_POST.slug;
                                if (excerptInput) excerptInput.value = TEMPLATE_POST.excerpt || '';
                                if (contentInput) contentInput.value = TEMPLATE_POST.content;
                                if (metaDescInput) metaDescInput.value = TEMPLATE_POST.meta_description || '';
                                if (metaKeywordsInput) metaKeywordsInput.value = TEMPLATE_POST.meta_keywords || '';
                                if (featuredImageInput) featuredImageInput.value = TEMPLATE_POST.featured_image || '';
                            }
                        }
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                    Load Template
                </button>
            </div>
            <BlogPostForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
    );
} 