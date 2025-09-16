import Link from 'next/link';
import Section from '@/components/Section';

export const metadata = {
  title: '회사소개 - CMSH',
  description: 'CMSH의 회사소개 페이지입니다. 우리의 비전과 미션을 확인해보세요.',
};

export default function AboutPage() {
  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">회사소개</h1>
            <p className="text-xl text-blue-100">
              대한민국 최고의 인재 솔루션을 제공하는 CMSH를 소개합니다
            </p>
          </div>
        </Section>
      </section>

      {/* 탭 네비게이션 */}
      <Section className="py-8">
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/46"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            인사말
          </Link>
          <Link
            href="/54"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            회사개요
          </Link>
          <Link
            href="/56"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            조직도
          </Link>
          <Link
            href="/84"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            오시는 길
          </Link>
        </div>
      </Section>

      {/* 회사 개요 */}
      <Section className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">CMSH</h2>
            <p className="text-lg text-gray-600 mb-6">
              CMSH는 2020년 설립된 인재 솔루션 전문 기업으로, 
              파견, 아웃소싱, 헤드헌팅, RPO 등 다양한 서비스를 제공하고 있습니다.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              고객의 성공이 우리의 성공이라는 신념으로, 
              최고의 인재와 최적의 솔루션을 제공하여 
              함께 성장하는 파트너가 되겠습니다.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">파트너 기업</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-gray-600">성공 사례</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">핵심 가치</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>고객 중심의 서비스</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>전문성과 신뢰성</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>지속적인 혁신</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <span>상호 성장</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 비전과 미션 */}
      <Section className="py-16 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">비전</h3>
            <p className="text-lg text-gray-600">
              대한민국을 대표하는 인재 솔루션 전문 기업으로 
              고객과 함께 성장하는 글로벌 리더가 되겠습니다.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">미션</h3>
            <p className="text-lg text-gray-600">
              최고의 인재와 최적의 솔루션을 통해 
              고객의 비즈니스 성공을 지원하고 
              인재와 기업의 가치를 극대화하겠습니다.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
