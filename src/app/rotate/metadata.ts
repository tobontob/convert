import { Metadata } from 'next';
import { defaultMetadata } from '../metadata/config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: '이미지 회전 | 이미지 반전 | 각도 조정 | Image Tools',
  description: '이미지를 원하는 각도로 자유롭게 회전하세요. 90도, 180도 회전, 좌우/상하 반전, 미세 각도 조정 등 다양한 회전 옵션을 제공합니다. EXIF 정보를 활용한 자동 회전 보정 기능도 지원합니다.',
  keywords: [
    '이미지 회전',
    '이미지 반전',
    '이미지 뒤집기',
    '각도 조정',
    '90도 회전',
    '180도 회전',
    '좌우 반전',
    '상하 반전',
    '이미지 기울기 조정',
    'EXIF 회전',
    '자동 회전 보정',
    '미세 각도 조정',
    '이미지 방향 변경',
    '배치 회전',
    '무료 이미지 회전'
  ],
  openGraph: {
    ...defaultMetadata.openGraph,
    title: '이미지 회전 | 각도 조정',
    description: '이미지를 원하는 각도로 자유롭게 회전하세요. 90도, 180도 회전, 좌우/상하 반전, 미세 각도 조정 등을 지원합니다.',
  }
}; 