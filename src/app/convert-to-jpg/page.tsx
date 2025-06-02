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
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-4 py-6 sm:p-10 bg-gradient-to-r from-orange-500 to-yellow-500">
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              이미지를 JPEG로 변환
            </h1>
            <p className="text-orange-50 text-base sm:text-lg">
              PNG, WEBP, GIF 등 다양한 이미지 형식을 JPEG로 변환할 수 있습니다.
            </p>
          </div>

          <div className="p-4 sm:p-10 space-y-6 sm:space-y-8">
            <div
              {...getRootProps()}
              className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-300 hover:border-orange-500 hover:bg-orange-50'
              }`}
            >
              <input {...getInputProps()} />
              {!preview ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center">
                    <ArrowUpTrayIcon className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-base sm:text-lg font-medium text-gray-700">
                      이미지를 드래그하여 놓거나 클릭하여 선택하세요
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, WEBP, GIF 등의 이미지 파일 지원
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    클릭하거나 드래그하여 다른 이미지로 변경
                  </p>
                </div>
              )}
            </div>

            {file && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <button
                    onClick={handleConvert}
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-2.5 text-base font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {loading ? '변환 중...' : 'JPEG로 변환하기'}
                  </button>
                </div>

                {convertedUrl && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">변환 결과</h3>
                      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                        <Image
                          src={convertedUrl}
                          alt="Converted"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex justify-center mt-6">
                        <button
                          onClick={handleDownload}
                          className="w-full sm:w-auto px-6 py-2.5 text-base font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors duration-200"
                        >
                          JPEG 다운로드
                        </button>
                      </div>
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