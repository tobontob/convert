import { Metadata } from 'next';
import { defaultMetadata } from '../metadata/config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 워터마크 | 저작권 보호 | 로고 삽입 | Image Tools',
  description: '이미지에 전문적인 워터마크를 추가하세요. 텍스트, 로고, 이미지 워터마크 지원, 투명도/크기/위치 조정, 일괄 처리 기능을 제공합니다. 이미지 저작권을 보호하고 브랜드 아이덴티티를 강화하세요.',
  keywords: [
    '이미지 워터마크',
    '워터마크 추가',
    '저작권 보호',
    '로고 삽입',
    '텍스트 워터마크',
    '이미지 워터마크',
    '투명도 조정',
    '워터마크 위치',
    '배치 워터마크',
    '브랜드 워터마크',
    '사진 워터마크',
    '워터마크 만들기',
    '전문 워터마크',
    '워터마크 디자인',
    '무료 워터마크'
  ],
  openGraph: {
    ...defaultMetadata.openGraph,
    title: '이미지 워터마크 | 저작권 보호',
    description: '이미지에 전문적인 워터마크를 추가하세요. 텍스트, 로고, 이미지 워터마크 지원, 다양한 커스터마이징 옵션을 제공합니다.',
  }
}; 