'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CompressPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    originalSize: number;
    compressedSize: number;
    compressedUrl: string;
  } | null>(null);

  const handleImageUpload = async (file: File) => {
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
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
          <div className="px-6 py-8 sm:p-10 bg-gradient-to-r from-blue-500 to-purple-500">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              이미지 압축
            </h1>
            <p className="text-blue-50 text-lg">
              이미지 품질은 유지하면서 파일 크기를 줄여보세요.
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            <ImageUploader onImageUpload={handleImageUpload} />

            {isProcessing && (
              <div className="text-center py-12">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-25"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin"></div>
                </div>
                <p className="text-gray-600 text-lg">이미지 압축 중...</p>
              </div>
            )}

            {result && (
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">압축 결과</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-2">원본 크기</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(result.originalSize / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-2">압축 후 크기</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(result.compressedSize / 1024).toFixed(2)} KB
                    </p>
                    <p className="text-sm text-green-600 mt-2">
                      {((1 - result.compressedSize / result.originalSize) * 100).toFixed(1)}% 감소
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <a
                    href={result.compressedUrl}
                    download="compressed-image.jpg"
                    className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    압축된 이미지 다운로드
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 