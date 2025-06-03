import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    // Base64 이미지 URL에서 데이터 부분만 추출
    const base64Data = imageUrl.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Sharp를 사용하여 이미지 메타데이터 가져오기
    const metadata = await sharp(imageBuffer).metadata();

    return NextResponse.json({
      width: metadata.width,
      height: metadata.height,
      orientation: metadata.orientation,
      format: metadata.format
    });
  } catch (error) {
    console.error('Error getting image metadata:', error);
    return NextResponse.json(
      { error: '이미지 메타데이터를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 