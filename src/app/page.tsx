'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Header from './Header';
import { FaCopy } from 'react-icons/fa';
import { FaRegHandPointLeft } from "react-icons/fa6";
import { getLatestBlogPosts } from '@/lib/db';
import { InlineWidget } from "react-calendly";

const carouselImages = [
  '/images/carousel/road-hole.jpeg',
  '/images/carousel/wcpebble18.jpg',
  '/images/carousel/11th-augusta.jpeg',
];
const instructorImages = [
  '/images/instructor/founders-circle.jpeg',
  '/images/instructor/gladstan.jpeg',
  '/images/instructor/gardens.jpeg',
];

type LessonType = '30-min Swing Tune-Up' | 'One-Hour Lesson' | 'Caddie Fagan 9-holes' | 'Caddie Fagan 18-holes';

const lessonTypes: Record<LessonType, string> = {
  'One-Hour Lesson': 'https://calendly.com/lessons-seanfagangolf/one-hour-lesson?share_attribution=expiring_link',
  '30-min Swing Tune-Up': 'https://calendly.com/lessons-seanfagangolf/30min?share_attribution=expiring_link',
  'Caddie Fagan 9-holes': 'https://calendly.com/lessons-seanfagangolf/caddie-fagan-9-holes?share_attribution=expiring_link',
  'Caddie Fagan 18-holes': 'https://calendly.com/lessons-seanfagangolf/caddie-fagan-18-holes?share_attribution=expiring_link'
};

