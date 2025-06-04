import { Metadata } from 'next';
import { baseMetadata } from '../metadata/config';

export const metadata: Metadata = {
  ...baseMetadata,
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
    ...baseMetadata.openGraph,
    title: '이미지 압축 | 스마트 이미지 최적화',
    description: '이미지 품질은 유지하면서 파일 크기를 최적화하세요. AI 기반 스마트 압축 알고리즘으로 웹사이트 성능 향상을 도와드립니다.',
  }
}; 