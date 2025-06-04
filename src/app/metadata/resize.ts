import { Metadata } from 'next';
import { baseMetadata } from './config';

export const metadata: Metadata = {
  ...baseMetadata,
  title: '이미지 크기 조정 | 무료 이미지 리사이즈 도구 | Image Tools',
  description: '이미지 크기를 원하는 대로 조정하세요. 비율 유지, 픽셀 단위 조정, 퍼센트 조정 등 다양한 옵션으로 정확한 크기의 이미지를 만들 수 있습니다.',
  keywords: [
    '이미지 크기 조정',
    '이미지 리사이즈',
    '이미지 사이즈 변경',
    '이미지 크기 변경',
    '무료 이미지 크기 조정',
    '이미지 비율 조정',
    '이미지 축소',
    '이미지 확대',
    '픽셀 크기 조정',
    '비율 유지 리사이즈',
    '이미지 스케일링',
    '배치 이미지 리사이즈',
    '고품질 리사이징',
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: '이미지 크기 조정 | 무료 이미지 리사이즈 도구 | Image Tools',
    description: '이미지 크기를 원하는 대로 조정하세요. 비율 유지, 픽셀 단위 조정, 퍼센트 조정 등 다양한 옵션으로 정확한 크기의 이미지를 만들 수 있습니다.',
  },
  twitter: {
    ...baseMetadata.twitter,
    title: '이미지 크기 조정 | 무료 이미지 리사이즈 도구 | Image Tools',
    description: '이미지 크기를 원하는 대로 조정하세요. 비율 유지, 픽셀 단위 조정, 퍼센트 조정 등 다양한 옵션으로 정확한 크기의 이미지를 만들 수 있습니다.',
  },
}; 