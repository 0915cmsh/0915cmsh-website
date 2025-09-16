import Section from '@/components/Section';

export const metadata = {
  title: '헤드헌팅 서비스 - CMSH',
  description: 'CMSH의 전문 헤드헌팅 서비스를 확인해보세요.',
};

export default function HeadhuntingPage() {
  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">헤드헌팅 서비스</h1>
            <p className="text-xl text-blue-100">
              최고의 인재를 찾아드리는 전문 헤드헌팅 서비스를 제공합니다
            </p>
          </div>
        </Section>
      </section>

      {/* 서비스 개요 */}
      <Section className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">헤드헌팅 서비스란?</h2>
            <p className="text-lg text-gray-600 mb-6">
              헤드헌팅 서비스는 기업이 필요로 하는 고급 인재를 
              능동적으로 찾아서 영입하는 서비스입니다. 
              일반적인 채용과 달리 수동적이지 않고 능동적으로 인재를 발굴합니다.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              CMSH는 다양한 분야의 전문 인재 풀을 보유하고 있으며, 
              고객의 요구사항에 맞는 최고의 인재를 제공합니다.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-600">성공률</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2주</div>
                <div className="text-gray-600">평균 매칭 시간</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">서비스 특징</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>능동적 인재 발굴</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>전문 인재 풀</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>빠른 매칭</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>높은 성공률</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 서비스 분야 */}
      <Section className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">서비스 분야</h2>
          <p className="text-lg text-gray-600">
            다양한 분야의 전문 인재를 헤드헌팅합니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">👔</div>
            <h3 className="text-xl font-semibold mb-3">경영진</h3>
            <p className="text-gray-600">CEO, CTO, CFO, 부사장 등 최고 경영진</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-semibold mb-3">IT 전문가</h3>
            <p className="text-gray-600">시니어 개발자, 아키텍트, 기술 리더 등</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3">전문직</h3>
            <p className="text-gray-600">변호사, 회계사, 컨설턴트 등</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-3">마케팅</h3>
            <p className="text-gray-600">마케팅 디렉터, 브랜드 매니저 등</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-3">금융</h3>
            <p className="text-gray-600">투자 전문가, 리스크 매니저 등</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">🏭</div>
            <h3 className="text-xl font-semibold mb-3">제조업</h3>
            <p className="text-gray-600">생산 관리자, 품질 관리자 등</p>
          </div>
        </div>
      </Section>

      {/* 서비스 프로세스 */}
      <Section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">서비스 프로세스</h2>
          <p className="text-lg text-gray-600">
            체계적인 프로세스를 통해 최고의 인재를 제공합니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-lg font-semibold mb-2">요구사항 분석</h3>
            <p className="text-gray-600">고객의 요구사항을 정확히 파악하고 분석합니다</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-lg font-semibold mb-2">인재 발굴</h3>
            <p className="text-gray-600">요구사항에 맞는 인재를 능동적으로 발굴합니다</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-lg font-semibold mb-2">면접 조율</h3>
            <p className="text-gray-600">고객과 인재 간의 면접을 조율합니다</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
            <h3 className="text-lg font-semibold mb-2">계약 지원</h3>
            <p className="text-gray-600">계약 체결을 지원하고 조율합니다</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">5</div>
            <h3 className="text-lg font-semibold mb-2">사후 관리</h3>
            <p className="text-gray-600">입사 후 적응을 지원하고 관리합니다</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
