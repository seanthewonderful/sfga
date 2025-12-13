import HeaderGolfHouse from '@/app/HeaderGolfHouse';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Golf House',
    icons: {
        icon: [
            { url: '/images/gh_icon.png', sizes: 'any', type: 'image/png' },
            { url: '/images/gh_icon.png', sizes: '32x32', type: 'image/png' },
            { url: '/images/gh_icon.png', sizes: '16x16', type: 'image/png' },
            { url: '/images/gh_icon.png', sizes: '48x48', type: 'image/png' },
        ],
        shortcut: '/images/gh_icon.png',
        apple: [
            { url: '/images/gh_icon.png', sizes: '180x180', type: 'image/png' },
            { url: '/images/gh_icon.png', sizes: '152x152', type: 'image/png' },
            { url: '/images/gh_icon.png', sizes: '167x167', type: 'image/png' },
        ],
    },
};

export default function TheGolfHouse() {
    return (
        <main className="min-h-screen bg-white">
            <HeaderGolfHouse />

            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-title font-bold text-green-800 mb-8">The Golf House</h1>
            </div>
        </main>
    );
}