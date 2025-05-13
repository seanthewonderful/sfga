import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/Header';
import { notFound } from 'next/navigation';
import { sql } from '@vercel/postgres';
import MarkdownContent from '@/app/components/MarkdownContent';
import { BlogPost } from '@/lib/blog';

// ✅ Inline typing here – no shared types
export async function generateMetadata(
    { params }: { params: { slug: string } }
): Promise<Metadata> {
    const result = await sql<BlogPost>`
    SELECT * FROM blog_posts 
    WHERE slug = ${params.slug}
    AND status = 'published';
  `;

    const post = result.rows[0];

    if (!post) {
        return {
            title: 'Post Not Found | Sean Fagan Golf Academy Blog',
            description: 'The requested blog post could not be found.',
        };
    }

    return {
        title: `${post.title} | Sean Fagan Golf Academy Blog`,
        description: post.meta_description || post.excerpt || 'A blog post from Sean Fagan Golf Academy',
        keywords: post.meta_keywords,
    };
}

export default async function Page({
    params,
}: {
    params: { slug: string };
}) {
    const result = await sql<BlogPost>`
    SELECT * FROM blog_posts 
    WHERE slug = ${params.slug}
    AND status = 'published';
  `;

    const post = result.rows[0];

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Header />

            <article className="max-w-4xl mx-auto px-4 py-8">
                {post.featured_image && (
                    <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                        <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-green-800 mb-4">{post.title}</h1>
                    {post.excerpt && (
                        <p className="text-xl text-gray-600 mb-4">{post.excerpt}</p>
                    )}
                    <div className="text-sm text-gray-500">
                        By {post.author} • {new Date(post.published_at).toLocaleDateString()}
                    </div>
                </header>

                <MarkdownContent content={post.content} />

                <div className="mt-12 pt-8 border-t">
                    <Link
                        href="/blog"
                        className="text-green-800 hover:text-yellow-400 transition-colors"
                    >
                        ← Back to Blog
                    </Link>
                </div>
            </article>
        </main>
    );
}
