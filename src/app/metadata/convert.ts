import { Metadata } from 'next';
import { defaultMetadata, defaultOpenGraph, defaultTwitter } from './config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 형식 변환 | 무료 이미지 컨버터 | Image Tools',
  description: 'JPG, PNG, WebP, GIF 등 다양한 이미지 형식으로 무료로 변환하세요. 빠르고 안전한 이미지 변환 서비스로 원하는 형식의 이미지를 얻을 수 있습니다.',
  keywords: [
    '이미지 변환',
    '이미지 형식 변환',
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
  ],
  openGraph: {
    ...defaultOpenGraph,
    title: '이미지 형식 변환 | 무료 이미지 컨버터 | Image Tools',
    description: 'JPG, PNG, WebP, GIF 등 다양한 이미지 형식으로 무료로 변환하세요. 빠르고 안전한 이미지 변환 서비스로 원하는 형식의 이미지를 얻을 수 있습니다.',
  },
  twitter: {
    ...defaultTwitter,
    title: '이미지 형식 변환 | 무료 이미지 컨버터 | Image Tools',
    description: 'JPG, PNG, WebP, GIF 등 다양한 이미지 형식으로 무료로 변환하세요. 빠르고 안전한 이미지 변환 서비스로 원하는 형식의 이미지를 얻을 수 있습니다.',
  },
}; 