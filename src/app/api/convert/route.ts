import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const format = formData.get('format') as string;

    if (!file || !format) {
      return NextResponse.json(
        { error: '파일과 변환 형식이 필요합니다.' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(buffer);

    // 이미지 메타데이터 가져오기
    const metadata = await image.metadata();
    
    // 포맷별 옵션 설정
    let convertedBuffer;
    switch (format) {
      case 'jpeg':
        convertedBuffer = await image.jpeg({ quality: 85 }).toBuffer();
        break;
      case 'png':
        convertedBuffer = await image.png({ compressionLevel: 9 }).toBuffer();
        break;
      case 'webp':
        convertedBuffer = await image.webp({ quality: 85 }).toBuffer();
        break;
      case 'gif':
        convertedBuffer = await image.gif().toBuffer();
        break;
      case 'bmp':
        convertedBuffer = await image.bmp().toBuffer();
        break;
      case 'tiff':
        convertedBuffer = await image.tiff({ compression: 'lzw' }).toBuffer();
        break;
      default:
        return NextResponse.json(
          { error: '지원하지 않는 형식입니다.' },
          { status: 400 }
        );
    }

    // 응답 헤더 설정
    const headers = new Headers();
    headers.set('Content-Type', `image/${format}`);
    headers.set('Content-Disposition', `attachment; filename=converted.${format}`);

    return new NextResponse(convertedBuffer, { headers });
  } catch (error) {
    console.error('Error converting image:', error);
    return NextResponse.json(
      { error: '이미지 변환 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 