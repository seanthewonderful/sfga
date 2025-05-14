"use client";
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <div className="relative">
            <header className="flex items-center justify-between p-6 border-b bg-green-900">
                {/* Left - Logo and Title */}
                <div className="flex items-center space-x-4 cursor-pointer" onClick={() => router.push('/')}>
                    <div className="flex-shrink-0 -my-4">
                        <Image
                            src="/images/sfga-logo-outline.png"
                            alt="Sean Fagan Golf Academy Logo"
                            width={100}
                            height={100}
                            className="h-28 w-auto hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <h1 className="text-3xl font-bold font-title text-white hover:text-yellow-400 transition-colors">Sean Fagan Golf Academy</h1>
                </div>

                {/* Right - Navigation */}
                <nav className="hidden md:flex space-x-6 items-end">
                    <a onClick={() => router.push('/#about')} className="text-white hover:text-yellow-400 transition-colors cursor-pointer">About</a>
                    <a onClick={() => router.push('/#lessons')} className="text-white hover:text-yellow-400 transition-colors cursor-pointer">Lessons</a>
                    <a onClick={() => router.push('/blog')} className="text-white hover:text-yellow-400 transition-colors cursor-pointer">Blog</a>
                    <a onClick={() => router.push('/#contact')} className="text-white hover:text-yellow-400 transition-colors cursor-pointer">Contact</a>
                    <a onClick={() => router.push('/#contact')} className="bg-white text-green-800 py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors cursor-pointer">Book a Lesson</a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isMenuOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </header>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-green-800 shadow-lg transform transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="py-2 px-4 space-y-2">
                    <a onClick={() => router.push('/#about')} className="block py-2 text-white hover:text-yellow-400 transition-colors cursor-pointer">About</a>
                    <a onClick={() => router.push('/#lessons')} className="block py-2 text-white hover:text-yellow-400 transition-colors cursor-pointer">Lessons</a>
                    <a onClick={() => router.push('/blog')} className="block py-2 text-white hover:text-yellow-400 transition-colors cursor-pointer">Blog</a>
                    <a onClick={() => router.push('/#contact')} className="block py-2 text-white hover:text-yellow-400 transition-colors cursor-pointer">Contact</a>
                    <a onClick={() => router.push('/#contact')} className="block py-2 mt-2 bg-white text-green-800 text-center rounded-lg hover:bg-yellow-400 transition-colors cursor-pointer">Book a Lesson</a>
                </div>
            </div>
        </div>
    );
} 