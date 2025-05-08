import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/Header';
import { getBlogPost } from '@/lib/db';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
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

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Header />

            <article className="max-w-4xl mx-auto px-6 py-12">
                <header className="mb-8">
                    <h1 className="text-4xl font-title font-bold text-green-800 mb-4">{post.title}</h1>
                    <div className="flex items-center text-gray-600 mb-6">
                        <span className="mr-4">By {post.author}</span>
                        <time dateTime={post.published_at.toISOString()}>
                            {post.published_at.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>
                    {post.featured_image && (
                        <div className="relative w-full h-[400px] mb-8">
                            <Image
                                src={post.featured_image}
                                alt={post.title}
                                fill
                                className="object-cover rounded-lg"
                                priority
                            />
                        </div>
                    )}
                </header>

                <div className="prose prose-lg max-w-none">
                    {post.content}
                </div>

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