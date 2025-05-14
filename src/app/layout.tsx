import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: 'Sean Fagan Golf Academy | Golf Lessons in Utah',
  description: 'Professional golf instruction by Sean Fagan. Book private lessons, swing tune-ups, or walk 9–18 holes with Caddie Fagan.',
  keywords: 'golf lessons, golf coach, Utah golf, private golf instructor, Caddie Fagan, Sean Fagan, golf academy',
  authors: [{ name: 'Sean Fagan' }],
  openGraph: {
    title: 'Sean Fagan Golf Academy',
    description: 'Experience golf lessons with Irish charm and quality guidance.',
    url: 'https://www.seanfagangolfacademy.com',
    siteName: 'Sean Fagan Golf Academy',
    images: [
      {
        url: 'https://www.seanfagangolfacademy.com/images/sfga-logo-transparent.png', // Replace with real image path
        width: 1200,
        height: 630,
        alt: 'Sean Fagan Golf Academy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sean Fagan Golf Academy',
    description: 'Experience golf lessons with Irish charm and professional guidance.',
    images: ['https://www.seanfagangolfacademy.com/images/sfga-logo-transparent.png'], // Same here
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/sfga-logo-transparent.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/sfga-logo-transparent.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/sfga-logo-transparent.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/images/sfga-logo-transparent.png',
    apple: [
      { url: '/images/sfga-logo-transparent.png', sizes: '180x180', type: 'image/png' },
      { url: '/images/sfga-logo-transparent.png', sizes: '152x152', type: 'image/png' },
      { url: '/images/sfga-logo-transparent.png', sizes: '167x167', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/images/sfga-logo-transparent.png',
        color: '#000000',
      },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable}`}>
      <head>
        <link rel="icon" href="/images/sfga_logo.png" type="image/png" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
