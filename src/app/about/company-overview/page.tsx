import Section from '@/components/Section';

export const metadata = {
  title: '회사개요 - CMSH',
  description: 'CMSH의 회사개요를 확인해보세요.',
};

export default function CompanyOverviewPage() {
  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">회사개요</h1>
            <p className="text-xl text-blue-100">
              CMSH의 회사개요를 확인해보세요
            </p>
          </div>
        </Section>
      </section>

      {/* 회사개요 내용 */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="prose prose-lg max-w-none">
              <h2>회사 개요</h2>
              <p>
                CMSH는 2020년 설립된 인재 솔루션 전문 기업으로, 
                대한민국의 인재 시장에서 혁신적인 서비스를 제공하고 있습니다.
              </p>

              <h3>설립 정보</h3>
              <ul>
                <li>설립일: 2020년 1월 1일</li>
                <li>대표이사: 김대표</li>
                <li>본사: 서울특별시 강남구 테헤란로 123</li>
                <li>사업자등록번호: 123-45-67890</li>
              </ul>

              <h3>주요 사업</h3>
              <ul>
                <li>파견 서비스</li>
                <li>아웃소싱 서비스</li>
                <li>헤드헌팅 서비스</li>
                <li>RPO 서비스</li>
              </ul>

              <h3>연혁</h3>
              <ul>
                <li>2020년 1월: CMSH 설립</li>
                <li>2020년 6월: 파견 서비스 런칭</li>
                <li>2021년 3월: 아웃소싱 서비스 런칭</li>
                <li>2021년 9월: 헤드헌팅 서비스 런칭</li>
                <li>2022년 2월: RPO 서비스 런칭</li>
                <li>2023년 5월: 본사 이전</li>
                <li>2024년 1월: 신규 서비스 런칭</li>
              </ul>

              <h3>조직 현황</h3>
              <ul>
                <li>임직원 수: 50명</li>
                <li>본사: 서울특별시 강남구</li>
                <li>지점: 부산, 대구, 광주</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
