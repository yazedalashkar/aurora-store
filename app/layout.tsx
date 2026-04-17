import './globals.css';
import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import Navbar from '@/components/Navbar';
import Toast from '@/components/Toast';
import Footer from '@/components/Footer';
import Script from 'next/script';

const cairo = Cairo({ subsets: ['arabic', 'latin'] });

export const metadata: Metadata = {
  title: 'Aurora Store - مجوهرات فاخرة ومنتجات أنيقة',
  description: 'مرحباً بك في Aurora Store، متجرك الإلكتروني المفضل للمجوهرات الفاخرة والمنتجات المتنوعة! نحن نقدم مجموعة واسعة تشمل الخواتم، القلادات، الإكسسوارات، الهدايا، والمزيد من المنتجات الأنيقة التي تجمع بين الجمال الأبدي والتصاميم العصرية، مصممة لتضيف لمسة من الرقي إلى إطلالتك اليومية. تحت رعاية متجر SHEIN الإلكتروني، نضمن لك جودة عالية وأسعار تنافسية، مع خدمة عملاء متميزة وتوصيل سريع. اكتشف عالماً من الإبداع والأناقة مع Aurora Store – حيث يلتقي الجمال بالإلهام!',
  keywords: ['مجوهرات', 'خواتم', 'قلادات', 'إكسسوارات', 'هدايا', 'أناقة', 'فاخر', 'Aurora Store', 'SHEIN', 'متجر إلكتروني'],
  authors: [{ name: 'Ghinwa Saleh' }],
  creator: 'Ghinwa Saleh',
  publisher: 'Aurora Store',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aurorastore.com'), // افتراضي، غير الحقيقي
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/manifest.json',
  themeColor: '#fff0f5',
  colorScheme: 'light',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Aurora Store - مجوهرات فاخرة ومنتجات أنيقة',
    description: 'اكتشف مجموعة واسعة من المجوهرات الفاخرة والمنتجات الأنيقة في Aurora Store. تحت رعاية SHEIN، نوفر جودة عالية وأسعار تنافسية.',
    url: 'https://aurorastore.com',
    siteName: 'Aurora Store',
    images: [
      {
        url: 'https://aurorastore.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aurora Store - مجوهرات فاخرة',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurora Store - مجوهرات فاخرة ومنتجات أنيقة',
    description: 'اكتشف مجموعة واسعة من المجوهرات الفاخرة والمنتجات الأنيقة في Aurora Store. تحت رعاية SHEIN، نوفر جودة عالية وأسعار تنافسية.',
    images: ['https://aurorastore.com/twitter-image.jpg'],
    creator: '@aurorastore',
  },
  other: {
    'google-site-verification': 'your-google-verification-code', // استبدل بالحقيقي
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Aurora Store",
              "url": "https://aurorastore.com",
              "logo": "https://aurorastore.com/logo.png",
              "description": "متجر إلكتروني للمجوهرات الفاخرة والمنتجات الأنيقة تحت رعاية SHEIN.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-123-456-7890",
                "contactType": "customer service",
                "availableLanguage": "Arabic"
              },
              "sameAs": [
                "https://www.instagram.com/aurorastore",
                "https://www.tiktok.com/@aurorastore",
                "https://www.facebook.com/aurorastore"
              ]
            }),
          }}
        />
      </head>
      <body className={cairo.className}>
        <CartProvider>
          <ToastProvider>
            <Navbar />
            {children}
            <Toast />
            <Footer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
