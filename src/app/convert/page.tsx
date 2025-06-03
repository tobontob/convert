'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';

export default function Convert() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string>('');
  const [targetFormat, setTargetFormat] = useState<string>('jpeg');

  const formats = [
    { value: 'jpeg', label: 'JPEG' },
    { value: 'png', label: 'PNG' },
    { value: 'webp', label: 'WebP' },
    { value: 'gif', label: 'GIF' },
    { value: 'tiff', label: 'TIFF' },
  ];

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
    formData.append('format', targetFormat);

    try {
      const response = await fetch('/api/convert', {
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
    link.download = `converted_${file?.name.split('.')[0] || 'image'}.${targetFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-6xl mx-auto mobile-container">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="mobile-header from-orange-500 to-yellow-500">
            <h1 className="mobile-header-title">
              이미지 형식 변환
            </h1>
            <p className="mobile-header-description text-orange-50">
              다양한 이미지 형식으로 변환할 수 있습니다.
            </p>
          </div>

          <div className="p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            <div
              {...getRootProps()}
              className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-300 hover:border-orange-500 hover:bg-orange-50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="space-y-3 sm:space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center">
                  <ArrowUpTrayIcon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-700">
                    이미지를 드래그하여 놓거나 클릭하여 선택하세요
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    지원되는 형식: JPEG, PNG, WebP, GIF, TIFF
                  </p>
                </div>
              </div>
            </div>

            {file && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                  <select
                    value={targetFormat}
                    onChange={(e) => setTargetFormat(e.target.value)}
                    className="mobile-button bg-white border border-gray-300 text-gray-700 flex-1 sm:flex-none"
                  >
                    {formats.map((format) => (
                      <option key={format.value} value={format.value}>
                        {format.label}로 변환
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleConvert}
                    disabled={loading}
                    className="mobile-button bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
                  >
                    {loading ? '변환 중...' : '변환하기'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="mobile-button border border-gray-300 text-gray-700 hover:bg-gray-50 flex-1 sm:flex-none"
                  >
                    다시 선택
                  </button>
                </div>

                {preview && (
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-6">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-3">미리보기</h3>
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-gray-100">
                      {targetFormat === 'tiff' ? (
                        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                          <div>
                            <p className="text-sm sm:text-base text-gray-600 mb-2">TIFF 형식은 미리보기를 지원하지 않습니다</p>
                            <p className="text-xs sm:text-sm text-gray-500">변환된 이미지를 다운로드하여 확인해주세요</p>
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={preview}
                          alt="Preview"
                          fill
                          className="object-contain"
                        />
                      )}
                    </div>
                  </div>
                )}

                {convertedUrl && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleDownload}
                      className="mobile-button bg-green-500 text-white hover:bg-green-600"
                    >
                      변환된 이미지 다운로드
                    </button>
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