import { sql } from '@vercel/postgres';

export type BlogPost = {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    featured_image: string | null;
    author: string;
    published_at: Date;
    updated_at: Date;
    status: 'draft' | 'published';
    meta_description: string | null;
    meta_keywords: string | null;
};

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const { rows } = await sql<BlogPost>`
      SELECT * FROM blog_posts 
      WHERE slug = ${slug} 
      AND status = 'published'
      LIMIT 1
    `;
        return rows[0] || null;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const { rows } = await sql<BlogPost>`
      SELECT * FROM blog_posts 
      WHERE status = 'published'
      ORDER BY published_at DESC
    `;
        return rows;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export async function getLatestBlogPosts(limit: number = 3): Promise<BlogPost[]> {
    try {
        const { rows } = await sql<BlogPost>`
      SELECT * FROM blog_posts 
      WHERE status = 'published'
      ORDER BY published_at DESC
      LIMIT ${limit}
    `;
        return rows;
    } catch (error) {
        console.error('Error fetching latest blog posts:', error);
        return [];
    }
} 