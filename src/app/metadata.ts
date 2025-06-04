import { Metadata } from 'next';
import { baseMetadata } from './metadata/config';

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
  },
};

// 랜딩 페이지 메타데이터
export const metadata: Metadata = {
  ...baseMetadata,
  title: '무료 온라인 이미지 편집 도구 | 이미지 변환, 압축, 편집 | Image Tools',
  description: '무료로 사용할 수 있는 전문가급 온라인 이미지 편집 도구입니다. 이미지 변환, 압축, 크기 조정, 자르기, 워터마크, 회전 등 다양한 기능을 제공합니다. 웹 브라우저에서 바로 사용 가능한 온라인 이미지 편집 서비스입니다.',
  keywords: [
    '이미지 편집',
    '온라인 이미지 편집',
    '무료 이미지 편집',
    '이미지 변환',
    '이미지 압축',
    '이미지 크기 조정',
    '이미지 자르기',
    '워터마크',
    '이미지 회전',
    '온라인 포토샵',
    '이미지 최적화',
    '이미지 리사이징',
    '이미지 편집기',
    '웹 기반 이미지 편집',
    '무료 이미지 도구'
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: '무료 온라인 이미지 편집 도구 | Image Tools',
    description: '무료로 사용할 수 있는 전문가급 온라인 이미지 편집 도구입니다. 이미지 변환, 압축, 크기 조정, 자르기, 워터마크, 회전 등 다양한 기능을 제공합니다.',
  },
  twitter: {
    ...baseMetadata.twitter,
    title: '무료 온라인 이미지 편집 도구 | Image Tools',
    description: '무료로 사용할 수 있는 전문가급 온라인 이미지 편집 도구입니다. 이미지 변환, 압축, 크기 조정, 자르기, 워터마크, 회전 등 다양한 기능을 제공합니다.',
  }
};

// 이미지 변환 페이지 메타데이터
export const convertMetadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 형식 변환 | JPG, PNG, WebP, GIF 변환 | Image Tools',
  description: 'JPG, PNG, WebP, GIF 등 다양한 이미지 형식으로 무료로 변환하세요. 고품질 이미지 변환, 빠른 처리 속도, 안전한 파일 처리를 제공합니다. 웹에서 바로 이미지 형식을 변환할 수 있는 온라인 도구입니다.',
  keywords: [
    '이미지 변환',
    '이미지 형식 변환',
    'JPG 변환',
    'PNG 변환',
    'WebP 변환',
    'GIF 변환',
    '무료 이미지 변환',
    '온라인 이미지 변환',
    'JPEG to PNG',
    'PNG to JPG',
    'WebP 컨버터',
    '이미지 포맷 변경',
    '이미지 확장자 변경',
    '고품질 이미지 변환',
    '웹 이미지 변환'
  ],
  openGraph: {
    ...defaultMetadata.openGraph,
    title: '이미지 형식 변환 | JPG, PNG, WebP, GIF 변환',
    description: 'JPG, PNG, WebP, GIF 등 다양한 이미지 형식으로 무료로 변환하세요. 고품질 이미지 변환, 빠른 처리 속도를 제공합니다.',
  }
};

// 이미지 압축 페이지 메타데이터
export const compressMetadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 압축 | 이미지 용량 줄이기 | 스마트 이미지 최적화 | Image Tools',
  description: '이미지 품질은 유지하면서 파일 크기를 최적화하세요. AI 기반 스마트 압축 알고리즘으로 웹사이트 성능 향상, 저장 공간 절약을 도와드립니다. 무료로 제공되는 전문가급 이미지 압축 서비스입니다.',
  keywords: [
    '이미지 압축',
    '이미지 최적화',
    '파일 크기 줄이기',
    '이미지 용량 줄이기',
    '무료 이미지 압축',
    'JPG 압축',
    'PNG 압축',
    '웹 이미지 최적화',
    '이미지 경량화',
    '스마트 이미지 압축',
    '온라인 이미지 압축',
    '고품질 이미지 압축',
    '이미지 파일 압축',
    'AI 이미지 압축',
    '웹사이트 최적화'
  ],
  openGraph: {
    ...defaultMetadata.openGraph,
    title: '이미지 압축 | 스마트 이미지 최적화',
    description: '이미지 품질은 유지하면서 파일 크기를 최적화하세요. AI 기반 스마트 압축 알고리즘으로 웹사이트 성능 향상을 도와드립니다.',
  }
};

// 이미지 크기 조정 페이지 메타데이터
export const resizeMetadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 크기 조정 | 이미지 리사이징 | 비율 유지 크기 조정 | Image Tools',
  description: '이미지 크기를 자유롭게 조정하세요. 비율 유지, 픽셀 단위 조정, 배치 처리 등 다양한 옵션을 제공합니다. SNS 이미지, 프로필 사진, 썸네일 등 용도에 맞는 크기로 쉽게 변경할 수 있습니다.',
  keywords: [
    '이미지 크기 조정',
    '이미지 리사이즈',
    '이미지 사이즈 변경',
    '비율 유지 크기 조정',
    '이미지 축소',
    '이미지 확대',
    '썸네일 만들기',
    'SNS 이미지 크기',
    '프로필 사진 크기',
    '배치 크기 조정',
    '픽셀 단위 조정',
    '이미지 스케일링',
    '고품질 리사이징',
    '이미지 비율 조정',
    '대량 이미지 크기 조정'
  ],
  openGraph: {
    ...defaultMetadata.openGraph,
    title: '이미지 크기 조정 | 비율 유지 크기 조정',
    description: '이미지 크기를 자유롭게 조정하세요. 비율 유지, 픽셀 단위 조정, SNS 이미지 최적화 등 다양한 옵션을 제공합니다.',
  }
};

