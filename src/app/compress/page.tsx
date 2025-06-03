import { compressMetadata } from '../metadata';

export const metadata = compressMetadata;

'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function CompressPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    originalSize: number;
    compressedSize: number;
    compressedUrl: string;
  } | null>(null);
  const [originalImage, setOriginalImage] = useState<File | null>(null);

  const handleImageUpload = async (file: File) => {
    setOriginalImage(file);
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/compress', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult({
        originalSize: file.size,
        compressedSize: data.size,
        compressedUrl: data.url,
      });
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : '이미지 압축 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-6xl mx-auto mobile-container">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="mobile-header from-blue-500 to-purple-500">
            <h1 className="mobile-header-title">
              이미지 압축
            </h1>
            <p className="mobile-header-description text-blue-50">
              이미지 품질은 유지하면서 파일 크기를 줄여보세요.
            </p>
          </div>

          <div className="p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            {!originalImage ? (
              <ImageUploader onImageUpload={handleImageUpload} />
            ) : (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <h3 className="text-sm sm:text-lg font-medium text-gray-900">압축 설정</h3>
                  <button
                    onClick={handleReset}
                    className="mobile-button w-full sm:w-auto inline-flex items-center justify-center border border-blue-500 text-blue-500 hover:bg-blue-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mobile-icon mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    다른 이미지 편집하기
                  </button>
                </div>

                {isProcessing && (
                  <div className="text-center py-6 sm:py-8">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3">
                      <div className="absolute inset-0 rounded-full border-3 border-blue-200 opacity-25"></div>
                      <div className="absolute inset-0 rounded-full border-3 border-t-blue-500 animate-spin"></div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">이미지 압축 중...</p>
                  </div>
                )}

                {result && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-6">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-3">압축 결과</h3>
                      <div className="space-y-2 text-sm sm:text-base">
                        <p className="text-gray-600">
                          원본 크기: {(result.originalSize / 1024 / 1024).toFixed(2)}MB
                        </p>
                        <p className="text-gray-600">
                          압축 후 크기: {(result.compressedSize / 1024 / 1024).toFixed(2)}MB
                        </p>
                        <p className="text-green-600 font-medium">
                          {Math.round((1 - result.compressedSize / result.originalSize) * 100)}% 감소
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <a
                        href={result.compressedUrl}
                        download="compressed-image"
                        className="mobile-button bg-green-500 text-white hover:bg-green-600"
                      >
                        압축된 이미지 다운로드
                      </a>
                    </div>
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