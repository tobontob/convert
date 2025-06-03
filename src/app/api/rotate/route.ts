import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const rotation = parseInt(formData.get('rotation') as string);

    if (!file || isNaN(rotation)) {
      return NextResponse.json(
        { error: '파일과 회전 각도가 필요합니다.' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(buffer);

    // 이미지 회전
    const rotatedBuffer = await image.rotate(rotation).toBuffer();

    // 응답 헤더 설정
    const headers = new Headers();
    headers.set('Content-Type', 'image/jpeg'); // 기본값으로 JPEG 사용
    headers.set('Content-Disposition', 'attachment; filename=rotated.jpg');

    return new NextResponse(rotatedBuffer, { headers });
  } catch (error) {
    console.error('Error rotating image:', error);
    return NextResponse.json(
      { error: '이미지 회전 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 