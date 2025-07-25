import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';

// Schema for validating blog post data
const blogPostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    slug: z.string().min(1, 'Slug is required'),
    excerpt: z.string().optional(),
    featured_image: z.string().optional(),
    meta_description: z.string().optional(),
    meta_keywords: z.string().optional(),
    status: z.enum(['draft', 'published']).default('draft'),
});

// Helper to extract dynamic ID from the URL
function getIdFromUrl(request: NextRequest): string | null {
    const segments = request.nextUrl.pathname.split('/');
    return segments[segments.length - 1] || null;
}

export async function GET(request: NextRequest) {
    try {
        const id = getIdFromUrl(request);
        if (!id) {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        const result = await sql`
            SELECT * FROM blog_posts 
            WHERE id = ${id};
        `;

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ post: result.rows[0] });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const id = getIdFromUrl(request);
        if (!id) {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }
        console.log('Received update request for post:', id);
        console.log('Request body:', body);

        const validatedData = blogPostSchema.parse(body);
        console.log('Validated data:', validatedData);

        const {
            title,
            content,
            slug,
            excerpt,
            featured_image,
            meta_description,
            meta_keywords,
            status
        } = validatedData;

        const result = await sql`
            UPDATE blog_posts
            SET 
                title = ${title},
                content = ${content},
                slug = ${slug},
                excerpt = ${excerpt || ''},
                featured_image = ${featured_image || ''},
                meta_description = ${meta_description || ''},
                meta_keywords = ${meta_keywords || ''},
                status = ${status},
                published_at = CASE 
                    WHEN ${status} = 'published' AND published_at IS NULL 
                    THEN NOW() 
                    ELSE published_at 
                END,
                updated_at = NOW()
            WHERE id = ${id}
            RETURNING *;
        `;

        if (result.rows.length === 0) {
            console.error('Post not found:', id);
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        console.log('Successfully updated post:', result.rows[0]);
        return NextResponse.json({ post: result.rows[0] });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error.errors);
            return NextResponse.json({ errors: error.errors }, { status: 400 });
        }
        console.error('Error updating blog post:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 