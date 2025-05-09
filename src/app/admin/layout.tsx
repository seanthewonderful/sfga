import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Admin | Sean Fagan Golf Academy',
    description: 'Admin area for Sean Fagan Golf Academy',
    robots: 'noindex, nofollow'
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-green-800 text-green-950 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/admin" className="text-xl font-bold">
                        SFGA Admin
                    </Link>
                    <div className="space-x-4">
                        <Link href="/admin/posts" className="hover:text-yellow-400">
                            Blog Posts
                        </Link>
                        <Link href="/admin/posts/new" className="hover:text-yellow-400">
                            New Post
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-6">
                {children}
            </main>
        </div>
    );
} 