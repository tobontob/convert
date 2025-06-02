'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ArrowUpTrayIcon, 
  ArrowsPointingInIcon, 
  PhotoIcon,
  Square2StackIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center space-y-4">
          <Link 
            href="/" 
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 duration-200"
          >
            <div className="flex items-center space-x-2">
              <Square2StackIcon className="w-8 h-8 text-blue-600" />
              <span>Image Convert</span>
            </div>
          </Link>
          <nav className="flex items-center space-x-2">
            <Link
              href="/compress"
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-1.5 ${
                isActive('/compress')
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              <ArrowUpTrayIcon className="w-5 h-5" />
              <span>압축</span>
            </Link>
            <Link
              href="/resize"
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-1.5 ${
                isActive('/resize')
                  ? 'bg-purple-50 text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
              }`}
            >
              <ArrowsPointingInIcon className="w-5 h-5" />
              <span>리사이즈</span>
            </Link>
            <Link
              href="/crop"
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-1.5 ${
                isActive('/crop')
                  ? 'bg-pink-50 text-pink-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-pink-600'
              }`}
            >
              <PhotoIcon className="w-5 h-5" />
              <span>자르기</span>
            </Link>
            <Link
              href="/convert-to-jpg"
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-1.5 ${
                isActive('/convert-to-jpg')
                  ? 'bg-green-50 text-green-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
              }`}
            >
              <ArrowPathIcon className="w-5 h-5" />
              <span>JPEG 변환</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
} 