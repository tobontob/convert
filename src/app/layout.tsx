import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.imagetools.co.kr'),
  title: "이미지 편집 도구 모음 | 무료 온라인 이미지 편집기 - Image Tools",
  description: "무료로 사용할 수 있는 온라인 이미지 편집 도구입니다. 이미지 변환, 압축, 워터마크, 회전, 자르기, 크기 조정 등 다양한 기능을 제공합니다.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'mask-icon', url: '/favicon.ico' },
      { rel: 'shortcut icon', url: '/favicon.ico' },
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://www.imagetools.co.kr'
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.imagetools.co.kr',
    siteName: 'Image Tools',
    title: '온라인 이미지 편집 도구 모음 - 무료로 간편하게 편집하기 | Image Tools',
    description: '웹에서 바로 사용하는 무료 이미지 편집 도구. 회전, 자르기, 크기 조정, 형식 변환, 워터마크 추가, 용량 줄이기 등 다양한 기능을 한 곳에서!',
    images: [
      {
        url: 'https://www.imagetools.co.kr/og-image.png',
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
    images: ['https://www.imagetools.co.kr/og-image.png'],
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
    google: 'eooV0PTPx4drNp0vv_ZDWIbNZiziMJa0S6pzH1CrcmQ',
    other: {
      'naver-site-verification': '837c6fa0a2a1e078350ceb13443caf6e3877291a'
    }
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
