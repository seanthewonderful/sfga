import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Schema for validating blog post data
const blogPostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    slug: z.string().min(1, 'Slug is required'),
    excerpt: z.string().optional(),
    featured_image: z.string().optional(),
    meta_description: z.string().optional(),
    status: z.enum(['draft', 'published']).default('draft'),
    author: z.string().min(1, 'Author is required'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = blogPostSchema.parse(body);

        const { title, content, slug, excerpt, featured_image, meta_description, status, author } = validatedData;

        const result = await sql`
      INSERT INTO blog_posts (
        title, 
        content, 
        slug, 
        excerpt, 
        featured_image, 
        meta_description,
        status,
        author,
        published_at,
        updated_at
      ) VALUES (
        ${title}, 
        ${content}, 
        ${slug}, 
        ${excerpt || ''}, 
        ${featured_image || ''}, 
        ${meta_description || ''},
        ${status},
        ${author},
        NOW(),
        NOW()
      ) RETURNING *;
    `;

        return NextResponse.json({ post: result.rows[0] }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ errors: error.errors }, { status: 400 });
        }
        console.error('Error creating blog post:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const result = await sql`
      SELECT * FROM blog_posts 
      ORDER BY published_at DESC;
    `;

        return NextResponse.json({ posts: result.rows });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 