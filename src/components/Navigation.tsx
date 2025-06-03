'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ArrowUpTrayIcon, 
  ArrowsPointingInIcon, 
  PhotoIcon,
  Square2StackIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  ArrowPathRoundedSquareIcon,
  WrenchIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navigationItems = [
    {
      href: '/compress',
      icon: ArrowUpTrayIcon,
      label: '압축',
      activeColor: 'blue',
    },
    {
      href: '/resize',
      icon: ArrowsPointingInIcon,
      label: '리사이즈',
      activeColor: 'purple',
    },
    {
      href: '/crop',
      icon: PhotoIcon,
      label: '자르기',
      activeColor: 'green',
    },
    {
      href: '/convert',
      icon: ArrowPathIcon,
      label: '이미지 변환',
      activeColor: 'orange',
    },
    {
      href: '/editor',
      icon: PencilSquareIcon,
      label: '이미지 편집',
      activeColor: 'pink',
    },
    {
      href: '/rotate',
      icon: ArrowPathRoundedSquareIcon,
      label: '이미지 회전',
      activeColor: 'cyan',
    },
    {
      href: '/watermark',
      icon: WrenchIcon,
      label: '워터마크',
      activeColor: 'yellow',
    },
  ];

  return (
    <>
      {/* 상단 헤더 */}
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col items-center space-y-2 sm:space-y-4">
            {/* 모바일 햄버거 버튼과 로고를 포함하는 컨테이너 */}
            <div className="w-full flex items-center">
              {/* 로고 */}
              <div className="flex-grow flex justify-center">
                <Link 
                  href="/" 
                  className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <Square2StackIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    <span>IMAGE TOOLS</span>
                  </div>
                </Link>
              </div>
              {/* 우측의 햄버거 버튼 */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bars3Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
            </div>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden sm:flex items-center justify-center flex-wrap gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-1.5 ${
                    isActive(item.href)
                      ? `bg-${item.activeColor}-50 text-${item.activeColor}-600 shadow-sm`
                      : `text-gray-600 hover:bg-gray-50 hover:text-${item.activeColor}-600`
                  }`}
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* 모바일 사이드 메뉴 */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden">
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-lg transform translate-x-0 transition-transform duration-200 ease-in-out">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">메뉴</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? `bg-${item.activeColor}-50 text-${item.activeColor}-600`
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 