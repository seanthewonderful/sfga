import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/Header';
import { getBlogPost } from '@/lib/db';
import { notFound } from 'next/navigation';
import { sql } from '@vercel/postgres';
import MarkdownContent from '@/app/components/MarkdownContent';
import { BlogPost } from '@/lib/blog';

type BlogPostPageProps = {
    params: {
        slug: string;
    };
};

// ✅ Use inline typing here — do not reuse BlogPostPageProps
export async function generateMetadata(
    { params }: { params: { slug: string } },
    _parent: ResolvingMetadata
): Promise<Metadata> {
    const post = await getBlogPost(params.slug);

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

async function getPost(slug: string) {
    const result = await sql<BlogPost>`
    SELECT * FROM blog_posts 
    WHERE slug = ${slug}
    AND status = 'published';
  `;

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

// ✅ This can still reuse BlogPostPageProps — that's fine here
export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getPost(params.slug);

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
