import Link from 'next/link';

export default function Home() {
  const tools = [
    {
      title: '이미지 압축',
      description: 'JPG, PNG, SVG, GIF 파일의 용량을 줄이면서 품질 유지',
      href: '/compress',
      color: 'bg-white border border-gray-200',
      icon: '🗜️',
    },
    {
      title: '이미지 리사이즈',
      description: '이미지 크기를 픽셀 또는 비율로 조정',
      href: '/resize',
      color: 'bg-white border border-gray-200',
      icon: '📐',
    },
    {
      title: '이미지 자르기',
      description: '원하는 영역만큼 이미지를 자르기',
      href: '/crop',
      color: 'bg-white border border-gray-200',
      icon: '✂️',
    },
    {
      title: 'JPG 변환',
      description: 'PNG, GIF, WEBP 등의 형식을 JPG로 변환',
      href: '/convert-to-jpg',
      color: 'bg-white border border-gray-200',
      icon: '🔄',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          이미지 편집 도구
        </h1>
        <p className="text-center text-gray-600 mb-12">
          무료로 사용할 수 있는 온라인 이미지 편집 도구입니다
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block group"
            >
              <div className={`${tool.color} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}>
                <div className="text-3xl mb-4">{tool.icon}</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {tool.title}
                </h2>
                <p className="text-gray-600">
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
