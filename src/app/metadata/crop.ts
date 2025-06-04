import { Metadata } from 'next';
import { baseMetadata } from './config';

export const metadata: Metadata = {
  ...baseMetadata,
  title: '이미지 자르기 도구 - 원하는 부분만 정확하게 크롭하기 | Image Tools',
  description: '온라인에서 무료로 이미지의 특정 부분을 자르세요. 비율 고정(1:1, 4:3, 16:9), 픽셀 단위 지정 크롭 가능. SNS 프로필 사진에 최적화! 자르기 가이드라인으로 더 전문적인 결과물을 만들어보세요.',
  keywords: [
    '이미지 자르기',
    '사진 크롭',
    '이미지 일부 추출',
    '온라인 포토 커터',
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
    'SNS 프로필 크롭',
    '인스타그램 크기',
    '페이스북 커버'
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: '이미지 자르기 도구 - 원하는 부분만 정확하게 크롭하기 | Image Tools',
    description: '온라인에서 무료로 이미지의 특정 부분을 자르세요. 비율 고정(1:1, 4:3, 16:9), 픽셀 단위 지정 크롭 가능. SNS 프로필 사진에 최적화! 자르기 가이드라인으로 더 전문적인 결과물을 만들어보세요.',
  },
  twitter: {
    ...baseMetadata.twitter,
    title: '이미지 자르기 도구 - 원하는 부분만 정확하게 크롭하기 | Image Tools',
    description: '온라인에서 무료로 이미지의 특정 부분을 자르세요. 비율 고정(1:1, 4:3, 16:9), 픽셀 단위 지정 크롭 가능. SNS 프로필 사진에 최적화!',
  }
}; 