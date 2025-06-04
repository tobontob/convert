import { Metadata } from 'next';
import { defaultMetadata, defaultOpenGraph, defaultTwitter } from './config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 압축 | 무료 이미지 최적화 도구 | Image Tools',
  description: '이미지 품질은 유지하면서 파일 크기를 최적화하세요. 고급 압축 알고리즘으로 웹사이트 성능 향상과 저장 공간 절약을 동시에 실현합니다.',
  keywords: [
    '이미지 압축',
    '이미지 최적화',
    '파일 크기 줄이기',
    '이미지 용량 줄이기',
    '무료 이미지 압축',
    '온라인 이미지 압축',
    'JPG 압축',
    'PNG 압축',
    'WebP 압축',
    '이미지 품질 최적화',
    '웹사이트 최적화',
    '이미지 경량화',
    '고품질 이미지 압축',
  ],
  openGraph: {
    ...defaultOpenGraph,
    title: '이미지 압축 | 무료 이미지 최적화 도구 | Image Tools',
    description: '이미지 품질은 유지하면서 파일 크기를 최적화하세요. 고급 압축 알고리즘으로 웹사이트 성능 향상과 저장 공간 절약을 동시에 실현합니다.',
  },
  twitter: {
    ...defaultTwitter,
    title: '이미지 압축 | 무료 이미지 최적화 도구 | Image Tools',
    description: '이미지 품질은 유지하면서 파일 크기를 최적화하세요. 고급 압축 알고리즘으로 웹사이트 성능 향상과 저장 공간 절약을 동시에 실현합니다.',
  },
}; 