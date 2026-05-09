import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import { ScrollToTop } from '@/components/effects/scroll-to-top';
import { personal, seo } from '@/data/content';

import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? seo.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: `%s | ${personal.name}`,
  },
  description: seo.description,
  applicationName: personal.name,
  authors: [{ name: personal.name }],
  creator: personal.name,
  publisher: personal.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: personal.name,
    title: seo.title,
    description: seo.description,
    url: siteUrl,
    // Image meta tags are auto-injected from `app/opengraph-image.tsx`
    // via the Metadata Files API. No manual `images` array needed.
    locale: 'en_US',
  },
  twitter: {
    // Twitter falls back to the OG image when `twitter-image` isn't
    // defined separately. We don't need a dedicated twitter-image —
    // same 1200×630 spec, same image suffices.
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // No manual `icons` block — Next.js auto-discovers `app/favicon.ico`,
  // `app/icon.svg`, `app/icon.png`, and `app/apple-icon.png` via file
  // convention and emits the appropriate <link rel> tags.
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#1a1b26',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable} h-full antialiased`}>
      <body className="bg-bg-primary text-text-primary flex min-h-full flex-col font-sans">
        {children}
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
