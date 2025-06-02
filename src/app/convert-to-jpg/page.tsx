'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';

export default function ConvertToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setConvertedUrl('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: false
  });

  const handleConvert = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/convert-to-jpg', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('변환 중 오류가 발생했습니다.');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setConvertedUrl(url);
    } catch (error) {
      console.error('Error:', error);
      alert('이미지 변환 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview('');
    setConvertedUrl('');
  };

  const handleDownload = () => {
    if (!convertedUrl) return;
    
    const link = document.createElement('a');
    link.href = convertedUrl;
    link.download = `converted_${file?.name.split('.')[0] || 'image'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10 bg-gradient-to-r from-indigo-500 to-blue-500">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              이미지를 JPEG로 변환
            </h1>
            <p className="text-white/90">
              PNG, WEBP, GIF 등 다양한 이미지 형식을 JPEG로 변환할 수 있습니다.
            </p>
          </div>

          <div className="p-6 sm:p-10">
            {!file ? (
              <div
                {...getRootProps()}
                className={`relative group border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200
                  ${
                    isDragActive
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }
                `}
              >
                <input {...getInputProps()} />
                <div className="space-y-6">
                  <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {isDragActive ? '여기에 파일을 놓으세요' : '이미지를 드래그하여 놓거나 클릭하세요'}
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      지원 형식: JPG, PNG, GIF, WEBP (최대 10MB)
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
                
                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    다른 이미지 편집하기
                  </button>
                  <button
                    onClick={handleConvert}
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {loading ? '변환 중...' : 'JPEG로 변환하기'}
                  </button>
                </div>

                {convertedUrl && (
                  <div className="space-y-4 pt-4">
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                      <Image
                        src={convertedUrl}
                        alt="Converted"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={handleDownload}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        JPEG 다운로드
                      </button>
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