export default function HomeClient() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [selectedLessonType, setSelectedLessonType] = useState<LessonType>('One-Hour Lesson');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    lessonType: 'One-Hour Lesson',
    focusArea: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [latestPosts, setLatestPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      const posts = await getLatestBlogPosts(3);
      setLatestPosts(posts);
    };
    fetchLatestPosts();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        lessonType: '30-min Swing Tune-Up',
        focusArea: '',
        details: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
        <blockquote className="relative z-10 text-white font-title text-xl md:text-3xl font-semibold text-center mt-60 px-6">
          "What other people may find in poetry or art museums, I find in the flight of a good drive."
          <br />
          <span className="block mt-4 text-lg">— Arnold Palmer</span>
        </blockquote>
      </section>

      {/* Instructor Section */}
      <section id="about" className="max-w-4xl mx-auto py-16 px-6">
        <h2 className="text-2xl font-title font-bold text-green-800 text-center mb-8">Meet Your Instructor</h2>
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
            <p className="mt-4 text-green-100">Sean Fagan has a background in professional education and has been a golf instructor & mentor since 2012.</p>
            <p className="mt-4 text-green-100">"My approach to golf is to be in constant admiration of it. It's more than just a game, and requires more than just a swing. It requires a mindset, a strategy, and a plan. It is a union of mind, body, and nature, and I want to play it every minute of every day. <br />"I've found that the most enjoyment comes from hitting the ball well. I will help you with your swing, and hopefully help you between the ears to more fully enjoy and admire the game of golf."</p>
          </div>
        </div>
        <blockquote className="mt-2 italic text-green-700">
          "One reason golf is such an exasperating game is that a thing we learned is so easily forgotten, and we find ourselves struggling year after year with faults we had discovered and corrected time and again."
          <br />
          <span className="block mt-2 text-sm">— Bobby Jones</span>
        </blockquote>
        <blockquote className="mt-2 italic text-green-700">
          "Reverse every natural instinct and do the opposite of what you are inclined to do, and you will probably come very close to having a perfect golf swing."
          <br />
          <span className="block mt-2 text-sm">— Ben Hogan</span>
        </blockquote>
      </section>

      {/* Lessons & Pricing */}
      <section id="lessons" className="bg-gray-50 py-16 px-6">
        <h2 className="max-w-4xl mx-auto text-2xl font-title font-bold text-green-800 text-center mb-8">Lessons & Pricing</h2>
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
          <div className="flex flex-col justify-between p-6 bg-white rounded-lg border border-amber-500 shadow-md shadow-amber-500">
            <div className="flex flex-grow flex-col items-center justify-between">
              <h3 className="text-xl font-semibold">30-minute Swing Tune-Up</h3>
              <Image src="/images/swing.png" alt="Sean Fagan Golf Academy" width={80} height={80} />
              <p className="mt-4">Focus on what's most important.</p>
              <p className="mt-4 font-bold">$40</p>
            </div>
          </div>
          <div className="flex flex-col justify-between p-6 bg-white rounded-lg border border-amber-500 shadow-md shadow-amber-500">
            <div className="flex flex-grow flex-col items-center justify-between">
              <h3 className="text-xl font-semibold">One-Hour Lesson</h3>
              <Image src="/images/lesson.png" alt="Sean Fagan Golf Academy" width={80} height={80} />
              <p className="mt-4">On the range, in the bunker, on the green, or wherever you need.</p>
              <p className="mt-4 font-bold">$60</p>
            </div>
          </div>
          <div className="flex flex-col justify-between p-6 bg-white rounded-lg border border-amber-500 shadow-md shadow-amber-500">
            <div className="flex flex-grow flex-col items-center justify-between">
              <h3 className="text-xl font-semibold mb-4">Caddie Fagan</h3>
              <Image src="/images/caddie-fagan.png" alt="Sean Fagan Golf Academy" width={80} height={80} />
              <p className="mt-4">In this unique experience, you'll play golf the way it was meant to be played! Walk your favorite course with Caddie Fagan carrying your clubs. <br />Feel the course beneath your feet, learn how to read its contours, understand golf's etiquette, and learn to strategize and plan every shot.</p>
              <p className="mt-4 font-bold">9-holes: $120<br />18-holes: $220</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center mt-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold font-title text-green-800 mb-6">Who should take a lesson?</h3>
            <p className="text-lg text-center text-green-900 mb-8">Well, anyone really!</p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-1 md:grid-rows-2 gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-600">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Image src="/images/ror-logo.png" alt="Sean Fagan Golf Academy" width={80} height={80} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-green-800 mb-3">Youth Players</p>
                    <p className="text-green-900 leading-relaxed">Sean Fagan is a certified educator and loves helping young golfers. He understands that for most young people, golf needs to be fun and intriguing and not just a grind to get that "perfect," robotic swing. Above all else, Sean tries to teach young golfers to fall in love with the game by making it fun and engaging.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-600">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Image src="/images/range-w-bucket.png" alt="Sean Fagan Golf Academy" width={80} height={80} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-green-800 mb-3">New Players</p>
                    <p className="text-green-900 leading-relaxed">Just starting out? Sean will help you get off to a fun and productive start. Golf takes years of practice to master, and Sean will show you how to have fun with the game while you're at it. Welcome to the greatest game ever invented!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-[calc(50%-12px)] bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-600">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Image src="/images/girl-putting.png" alt="Sean Fagan Golf Academy" width={80} height={80} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-green-800 mb-3">Seasoned Players</p>
                    <p className="text-green-900 leading-relaxed">Sean has a unique ability to help players of all levels improve. Even a "perfect" swing has its ups and downs. Sean Fagan Golf Academy wants you to get to know your own game better - your strengths, weaknesses, preferences, and goals. Whether you're looking to shave strokes off your game or just want to enjoy golf more, Sean can help.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <h2 className="text-2xl font-title font-bold text-green-800 text-center mb-8">Testimonials</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-green-100">
          <blockquote className="border-l-4 border-green-800 pl-4 italic">"Our little golfer loves going to Sean's lessons. He's a great instructor and has a great personality. We highly recommend him!" — Moms everywhere</blockquote>
          <blockquote className="border-l-4 border-green-800 pl-4 italic">"Sean's enthusiasm for the game is contagious. He's a great teacher and a great person, and I'm always eager to play again after a lesson." — Mary S.</blockquote>
          <blockquote className="border-l-4 border-green-800 pl-4 italic">"I only golfed once before I met Sean and I hated it. I watched him teach my nephew and he made the game look fun. So I listened closely and signed up for a lesson. I've been hooked ever since." — Nolan G.</blockquote>
        </div>
      </section>

      {/* Blog Preview */}
      <section id="blog" className="bg-gray-50 py-16 px-6">
        <h2 className="text-2xl font-title font-bold text-green-800 text-center mb-8">Latest from the Blog</h2>
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
            >
              {post.featured_image && (
                <div className="relative h-40">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-green-800">{post.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-block bg-green-800 text-white py-2 px-6 rounded-lg hover:bg-yellow-400 hover:text-green-800 transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </section>

      {/* Contact & Booking */}
      <section id="contact" className="py-16 px-6">
        <h2 className="text-2xl font-title font-bold text-green-800 text-center mb-8">Contact & Booking</h2>
        <div className="max-w-4xl mx-auto md:flex md:space-x-8">
          <div className="flex-1 mt-8 md:mt-0">
            <div className="mb-4">
              <label className="block text-green-100 text-center mb-2">Select Lesson Type:</label>
              <select
                value={selectedLessonType}
                onChange={(e) => setSelectedLessonType(e.target.value as LessonType)}
                className="w-full border rounded p-2 text-green-100"
              >
                {Object.keys(lessonTypes).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <InlineWidget
              url={lessonTypes[selectedLessonType]}
              styles={{
                height: '700px',
                minWidth: '320px'
              }}
              prefill={{
                email: '',
                firstName: '',
                lastName: '',
                name: ''
              }}
              pageSettings={{
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                hideGdprBanner: true
              }}
            />
          </div>

          <div className="flex-1 flex flex-col justify-between">

            <div className="flex gap-4 my-4 mx-4 md:my-0 md:mx-0 text-green-100 order-1 md:order-2">
              <span>
                <FaRegHandPointLeft size={24} className="rotate-90 md:rotate-0" />
              </span>
              <span>
                <p className="text-sm">Be advised - This calendar is not the final say in booking a lesson. We will reach out within 24 hours to confirm your lesson at your chosen time, but may have to reschedule.</p>
                <p className="text-sm">If you don't hear from us within 24 hours, please reach out to us at lessons@seanfagangolf.com.</p>
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 space-y-4 text-green-100 order-2 md:order-1">
              <label className="block text-green-100 text-center mb-2">Reach out to Sean:</label>
              {submitStatus === "success" ? (
                <p className="text-green-600 text-center">Message sent successfully! We'll get back to you as soon as possible.</p>
              ) : (
                <>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="w-full border rounded p-2"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full border rounded p-2"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="w-full border rounded p-2"
                    required
                  />
                  <label htmlFor="details">Questions or comments:</label>
                  <textarea
                    name="details"
                    id="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-800 text-white py-2 px-4 rounded-lg hover:text-green-800 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>
        </div>
        <p className="mt-8 text-center text-md text-green-100">
          Or email: <a href="mailto:lessons@seanfagangolf.com" className="text-green-800 hover:underline hover:text-yellow-400">lessons@seanfagangolf.com</a>
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
          <p className="text-center text-sm text-yellow-400 mt-2">Email address copied to clipboard.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-4 bg-green-900 py-6 px-6 text-center text-sm text-white">
        <div className="flex justify-center gap-4">
          <a href="#" className="hover:underline hover:text-yellow-400">Privacy</a> • <a href="#" className="hover:underline hover:text-yellow-400">Terms</a>
          © 2025 Sean Fagan Golf Academy
        </div>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.flaticon.com/free-icons/golf"
            target="_blank"
            rel="noopener noreferrer"
            title="lessons icons"
            className="text-xs text-white"
          >
            Lesson icon by Shital777, Swing icon by bsd - Flaticon
          </a>
        </div>
      </footer>
    </main>
  );
}

