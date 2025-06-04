import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
  other: {
    'application-ld+json': {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Image Tools',
      'applicationCategory': 'MultimediaApplication',
      'operatingSystem': 'Web Browser',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'description': '웹에서 바로 사용하는 무료 이미지 편집 도구. 회전, 자르기, 크기 조정, 형식 변환, 워터마크 추가, 용량 줄이기 등 다양한 기능을 한 곳에서!',
      'url': 'https://imagetools.vercel.app',
      'image': 'https://imagetools.vercel.app/og-image.png',
      'screenshot': 'https://imagetools.vercel.app/og-image.png',
      'featureList': [
        '이미지 회전',
        '이미지 자르기',
        '이미지 크기 조정',
        '이미지 형식 변환',
        '워터마크 추가',
        '이미지 압축'
      ]
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
      <head>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Image Tools",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "웹에서 바로 사용하는 무료 이미지 편집 도구. 회전, 자르기, 크기 조정, 형식 변환, 워터마크 추가, 용량 줄이기 등 다양한 기능을 한 곳에서!",
          "url": "https://imagetools.vercel.app",
          "image": "https://imagetools.vercel.app/og-image.png",
          "screenshot": "https://imagetools.vercel.app/og-image.png",
          "featureList": [
            "이미지 회전",
            "이미지 자르기",
            "이미지 크기 조정",
            "이미지 형식 변환",
            "워터마크 추가",
            "이미지 압축"
          ]
        }
        </script>
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}
