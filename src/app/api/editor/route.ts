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
        processedImage = processedImage.rotate(degrees);
        break;
      }

      case 'crop': {
        const options = JSON.parse(data.get('options') as string);
        processedImage = processedImage.extract({
          left: options.left,
          top: options.top,
          width: options.cropWidth,
          height: options.cropHeight
        });
        break;
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