'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { ArrowUpTrayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';

export { metadata } from '../metadata/rotate';

export default function Rotate() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rotatedUrl, setRotatedUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setRotation(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: false
  });

  const handleRotate = async (direction: 'left' | 'right') => {
    if (!file) return;

    setIsProcessing(true);
    try {
      // 회전 각도 계산
      const newRotation = direction === 'left' ? 
        (rotation - 90 + 360) % 360 : 
        (rotation + 90) % 360;
      setRotation(newRotation);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('operation', 'rotate');
      formData.append('value', newRotation.toString());

      const response = await fetch('/api/editor', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('이미지 회전 중 오류가 발생했습니다.');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      
      setPreviewUrl(url);
      setUploadedFile(new File([blob], file.name, { type: 'image/jpeg' }));
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : '이미지 회전 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = async () => {
    if (!uploadedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('rotation', rotation.toString());

    try {
      const response = await fetch('/api/rotate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('회전 중 오류가 발생했습니다.');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setRotatedUrl(url);
    } catch (error) {
      console.error('Error:', error);
      alert('이미지 회전 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-6xl mx-auto mobile-container">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="mobile-header from-cyan-500 to-blue-500">
            <h1 className="mobile-header-title">
              이미지 회전
            </h1>
            <p className="mobile-header-description text-cyan-50">
              이미지를 원하는 각도로 회전할 수 있습니다.
            </p>
          </div>

          <div className="p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            {!preview ? (
              <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-cyan-500 bg-cyan-50'
                    : 'border-gray-300 hover:border-cyan-500 hover:bg-cyan-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-cyan-100 flex items-center justify-center">
                    <ArrowUpTrayIcon className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-600" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-700">
                      이미지를 드래그하여 놓거나 클릭하여 선택하세요
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      지원되는 형식: JPEG, PNG, WebP, GIF
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <h3 className="text-sm sm:text-lg font-medium text-gray-900">회전 옵션</h3>
                  <button
                    onClick={() => {
                      setFile(null);
                      setPreview('');
                      setRotation(0);
                      setPreviewUrl(null);
                      setUploadedFile(null);
                    }}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg inline-flex items-center justify-center border border-cyan-500 text-cyan-500 hover:bg-cyan-50 transition-colors text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    다른 이미지 편집하기
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 sm:p-6">
                  <div className="relative max-w-full overflow-hidden rounded-lg bg-gray-100">
                    <div className="relative aspect-[3/2] w-full">
                      <Image
                        src={previewUrl || preview}
                        alt="Preview"
                        fill
                        className="object-contain"
                        unoptimized
                        priority
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <button
                    onClick={() => handleRotate('left')}
                    disabled={isProcessing}
                    className="relative px-4 py-2.5 text-sm font-medium bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 group"
                  >
                    <ArrowPathIcon className="w-5 h-5 transition-transform group-hover:-rotate-90" />
                    <span>왼쪽으로 회전</span>
                  </button>
                  <button
                    onClick={() => handleRotate('right')}
                    disabled={isProcessing}
                    className="relative px-4 py-2.5 text-sm font-medium bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 group"
                  >
                    <ArrowPathIcon className="w-5 h-5 transition-transform group-hover:rotate-90" />
                    <span>오른쪽으로 회전</span>
                  </button>
                </div>

                {isProcessing && (
                  <div className="text-center py-4">
                    <div className="relative w-10 h-10 mx-auto mb-2">
                      <div className="absolute inset-0 rounded-full border-2 border-cyan-200 opacity-25"></div>
                      <div className="absolute inset-0 rounded-full border-2 border-t-cyan-500 animate-spin"></div>
                    </div>
                    <p className="text-sm text-gray-600">이미지 회전 중...</p>
                  </div>
                )}

                {previewUrl && !isProcessing && (
                  <div className="flex justify-center">
                    <a
                      href={previewUrl}
                      download={`rotated-${file?.name || 'image.jpg'}`}
                      className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg text-sm font-medium transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      회전된 이미지 다운로드
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