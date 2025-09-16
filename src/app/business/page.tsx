import Link from 'next/link';
import Section from '@/components/Section';

const SERVICES = [
  { 
    key:'dispatch', 
    name:'인재파견', 
    desc:'필요 시점에 적합 인재를 배치', 
    href:'/business/dispatch',
    icon: '👥',
    features: ['48-72시간 신속 배치', '법적 안전성 보장', 'KPI 기반 관리']
  },
  { 
    key:'outsourcing', 
    name:'도급/업무위탁', 
    desc:'성과기반 운영과 비용 효율', 
    href:'/business/outsourcing',
    icon: '🏢',
    features: ['성과 기반 계약', '전문 조직 운영', '리스크 이전']
  },
  { 
    key:'headhunting', 
    name:'헤드헌팅/채용대행', 
    desc:'핵심인재 탐색 및 선발', 
    href:'/business/headhunting',
    icon: '🎯',
    features: ['2-4주 매칭', '전문 평가 체계', '온보딩 케어']
  },
  { 
    key:'rpo', 
    name:'RPO', 
    desc:'채용 전 과정 위탁(설계–운영–분석)', 
    href:'/business/rpo',
    icon: '📊',
    features: ['통합 채용 관리', '비용 25% 절감', '데이터 기반 개선']
  },
];

export default function BusinessIndex(){
  return (
    <div>
      {/* 히어로 섹션 */}
      <div className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23366DFF' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <Section className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              사업소개
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              인재와 현장을 데이터로 연결하는<br/>
              <strong className="text-blue-600">전문 아웃소싱 솔루션</strong>
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">파견업 등록업체</span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full">ISO 인증</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full">전국 네트워크</span>
            </div>
          </div>
        </Section>
      </div>

      {/* 서비스 네비게이션 배너 */}
      <div className="bg-white border-b">
        <Section className="py-6">
          <div className="flex flex-wrap justify-center gap-2">
            {SERVICES.map(s=>(
              <Link 
                key={s.key} 
                href={s.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <span className="text-lg">{s.icon}</span>
                <span className="font-medium text-gray-700">{s.name}</span>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      {/* 서비스 카드 섹션 */}
      <Section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">전문 서비스</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            고객의 성공을 위한 맞춤형 인재 솔루션을 제공합니다
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(s=>(
            <Link key={s.key} href={s.href} className="group h-full">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200 h-full flex flex-col">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.name}</h3>
                <p className="text-gray-600 mb-4">{s.desc}</p>
                
                <ul className="space-y-2 mb-6 flex-grow">
                  {s.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 mt-auto">
                  자세히 보기
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* 통계 섹션 */}
      <div className="bg-gray-50 py-20">
        <Section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">CMSH의 성과</h2>
            <p className="text-lg text-gray-600">데이터로 증명하는 전문성</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">협력 기업</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">배치 인력</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">고객 만족도</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15년</div>
              <div className="text-gray-600">전문 경험</div>
            </div>
          </div>
        </Section>
      </div>

      {/* CTA 섹션 */}
      <Section className="py-20">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">지금 시작하세요</h2>
          <p className="text-xl mb-8 opacity-90">
            전문가와 상담하여 최적의 솔루션을 찾아보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inquiry/board" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              무료 상담 신청
            </Link>
            <Link href="tel:15447494" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              1544-7494
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
