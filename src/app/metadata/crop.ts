import { Metadata } from 'next';
import { baseMetadata } from './config';

export const metadata: Metadata = {
  ...baseMetadata,
  title: '이미지 자르기 | 무료 이미지 크롭 도구 | Image Tools',
  description: '이미지를 원하는 크기와 비율로 자유롭게 자르세요. 정사각형, 16:9, 4:3 등 다양한 비율 프리셋과 자유 선택 영역 지정을 지원합니다.',
  keywords: [
    '이미지 자르기',
    '이미지 크롭',
    '이미지 편집',
    '이미지 잘라내기',
    '무료 이미지 자르기',
    '사진 자르기',
    '이미지 트리밍',
    '비율 자르기',
    '정사각형 자르기',
    '프로필 사진 자르기',
    '배경 제거',
    '이미지 영역 선택',
    '정밀 크롭',
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: '이미지 자르기 | 무료 이미지 크롭 도구 | Image Tools',
    description: '이미지를 원하는 크기와 비율로 자유롭게 자르세요. 정사각형, 16:9, 4:3 등 다양한 비율 프리셋과 자유 선택 영역 지정을 지원합니다.',
  },
  twitter: {
    ...baseMetadata.twitter,
    title: '이미지 자르기 | 무료 이미지 크롭 도구 | Image Tools',
    description: '이미지를 원하는 크기와 비율로 자유롭게 자르세요. 정사각형, 16:9, 4:3 등 다양한 비율 프리셋과 자유 선택 영역 지정을 지원합니다.',
  }
}; 