import { Metadata } from 'next';
import { baseMetadata } from './config';

export const metadata: Metadata = {
  ...baseMetadata,
  title: '이미지 워터마크 | 무료 워터마크 추가 도구 | Image Tools',
  description: '이미지에 텍스트 또는 이미지 워터마크를 추가하세요. 크기, 위치, 투명도 등을 자유롭게 조정할 수 있는 무료 워터마크 도구입니다.',
  keywords: [
    '이미지 워터마크',
    '워터마크 추가',
    '저작권 보호',
    '로고 삽입',
    '무료 워터마크',
    '텍스트 워터마크',
    '이미지 워터마크',
    '워터마크 제작',
    '워터마크 디자인',
    '사진 워터마크',
    '투명 워터마크',
    '워터마크 위치 조정',
    '워터마크 크기 조정',
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: '이미지 워터마크 | 무료 워터마크 추가 도구 | Image Tools',
    description: '이미지에 텍스트 또는 이미지 워터마크를 추가하세요. 크기, 위치, 투명도 등을 자유롭게 조정할 수 있는 무료 워터마크 도구입니다.',
  },
  twitter: {
    ...baseMetadata.twitter,
    title: '이미지 워터마크 | 무료 워터마크 추가 도구 | Image Tools',
    description: '이미지에 텍스트 또는 이미지 워터마크를 추가하세요. 크기, 위치, 투명도 등을 자유롭게 조정할 수 있는 무료 워터마크 도구입니다.',
  }
}; 