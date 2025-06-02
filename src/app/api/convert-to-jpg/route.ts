import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: '파일이 없습니다.' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Convert to JPEG format
    const jpegBuffer = await sharp(buffer)
      .jpeg({
        quality: 90,
        mozjpeg: true
      })
      .toBuffer();

    // Return the converted image
    return new NextResponse(jpegBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="converted.jpg"`,
      },
    });
  } catch (error) {
    console.error('Error converting image:', error);
    return NextResponse.json(
      { error: '이미지 변환 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 