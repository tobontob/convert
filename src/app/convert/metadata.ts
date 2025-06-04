import { Metadata } from 'next';
import { defaultMetadata } from '../metadata/config';

export const metadata: Metadata = {
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