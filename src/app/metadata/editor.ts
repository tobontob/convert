import { Metadata } from 'next';
import { baseMetadata } from './config';

export const metadata: Metadata = {
  ...baseMetadata,
  title: '이미지 편집기 | 무료 온라인 포토 에디터 | Image Tools',
  description: '다양한 이미지 편집 도구를 한 곳에서 사용하세요. 필터, 조정, 변형 등 전문적인 편집 기능을 무료로 제공하는 온라인 이미지 편집기입니다.',
  keywords: [
    '이미지 편집기',
    '온라인 포토샵',
    '이미지 필터',
    '이미지 효과',
    '무료 이미지 편집',
    '사진 편집',
    '이미지 보정',
    '이미지 필터 효과',
    '온라인 포토 에디터',
    '이미지 색상 조정',
    '이미지 밝기 조정',
    '이미지 대비 조정',
    '전문 이미지 편집',
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: '이미지 편집기 | 무료 온라인 포토 에디터 | Image Tools',
    description: '다양한 이미지 편집 도구를 한 곳에서 사용하세요. 필터, 조정, 변형 등 전문적인 편집 기능을 무료로 제공하는 온라인 이미지 편집기입니다.',
  },
  twitter: {
    ...baseMetadata.twitter,
    title: '이미지 편집기 | 무료 온라인 포토 에디터 | Image Tools',
    description: '다양한 이미지 편집 도구를 한 곳에서 사용하세요. 필터, 조정, 변형 등 전문적인 편집 기능을 무료로 제공하는 온라인 이미지 편집기입니다.',
  }
}; 