import Section from '@/components/Section';

export const metadata = {
  title: '조직도 - CMSH',
  description: 'CMSH의 조직도를 확인해보세요.',
};

export default function OrganizationPage() {
  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">조직도</h1>
            <p className="text-xl text-blue-100">
              CMSH의 조직도를 확인해보세요
            </p>
          </div>
        </Section>
      </section>

      {/* 조직도 내용 */}
      <Section className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">CMSH 조직도</h2>
              <p className="text-gray-600">효율적인 조직 운영을 위한 체계적인 구조</p>
            </div>

            {/* 조직도 다이어그램 */}
            <div className="flex flex-col items-center space-y-8">
              {/* 대표이사 */}
              <div className="bg-blue-600 text-white px-8 py-4 rounded-lg shadow-md">
                <div className="text-center">
                  <div className="font-bold text-lg">대표이사</div>
                  <div className="text-sm">김대표</div>
                </div>
              </div>

              {/* 본부 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {/* 경영지원본부 */}
                <div className="bg-gray-100 p-6 rounded-lg">
                  <div className="text-center mb-4">
                    <div className="font-bold text-lg text-gray-900">경영지원본부</div>
                    <div className="text-sm text-gray-600">본부장: 이본부</div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded text-sm">인사팀</div>
                    <div className="bg-white p-3 rounded text-sm">총무팀</div>
                    <div className="bg-white p-3 rounded text-sm">재무팀</div>
                  </div>
                </div>

                {/* 사업본부 */}
                <div className="bg-gray-100 p-6 rounded-lg">
                  <div className="text-center mb-4">
                    <div className="font-bold text-lg text-gray-900">사업본부</div>
                    <div className="text-sm text-gray-600">본부장: 박본부</div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded text-sm">파견팀</div>
                    <div className="bg-white p-3 rounded text-sm">아웃소싱팀</div>
                    <div className="bg-white p-3 rounded text-sm">헤드헌팅팀</div>
                    <div className="bg-white p-3 rounded text-sm">RPO팀</div>
                  </div>
                </div>

                {/* 마케팅본부 */}
                <div className="bg-gray-100 p-6 rounded-lg">
                  <div className="text-center mb-4">
                    <div className="font-bold text-lg text-gray-900">마케팅본부</div>
                    <div className="text-sm text-gray-600">본부장: 최본부</div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded text-sm">마케팅팀</div>
                    <div className="bg-white p-3 rounded text-sm">고객관리팀</div>
                    <div className="bg-white p-3 rounded text-sm">기획팀</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 조직 현황 */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50명</div>
                <div className="text-gray-600">전체 임직원</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">3개</div>
                <div className="text-gray-600">본부</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10개</div>
                <div className="text-gray-600">팀</div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
