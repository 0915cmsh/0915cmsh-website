import Section from '@/components/Section';

export const metadata = {
  title: '파견 서비스 - CMSH',
  description: 'CMSH의 전문 파견 서비스를 확인해보세요.',
};

export default function DispatchPage() {
  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">파견 서비스</h1>
            <p className="text-xl text-blue-100">
              전문 인력을 필요로 하는 기업에 맞춤형 파견 서비스를 제공합니다
            </p>
          </div>
        </Section>
      </section>

      {/* 서비스 개요 */}
      <Section className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">파견 서비스란?</h2>
            <p className="text-lg text-gray-600 mb-6">
              파견 서비스는 기업이 필요로 하는 전문 인력을 파견업체를 통해 
              일정 기간 동안 제공받는 서비스입니다. 
              인력 확보의 유연성과 비용 효율성을 동시에 제공합니다.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              CMSH는 다양한 분야의 전문 인력을 보유하고 있으며, 
              고객의 요구사항에 맞는 최적의 인력을 제공합니다.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24시간</div>
                <div className="text-gray-600">빠른 매칭</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
                <div className="text-gray-600">고객 만족도</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">서비스 특징</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>빠른 인력 확보</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>비용 효율성</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>전문 인력 풀</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>지속적인 관리</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 서비스 프로세스 */}
      <Section className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">서비스 프로세스</h2>
          <p className="text-lg text-gray-600">
            체계적인 프로세스를 통해 최적의 인력을 제공합니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-lg font-semibold mb-2">요구사항 분석</h3>
            <p className="text-gray-600">고객의 요구사항을 정확히 파악하고 분석합니다</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-lg font-semibold mb-2">인력 매칭</h3>
            <p className="text-gray-600">요구사항에 맞는 최적의 인력을 선별합니다</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-lg font-semibold mb-2">파견 시작</h3>
            <p className="text-gray-600">선별된 인력을 고객사에 파견합니다</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
            <h3 className="text-lg font-semibold mb-2">지속 관리</h3>
            <p className="text-gray-600">파견 기간 동안 지속적으로 관리합니다</p>
          </div>
        </div>
      </Section>

      {/* 서비스 분야 */}
      <Section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">서비스 분야</h2>
          <p className="text-lg text-gray-600">
            다양한 분야의 전문 인력을 제공합니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-semibold mb-3">IT/개발</h3>
            <p className="text-gray-600">개발자, 시스템 엔지니어, 데이터 분석가 등</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3">경영/관리</h3>
            <p className="text-gray-600">경영진, 관리자, 컨설턴트 등</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-3">디자인/마케팅</h3>
            <p className="text-gray-600">디자이너, 마케터, 기획자 등</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
