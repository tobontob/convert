import { Metadata } from 'next';
import { defaultMetadata } from '../metadata/config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 자르기 | 스마트 크롭 | 이미지 트리밍 | Image Tools',
  description: '이미지를 원하는 크기와 비율로 정밀하게 자르세요. 얼굴 인식 스마트 크롭, 자유 영역 선택, SNS 최적화 비율 등 전문적인 이미지 자르기 기능을 제공합니다. 직관적인 인터페이스로 쉽게 이미지를 편집할 수 있습니다.',
  keywords: [
    '이미지 자르기',
    '이미지 크롭',
    '이미지 트리밍',
    '스마트 크롭',
    '얼굴 인식 자르기',
    'SNS 이미지 자르기',
    '프로필 사진 자르기',
    '자유 영역 선택',
    '비율 자르기',
    '원형 자르기',
    '배경 제거',
    '이미지 편집',
    '정밀 자르기',
    '온라인 크롭',
    '이미지 잘라내기'
  ],
  openGraph: {
    ...defaultMetadata.openGraph,
    title: '이미지 자르기 | 스마트 크롭',
    description: '이미지를 원하는 크기와 비율로 정밀하게 자르세요. 얼굴 인식 스마트 크롭, 자유 영역 선택 등 전문적인 기능을 제공합니다.',
  }
}; 