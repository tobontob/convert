import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB 제한

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as Blob;
    const width = Number(formData.get('width'));
    const height = Number(formData.get('height'));
    const maintainAspectRatio = formData.get('maintainAspectRatio') === 'true';
    const preventEnlargement = formData.get('preventEnlargement') === 'true';

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

    // 이미지 메타데이터 가져오기
    const metadata = await sharp(buffer).metadata();
    
    if (!metadata.width || !metadata.height) {
      throw new Error('이미지 크기 정보를 가져올 수 없습니다.');
    }

    // 리사이징 옵션 설정
    let resizeOptions: sharp.ResizeOptions = {
      width: width || undefined,
      height: height || undefined,
      fit: maintainAspectRatio ? 'inside' : 'fill',
      withoutEnlargement: preventEnlargement,
    };

    // 너비나 높이가 지정되지 않은 경우 원본 크기 사용
    if (!width && !height) {
      resizeOptions.width = metadata.width;
      resizeOptions.height = metadata.height;
    }

    // 이미지 리사이징
    const resizedBuffer = await sharp(buffer)
      .resize(resizeOptions)
      .toBuffer();

    // 리사이즈된 이미지를 Base64로 인코딩
    const base64Image = `data:image/${metadata.format};base64,${resizedBuffer.toString('base64')}`;

    // 새로운 이미지 메타데이터 가져오기
    const newMetadata = await sharp(resizedBuffer).metadata();

    return NextResponse.json({
      url: base64Image,
      originalWidth: metadata.width,
      originalHeight: metadata.height,
      newWidth: newMetadata.width,
      newHeight: newMetadata.height,
      size: resizedBuffer.length,
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: '이미지 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 