'use client';

import Navigation from '@/components/Navigation';

export default function Terms() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">이용약관</h1>
        
        <div className="prose prose-blue max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제 1 조 (목적)</h2>
            <p className="text-gray-600 mb-4">
              이 약관은 Image Tools(이하 "회사")가 제공하는 이미지 편집 서비스(이하 "서비스")의 이용조건 및 절차, 
              회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제 2 조 (용어의 정의)</h2>
            <p className="text-gray-600 mb-4">
              1. "서비스"란 회사가 제공하는 모든 이미지 편집 관련 서비스를 의미합니다.<br />
              2. "회원"이란 서비스를 이용하는 모든 사용자를 의미합니다.<br />
              3. "콘텐츠"란 서비스에서 편집되는 모든 이미지 파일을 의미합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제 3 조 (서비스의 제공)</h2>
            <p className="text-gray-600 mb-4">
              1. 회사는 다음과 같은 서비스를 제공합니다:<br />
              - 이미지 형식 변환<br />
              - 이미지 크기 조정<br />
              - 이미지 회전<br />
              - 이미지 자르기<br />
              - 이미지 압축<br />
              - 이미지 편집
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제 4 조 (서비스 이용)</h2>
            <p className="text-gray-600 mb-4">
              1. 서비스 이용은 무료입니다.<br />
              2. 회원은 서비스 이용 시 다음 사항을 준수해야 합니다:<br />
              - 타인의 저작권 및 초상권 침해 금지<br />
              - 불법적인 목적의 서비스 이용 금지<br />
              - 서비스의 안정적 운영을 방해하는 행위 금지
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제 5 조 (책임과 의무)</h2>
            <p className="text-gray-600 mb-4">
              1. 회사는 안정적인 서비스 제공을 위해 최선을 다합니다.<br />
              2. 회원은 자신의 콘텐츠에 대한 저작권 및 초상권 관련 책임을 집니다.<br />
              3. 서비스 이용 중 발생하는 콘텐츠의 손실에 대해 회사는 책임지지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제 6 조 (약관의 개정)</h2>
            <p className="text-gray-600">
              1. 회사는 필요한 경우 약관을 개정할 수 있습니다.<br />
              2. 약관 개정 시 회사는 개정된 약관을 서비스 내에 공지합니다.<br />
              3. 회원은 개정된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 