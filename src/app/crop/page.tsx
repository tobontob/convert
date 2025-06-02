'use client';

import { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ImageUploader from '@/components/ImageUploader';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

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
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLargeImage, setIsLargeImage] = useState(false);

  const handleImageUpload = async (file: File) => {
    setUploadedFile(file);
    setResult(null);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
      // 이미지가 로드되면 초기 크롭 영역 설정
      const img = new Image();
      img.onload = () => {
        setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
        
        // 컨테이너 크기 계산
        if (containerRef.current) {
          const containerWidth = containerRef.current.clientWidth - 48; // padding 고려
          const containerHeight = 600; // 최대 높이

          // 이미지가 컨테이너보다 큰지 확인
          const isLarge = img.naturalWidth > containerWidth || img.naturalHeight > containerHeight;
          setIsLargeImage(isLarge);

          if (isLarge) {
            // 이미지의 가로세로 비율 계산
            const imageRatio = img.naturalWidth / img.naturalHeight;
            const containerRatio = containerWidth / containerHeight;

            // 이미지가 가로로 더 긴 경우와 세로로 더 긴 경우를 구분하여 처리
            if (imageRatio > containerRatio) {
              // 가로가 더 긴 경우
              const width = Math.min(img.naturalWidth, containerWidth);
              const height = Math.min(img.naturalHeight, containerHeight);
              setCrop({
                unit: 'px',
                x: (width - Math.min(300, width)) / 2,
                y: (height - Math.min(300, height)) / 2,
                width: Math.min(300, width),
                height: Math.min(300, height),
              });
            } else {
              // 세로가 더 긴 경우
              const height = Math.min(img.naturalHeight, containerHeight);
              const width = Math.min(img.naturalWidth, (height * img.naturalWidth) / img.naturalHeight);
              setCrop({
                unit: 'px',
                x: (width - Math.min(300, width)) / 2,
                y: (height - Math.min(300, height)) / 2,
                width: Math.min(300, width),
                height: Math.min(300, height),
              });
            }
          } else {
            // 작은 이미지는 기존과 동일하게 처리
            const width = Math.min(img.naturalWidth, 300);
            const height = Math.min(img.naturalHeight, 300);
            setCrop({
              unit: 'px',
              x: (img.naturalWidth - width) / 2,
              y: (img.naturalHeight - height) / 2,
              width,
              height,
            });
          }
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleCrop = async () => {
    if (!uploadedFile || !completedCrop || !imgRef.current || !naturalSize) return;

    // 실제 이미지 크기와 화면에 표시된 이미지 크기의 비율 계산
    const displayWidth = imgRef.current.width;
    const displayHeight = imgRef.current.height;
    const scaleX = naturalSize.width / displayWidth;
    const scaleY = naturalSize.height / displayHeight;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('image', uploadedFile);
      formData.append('crop', JSON.stringify({
        x: Math.round(completedCrop.x * scaleX),
        y: Math.round(completedCrop.y * scaleY),
        width: Math.round(completedCrop.width * scaleX),
        height: Math.round(completedCrop.height * scaleY),
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
      <Navigation />
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-4 py-6 sm:p-10 bg-gradient-to-r from-green-500 to-teal-500">
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              이미지 자르기
            </h1>
            <p className="text-green-50 text-base sm:text-lg">
              이미지의 원하는 부분만 선택하여 자르세요.
            </p>
          </div>

          <div className="p-4 sm:p-10 space-y-6 sm:space-y-8">
            {!originalImage ? (
              <ImageUploader onImageUpload={handleImageUpload} />
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <h3 className="text-lg font-medium text-gray-900">자르기 영역 선택</h3>
                  <button
                    onClick={() => {
                      setOriginalImage(null);
                      setUploadedFile(null);
                      setResult(null);
                      setCrop({
                        unit: 'px',
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                      });
                      setCompletedCrop(null);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 border border-green-500 text-green-500 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    다른 이미지 편집하기
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <div 
                    ref={containerRef}
                    className="relative max-w-full overflow-auto rounded-lg"
                    style={{ maxHeight: '70vh' }}
                  >
                    <ReactCrop
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={undefined}
                      className="max-w-full"
                    >
                      <img
                        ref={imgRef}
                        src={originalImage}
                        alt="크롭할 이미지"
                        className="max-w-full h-auto"
                        style={{
                          maxHeight: '70vh'
                        }}
                      />
                    </ReactCrop>
                  </div>

                  {completedCrop && naturalSize && imgRef.current && (
                    <div className="mt-4">
                      <p className="text-base text-gray-600">
                        선택된 영역: {Math.round(completedCrop.width * (naturalSize.width / imgRef.current.width))} x {Math.round(completedCrop.height * (naturalSize.height / imgRef.current.height))} 픽셀
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleCrop}
                    disabled={isProcessing || !completedCrop}
                    className="mt-6 w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl font-medium hover:from-green-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 text-base"
                  >
                    {isProcessing ? '처리중...' : '이미지 자르기'}
                  </button>
                </div>

                {isProcessing && (
                  <div className="text-center py-8 sm:py-12">
                    <div className="relative w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full border-4 border-green-200 opacity-25"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-t-green-500 animate-spin"></div>
                    </div>
                    <p className="text-gray-600 text-base sm:text-lg">이미지 자르는 중...</p>
                  </div>
                )}

                {result && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">결과</h3>
                      <div className="relative rounded-lg overflow-hidden bg-gray-100">
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
                              className="max-w-full h-auto"
                              style={{
                                maxHeight: '70vh'
                              }}
                            />
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                          {result.width} x {result.height} px
                        </div>
                      </div>
                    </div>

                    <a
                      href={result.url}
                      download="cropped-image.jpg"
                      className="block w-full bg-gradient-to-r from-green-500 to-teal-500 text-white text-center py-3 sm:py-4 rounded-xl font-medium hover:from-green-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl text-base"
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