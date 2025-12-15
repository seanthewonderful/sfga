import HeaderGolfHouse from '@/app/HeaderGolfHouse';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaTruck, FaGolfBall, FaBoxOpen, FaHome, FaClock, FaCalendarAlt, FaBuilding, FaHeart, FaBirthdayCake, FaUsers, FaBriefcase, FaTree, FaGlassCheers } from 'react-icons/fa';
import GolfExperienceCarousel from '@/app/components/GolfExperienceCarousel';
import GolfHouseContactForm from '@/app/components/GolfHouseContactForm';
import { GiGolfFlag, GiBallPyramid, GiGolfTee, GiTrophy } from "react-icons/gi";

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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                {/* Standard Rental */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                        <GiGolfTee size={48} className="text-gh-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        Essential Event Package (2-4 Hours)
                                    </h3>
                                    <p className="text-gh-green text-lg mb-2">
                                        Perfect for backyard gatherings, birthday parties, small corporate events, or indoor/outdoor celebrations. Every rental includes full setup, tournament-grade radar, premium turf, clubs for all ages and skill levels, seating, décor accents, and complete teardown.
                                    </p>
                                    <p className="text-gh-green text-base italic">
                                        Starting at 2 hours. Contact us for a personalized quote.
                                    </p>
                                </div>

                                {/* Half-Day Rental */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                        <GiGolfFlag size={48} className="text-gh-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        Extended Play Package (4–6 Hours)
                                    </h3>
                                    <p className="text-gh-green text-lg mb-2">
                                        A great fit for weddings, receptions, block parties, or corporate retreats. The simulator stays active for the majority of your event with a dedicated attendant on site to guide guests, run contests, and keep everything running smoothly.
                                    </p>
                                    <p className="text-gh-green text-base italic">
                                        Half-day availability varies. Request pricing for your date.
                                    </p>
                                </div>

                                {/* Full-Day Experience */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                        <GiBallPyramid size={48} className="text-gh-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        Golf House Full Day (8 Hours)
                                    </h3>
                                    <p className="text-gh-green text-lg mb-2">
                                        Ideal for large events, festivals, conferences, business functions, or all-day celebrations. Includes complete setup, continuous play, a professional attendant, and branded décor to elevate your event from start to finish.
                                    </p>
                                    <p className="text-gh-green text-base italic">
                                        Full-day rates available. Contact us for a custom quote.
                                    </p>
                                </div>

                                {/* Multi-Day & Corporate Installations */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                        <GiTrophy size={48} className="text-gh-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        Multi-Day & Corporate Installations
                                    </h3>
                                    <p className="text-gh-green text-lg mb-2">
                                        Designed for trade shows, conferences, company wellness days, weekend festivals, or multi-day activations. The simulator remains on site for extended use, with optional daily staff support, contest formats, and branded screen experiences.
                                    </p>
                                    <p className="text-gh-green text-base italic">
                                        Flexible multi-day packages available. Let's build the right setup for your event.
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                {/* Weddings */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                        <FaHeart size={48} className="text-gh-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        Weddings
                                    </h3>
                                    <p className="text-gh-green text-lg">
                                        Make your special day unforgettable with unique entertainment that keeps guests engaged and creates lasting memories between the ceremony and reception.
                                    </p>
                                </div>

                                {/* Birthday Celebrations */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                        <FaBirthdayCake size={48} className="text-gh-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        Birthday Celebrations
                                    </h3>
                                    <p className="text-gh-green text-lg">
                                        Whether it's a milestone birthday or a casual party, add excitement that works for all ages and skill levels, from kids' parties to adult celebrations.
                                    </p>
                                </div>

                                {/* Backyard Gatherings */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                        <FaHome size={48} className="text-gh-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        Backyard Gatherings
                                    </h3>
                                    <p className="text-gh-green text-lg">
                                        Transform your outdoor space into an interactive entertainment hub. Perfect for casual BBQs, neighborhood get-togethers, and relaxed social events.
                                    </p>
                                </div>

                                {/* Office & Team Events */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                        <FaBriefcase size={48} className="text-gh-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        Office & Team Events
                                    </h3>
                                    <p className="text-gh-green text-lg">
                                        Boost morale and team bonding with friendly competition. Great for company parties, team building exercises, and rewarding employees with something everyone can enjoy.
                                    </p>
                                </div>

                                {/* Holiday Celebrations */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                        <FaTree size={48} className="text-gh-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        Holiday Celebrations
                                    </h3>
                                    <p className="text-gh-green text-lg">
                                        Add a memorable twist to Christmas parties, Memorial Day cookouts, or any seasonal gathering. Keep guests entertained while you host the perfect holiday event.
                                    </p>
                                </div>

                                {/* Bachelor/Bachelorette Parties */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                        <FaGlassCheers size={48} className="text-gh-green" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                        Bachelor/Bachelorette Parties
                                    </h3>
                                    <p className="text-gh-green text-lg">
                                        Kick off the celebration with competitive fun that brings the whole party together. Create unforgettable moments before the big day with interactive entertainment.
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
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h2 className="text-5xl md:text-6xl font-bold text-gh-tan mb-4 font-cormorant-garamond">
                                Book Your Event
                            </h2>
                            <p className="text-gh-tan text-lg md:text-xl mb-6">
                                Ready to bring The Golf House to your event? Get in touch to check availability, pricing, and reserve your date.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gh-tan text-lg">
                                <a
                                    href="mailto:thegolfhouse@seanfagangolf.com"
                                    className="hover:text-gh-tan/80 transition-colors underline"
                                >
                                    thegolfhouse@seanfagangolf.com
                                </a>
                                <span className="hidden sm:inline">|</span>
                                <a
                                    href="tel:+19492924665"
                                    className="hover:text-gh-tan/80 transition-colors underline"
                                >
                                    (949) 292-4665
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gh-tan rounded-lg p-8 md:p-12">
                            <h3 className="text-3xl md:text-4xl font-bold text-gh-green mb-6 font-cormorant-garamond text-center">
                                Send Us a Message
                            </h3>
                            <GolfHouseContactForm />
                        </div>
                    </div>
                </div>
            </section>

            <footer className="flex flex-col gap-4 bg-gh-green py-6 px-6 text-center text-sm text-white">
                <div className="flex justify-center gap-4">
                    <a href="#" className="hover:underline hover:text-yellow-400">Privacy</a> • <a href="#" className="hover:underline hover:text-yellow-400">Terms</a>
                    © 2025 The Golf House
                </div>
                <div className="flex justify-center gap-4">
                    <a
                        href="https://www.flaticon.com/free-icons/golf"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="lessons icons"
                        className="text-xs text-white"
                    >
                        Golf icon by Freepik - Flaticon
                    </a>
                </div>
            </footer>

        </main>
    );
}