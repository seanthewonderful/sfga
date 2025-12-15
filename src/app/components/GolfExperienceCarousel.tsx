'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function GolfExperienceCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        '/images/gh_golfer.png',
        '/images/gh_golfer.png',
        '/images/gh_golfer.png',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="w-full">
            {/* Mobile Carousel */}
            <div className="md:hidden relative w-full overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((src, index) => (
                        <div key={index} className="min-w-full relative h-64 md:h-96">
                            <Image
                                src={src}
                                alt={`Golf experience ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop Side-by-side */}
            <div className="hidden md:flex gap-4 w-full">
                {images.map((src, index) => (
                    <div key={index} className="flex-1 relative h-96">
                        <Image
                            src={src}
                            alt={`Golf experience ${index + 1}`}
                            fill
                            className="object-cover rounded"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

