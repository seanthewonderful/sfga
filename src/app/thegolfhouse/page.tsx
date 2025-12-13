import HeaderGolfHouse from '@/app/HeaderGolfHouse';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaTruck, FaGolfBall, FaBoxOpen, FaFlag } from 'react-icons/fa';
import { GiEagleHead } from 'react-icons/gi';
import GolfExperienceCarousel from '@/app/components/GolfExperienceCarousel';

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

            <section id="home" className="w-full mx-auto px-6 pb-12 bg-gh-green border-b border-gh-tan">
                <div className="w-[90%] md:max-w-[80%] mx-auto flex flex-col items-center text-center space-y-4">
                    {/* Image */}
                    <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
                        <Image
                            src="/images/gh_icon_inverse.png"
                            alt="Golf House Icon"
                            fill
                            className="object-contain"
                        />
                        {/* Gradient overlay that fades to gh-green */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, transparent 0%, transparent 60%, rgba(5, 48, 27, 0.6) 75%, rgba(5, 48, 27, 0.85) 87%, #05301b 100%)'
                            }}
                        />
                    </div>

                    {/* Large Heading */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gh-tan font-cormorant-garamond">
                        Bring the Course<br />to Your Event
                    </h1>

                    {/* Sub-heading */}
                    <h2 className="text-2xl md:text-3xl text-gh-tan/90 font-cormorant-garamond">
                        A premium mobile golf simulator experience for<br />weddings, parties, corporate events, and more.
                    </h2>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Link
                            href="#bookings"
                            className="px-8 py-3 bg-gh-brown text-gh-tan font-semibold rounded border-2 border-gh-tan hover:bg-gh-tan/90 hover:text-gh-brown transition-colors"
                        >
                            BOOK YOUR EVENT
                        </Link>
                        <Link
                            href="#packages"
                            className="px-8 py-3 bg-gh-green text-gh-tan font-semibold rounded border-2 border-gh-tan hover:bg-gh-tan/90 hover:text-gh-green transition-colors"
                        >
                            SEE PACKAGES
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="w-full py-16 bg-gh-green">
                <div className="w-full px-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h2 className="text-5xl md:text-6xl font-bold text-gh-tan mb-4 font-cormorant-garamond">
                                How It Works
                            </h2>
                            <p className="text-gh-tan text-lg md:text-xl">
                                Three simple steps to bring the golf course to your event.
                            </p>
                        </div>

                        {/* How It Works Content */}
                        <div className="bg-gh-tan rounded-lg p-8 md:p-12 mb-8">
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                                {/* Step 1: We Deliver & Set Up */}
                                <div className="flex-1 flex flex-col items-center text-center">
                                    <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                        <FaTruck size={48} className="text-gh-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        We Deliver & Set Up
                                    </h3>
                                    <p className="text-gh-green text-lg">
                                        We arrive with the full simulator experience—tent, screen, turf, tech, and all—ready to transform your space into a mini golf arena.
                                    </p>
                                </div>

                                {/* Step 2: You Play */}
                                <div className="flex-1 flex flex-col items-center text-center">
                                    <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                        <FaGolfBall size={48} className="text-gh-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        You Play
                                    </h3>
                                    <p className="text-gh-green text-lg">
                                        Your guests swing away on iconic courses, compete in party games, and enjoy nonstop entertainment that fits any skill level.
                                    </p>
                                </div>

                                {/* Step 3: We Pack & Go */}
                                <div className="flex-1 flex flex-col items-center text-center">
                                    <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                        <FaBoxOpen size={48} className="text-gh-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        We Pack & Go
                                    </h3>
                                    <p className="text-gh-green text-lg">
                                        When the fun winds down, we load it all up quickly. You're left with a clean space and a crowd still buzzing about the event.
                                    </p>
                                </div>
                            </div>
                            {/* </div> */}

                            {/* Full Golf Experience Section */}
                            {/* <div className="bg-gh-tan rounded-lg p-8 md:p-12"> */}
                            <div className="flex flex-col items-center text-center mt-12">
                                <h3 className="text-4xl md:text-5xl font-bold text-gh-green mb-8 font-cormorant-garamond">
                                    A Full Golf Experience Anywhere
                                </h3>

                                <div className="w-full mb-8">
                                    <GolfExperienceCarousel />
                                </div>

                                <p className="text-gh-green text-lg max-w-3xl">
                                    The Golf House brings a fully immersive golf environment to any event space, indoors or out. Powered by tournament-level radar, pro-quality turf, and a thoughtfully curated atmosphere, our mobile simulator offers an unmatched blend of realism and excitement.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Packages Section */}
            <section id="packages" className="w-full py-16 bg-gh-green">
                <div className="w-full px-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h2 className="text-5xl md:text-6xl font-bold text-gh-tan mb-4 font-cormorant-garamond">
                                Packages
                            </h2>
                            <p className="text-gh-tan text-lg md:text-xl">
                                Bundle your golf experience for maximum fun.
                            </p>
                        </div>

                        {/* Packages Content */}
                        <div className="bg-gh-tan rounded-lg p-8 md:p-12">
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                                {/* The Par Package */}
                                <div className="flex-1 flex flex-col items-center text-center">
                                    <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                        <FaFlag size={48} className="text-gh-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        The Par Package
                                    </h3>
                                    <p className="text-gh-green text-lg">
                                        Perfect for groups of any size, with games and activities to please the entire party.
                                    </p>
                                </div>

                                {/* The Birdie Package */}
                                <div className="flex-1 flex flex-col items-center text-center">
                                    <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                        <GiEagleHead size={48} className="text-gh-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        The Birdie Package
                                    </h3>
                                    <p className="text-gh-green text-lg">
                                        Elevate your experience with our most popular enhanced and extended offering.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section id="events" className="w-full py-16 bg-gh-green">
                <div className="w-full px-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h2 className="text-5xl md:text-6xl font-bold text-gh-tan mb-4 font-cormorant-garamond">
                                Events
                            </h2>
                            <p className="text-gh-tan text-lg md:text-xl">
                                Ideal for any gathering, large or small.
                            </p>
                        </div>

                        {/* Events Content */}
                        <div className="bg-gh-tan rounded-lg p-8 md:p-12">
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                                {/* Weddings */}
                                <div className="flex-1 flex flex-col">
                                    <div className="relative w-full h-64 md:h-80 mb-6 rounded-lg overflow-hidden border-4 border-gh-green">
                                        <Image
                                            src="/images/gh_golfer.png"
                                            alt="Wedding event with golf simulator"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        Weddings
                                    </h3>
                                    <p className="text-gh-green text-lg">
                                        Offer a fun and memorable experience for your guests.
                                    </p>
                                </div>

                                {/* Corporate */}
                                <div className="flex-1 flex flex-col">
                                    <div className="relative w-full h-64 md:h-80 mb-6 rounded-lg overflow-hidden border-4 border-gh-green">
                                        <Image
                                            src="/images/gh_golfer.png"
                                            alt="Corporate event with golf simulator"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        Corporate
                                    </h3>
                                    <p className="text-gh-green text-lg">
                                        Entertain clients or reward employees.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bookings Section */}
            <section id="bookings" className="w-full py-16 bg-gh-green">
                <div className="w-full px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            {/* Left side - Text */}
                            <div className="flex-1">
                                <h2 className="text-5xl md:text-6xl font-bold text-gh-tan mb-4 font-cormorant-garamond">
                                    Easy Online Booking
                                </h2>
                                <p className="text-gh-tan text-lg md:text-xl">
                                    Pick a location, date, and time to reserve your Golf House event, with an easy booking process that takes just minutes.
                                </p>
                            </div>

                            {/* Right side - Laptop Image */}
                            <div className="flex-1 relative w-full h-64 md:h-80">
                                <Image
                                    src="/images/gh_golfer.png"
                                    alt="Online booking system"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}