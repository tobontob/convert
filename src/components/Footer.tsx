import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          {/* 법적 고지사항 */}
          <div>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              본 사이트의 이미지 편집 기능은 참고용으로만 사용되어야 하며, 
              편집된 이미지의 저작권 및 초상권은 사용자에게 있습니다. 
              타인의 저작권을 침해하는 이미지 편집은 삼가해 주시기 바랍니다.
            </p>
          </div>

          {/* 통합된 링크 섹션 */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            <Link href="/privacy" className="text-sm text-cyan-600 hover:text-cyan-500">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="text-sm text-cyan-600 hover:text-cyan-500">
              이용약관
            </Link>
          </div>

          {/* 연락처 */}
          <div>
            <p className="text-sm text-gray-600">
              문의사항: jccompany2007@gmail.com
            </p>
            <p className="text-sm text-gray-500 mt-2">
              © {new Date().getFullYear()} Image Tools. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 