import { Metadata } from 'next';
import { defaultMetadata } from '../metadata/config';

export const metadata: Metadata = {
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