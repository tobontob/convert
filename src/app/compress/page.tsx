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
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-4 py-6 sm:p-10 bg-gradient-to-r from-blue-500 to-purple-500">
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              이미지 압축
            </h1>
            <p className="text-blue-50 text-base sm:text-lg">
              이미지 품질은 유지하면서 파일 크기를 줄여보세요.
            </p>
          </div>

          <div className="p-4 sm:p-10 space-y-6 sm:space-y-8">
            {!originalImage ? (
              <ImageUploader onImageUpload={handleImageUpload} />
            ) : (
              <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <h3 className="text-lg font-medium text-gray-900">압축 설정</h3>
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    다른 이미지 편집하기
                  </button>
                </div>

                {isProcessing && (
                  <div className="text-center py-8 sm:py-12">
                    <div className="relative w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-25"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin"></div>
                    </div>
                    <p className="text-gray-600 text-base sm:text-lg">이미지 압축 중...</p>
                  </div>
                )}

                {result && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">압축 결과</h3>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <span className="text-base text-gray-600">원본 크기:</span>
                          <span className="text-base font-medium">{(result.originalSize / 1024).toFixed(2)} KB</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <span className="text-base text-gray-600">압축 후 크기:</span>
                          <span className="text-base font-medium">{(result.compressedSize / 1024).toFixed(2)} KB</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <span className="text-base text-gray-600">압축률:</span>
                          <span className="text-base font-medium text-green-600">
                            {(100 - (result.compressedSize / result.originalSize) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={result.compressedUrl}
                      download="compressed-image.jpg"
                      className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-3 sm:py-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl text-base"
                    >
                      압축된 이미지 다운로드
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