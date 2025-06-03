import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { tmpdir } from 'os';

type AdjustmentValues = {
  brightness: number;
  saturation: number;
  hue: number;
  lightness: number;
  sharpen: number;
  blur: number;
  gamma: number;
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const operation: string = data.get('operation') as string;

    if (!file) {
      return NextResponse.json(
        { error: '파일이 없습니다.' },
        { status: 400 }
      );
    }

    // 임시 파일 경로 생성
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempPath = join(tmpdir(), `upload-${Date.now()}.jpg`);
    await writeFile(tempPath, buffer);

    let processedImage = sharp(tempPath);

    switch (operation) {
      case 'adjustments': {
        const adjustmentsStr = data.get('adjustments') as string;
        if (!adjustmentsStr) {
          throw new Error('조정값이 없습니다.');
        }
        
        const adjustments: AdjustmentValues = JSON.parse(adjustmentsStr);
        
        // 밝기, 채도, 명도 조정
        processedImage = processedImage.modulate({
          brightness: Math.max(0.01, 1 + (adjustments.brightness / 100)),  // 최소값 0.01 보장
          saturation: Math.max(0.01, 1 + (adjustments.saturation / 100)),  // 최소값 0.01 보장
          hue: adjustments.hue,  // -180 ~ 180 그대로 사용
          lightness: Math.max(0.01, 1 + (adjustments.lightness / 100))  // 최소값 0.01 보장
        });

        // 선명도 조정
        if (adjustments.sharpen > 0) {
          processedImage = processedImage.sharpen(adjustments.sharpen);
        }

        // 흐림 효과
        if (adjustments.blur > 0) {
          processedImage = processedImage.blur(adjustments.blur);
        }

        // 감마 조정
        if (adjustments.gamma > 0) {
          processedImage = processedImage.gamma(1 + (adjustments.gamma / 100));
        }
        break;
      }
      
      case 'filter': {
        const value = parseInt(data.get('value') as string);
        switch (value) {
          case 1: // 흑백
            processedImage = processedImage.grayscale();
            break;
          case 2: // 세피아
            processedImage = processedImage
              .modulate({ saturation: 0.5 })
              .tint({ r: 240, g: 200, b: 160 });
            break;
          case 3: // 선명하게
            processedImage = processedImage.sharpen();
            break;
          case 4: // 부드럽게
            processedImage = processedImage.blur(2);
            break;
          case 5: // 빈티지
            processedImage = processedImage
              .modulate({ brightness: 1.1, saturation: 0.8, hue: 15 })
              .tint({ r: 240, g: 220, b: 190 });
            break;
          case 6: // 차가운 톤
            processedImage = processedImage
              .modulate({ brightness: 1, saturation: 1.2, hue: -30 })
              .tint({ r: 200, g: 220, b: 255 });
            break;
          case 7: // 따뜻한 톤
            processedImage = processedImage
              .modulate({ brightness: 1, saturation: 1.2, hue: 30 })
              .tint({ r: 255, g: 220, b: 200 });
            break;
        }
        break;
      }

      case 'flip': {
        const options = JSON.parse(data.get('options') as string);
        if (options.horizontal) {
          processedImage = processedImage.flop();
        }
        if (options.vertical) {
          processedImage = processedImage.flip();
        }
        break;
      }

      case 'rotate': {
        const degrees = parseInt(data.get('value') as string);
        
        try {
          // 이미지 메타데이터 가져오기
          const metadata = await processedImage.metadata();
          
          // 회전 처리
          processedImage = processedImage
            .rotate(degrees, {
              background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .withMetadata();  // 메타데이터 유지

          const rotatedBuffer = await processedImage
            .jpeg({ quality: 90 })
            .toBuffer();

          return new NextResponse(rotatedBuffer, {
            headers: {
              'Content-Type': 'image/jpeg',
              'Content-Length': rotatedBuffer.length.toString(),
            },
          });
        } catch (error) {
          console.error('Error during rotation:', error);
          return NextResponse.json(
            { error: '이미지 회전 중 오류가 발생했습니다.' },
            { status: 500 }
          );
        }
      }

      case 'crop': {
        const options = JSON.parse(data.get('options') as string);
        
        try {
          // 이미지 메타데이터 가져오기
          const metadata = await processedImage.metadata();
          if (!metadata.width || !metadata.height) {
            throw new Error('이미지 크기 정보를 가져올 수 없습니다.');
          }

          // 회전 정보 확인
          const orientation = metadata.orientation || 1;
          const isRotated = orientation >= 5 && orientation <= 8;

          // 회전된 이미지의 실제 크기 계산
          let actualWidth = metadata.width;
          let actualHeight = metadata.height;
          
          if (isRotated) {
            [actualWidth, actualHeight] = [actualHeight, actualWidth];
          }

          // 크롭 영역이 이미지 범위를 벗어나지 않도록 보정
          const left = Math.max(0, Math.min(options.left, actualWidth - 1));
          const top = Math.max(0, Math.min(options.top, actualHeight - 1));
          const width = Math.max(1, Math.min(options.cropWidth, actualWidth - left));
          const height = Math.max(1, Math.min(options.cropHeight, actualHeight - top));

          // 회전 정보를 고려한 크롭 처리
          let croppedImage = processedImage;
          
          // 자동 회전 적용
          if (orientation) {
            croppedImage = croppedImage.rotate();
          }

          // 크롭 처리
          const croppedBuffer = await croppedImage
            .extract({
              left,
              top,
              width,
              height
            })
            .withMetadata()  // 메타데이터 유지
            .jpeg({ quality: 90 })
            .toBuffer();

          // 크롭된 이미지의 메타데이터 확인
          const croppedMetadata = await sharp(croppedBuffer).metadata();
          if (!croppedMetadata.width || !croppedMetadata.height) {
            throw new Error('크롭된 이미지 크기 정보를 가져올 수 없습니다.');
          }

          return new NextResponse(croppedBuffer, {
            headers: {
              'Content-Type': 'image/jpeg',
              'Content-Length': croppedBuffer.length.toString(),
            },
          });
        } catch (error) {
          console.error('Error during cropping:', error);
          return NextResponse.json(
            { error: error instanceof Error ? error.message : '이미지 자르기 중 오류가 발생했습니다.' },
            { status: 500 }
          );
        }
      }

      default:
        return NextResponse.json(
          { error: '지원하지 않는 작업입니다.' },
          { status: 400 }
        );
    }

    const processedBuffer = await processedImage
      .jpeg({ quality: 90 })
      .toBuffer();

    return new NextResponse(processedBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Length': processedBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: '이미지 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 