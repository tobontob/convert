import { Metadata } from 'next';
import { baseMetadata } from './config';

export const metadata: Metadata = {
  ...baseMetadata,
  title: '이미지 파일 변환기 - JPG, PNG, WEBP, GIF 등 상호 변환 | Image Tools',
  description: '웹에서 무료로 이미지 형식 변환! JPG에서 PNG로, PNG에서 WEBP로 손쉽게 변경. 품질 설정 가능, 대량 변환 지원. 각 형식의 특징을 고려한 최적의 변환 결과를 제공합니다.',
  keywords: [
    '이미지 변환',
    '이미지 형식 변환',
    '사진 확장자 변경',
    '이미지 포맷 컨버터',
    'jpg to png',
    'png to webp',
    'JPG 변환',
    'PNG 변환',
    'WebP 변환',
    'GIF 변환',
    '무료 이미지 변환',
    '이미지 포맷 변경',
    'JPEG to PNG',
    'PNG to WebP',
    '이미지 컨버터',
    '배치 이미지 변환',
    '고품질 이미지 변환',
    '이미지 확장자 변경',
    '웹 이미지 변환',
    '이미지 포맷 최적화'
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: '이미지 파일 변환기 - JPG, PNG, WEBP, GIF 등 상호 변환 | Image Tools',
    description: '웹에서 무료로 이미지 형식 변환! JPG에서 PNG로, PNG에서 WEBP로 손쉽게 변경. 품질 설정 가능, 대량 변환 지원. 각 형식의 특징을 고려한 최적의 변환 결과를 제공합니다.',
  },
  twitter: {
    ...baseMetadata.twitter,
    title: '이미지 파일 변환기 - JPG, PNG, WEBP, GIF 등 상호 변환 | Image Tools',
    description: '웹에서 무료로 이미지 형식 변환! JPG에서 PNG로, PNG에서 WEBP로 손쉽게 변경. 품질 설정 가능, 대량 변환 지원.',
  }
}; 