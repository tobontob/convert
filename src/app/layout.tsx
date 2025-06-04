import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://imagetools.vercel.app'),
  title: "이미지 편집 도구",
  description: "무료로 사용할 수 있는 온라인 이미지 편집 도구입니다",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  alternates: {
    canonical: 'https://imagetools.vercel.app'
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://imagetools.vercel.app',
    siteName: 'Image Tools',
    title: '온라인 이미지 편집 도구 모음 - 무료로 간편하게 편집하기 | Image Tools',
    description: '웹에서 바로 사용하는 무료 이미지 편집 도구. 회전, 자르기, 크기 조정, 형식 변환, 워터마크 추가, 용량 줄이기 등 다양한 기능을 한 곳에서!',
    images: [
      {
        url: 'https://imagetools.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Image Tools - 무료 온라인 이미지 편집 도구 모음',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '온라인 이미지 편집 도구 모음 - 무료로 간편하게 편집하기 | Image Tools',
    description: '웹에서 바로 사용하는 무료 이미지 편집 도구. 회전, 자르기, 크기 조정, 형식 변환, 워터마크 추가, 용량 줄이기 등 다양한 기능을 한 곳에서!',
    images: ['https://imagetools.vercel.app/og-image.png'],
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
  verification: {
    google: 'google-site-verification-code',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
