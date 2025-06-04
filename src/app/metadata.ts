import { Metadata } from 'next';

// 기본 메타데이터 설정
export const defaultMetadata: Metadata = {
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
    naver: 'naver-site-verification-code',
  },
};

// 랜딩 페이지 메타데이터
export const homeMetadata: Metadata = {
  ...defaultMetadata,
  title: '무료 온라인 이미지 편집 도구 | Image Tools',
  description: '무료로 사용할 수 있는 온라인 이미지 편집 도구입니다. 이미지 변환, 압축, 크기 조정, 자르기, 워터마크 등 다양한 기능을 제공합니다.',
  keywords: ['이미지 편집', '이미지 도구', '온라인 이미지 편집', '무료 이미지 편집', '이미지 변환', '이미지 압축', '이미지 크기 조정', '이미지 자르기', '워터마크'],
};

// 이미지 변환 페이지 메타데이터
export const convertMetadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 형식 변환 | Image Tools',
  description: 'JPG, PNG, WebP, GIF 등 다양한 이미지 형식으로 무료로 변환하세요. 빠르고 안전한 이미지 변환 서비스를 제공합니다.',
  keywords: ['이미지 변환', '이미지 형식 변환', 'JPG 변환', 'PNG 변환', 'WebP 변환', 'GIF 변환', '무료 이미지 변환'],
};

// 이미지 압축 페이지 메타데이터
export const compressMetadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 압축 | Image Tools',
  description: '이미지 품질은 유지하면서 파일 크기를 줄이세요. 최적화된 이미지 압축 알고리즘으로 효율적인 압축을 제공합니다.',
  keywords: ['이미지 압축', '이미지 최적화', '파일 크기 줄이기', '이미지 용량 줄이기', '무료 이미지 압축'],
};

// 이미지 크기 조정 페이지 메타데이터
export const resizeMetadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 크기 조정 | Image Tools',
  description: '이미지 크기를 원하는 대로 조정하세요. 비율 유지, 픽셀 단위 조정 등 다양한 옵션을 제공합니다.',
  keywords: ['이미지 크기 조정', '이미지 리사이즈', '이미지 사이즈 변경', '이미지 크기 변경', '무료 이미지 크기 조정'],
};

// 이미지 자르기 페이지 메타데이터
export const cropMetadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 자르기 | Image Tools',
  description: '이미지를 원하는 크기와 비율로 자르세요. 자유로운 선택 영역 지정과 미리보기 기능을 제공합니다.',
  keywords: ['이미지 자르기', '이미지 크롭', '이미지 편집', '이미지 잘라내기', '무료 이미지 자르기'],
};

// 이미지 회전 페이지 메타데이터
export const rotateMetadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 회전 | Image Tools',
  description: '이미지를 원하는 각도로 회전하세요. 90도, 180도 회전 및 좌우 반전 기능을 제공합니다.',
  keywords: ['이미지 회전', '이미지 반전', '이미지 뒤집기', '이미지 각도 조정', '무료 이미지 회전'],
};

// 이미지 편집기 페이지 메타데이터
export const editorMetadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 편집기 | Image Tools',
  description: '다양한 이미지 편집 도구를 한 곳에서 사용하세요. 필터, 조정, 변형 등 전문적인 편집 기능을 제공합니다.',
  keywords: ['이미지 편집기', '온라인 포토샵', '이미지 필터', '이미지 효과', '무료 이미지 편집'],
};

// 워터마크 페이지 메타데이터
export const watermarkMetadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 워터마크 | Image Tools',
  description: '이미지에 텍스트 또는 이미지 워터마크를 추가하세요. 크기, 위치, 투명도 등을 자유롭게 조정할 수 있습니다.',
  keywords: ['이미지 워터마크', '워터마크 추가', '저작권 보호', '로고 삽입', '무료 워터마크'],
};

export { metadata } from './metadata/home'; 