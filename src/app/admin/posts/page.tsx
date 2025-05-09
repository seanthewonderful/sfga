import Link from 'next/link';
import { sql } from '@vercel/postgres';
import { BlogPost } from '@/lib/db';

async function getBlogPosts() {
    const { rows } = await sql<BlogPost>`
    SELECT * FROM blog_posts 
    ORDER BY published_at DESC;
  `;
    return rows;
}

export default async function BlogPosts() {
    const posts = await getBlogPosts();

    return (
        <div className="text-green-800">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Blog Posts</h1>
                <Link
                    href="/admin/posts/new"
                    className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-green-800 transition-colors"
                >
                    New Post
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Published
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {post.title}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {post.slug}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${post.status === 'published'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {post.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(post.published_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium space-x-2">
                                    <Link
                                        href={`/admin/posts/${post.id}/edit`}
                                        className="text-green-800 hover:text-yellow-400"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        target="_blank"
                                        className="text-green-800 hover:text-yellow-400"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 