// 이미지 자르기 페이지 메타데이터
export const cropMetadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 자르기 | 스마트 크롭 | 이미지 트리밍 | Image Tools',
  description: '이미지를 원하는 크기와 비율로 정밀하게 자르세요. 얼굴 인식 스마트 크롭, 자유 영역 선택, SNS 최적화 비율 등 전문적인 이미지 자르기 기능을 제공합니다. 직관적인 인터페이스로 쉽게 이미지를 편집할 수 있습니다.',
  keywords: [
    '이미지 자르기',
    '이미지 크롭',
    '이미지 트리밍',
    '스마트 크롭',
    '얼굴 인식 자르기',
    'SNS 이미지 자르기',
    '프로필 사진 자르기',
    '자유 영역 선택',
    '비율 자르기',
    '원형 자르기',
    '배경 제거',
    '이미지 편집',
    '정밀 자르기',
    '온라인 크롭',
    '이미지 잘라내기'
  ],
  openGraph: {
    ...defaultMetadata.openGraph,
    title: '이미지 자르기 | 스마트 크롭',
    description: '이미지를 원하는 크기와 비율로 정밀하게 자르세요. 얼굴 인식 스마트 크롭, 자유 영역 선택 등 전문적인 기능을 제공합니다.',
  }
};

// 이미지 회전 페이지 메타데이터
export const rotateMetadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 회전 | 이미지 반전 | 각도 조정 | Image Tools',
  description: '이미지를 원하는 각도로 자유롭게 회전하세요. 90도, 180도 회전, 좌우/상하 반전, 미세 각도 조정 등 다양한 회전 옵션을 제공합니다. EXIF 정보를 활용한 자동 회전 보정 기능도 지원합니다.',
  keywords: [
    '이미지 회전',
    '이미지 반전',
    '이미지 뒤집기',
    '각도 조정',
    '90도 회전',
    '180도 회전',
    '좌우 반전',
    '상하 반전',
    '이미지 기울기 조정',
    'EXIF 회전',
    '자동 회전 보정',
    '미세 각도 조정',
    '이미지 방향 변경',
    '배치 회전',
    '무료 이미지 회전'
  ],
  openGraph: {
    ...defaultMetadata.openGraph,
    title: '이미지 회전 | 각도 조정',
    description: '이미지를 원하는 각도로 자유롭게 회전하세요. 90도, 180도 회전, 좌우/상하 반전, 미세 각도 조정 등을 지원합니다.',
  }
};

// 이미지 편집기 페이지 메타데이터
export const editorMetadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 편집기 | 올인원 이미지 편집 | 전문가용 편집 도구 | Image Tools',
  description: '전문가급 온라인 이미지 편집기로 이미지를 완벽하게 편집하세요. 필터, 효과, 밝기/대비 조정, 색상 보정, 텍스트 추가, 레이어 기능 등 다양한 전문 편집 도구를 제공합니다. 포토샵과 같은 고급 기능을 무료로 사용해보세요.',
  keywords: [
    '이미지 편집기',
    '온라인 포토샵',
    '이미지 필터',
    '이미지 효과',
    '사진 보정',
    '색상 조정',
    '밝기 조정',
    '대비 조정',
    '텍스트 추가',
    '레이어 편집',
    '전문가용 편집',
    '온라인 편집기',
    '이미지 보정',
    '사진 편집',
    '무료 이미지 편집'
  ],
  openGraph: {
    ...defaultMetadata.openGraph,
    title: '이미지 편집기 | 전문가용 편집 도구',
    description: '전문가급 온라인 이미지 편집기로 이미지를 완벽하게 편집하세요. 필터, 효과, 색상 보정 등 다양한 전문 편집 도구를 제공합니다.',
  }
};

// 워터마크 페이지 메타데이터
export const watermarkMetadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 워터마크 | 저작권 보호 | 로고 삽입 | Image Tools',
  description: '이미지에 전문적인 워터마크를 추가하세요. 텍스트, 로고, 이미지 워터마크 지원, 투명도/크기/위치 조정, 일괄 처리 기능을 제공합니다. 이미지 저작권을 보호하고 브랜드 아이덴티티를 강화하세요.',
  keywords: [
    '이미지 워터마크',
    '워터마크 추가',
    '저작권 보호',
    '로고 삽입',
    '텍스트 워터마크',
    '이미지 워터마크',
    '투명도 조정',
    '워터마크 위치',
    '배치 워터마크',
    '브랜드 워터마크',
    '사진 워터마크',
    '워터마크 만들기',
    '전문 워터마크',
    '워터마크 디자인',
    '무료 워터마크'
  ],
  openGraph: {
    ...defaultMetadata.openGraph,
    title: '이미지 워터마크 | 저작권 보호',
    description: '이미지에 전문적인 워터마크를 추가하세요. 텍스트, 로고, 이미지 워터마크 지원, 다양한 커스터마이징 옵션을 제공합니다.',
  }
}; 