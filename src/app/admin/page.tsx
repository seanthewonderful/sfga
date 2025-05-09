import Link from 'next/link';
import { sql } from '@vercel/postgres';

async function getDashboardStats() {
    const { rows: [stats] } = await sql`
    SELECT 
      COUNT(*) as total_posts,
      COUNT(*) FILTER (WHERE status = 'published') as published_posts,
      COUNT(*) FILTER (WHERE status = 'draft') as draft_posts
    FROM blog_posts;
  `;
    return stats;
}

export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    return (
        <div className="text-green-800">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Total Posts</h2>
                    <p className="text-4xl font-bold text-green-800">{stats.total_posts}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Published Posts</h2>
                    <p className="text-4xl font-bold text-green-800">{stats.published_posts}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Draft Posts</h2>
                    <p className="text-4xl font-bold text-green-800">{stats.draft_posts}</p>
                </div>
            </div>

            <div className="mt-8 space-y-4">
                <Link
                    href="/admin/posts/new"
                    className="inline-block bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-yellow-400 hover:text-green-800 transition-colors"
                >
                    Create New Post
                </Link>

                <Link
                    href="/admin/posts"
                    className="block text-green-800 hover:text-yellow-400"
                >
                    View All Posts →
                </Link>
            </div>
        </div>
    );
} 