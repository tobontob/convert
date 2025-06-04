import { Metadata } from 'next';

export const baseMetadata: Metadata = {
  metadataBase: new URL('https://imagetools.vercel.app'),
  title: {
    default: '온라인 이미지 편집 도구 모음 - 무료로 간편하게 편집하기 | Image Tools',
    template: '%s | Image Tools'
  },
  description: '웹에서 바로 사용하는 무료 이미지 편집 도구. 회전, 자르기, 크기 조정, 형식 변환, 워터마크 추가, 용량 줄이기 등 다양한 기능을 한 곳에서! 매월 50,000명 이상이 선택한 온라인 이미지 편집 서비스입니다.',
  keywords: [
    '이미지 편집',
    '이미지 도구',
    '온라인 이미지 편집',
    '무료 이미지 편집',
    '사진 편집 도구',
    '웹 기반 이미지 편집',
    '이미지 리사이즈',
    '이미지 크롭',
    '이미지 회전',
    '이미지 압축',
    '워터마크 추가',
    '이미지 변환',
    '온라인 포토 에디터',
    '무료 온라인 이미지 편집',
    '웹 이미지 편집기'
  ],
  authors: [{ name: 'Image Tools' }],
  creator: 'Image Tools',
  publisher: 'Image Tools',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
    description: '웹에서 바로 사용하는 무료 이미지 편집 도구. 회전, 자르기, 크기 조정, 형식 변환, 워터마크 추가, 용량 줄이기 등 다양한 기능을 한 곳에서! 매월 50,000명 이상이 선택한 온라인 이미지 편집 서비스입니다.',
    images: [
      {
        url: '/og-image.png',
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