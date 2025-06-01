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
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-gray-50'}`}
    >
      <input {...getInputProps()} />
      <ArrowUpTrayIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      <p className="text-lg text-gray-700">
        {isDragActive ? (
          '여기에 이미지를 놓으세요'
        ) : (
          '이미지를 드래그하여 놓거나 클릭하여 선택하세요'
        )}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        지원 형식: JPG, PNG, GIF, WEBP (최대 10MB)
      </p>
    </div>
  );
} 