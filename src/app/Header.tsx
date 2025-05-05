"use client";
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <header className="flex items-center justify-between p-6 border-b bg-green-900">
            {/* Left - Logo and Title */}
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <Image
                        src="/images/sfga_logo.png"
                        alt="Sean Fagan Golf Academy Logo"
                        width={100}
                        height={100}
                        className="h-16 w-auto"
                    />
                </div>
                <h1 className="text-3xl font-bold font-title text-white hover:text-yellow-400 transition-colors">Sean Fagan Golf Academy</h1>
            </div>

            {/* Right - Navigation */}
            <nav className="hidden md:flex space-x-6 items-end">
                <a href="#about" className="text-white hover:text-yellow-400 transition-colors">About</a>
                <a href="#lessons" className="text-white hover:text-yellow-400 transition-colors">Lessons</a>
                <a href="#blog" className="text-white hover:text-yellow-400 transition-colors">Blog</a>
                <a href="#contact" className="text-white hover:text-yellow-400 transition-colors">Contact</a>
                <a href="#book" className="bg-white text-green-800 py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors">Book a Lesson</a>
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
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

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-full right-0 w-64 bg-green-800 shadow-lg py-2 px-4 md:hidden z-50">
                    <a href="#about" className="block py-2 text-white hover:text-yellow-400 transition-colors">About</a>
                    <a href="#lessons" className="block py-2 text-white hover:text-yellow-400 transition-colors">Lessons</a>
                    <a href="#blog" className="block py-2 text-white hover:text-yellow-400 transition-colors">Blog</a>
                    <a href="#contact" className="block py-2 text-white hover:text-yellow-400 transition-colors">Contact</a>
                    <a href="#book" className="block py-2 mt-2 bg-white text-green-800 text-center rounded-lg hover:bg-yellow-400 transition-colors">Book a Lesson</a>
                </div>
            )}
        </header>
    );
} 