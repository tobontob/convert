'use client';

import { useState, useEffect, useRef } from 'react';
import ImageUploader from '@/components/ImageUploader';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface ResizeResult {
  url: string;
  originalWidth: number;
  originalHeight: number;
  newWidth: number;
  newHeight: number;
  size: number;
}

type ResizeMode = 'pixels' | 'percent';

export default function ResizePage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ResizeResult | null>(null);
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [resizeMode, setResizeMode] = useState<ResizeMode>('pixels');
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [preventEnlargement, setPreventEnlargement] = useState(true);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [previewDimensions, setPreviewDimensions] = useState<{ width: number; height: number } | null>(null);
  const [lastChangedDimension, setLastChangedDimension] = useState<'width' | 'height' | null>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const calculateNewDimensions = (originalWidth: number, originalHeight: number, targetWidth: string, targetHeight: string) => {
    let newWidth = Number(targetWidth) || originalWidth;
    let newHeight = Number(targetHeight) || originalHeight;

    if (resizeMode === 'percent') {
      newWidth = Math.round((originalWidth * Number(targetWidth)) / 100);
      newHeight = Math.round((originalHeight * Number(targetHeight)) / 100);
    }

    if (maintainAspectRatio && originalDimensions) {
      const ratio = originalWidth / originalHeight;

      if (lastChangedDimension === 'width' || (!lastChangedDimension && targetWidth)) {
        newWidth = Number(targetWidth);
        if (resizeMode === 'percent') {
          newWidth = Math.round((originalWidth * Number(targetWidth)) / 100);
        }
        newHeight = Math.round(newWidth / ratio);
      } else if (lastChangedDimension === 'height' || (!lastChangedDimension && targetHeight)) {
        newHeight = Number(targetHeight);
        if (resizeMode === 'percent') {
          newHeight = Math.round((originalHeight * Number(targetHeight)) / 100);
        }
        newWidth = Math.round(newHeight * ratio);
      }

      // 퍼센트 모드일 경우 값을 다시 퍼센트로 변환
      if (resizeMode === 'percent') {
        if (lastChangedDimension === 'width') {
          const heightPercent = (newHeight / originalHeight) * 100;
          setHeight(heightPercent.toFixed(0));
        } else if (lastChangedDimension === 'height') {
          const widthPercent = (newWidth / originalWidth) * 100;
          setWidth(widthPercent.toFixed(0));
        }
      } else {
        // 픽셀 모드일 경우 직접 값 설정
        if (lastChangedDimension === 'width') {
          setHeight(newHeight.toString());
        } else if (lastChangedDimension === 'height') {
          setWidth(newWidth.toString());
        }
      }
    }

    if (preventEnlargement) {
      newWidth = Math.min(newWidth, originalWidth);
      newHeight = Math.min(newHeight, originalHeight);
    }

    return { width: newWidth, height: newHeight };
  };

  // 크기 입력값이 변경될 때마다 미리보기 업데이트
  useEffect(() => {
    if (originalDimensions) {
      const newDimensions = calculateNewDimensions(
        originalDimensions.width,
        originalDimensions.height,
        width,
        height
      );
      setPreviewDimensions(newDimensions);
    }
  }, [width, height, resizeMode, maintainAspectRatio, preventEnlargement]);

  const handleImageUpload = async (file: File) => {
    setUploadedFile(file);
    
    // 원본 이미지 미리보기 및 크기 정보 가져오기
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
      const img = new Image();
      img.onload = () => {
        const dimensions = { width: img.width, height: img.height };
        setOriginalDimensions(dimensions);
        setPreviewDimensions(dimensions);
        // 기본값으로 원본 크기 설정
        setWidth(String(img.width));
        setHeight(String(img.height));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleResize = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('image', uploadedFile);

      // 퍼센트 모드일 경우 픽셀 값으로 변환
      if (resizeMode === 'percent' && originalDimensions) {
        const widthPercent = Number(width) / 100;
        const heightPercent = Number(height) / 100;
        formData.append('width', String(Math.round(originalDimensions.width * widthPercent)));
        formData.append('height', String(Math.round(originalDimensions.height * heightPercent)));
      } else {
        formData.append('width', width);
        formData.append('height', height);
      }

      formData.append('maintainAspectRatio', maintainAspectRatio.toString());
      formData.append('preventEnlargement', preventEnlargement.toString());

      const response = await fetch('/api/resize', {
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
      alert(error instanceof Error ? error.message : '이미지 리사이징 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  // 빠른 리사이징 프리셋
  const quickResizePresets = [
    { label: '25% 작게', value: 75 },
    { label: '50% 작게', value: 50 },
    { label: '75% 작게', value: 25 },
  ];

  const handleQuickResize = (percent: number) => {
    if (!originalDimensions) return;
    setResizeMode('percent');
    setWidth(String(percent));
    setHeight(String(percent));
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastChangedDimension('width');
    setWidth(e.target.value);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastChangedDimension('height');
    setHeight(e.target.value);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-4 py-6 sm:p-10 bg-gradient-to-r from-purple-500 to-pink-500">
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              이미지 리사이즈
            </h1>
            <p className="text-purple-50 text-base sm:text-lg">
              새로운 높이와 너비 픽셀을 지정하여 JPG, PNG, SVG 또는 GIF 파일의 크기를 조절하세요.
            </p>
          </div>

          <div className="p-4 sm:p-10 space-y-6 sm:space-y-8">
            {!originalImage ? (
              <ImageUploader onImageUpload={handleImageUpload} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                <div className="space-y-4 sm:space-y-6">
                  {/* 리사이징 컨트롤 */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h3 className="text-lg font-medium text-gray-900">크기 조절 옵션</h3>
                    <button
                      onClick={() => {
                        setOriginalImage(null);
                        setUploadedFile(null);
                        setResult(null);
                        setWidth('');
                        setHeight('');
                        setPreviewDimensions(null);
                        setOriginalDimensions(null);
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      다른 이미지 편집하기
                    </button>
                  </div>

                  {/* 이미지 미리보기 */}
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                      <h3 className="text-lg font-medium text-gray-900">원본 이미지</h3>
                      {originalDimensions && (
                        <div className="text-sm text-gray-600">
                          {originalDimensions.width} x {originalDimensions.height} 픽셀
                        </div>
                      )}
                    </div>
                    <div 
                      ref={previewContainerRef}
                      className="relative max-w-full overflow-hidden rounded-lg bg-gray-100"
                      style={{ maxHeight: '300px', minHeight: '200px' }}
                    >
                      <img
                        src={originalImage}
                        alt="원본 이미지"
                        className="w-full h-full object-contain"
                        style={{
                          maxHeight: '300px'
                        }}
                      />
                    </div>
                  </div>

                  {/* 리사이징 모드 선택 */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setResizeMode('pixels')}
                        className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg font-medium ${
                          resizeMode === 'pixels'
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        픽셀별
                      </button>
                      <button
                        onClick={() => setResizeMode('percent')}
                        className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg font-medium ${
                          resizeMode === 'percent'
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        퍼센트별
                      </button>
                    </div>

                    {/* 크기 입력 */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          너비 {resizeMode === 'percent' ? '(%)' : '(px)'}
                        </label>
                        <input
                          type="number"
                          value={width}
                          onChange={handleWidthChange}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-base py-2.5"
                          placeholder={resizeMode === 'percent' ? '퍼센트 입력' : '픽셀 입력'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          높이 {resizeMode === 'percent' ? '(%)' : '(px)'}
                        </label>
                        <input
                          type="number"
                          value={height}
                          onChange={handleHeightChange}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-base py-2.5"
                          placeholder={resizeMode === 'percent' ? '퍼센트 입력' : '픽셀 입력'}
                        />
                      </div>
                    </div>

                    {/* 옵션 체크박스 */}
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="aspectRatio"
                          checked={maintainAspectRatio}
                          onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                          className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor="aspectRatio" className="ml-2 text-base text-gray-700">
                          가로세로 비율 유지
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="preventEnlargement"
                          checked={preventEnlargement}
                          onChange={(e) => setPreventEnlargement(e.target.checked)}
                          className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor="preventEnlargement" className="ml-2 text-base text-gray-700">
                          더 작을 경우 확대 안함
                        </label>
                      </div>
                    </div>

                    {/* 빠른 리사이징 프리셋 */}
                    <div className="flex flex-wrap gap-2">
                      {quickResizePresets.map((preset) => (
                        <button
                          key={preset.value}
                          onClick={() => handleQuickResize(preset.value)}
                          className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    {/* 리사이즈 버튼 */}
                    <button
                      onClick={handleResize}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 text-base"
                    >
                      {isProcessing ? '처리중...' : '이미지 리사이즈'}
                    </button>
                  </div>
                </div>

                {/* 현재 크기 정보 */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">크기 정보</h3>
                  <div className="space-y-2">
                    <p className="text-base text-gray-600">
                      원본 크기: {originalDimensions?.width} x {originalDimensions?.height} 픽셀
                    </p>
                    {previewDimensions && (
                      <p className="text-base text-gray-600">
                        조정될 크기: {previewDimensions.width} x {previewDimensions.height} 픽셀
                        {originalDimensions && (
                          <span className="ml-2 text-purple-600">
                            ({Math.round((previewDimensions.width * previewDimensions.height * 100) / (originalDimensions.width * originalDimensions.height))}% 크기)
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="text-center py-8 sm:py-12">
                <div className="relative w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-purple-200 opacity-25"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 animate-spin"></div>
                </div>
                <p className="text-gray-600 text-base sm:text-lg">이미지 리사이징 중...</p>
              </div>
            )}

            {result && (
              <div className="mt-6 sm:mt-8">
                <a
                  href={result.url}
                  download="resized-image.jpg"
                  className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-3 sm:py-4 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl text-base"
                >
                  리사이즈된 이미지 다운로드
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 