import Section from '@/components/Section';

export const metadata = {
  title: '아웃소싱 서비스 - CMSH',
  description: 'CMSH의 전문 아웃소싱 서비스를 확인해보세요.',
};

export default function OutsourcingPage() {
  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">아웃소싱 서비스</h1>
            <p className="text-xl text-blue-100">
              비즈니스 프로세스를 효율적으로 관리할 수 있는 아웃소싱 솔루션을 제공합니다
            </p>
          </div>
        </Section>
      </section>

      {/* 서비스 개요 */}
      <Section className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">아웃소싱 서비스란?</h2>
            <p className="text-lg text-gray-600 mb-6">
              아웃소싱 서비스는 기업의 핵심 업무가 아닌 부수적인 업무를 
              전문 업체에 위탁하여 처리하는 서비스입니다. 
              비용 절감과 업무 효율성을 동시에 제공합니다.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              CMSH는 다양한 분야의 아웃소싱 서비스를 제공하며, 
              고객의 비즈니스 성공을 지원합니다.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">30%</div>
                <div className="text-gray-600">비용 절감</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50%</div>
                <div className="text-gray-600">업무 효율성 향상</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">서비스 특징</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>비용 절감</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>전문성</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>유연성</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>품질 보장</span>
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
            다양한 분야의 아웃소싱 서비스를 제공합니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-3">고객 서비스</h3>
            <p className="text-gray-600">콜센터, 고객 상담, 고객 지원 등</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-3">행정 업무</h3>
            <p className="text-gray-600">문서 처리, 데이터 입력, 회계 업무 등</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-xl font-semibold mb-3">기술 지원</h3>
            <p className="text-gray-600">IT 지원, 시스템 관리, 기술 컨설팅 등</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-3">물류 관리</h3>
            <p className="text-gray-600">창고 관리, 배송, 재고 관리 등</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-3">마케팅</h3>
            <p className="text-gray-600">디지털 마케팅, 콘텐츠 제작, 광고 관리 등</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-3">인사 관리</h3>
            <p className="text-gray-600">채용, 교육, 급여 관리 등</p>
          </div>
        </div>
      </Section>

      {/* 서비스 프로세스 */}
      <Section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">서비스 프로세스</h2>
          <p className="text-lg text-gray-600">
            체계적인 프로세스를 통해 최적의 서비스를 제공합니다
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
            <h3 className="text-lg font-semibold mb-2">솔루션 설계</h3>
            <p className="text-gray-600">요구사항에 맞는 최적의 솔루션을 설계합니다</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-lg font-semibold mb-2">서비스 시작</h3>
            <p className="text-gray-600">설계된 솔루션을 바탕으로 서비스를 시작합니다</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
            <h3 className="text-lg font-semibold mb-2">지속 개선</h3>
            <p className="text-gray-600">서비스 품질을 지속적으로 개선합니다</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
