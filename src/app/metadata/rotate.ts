import { Metadata } from 'next';
import { baseMetadata } from './config';

export const metadata: Metadata = {
  ...baseMetadata,
  title: '이미지 회전 | 무료 이미지 회전 도구 | Image Tools',
  description: '이미지를 원하는 각도로 자유롭게 회전하세요. 90도, 180도 회전 및 좌우 반전 등 다양한 회전 옵션을 제공하는 무료 온라인 도구입니다.',
  keywords: [
    '이미지 회전',
    '이미지 반전',
    '이미지 뒤집기',
    '이미지 각도 조정',
    '무료 이미지 회전',
    '사진 회전',
    '이미지 방향 변경',
    '90도 회전',
    '180도 회전',
    '좌우 반전',
    '상하 반전',
    '이미지 방향 보정',
    '회전 각도 조정',
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: '이미지 회전 | 무료 이미지 회전 도구 | Image Tools',
    description: '이미지를 원하는 각도로 자유롭게 회전하세요. 90도, 180도 회전 및 좌우 반전 등 다양한 회전 옵션을 제공하는 무료 온라인 도구입니다.',
  },
  twitter: {
    ...baseMetadata.twitter,
    title: '이미지 회전 | 무료 이미지 회전 도구 | Image Tools',
    description: '이미지를 원하는 각도로 자유롭게 회전하세요. 90도, 180도 회전 및 좌우 반전 등 다양한 회전 옵션을 제공하는 무료 온라인 도구입니다.',
  },
}; 