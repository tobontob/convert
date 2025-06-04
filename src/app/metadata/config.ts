import { Metadata } from 'next';

export const baseMetadata: Metadata = {
  metadataBase: new URL('https://imagetools.vercel.app'),
  title: {
    default: '이미지 편집 도구 | Image Tools',
    template: '%s | Image Tools'
  },
  description: '무료로 사용할 수 있는 온라인 이미지 편집 도구입니다. 이미지 변환, 압축, 크기 조정, 자르기 등 다양한 기능을 제공합니다.',
  keywords: ['이미지 편집', '이미지 도구', '온라인 이미지 편집', '무료 이미지 편집'],
  authors: [{ name: 'Image Tools' }],
  creator: 'Image Tools',
  publisher: 'Image Tools',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://imagetools.vercel.app',
    siteName: 'Image Tools',
    title: '이미지 편집 도구 | Image Tools',
    description: '무료로 사용할 수 있는 온라인 이미지 편집 도구입니다. 이미지 변환, 압축, 크기 조정, 자르기 등 다양한 기능을 제공합니다.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Image Tools - 무료 이미지 편집 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '이미지 편집 도구 | Image Tools',
    description: '무료로 사용할 수 있는 온라인 이미지 편집 도구입니다. 이미지 변환, 압축, 크기 조정, 자르기 등 다양한 기능을 제공합니다.',
    images: ['/og-image.png'],
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
  },
}; 