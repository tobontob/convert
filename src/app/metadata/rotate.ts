import { Metadata } from 'next';
import { baseMetadata } from './config';

export const metadata: Metadata = {
  ...baseMetadata,
  title: '이미지 회전 도구 - 90°, 180°, 사용자 지정 각도로 사진 회전하기 | Image Tools',
  description: '온라인에서 무료로 이미지를 시계/반시계 방향으로 회전. JPG, PNG, GIF 등 다양한 형식 지원. EXIF 정보를 활용한 자동 회전 보정. 모바일 사진 회전에 최적화된 도구입니다.',
  keywords: [
    '이미지 회전',
    '사진 돌리기',
    '이미지 방향 변경',
    '온라인 사진 회전기',
    '이미지 반전',
    '이미지 뒤집기',
    '이미지 각도 조정',
    '무료 이미지 회전',
    '사진 회전',
    '90도 회전',
    '180도 회전',
    '좌우 반전',
    '상하 반전',
    '이미지 방향 보정',
    '회전 각도 조정',
    'EXIF 회전',
    '모바일 사진 회전'
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: '이미지 회전 도구 - 90°, 180°, 사용자 지정 각도로 사진 회전하기 | Image Tools',
    description: '온라인에서 무료로 이미지를 시계/반시계 방향으로 회전. JPG, PNG, GIF 등 다양한 형식 지원. EXIF 정보를 활용한 자동 회전 보정. 모바일 사진 회전에 최적화된 도구입니다.',
  },
  twitter: {
    ...baseMetadata.twitter,
    title: '이미지 회전 도구 - 90°, 180°, 사용자 지정 각도로 사진 회전하기 | Image Tools',
    description: '온라인에서 무료로 이미지를 시계/반시계 방향으로 회전. JPG, PNG, GIF 등 다양한 형식 지원. EXIF 정보를 활용한 자동 회전 보정.',
  }
}; 