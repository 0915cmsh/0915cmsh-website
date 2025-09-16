import Section from '@/components/Section';

export const metadata = {
  title: 'RPO 서비스 - CMSH',
  description: 'CMSH의 전문 RPO 서비스를 확인해보세요.',
};

export default function RpoPage() {
  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">RPO 서비스</h1>
            <p className="text-xl text-blue-100">
              채용 프로세스 전체를 아웃소싱하는 RPO 서비스를 제공합니다
            </p>
          </div>
        </Section>
      </section>

      {/* 서비스 개요 */}
      <Section className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">RPO 서비스란?</h2>
            <p className="text-lg text-gray-600 mb-6">
              RPO(Recruitment Process Outsourcing)는 기업의 채용 프로세스 전체를 
              전문 업체에 위탁하여 처리하는 서비스입니다. 
              채용의 효율성과 품질을 동시에 향상시킵니다.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              CMSH는 체계적인 RPO 서비스를 통해 
              고객의 채용 목표를 달성하도록 지원합니다.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">40%</div>
                <div className="text-gray-600">채용 시간 단축</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">90%</div>
                <div className="text-gray-600">채용 성공률</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">서비스 특징</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>전체 프로세스 관리</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>전문성과 효율성</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>비용 절감</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>품질 보장</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 서비스 범위 */}
      <Section className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">서비스 범위</h2>
          <p className="text-lg text-gray-600">
            채용 프로세스의 모든 단계를 관리합니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-3">채용 계획 수립</h3>
            <p className="text-gray-600">채용 전략 수립, 직무 분석, 요구사항 정의</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-3">인재 발굴</h3>
            <p className="text-gray-600">이력서 수집, 인재 풀 관리, 능동적 발굴</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-3">서류 심사</h3>
            <p className="text-gray-600">이력서 검토, 1차 선별, 적합성 평가</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-3">면접 관리</h3>
            <p className="text-gray-600">면접 일정 조율, 면접 진행, 평가 관리</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3">평가 및 선발</h3>
            <p className="text-gray-600">종합 평가, 최종 선발, 결과 보고</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-3">계약 지원</h3>
            <p className="text-gray-600">계약 체결 지원, 입사 준비, 사후 관리</p>
          </div>
        </div>
      </Section>

      {/* 서비스 프로세스 */}
      <Section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">서비스 프로세스</h2>
          <p className="text-lg text-gray-600">
            체계적인 프로세스를 통해 최적의 채용 결과를 제공합니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-lg font-semibold mb-2">요구사항 분석</h3>
            <p className="text-gray-600">고객의 채용 요구사항을 정확히 파악하고 분석합니다</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-lg font-semibold mb-2">채용 전략 수립</h3>
            <p className="text-gray-600">요구사항에 맞는 최적의 채용 전략을 수립합니다</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-lg font-semibold mb-2">채용 실행</h3>
            <p className="text-gray-600">수립된 전략을 바탕으로 채용을 실행합니다</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
            <h3 className="text-lg font-semibold mb-2">결과 관리</h3>
            <p className="text-gray-600">채용 결과를 관리하고 지속적으로 개선합니다</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
