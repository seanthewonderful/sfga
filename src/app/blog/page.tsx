import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/Header';
import { getBlogPosts } from '@/lib/db';

export const metadata: Metadata = {
    title: 'Blog | Sean Fagan Golf Academy',
    description: 'Golf tips, techniques, and insights from professional golf instructor Sean Fagan.',
};

export default async function BlogIndex() {
    const posts = await getBlogPosts();

    return (
        <main className="min-h-screen bg-white">
            <Header />

            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-title font-bold text-green-800 mb-8">Golf Blog</h1>

                <div className="grid gap-8">
                    {posts.map((post) => (
                        <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Link href={`/blog/${post.slug}`}>
                                {post.featured_image && (
                                    <div className="relative h-48 md:h-64">
                                        <Image
                                            src={post.featured_image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h2 className="text-2xl font-title font-bold text-green-800 mb-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                    <time
                                        dateTime={post.published_at.toISOString()}
                                        className="text-sm text-gray-500"
                                    >
                                        {post.published_at.toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
} 