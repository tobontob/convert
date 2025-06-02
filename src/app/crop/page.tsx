'use client';

import { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ImageUploader from '@/components/ImageUploader';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface CropResult {
  url: string;
  width: number;
  height: number;
  size: number;
}

export default function CropPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CropResult | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleImageUpload = async (file: File) => {
    setUploadedFile(file);
    setResult(null);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
      // 이미지가 로드되면 초기 크롭 영역 설정
      const img = new Image();
      img.onload = () => {
        const width = Math.min(img.width, 300);
        const height = Math.min(img.height, 300);
        setCrop({
          unit: 'px',
          x: (img.width - width) / 2,
          y: (img.height - height) / 2,
          width,
          height,
        });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleCrop = async () => {
    if (!uploadedFile || !completedCrop) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('image', uploadedFile);
      formData.append('crop', JSON.stringify({
        x: completedCrop.x,
        y: completedCrop.y,
        width: completedCrop.width,
        height: completedCrop.height,
      }));

      const response = await fetch('/api/crop', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : '이미지 크롭 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10 bg-gradient-to-r from-purple-500 to-pink-500">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              이미지 자르기
            </h1>
            <p className="text-purple-50 text-lg">
              이미지의 원하는 부분만 선택하여 자르세요.
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            {!originalImage ? (
              <ImageUploader onImageUpload={handleImageUpload} />
            ) : (
              <div className="space-y-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">영역 선택</h3>
                  <div className="relative max-w-full overflow-auto">
                    <ReactCrop
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={undefined}
                    >
                      <img
                        ref={imgRef}
                        src={originalImage}
                        alt="크롭할 이미지"
                        className="max-w-full"
                      />
                    </ReactCrop>
                  </div>
                  {completedCrop && (
                    <div className="mt-4 text-sm text-gray-600">
                      선택된 영역: {Math.round(completedCrop.width)} x {Math.round(completedCrop.height)} 픽셀
                    </div>
                  )}
                  <button
                    onClick={handleCrop}
                    disabled={isProcessing || !completedCrop}
                    className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {isProcessing ? '처리중...' : '이미지 자르기'}
                  </button>
                </div>

                {isProcessing && (
                  <div className="text-center py-12">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full border-4 border-purple-200 opacity-25"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 animate-spin"></div>
                    </div>
                    <p className="text-gray-600 text-lg">이미지 자르는 중...</p>
                  </div>
                )}

                {result && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">결과</h3>
                    <div className="relative rounded-lg overflow-hidden bg-gray-100 p-4">
                      <div className="overflow-auto">
                        <div 
                          className="relative bg-[url('/images/transparent-bg.png')] bg-repeat"
                          style={{
                            width: 'fit-content',
                            margin: '0 auto',
                          }}
                        >
                          <img
                            src={result.url}
                            alt="잘린 이미지"
                            style={{
                              width: `${result.width}px`,
                              height: `${result.height}px`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {result.width} x {result.height} px
                      </div>
                    </div>
                    <a
                      href={result.url}
                      download="cropped-image.jpg"
                      className="mt-6 block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-4 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
                    >
                      잘린 이미지 다운로드
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 