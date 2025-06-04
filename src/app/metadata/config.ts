import { Metadata } from 'next';

// 기본 메타데이터 설정
export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://imagetools.vercel.app'),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  authors: [{ name: 'Image Tools' }],
  creator: 'Image Tools',
  publisher: 'Image Tools',
};

// OpenGraph 기본 설정
export const defaultOpenGraph = {
  type: 'website',
  locale: 'ko_KR',
  url: 'https://imagetools.vercel.app',
  siteName: 'Image Tools',
  images: [
    {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Image Tools - 무료 이미지 편집 도구',
    },
  ],
};

// Twitter 기본 설정
export const defaultTwitter = {
  card: 'summary_large_image',
  images: ['/og-image.png'],
}; 