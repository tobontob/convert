import { Metadata } from 'next';
import { baseMetadata } from './config';

export const metadata: Metadata = {
  ...baseMetadata,
  title: '이미지 리사이즈 도구 - 픽셀 단위로 정확한 크기 조정 | Image Tools',
  description: '원하는 크기로 이미지 사이즈를 무료로 조정하세요. 비율 유지 옵션, 대량 리사이즈 지원. 웹사이트, SNS, 인쇄용 사이즈에 최적화! 고급 리사이징 알고리즘으로 선명한 결과물을 제공합니다.',
  keywords: [
    '이미지 크기 조정',
    '사진 크기 변경',
    '이미지 확대 축소',
    '온라인 리사이저',
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
    'SNS 이미지 크기',
    '프로필 사진 크기',
    '인쇄용 이미지 크기',
    '해상도 조정'
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: '이미지 리사이즈 도구 - 픽셀 단위로 정확한 크기 조정 | Image Tools',
    description: '원하는 크기로 이미지 사이즈를 무료로 조정하세요. 비율 유지 옵션, 대량 리사이즈 지원. 웹사이트, SNS, 인쇄용 사이즈에 최적화! 고급 리사이징 알고리즘으로 선명한 결과물을 제공합니다.',
  },
  twitter: {
    ...baseMetadata.twitter,
    title: '이미지 리사이즈 도구 - 픽셀 단위로 정확한 크기 조정 | Image Tools',
    description: '원하는 크기로 이미지 사이즈를 무료로 조정하세요. 비율 유지 옵션, 대량 리사이즈 지원. 웹사이트, SNS, 인쇄용 사이즈에 최적화!',
  }
}; 