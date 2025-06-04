import { Metadata } from 'next';
import { defaultMetadata } from '../metadata/config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 편집기 | 올인원 이미지 편집 | 전문가용 편집 도구 | Image Tools',
  description: '전문가급 온라인 이미지 편집기로 이미지를 완벽하게 편집하세요. 필터, 효과, 밝기/대비 조정, 색상 보정, 텍스트 추가, 레이어 기능 등 다양한 전문 편집 도구를 제공합니다. 포토샵과 같은 고급 기능을 무료로 사용해보세요.',
  keywords: [
    '이미지 편집기',
    '온라인 포토샵',
    '이미지 필터',
    '이미지 효과',
    '사진 보정',
    '색상 조정',
    '밝기 조정',
    '대비 조정',
    '텍스트 추가',
    '레이어 편집',
    '전문가용 편집',
    '온라인 편집기',
    '이미지 보정',
    '사진 편집',
    '무료 이미지 편집'
  ],
  openGraph: {
    ...defaultMetadata.openGraph,
    title: '이미지 편집기 | 전문가용 편집 도구',
    description: '전문가급 온라인 이미지 편집기로 이미지를 완벽하게 편집하세요. 필터, 효과, 색상 보정 등 다양한 전문 편집 도구를 제공합니다.',
  }
}; 