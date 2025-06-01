import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: '이미지 파일이 필요합니다.' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalImage = sharp(buffer);

    // 이미지 압축 설정
    const compressedBuffer = await originalImage
      .jpeg({
        quality: 80,
        mozjpeg: true,
      })
      .toBuffer();

    // 압축된 이미지를 Base64로 인코딩
    const base64Image = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;

    return NextResponse.json({
      url: base64Image,
      size: compressedBuffer.length,
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: '이미지 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 