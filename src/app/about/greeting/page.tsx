import Section from '@/components/Section';

export const metadata = {
  title: '인사말 - CMSH',
  description: 'CMSH 대표의 인사말을 확인해보세요.',
};

export default function GreetingPage() {
  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">인사말</h1>
            <p className="text-xl text-blue-100">
              CMSH 대표의 인사말입니다
            </p>
          </div>
        </Section>
      </section>

      {/* 인사말 내용 */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl">👨‍💼</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">대표이사 김대표</h2>
              <p className="text-gray-600">CMSH 대표이사</p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                안녕하세요. CMSH 대표이사 김대표입니다.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                CMSH는 2020년 설립 이후, 대한민국의 인재 솔루션 분야에서 
                혁신적인 서비스를 제공해왔습니다. 우리는 단순히 인재를 연결하는 것이 아니라, 
                고객의 비즈니스 성공을 위한 전략적 파트너가 되고자 합니다.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                급변하는 비즈니스 환경에서 기업들은 더욱 전문적이고 효율적인 인재 솔루션을 필요로 합니다. 
                CMSH는 파견, 아웃소싱, 헤드헌팅, RPO 등 다양한 서비스를 통해 
                고객의 요구사항에 맞는 맞춤형 솔루션을 제공하고 있습니다.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                우리의 핵심 가치는 '고객 중심의 서비스', '전문성과 신뢰성', '지속적인 혁신', '상호 성장'입니다. 
                이러한 가치를 바탕으로 고객과 함께 성장하는 파트너가 되겠습니다.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                앞으로도 CMSH는 대한민국을 대표하는 인재 솔루션 전문 기업으로서 
                고객의 성공을 지원하고, 인재와 기업의 가치를 극대화하는 데 최선을 다하겠습니다.
              </p>
            </div>
            
            <div className="text-right mt-8">
              <p className="text-lg font-semibold text-gray-900">CMSH 대표이사</p>
              <p className="text-lg font-bold text-blue-600">김대표</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
