import Link from 'next/link';

export default function Home() {
  const tools = [
    {
      title: '이미지 압축',
      description: 'JPG, PNG, SVG, GIF 파일의 용량을 줄이면서 품질 유지',
      href: '/compress',
      icon: '🗜️',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: '이미지 리사이즈',
      description: '이미지 크기를 픽셀 또는 비율로 조정',
      href: '/resize',
      icon: '📐',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: '이미지 자르기',
      description: '원하는 영역만큼 이미지를 자르기',
      href: '/crop',
      icon: '✂️',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      title: 'JPG 변환',
      description: 'PNG, GIF, WEBP 등의 형식을 JPG로 변환',
      href: '/convert-to-jpg',
      icon: '🔄',
      gradient: 'from-orange-500 to-yellow-500',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            이미지 편집 도구
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            무료로 사용할 수 있는 온라인 이미지 편집 도구입니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group"
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
