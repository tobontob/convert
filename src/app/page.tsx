'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowUpTrayIcon, 
  PhotoIcon,
  ScissorsIcon,
  ArrowsPointingInIcon,
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  SparklesIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';

export default function Home() {
  const tools = [
    {
      title: '이미지 형식 변환',
      description: '다양한 이미지 형식으로 변환하세요',
      href: '/convert',
      icon: '🔄',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: '이미지 편집',
      description: '이미지를 자유롭게 편집하세요',
      href: '/editor',
      icon: '🎨',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      title: '이미지 자르기',
      description: '이미지를 원하는 크기로 자르세요',
      href: '/crop',
      icon: '✂️',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: '이미지 사이즈 조정',
      description: '이미지 크기를 조정하세요',
      href: '/resize',
      icon: '📐',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      title: '이미지 용량 조절',
      description: '이미지 용량을 압축하고 최적화하세요',
      href: '/compress',
      icon: '⚡',
      gradient: 'from-orange-500 to-yellow-500'
    },
    {
      title: '이미지 회전',
      description: '이미지를 회전하고 반전하세요',
      href: '/rotate',
      icon: '🔁',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      title: '이미지 워터마크',
      description: '이미지에 워터마크를 추가하세요',
      href: '/watermark',
      icon: '™️',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      title: '새로운 기능 준비중',
      description: '곧 새로운 기능이 추가될 예정입니다',
      href: '#',
      icon: '✨',
      gradient: 'from-gray-400 to-gray-500',
      disabled: true
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            이미지 도구 모음
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            무료로 사용할 수 있는 온라인 이미지 편집 도구입니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className={`group ${tool.disabled ? 'cursor-not-allowed' : ''}`}
              onClick={tool.disabled ? (e) => e.preventDefault() : undefined}
            >
              <div className="relative h-full bg-white rounded-2xl overflow-hidden card-hover">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${tool.gradient}`} />
                <div className="relative p-6 sm:p-8">
                  <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {tool.title}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {tool.description}
                  </p>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
