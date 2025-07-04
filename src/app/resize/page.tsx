'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import ImageUploader from '@/components/ImageUploader';
import { ArrowLeftIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useDropzone } from 'react-dropzone';

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
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const calculateNewDimensions = useCallback((originalWidth: number, originalHeight: number, targetWidth: string, targetHeight: string) => {
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
  }, [resizeMode, maintainAspectRatio, preventEnlargement, originalDimensions, lastChangedDimension, setWidth, setHeight]);

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
  }, [width, height, resizeMode, maintainAspectRatio, preventEnlargement, calculateNewDimensions, originalDimensions]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
      const img = new Image();
      img.onload = () => {
        const dimensions = { width: img.width, height: img.height };
        setOriginalDimensions(dimensions);
        setPreviewDimensions(dimensions);
        setWidth(String(img.width));
        setHeight(String(img.height));
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
    <main className="min-h-0 bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-6xl mx-auto mobile-container pb-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="mobile-header from-purple-500 to-purple-600">
            <h1 className="mobile-header-title">
              이미지 크기 조정
            </h1>
            <p className="mobile-header-description text-purple-50">
              이미지 크기를 원하는 대로 조정하세요.
            </p>
          </div>

          <div className="p-3 sm:p-6 lg:p-8">
            {!originalImage ? (
              <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center">
                    <ArrowUpTrayIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
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
              <>
                <div className="flex justify-center w-full mb-4">
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
                    className="mobile-button w-full sm:w-auto inline-flex items-center justify-center border border-purple-500 text-purple-500 hover:bg-purple-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mobile-icon mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    다른 이미지 편집하기
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full items-start">
                  <div className="space-y-4 w-full">
                    {/* 원본 이미지 미리보기 */}
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                        <h3 className="text-sm sm:text-lg font-medium text-gray-900">원본 이미지</h3>
                        {originalDimensions && (
                          <div className="text-xs sm:text-sm text-gray-600">
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
                          src={originalImage || ''}
                          alt="원본 이미지"
                          className="w-full h-full object-contain"
                          style={{ maxHeight: '300px' }}
                        />
                      </div>
                    </div>
                    {/* 크기 입력 */}
                    <div className="space-y-3">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">너비 (픽셀)</label>
                        <input
                          type="number"
                          value={width}
                          onChange={handleWidthChange}
                          placeholder="너비 입력"
                          className="mobile-button bg-white border border-gray-300 text-gray-700"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">높이 (픽셀)</label>
                        <input
                          type="number"
                          value={height}
                          onChange={handleHeightChange}
                          placeholder="높이 입력"
                          className="mobile-button bg-white border border-gray-300 text-gray-700"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={handleResize}
                        disabled={isProcessing || !width || !height}
                        className="mobile-button bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? '처리 중...' : '크기 조정하기'}
                      </button>
                    </div>
                  </div>
                  {/* 변환된 이미지 영역: 항상 보이게, 변환 전에는 안내 메시지 */}
                  <div className="space-y-4 flex flex-col justify-start w-full">
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-6 h-full flex flex-col justify-start">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                        <h3 className="text-sm sm:text-lg font-medium text-gray-900">변환된 이미지</h3>
                        {result && (
                          <div className="text-xs sm:text-sm text-gray-600">
                            {result.newWidth} x {result.newHeight} 픽셀
                          </div>
                        )}
                      </div>
                      <div className="relative max-w-full overflow-hidden rounded-lg bg-gray-100 flex-1 flex items-center justify-center" style={{ minHeight: '200px', maxHeight: '300px' }}>
                        {result ? (
                          <img
                            src={result.url}
                            alt="변환된 이미지"
                            className="w-full h-full object-contain"
                            style={{ maxHeight: '300px' }}
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">변환된 이미지가 여기에 표시됩니다.</span>
                        )}
                      </div>
                    </div>
                    {result && (
                      <div className="flex justify-center">
                        <a
                          href={result.url}
                          download="resized-image"
                          className="mobile-button bg-green-500 text-white hover:bg-green-600"
                        >
                          변환된 이미지 다운로드
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 