'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Header from './Header';
import { FaCopy } from 'react-icons/fa';

const carouselImages = [
  '/images/carousel/wcpebble18.jpg',
  '/images/carousel/11th-augusta.jpeg',
  '/images/carousel/road-hole.jpeg',
];
const instructorImages = [
  '/images/instructor/founders-circle.jpeg',
  '/images/instructor/gladstan.jpeg',
  '/images/instructor/monterey-cc.jpeg',
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [focus, setFocus] = useState(false);

  // Cycle through images every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('seanfagangolfacademy@gmail.com');
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 3000);
  };

  return (
    <main className="font-sans text-gray-800">
      <Header />
      {/* Hero Carousel */}
      <section className="relative overflow-hidden h-96 flex items-center justify-center">
        {/* Background Images */}
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}

        {/* Overlay Blockquote */}
        <blockquote className="relative z-10 text-white font-title text-xl md:text-3xl font-semibold text-center px-6">
          "What other people may find in poetry or art museums, I find in the flight of a good drive."
          <br />
          <span className="block mt-4 text-lg">— Arnold Palmer</span>
        </blockquote>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto py-16 px-6">
        <div className="md:flex md:items-center justify-between space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <div className="w-48 h-48 rounded-full bg-gray-300"
              style={{
                backgroundImage: `url(${instructorImages[currentImage]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>
          <div className="">
            <h2 className="text-2xl font-title font-bold text-green-800">- Meet Your Instructor</h2>
            <p className="mt-4 text-green-100">Sean Fagan has a background in professional education and has been a golf instructor & mentor since 2012.</p>
            <p className="mt-4 text-green-100">"My approach to golf is to be in constant admiration of it. It's more than just a game, and requires more than just a swing. It requires a mindset, a strategy, and a plan. It is a union of mind, body, and nature. <br />But I've found that the most enjoyment comes from hitting the ball well. I will help you with your swing, and hopefully help you between the ears to more fully enjoy the game."</p>
          </div>
        </div>
        <blockquote className="mt-2 italic text-green-800">
          “One reason golf is such an exasperating game is that a thing we learned is so easily forgotten, and we find ourselves struggling year after year with faults we had discovered and corrected time and again.”
          <br />
          <span className="block mt-2 text-sm">— Bobby Jones</span>
        </blockquote>
        <blockquote className="mt-2 italic text-green-800">
          “Reverse every natural instinct and do the opposite of what you are inclined to do, and you will probably come very close to having a perfect golf swing.”
          <br />
          <span className="block mt-2 text-sm">— Ben Hogan</span>
        </blockquote>
      </section>

      {/* Lessons & Pricing */}
      <section id="lessons" className="bg-gray-50 py-16 px-6">
        <h2 className="max-w-4xl mx-auto text-2xl font-bold text-green-800 text-center mb-8">Lessons & Pricing</h2>
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">30-minute Swing Tune-Up</h3>
            <p className="mt-4">Focus on what's most important.</p>
            <p className="mt-4 font-bold">$40</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">One-Hour Lesson</h3>
            <p className="mt-4">On the range, in the bunker, on the green, or wherever you need.</p>
            <p className="mt-4 font-bold">$70</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">Caddie Fagan</h3>
            <p className="mt-4">In this unique experience, you'll play golf the way it was meant to be played! Walk your favorite course with Caddie Fagan carrying your clubs. <br />Feel the course beneath your feet, learn how to read its contours, understand golf's etiquette, and learn to strategize and plan every shot.</p>
            <p className="mt-4 font-bold">9-holes: $140<br />18-holes: $240</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <h2 className="text-2xl font-bold text-green-800 text-center mb-8">Testimonials</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <blockquote className="border-l-4 border-green-800 pl-4 italic">"Sean is the embodiment of patience, kindness, and a love for the game of golf. — Ivar T.T."</blockquote>
          <blockquote className="border-l-4 border-green-800 pl-4 italic">"I went to Sean to lower my score. I thought this would make me enjoy the game more. Instead, I learned to love everything about golf. And for whatever reason, I also took 10 strokes off my game. — Mark M."</blockquote>
        </div>
      </section>

      {/* Blog Preview */}
      <section id="blog" className="bg-gray-50 py-16 px-6">
        <h2 className="text-2xl font-bold text-green-800 text-center mb-8">Latest from the Blog</h2>
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow">
              <div className="h-40 bg-gray-200 flex items-center justify-center">Image</div>
              <div className="p-4">
                <h3 className="font-semibold">Blog Post Title</h3>
                <p className="mt-2 text-sm text-gray-600">Brief excerpt...</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Booking */}
      <section id="contact" className="py-16 px-6">
        <h2 className="text-2xl font-bold text-green-800 text-center mb-8">Contact & Booking</h2>
        <div className="max-w-4xl mx-auto md:flex md:space-x-8">
          <form className="flex-1 space-y-4 text-green-100">
            <input type="text" placeholder="Name" className="w-full border rounded p-2" />
            <input type="email" placeholder="Email" className="w-full border rounded p-2" />
            <input type="tel" placeholder="Phone" className="w-full border rounded p-2" />
            <select className="w-full border rounded p-2">
              <option>30-min Swing Tune-Up</option>
              <option>One-Hour Lesson</option>
              <option>Caddie Fagan</option>
            </select>
            <label htmlFor="area">Is there a part of your game you'd like to focus on?</label>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="focus"
                  id="focus-y"
                  value="y"
                  onChange={() => setFocus(true)}
                />
                <label htmlFor="focus-y">Yes</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="focus"
                  id="focus-n"
                  value="n"
                  onChange={() => setFocus(false)}
                />
                <label htmlFor="focus-n">No</label>
              </div>
            </div>
            {focus && (
              <>
                <label htmlFor="area" className="ml-4">Let me know what you'd like to focus on!</label>
                <textarea id="area" className="w-[calc(100%-1rem)] border rounded p-2 ml-4" />
              </>
            )}
            {/* <input type="date" className="w-full border rounded p-2" /> */}
            <label htmlFor="details">Additional notes or questions:</label>
            <textarea name="details" id="details" className="w-full border rounded p-2" />
            <button type="submit" className="bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-700">Send Message</button>
          </form>
          <div className="flex-1 mt-8 md:mt-0">
            <div className="h-96 bg-gray-200 flex items-center justify-center">Calendly Booking Embed</div>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-green-100">
          Or email: <a href="mailto:sean@fagangolfacademy.com" className="text-green-800 hover:underline">seanfagangolfacademy@gmail.com</a>
          <button
            onClick={handleCopyEmail}
            className="ml-1 inline-flex items-center text-green-700 hover:text-yellow-400 active:text-green-700 hover:cursor-pointer"
            title="Copy email address"
          >
            <FaCopy size={14} />
          </button>
          {/* {' '}| Tel: <a href="tel:+19492924665" className="text-green-800 hover:underline">(949) 292-4665</a> */}
        </p>
        {showCopySuccess && (
          <p className="text-center text-sm text-green-100 mt-2">Email address copied to clipboard.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 px-6 text-center text-sm text-gray-600">
        © 2025 Sean Fagan Golf Academy • <a href="#" className="hover:underline">Privacy</a> • <a href="#" className="hover:underline">Terms</a>
      </footer>
    </main>
  );
}
