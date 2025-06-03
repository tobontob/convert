import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const text = formData.get('text') as string;
    const position = formData.get('position') as string;
    const opacity = parseInt(formData.get('opacity') as string);

    if (!file || !text || !position || isNaN(opacity)) {
      return NextResponse.json(
        { error: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(buffer);

    // 이미지 크기 가져오기
    const metadata = await image.metadata();
    const width = metadata.width || 800;
    const height = metadata.height || 600;

    // SVG 워터마크 생성
    const fontSize = Math.min(width, height) * 0.05; // 이미지 크기에 비례한 폰트 크기
    const svgText = `
      <svg width="${width}" height="${height}">
        <style>
          .text {
            fill: rgba(255, 255, 255, ${opacity / 100});
            font-size: ${fontSize}px;
            font-family: Arial, sans-serif;
            font-weight: bold;
          }
        </style>
        <text
          x="${getXPosition(position, width)}"
          y="${getYPosition(position, height)}"
          text-anchor="${getTextAnchor(position)}"
          class="text"
          transform="rotate(${getRotation(position)}, ${getXPosition(position, width)}, ${getYPosition(position, height)})"
        >${text}</text>
      </svg>
    `;

    // 워터마크 적용
    const watermarkedBuffer = await image
      .composite([
        {
          input: Buffer.from(svgText),
          top: 0,
          left: 0,
        },
      ])
      .toBuffer();

    // 응답 헤더 설정
    const headers = new Headers();
    headers.set('Content-Type', 'image/jpeg');
    headers.set('Content-Disposition', 'attachment; filename=watermarked.jpg');

    return new NextResponse(watermarkedBuffer, { headers });
  } catch (error) {
    console.error('Error applying watermark:', error);
    return NextResponse.json(
      { error: '워터마크 적용 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 워터마크 위치 계산 함수들
function getXPosition(position: string, width: number): number {
  switch (position) {
    case 'top-left':
    case 'bottom-left':
      return width * 0.05;
    case 'top-right':
    case 'bottom-right':
      return width * 0.95;
    default: // center
      return width * 0.5;
  }
}

function getYPosition(position: string, height: number): number {
  switch (position) {
    case 'top-left':
    case 'top-right':
      return height * 0.1;
    case 'bottom-left':
    case 'bottom-right':
      return height * 0.9;
    default: // center
      return height * 0.5;
  }
}

function getTextAnchor(position: string): string {
  switch (position) {
    case 'top-left':
    case 'bottom-left':
      return 'start';
    case 'top-right':
    case 'bottom-right':
      return 'end';
    default: // center
      return 'middle';
  }
}

function getRotation(position: string): number {
  switch (position) {
    case 'top-left':
    case 'bottom-right':
      return -45;
    case 'top-right':
    case 'bottom-left':
      return 45;
    default: // center
      return -30;
  }
} 