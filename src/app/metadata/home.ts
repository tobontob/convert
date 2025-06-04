import { Metadata } from 'next';
import { defaultMetadata, defaultOpenGraph, defaultTwitter } from './config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: '무료 온라인 이미지 편집 도구 | Image Tools',
  description: '무료로 사용할 수 있는 온라인 이미지 편집 도구입니다. 이미지 변환, 압축, 크기 조정, 자르기, 워터마크 등 다양한 기능을 제공합니다.',
  keywords: [
    '이미지 편집',
    '이미지 도구',
    '온라인 이미지 편집',
    '무료 이미지 편집',
    '이미지 변환',
    '이미지 압축',
    '이미지 크기 조정',
    '이미지 자르기',
    '워터마크',
    '온라인 포토 에디터',
    '이미지 최적화',
    '이미지 편집기',
    '사진 편집',
  ],
  openGraph: {
    ...defaultOpenGraph,
    title: '무료 온라인 이미지 편집 도구 | Image Tools',
    description: '무료로 사용할 수 있는 온라인 이미지 편집 도구입니다. 이미지 변환, 압축, 크기 조정, 자르기, 워터마크 등 다양한 기능을 제공합니다.',
  },
  twitter: {
    ...defaultTwitter,
    title: '무료 온라인 이미지 편집 도구 | Image Tools',
    description: '무료로 사용할 수 있는 온라인 이미지 편집 도구입니다. 이미지 변환, 압축, 크기 조정, 자르기, 워터마크 등 다양한 기능을 제공합니다.',
  },
}; 