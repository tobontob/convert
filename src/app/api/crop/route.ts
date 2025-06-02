import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB 제한

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as Blob;
    const cropData = JSON.parse(formData.get('crop') as string);

    if (!file) {
      return NextResponse.json(
        { error: '이미지 파일이 필요합니다.' },
        { status: 400 }
      );
    }

    // 파일 크기 검사
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: '파일 크기는 10MB를 초과할 수 없습니다.' },
        { status: 400 }
      );
    }

    // Blob을 Buffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 이미지 크롭
    const croppedBuffer = await sharp(buffer)
      .extract({
        left: Math.round(cropData.x),
        top: Math.round(cropData.y),
        width: Math.round(cropData.width),
        height: Math.round(cropData.height),
      })
      .toBuffer();

    // 크롭된 이미지 메타데이터 가져오기
    const metadata = await sharp(croppedBuffer).metadata();

    // 크롭된 이미지를 Base64로 인코딩
    const base64Image = `data:image/${metadata.format};base64,${croppedBuffer.toString('base64')}`;

    return NextResponse.json({
      url: base64Image,
      width: metadata.width,
      height: metadata.height,
      size: croppedBuffer.length,
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: '이미지 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 