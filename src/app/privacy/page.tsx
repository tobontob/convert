'use client';

import Navigation from '@/components/Navigation';

export default function Privacy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>
        
        <div className="prose prose-blue max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 개인정보의 처리 목적</h2>
            <p className="text-gray-600 mb-4">
              Image Tools(이하 &quot;회사&quot;)는 다음의 목적을 위하여 개인정보를 처리합니다. 
              처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 
              이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 
              필요한 조치를 이행할 예정입니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. 개인정보의 처리 및 보유기간</h2>
            <p className="text-gray-600 mb-4">
              회사는 서비스 제공을 위해 필요한 최소한의 기간 동안 개인정보를 보유합니다. 
              이용자가 서비스 이용을 중단하고 개인정보 삭제를 요청하는 경우, 
              지체 없이 해당 개인정보를 삭제합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 정보주체의 권리, 의무 및 행사방법</h2>
            <p className="text-gray-600 mb-4">
              이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다:<br />
              1) 개인정보 열람 요구<br />
              2) 개인정보 정정·삭제 요구<br />
              3) 개인정보 처리정지 요구
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 처리하는 개인정보 항목</h2>
            <p className="text-gray-600 mb-4">
              회사는 다음의 개인정보 항목을 처리하고 있습니다:<br />
              - 이메일 주소 (문의사항 접수 시)<br />
              - 서비스 이용 기록<br />
              - 접속 로그
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. 개인정보의 파기</h2>
            <p className="text-gray-600 mb-4">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 
              지체없이 해당 개인정보를 파기합니다.
            </p>
            <p className="text-pink-600 font-semibold">
              ※ 업로드된 이미지 및 편집한 내용은 서버에 저장되지 않으며, 어떤 기록도 남지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. 개인정보 보호책임자</h2>
            <p className="text-gray-600">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 
              개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 
              아래와 같이 개인정보 보호책임자를 지정하고 있습니다.<br /><br />
              ▶ 개인정보 보호책임자<br />
              - 이메일: jccompany2007@gmail.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 