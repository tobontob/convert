'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}

export default function ImageUploader({
  onImageUpload,
  acceptedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  maxFileSize = 10 * 1024 * 1024, // 10MB
}: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': acceptedFileTypes,
    },
    maxSize: maxFileSize,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out cursor-pointer
        ${isDragActive 
          ? 'bg-blue-50 border-2 border-dashed border-blue-500 scale-102'
          : 'bg-white border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-gray-50'
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="p-3 sm:p-6">
        <div className={`
          flex flex-col items-center justify-center space-y-3 sm:space-y-4 transition-transform duration-300
          ${isDragActive ? 'transform scale-105' : ''}
        `}>
          <div className={`
            p-3 sm:p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500
            ${isDragActive ? 'animate-bounce' : ''}
          `}>
            <ArrowUpTrayIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div className="text-center">
            <p className="text-sm sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">
              {isDragActive ? (
                '여기에 이미지를 놓으세요'
              ) : (
                '이미지를 드래그하여 놓거나 클릭하여 선택하세요'
              )}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              지원 형식: JPG, PNG, GIF, WEBP (최대 10MB)
            </p>
          </div>
        </div>
      </div>
      <div className={`
        absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300
        ${isDragActive ? 'opacity-100' : 'hover:opacity-100'}
      `} />
    </div>
  );
} 