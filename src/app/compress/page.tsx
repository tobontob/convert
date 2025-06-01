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
      });

      if (!response.ok) {
        throw new Error('이미지 압축 중 오류가 발생했습니다.');
      }

      const data = await response.json();
      setResult({
        originalSize: file.size,
        compressedSize: data.size,
        compressedUrl: data.url,
      });
    } catch (error) {
      console.error('Error:', error);
      alert('이미지 압축 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">이미지 압축</h1>
          <p className="text-gray-600 mb-8">
            이미지 품질은 유지하면서 파일 크기를 줄여보세요.
          </p>

          <div className="space-y-8">
            <ImageUploader onImageUpload={handleImageUpload} />

            {isProcessing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">이미지 압축 중...</p>
              </div>
            )}

            {result && (
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">압축 결과</h2>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">원본 크기</p>
                    <p className="text-lg font-medium text-gray-900">
                      {(result.originalSize / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">압축 후 크기</p>
                    <p className="text-lg font-medium text-gray-900">
                      {(result.compressedSize / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href={result.compressedUrl}
                    download
                    className="block w-full bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600 transition-colors"
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