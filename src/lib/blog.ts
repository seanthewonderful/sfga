export interface BlogPost {
    id: number;
    title: string;
    content: string;
    slug: string;
    excerpt?: string;
    featured_image?: string;
    meta_description?: string;
    meta_keywords?: string;
    status: 'draft' | 'published';
    author: string;
    published_at: string;
    created_at: string;
    updated_at: string;
}

export interface CreateBlogPostData {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featured_image?: string;
    meta_description?: string;
    meta_keywords?: string;
    status: 'draft' | 'published';
}

export async function createBlogPost(data: CreateBlogPostData): Promise<BlogPost> {
    const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create blog post');
    }

    const result = await response.json();
    return result.post;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const response = await fetch('/api/blog/posts');

    if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
    }

    const result = await response.json();
    return result.posts;
}

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
} 