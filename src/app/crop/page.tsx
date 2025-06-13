'use client';

import { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ImageUploader from '@/components/ImageUploader';
import { ArrowLeftIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useDropzone } from 'react-dropzone';

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
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [previewDimensions, setPreviewDimensions] = useState<{ width: number; height: number } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
      // 이미지가 로드되면 초기 크롭 영역 설정
      const img = new Image();
      img.onload = () => {
        setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
        if (containerRef.current) {
          const containerWidth = containerRef.current.clientWidth - 48;
          const containerHeight = 600;
          const isLarge = img.naturalWidth > containerWidth || img.naturalHeight > containerHeight;
          setIsLargeImage(isLarge);
          const imageRatio = img.naturalWidth / img.naturalHeight;
          let cropWidth, cropHeight;
          if (isLarge) {
            if (imageRatio > 1) {
              cropWidth = Math.min(300, containerWidth);
              cropHeight = cropWidth / imageRatio;
            } else {
              cropHeight = Math.min(300, containerHeight);
              cropWidth = cropHeight * imageRatio;
            }
          } else {
            cropWidth = Math.min(img.naturalWidth, 300);
            cropHeight = cropWidth / imageRatio;
          }
          setCrop({
            unit: 'px',
            x: (containerWidth - cropWidth) / 2,
            y: (containerHeight - cropHeight) / 2,
            width: cropWidth,
            height: cropHeight,
          });
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
    setResult(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxSize: 10 * 1024 * 1024,
    multiple: false
  });

  const handleCrop = async () => {
    if (!uploadedFile || !completedCrop || !imgRef.current || !naturalSize) return;

    // 회전된 이미지의 실제 크기 가져오기
    const rotatedImage = new Image();
    await new Promise((resolve) => {
      rotatedImage.onload = resolve;
      rotatedImage.src = imgRef.current!.src;
    });

    // 화면에 표시된 이미지의 크기
    const displayWidth = imgRef.current.width;
    const displayHeight = imgRef.current.height;

    // 실제 이미지와 표시된 이미지의 비율 계산
    const scaleX = rotatedImage.naturalWidth / displayWidth;
    const scaleY = rotatedImage.naturalHeight / displayHeight;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('image', uploadedFile);

      // 크롭 좌표를 실제 이미지 크기에 맞게 조정
      const cropData = {
        x: Math.round(completedCrop.x * scaleX),
        y: Math.round(completedCrop.y * scaleY),
        width: Math.round(completedCrop.width * scaleX),
        height: Math.round(completedCrop.height * scaleY)
      };

      formData.append('crop', JSON.stringify(cropData));

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

  const handleReset = () => {
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
  };

  return (
    <main className="min-h-0 bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-6xl mx-auto mobile-container pb-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="mobile-header from-green-500 to-green-600">
            <h1 className="mobile-header-title">
              이미지 자르기
            </h1>
            <p className="mobile-header-description text-green-50">
              이미지를 원하는 크기로 자르세요.
            </p>
          </div>

          <div className="p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            {!originalImage ? (
              <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                    <ArrowUpTrayIcon className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-700">
                      이미지를 드래그하여 놓거나 클릭하여 선택하세요
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      지원 형식: JPG, PNG, GIF, WEBP (최대 10MB)
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <h3 className="text-sm sm:text-lg font-medium text-gray-900">자르기 영역 선택</h3>
                  <button
                    onClick={handleReset}
                    className="mobile-button w-full sm:w-auto inline-flex items-center justify-center border border-green-500 text-green-500 hover:bg-green-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mobile-icon mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    다른 이미지 편집하기
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                    <h3 className="text-sm sm:text-lg font-medium text-gray-900">자르기 영역 선택</h3>
                  </div>
                  <div className="relative max-w-full overflow-hidden rounded-lg bg-gray-100 flex justify-center">
                    <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={aspect}
                      className="max-h-[70vh]"
                    >
                      <img
                        ref={imgRef}
                        alt="자를 이미지"
                        src={originalImage || ''}
                        className="max-w-full h-auto"
                      />
                    </ReactCrop>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => setAspect(undefined)}
                    className={`mobile-button flex-1 ${
                      !aspect ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    자유 비율
                  </button>
                  <button
                    onClick={() => setAspect(1)}
                    className={`mobile-button flex-1 ${
                      aspect === 1 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    1:1
                  </button>
                  <button
                    onClick={() => setAspect(16/9)}
                    className={`mobile-button flex-1 ${
                      aspect === 16/9 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    16:9
                  </button>
                  <button
                    onClick={() => setAspect(4/3)}
                    className={`mobile-button flex-1 ${
                      aspect === 4/3 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    4:3
                  </button>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleCrop}
                    disabled={isProcessing || !completedCrop?.width || !completedCrop?.height}
                    className="mobile-button bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? '처리 중...' : '자르기'}
                  </button>
                </div>

                {isProcessing && (
                  <div className="text-center py-6 sm:py-8">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3">
                      <div className="absolute inset-0 rounded-full border-3 border-green-200 opacity-25"></div>
                      <div className="absolute inset-0 rounded-full border-3 border-t-green-500 animate-spin"></div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">이미지 자르는 중...</p>
                  </div>
                )}

                {result && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-6">
                      <h3 className="text-sm sm:text-lg font-medium text-gray-900 mb-3">결과</h3>
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
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs sm:text-sm">
                          {result.width} x {result.height} px
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <a
                        href={result.url}
                        download="cropped-image"
                        className="mobile-button bg-green-500 text-white hover:bg-green-600"
                      >
                        자른 이미지 다운로드
                      </a>
                    </div>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-gray-500">
                  지원 형식: JPG, PNG, GIF, WEBP (최대 10MB)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 