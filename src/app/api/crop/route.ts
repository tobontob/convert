import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB 제한

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const cropData = JSON.parse(formData.get('crop') as string);

    if (!file || !cropData) {
      return NextResponse.json(
        { error: '이미지와 크롭 정보가 필요합니다.' },
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

    const buffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(buffer);

    // 이미지 메타데이터 가져오기
    const metadata = await image.metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error('이미지 크기 정보를 가져올 수 없습니다.');
    }

    // 회전 정보 확인
    const orientation = metadata.orientation || 1;
    let isRotated = orientation >= 5 && orientation <= 8;
    
    // 회전된 이미지의 실제 크기 계산
    let actualWidth = metadata.width;
    let actualHeight = metadata.height;
    
    if (isRotated) {
      // 90도 또는 270도 회전된 경우 가로/세로가 바뀜
      [actualWidth, actualHeight] = [actualHeight, actualWidth];
    }

    // 크롭 좌표 조정
    let { x, y, width, height } = cropData;
    
    // 회전된 이미지의 경우 좌표 변환
    if (isRotated) {
      const temp = x;
      x = y;
      y = actualWidth - temp - width;
      [width, height] = [height, width];
    }

    // 크롭 영역이 이미지 범위를 벗어나지 않도록 보정
    const cropX = Math.max(0, Math.min(x, actualWidth));
    const cropY = Math.max(0, Math.min(y, actualHeight));
    const cropWidth = Math.min(width, actualWidth - cropX);
    const cropHeight = Math.min(height, actualHeight - cropY);

    // 이미지 처리 파이프라인 설정
    let processedImage = image;

    // 회전 정보가 있는 경우 자동 회전 적용
    if (orientation) {
      processedImage = processedImage.rotate();
    }

    // 이미지 크롭 처리
    const croppedBuffer = await processedImage
      .extract({
        left: Math.round(cropX),
        top: Math.round(cropY),
        width: Math.round(cropWidth),
        height: Math.round(cropHeight)
      })
      .withMetadata() // 메타데이터 유지
      .toBuffer();

    // 크롭된 이미지의 메타데이터 가져오기
    const croppedMetadata = await sharp(croppedBuffer).metadata();

    // Base64로 인코딩
    const base64Image = `data:image/${metadata.format};base64,${croppedBuffer.toString('base64')}`;

    return NextResponse.json({
      url: base64Image,
      width: croppedMetadata.width,
      height: croppedMetadata.height,
      size: croppedBuffer.length
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: '이미지 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 