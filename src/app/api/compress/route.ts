import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export const maxDuration = 300; // 5 minutes
export const dynamic = 'force-dynamic';

// OPTIONS 요청 처리
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as Blob;

    if (!file) {
      return NextResponse.json(
        { error: '이미지 파일이 필요합니다.' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        }
      );
    }

    // Blob을 Buffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

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

    const response = NextResponse.json({
      url: base64Image,
      size: compressedBuffer.length,
    });

    // CORS 헤더 추가
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: '이미지 처리 중 오류가 발생했습니다.' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  }
} 