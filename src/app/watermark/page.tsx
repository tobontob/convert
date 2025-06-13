'use client';

import { useState } from 'react';
import Link from 'next/link';
import WatermarkEditor from '@/components/WatermarkEditor';
import Navigation from '@/components/Navigation';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export default function Watermark() {
  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [watermarkedImage, setWatermarkedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setBaseImage(result);
      setWatermarkedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (image: string) => {
    setWatermarkedImage(image);
  };

  const handleDownload = () => {
    if (!watermarkedImage) return;
    
    const link = document.createElement('a');
    link.href = watermarkedImage;
    link.download = 'watermarked-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNewImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files?.[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setBaseImage(result);
          setWatermarkedImage(null);
        };
        reader.readAsDataURL(target.files[0]);
      }
    };
    input.click();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-6xl mx-auto mobile-container">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="mobile-header from-blue-500 to-purple-500">
            <h1 className="mobile-header-title">
              워터마크 삽입
            </h1>
            <p className="mobile-header-description text-blue-50">
              이미지에 워터마크를 추가하여 저작권을 보호하세요.
            </p>
          </div>

          <div className="p-3 sm:p-6 lg:p-8">
            {!baseImage ? (
              <div className="relative border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-colors hover:border-blue-500 hover:bg-blue-50 border-gray-300">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="baseImageInput"
                />
                <label
                  htmlFor="baseImageInput"
                  className="block cursor-pointer"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                      <ArrowUpTrayIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-700">
                        이미지를 드래그하여 놓거나 클릭하여 선택하세요
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        지원되는 형식: JPEG, PNG, WebP, GIF (최대 10MB)
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                <WatermarkEditor
                  baseImage={baseImage}
                  onSave={handleSave}
                />
                
                {watermarkedImage && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleDownload}
                      className="mobile-button bg-green-500 text-white hover:bg-green-600"
                    >
                      워터마크 이미지 다운로드
                    </button>
                  </div>
                )}

                {/* 다른 이미지 편집 버튼 */}
                <div className="flex justify-center">
                  <button
                    onClick={handleNewImage}
                    className="mobile-button bg-blue-500 text-white hover:bg-blue-600"
                  >
                    다른 이미지 편집하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 