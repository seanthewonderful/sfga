'use client';

import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
    content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
    return (
        <div className="prose prose-lg max-w-none text-green-950 
            [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-green-800 [&>h1]:mb-8 [&>h1]:border-b [&>h1]:pb-2 [&>h1]:border-green-200
            [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-green-800 [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:border-b [&>h2]:pb-2 [&>h2]:border-green-200
            [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-green-800 [&>h3]:mt-8 [&>h3]:mb-4
            [&>p]:my-6 [&>p]:leading-relaxed
            [&>ul]:my-6 [&>ul]:list-disc [&>ul]:pl-6
            [&>ol]:my-6 [&>ol]:list-decimal [&>ol]:pl-6
            [&>li]:my-2
            [&>a]:text-green-600 [&>a:hover]:text-green-800">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
} 