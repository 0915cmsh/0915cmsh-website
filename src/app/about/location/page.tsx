import Section from '@/components/Section';

export const metadata = {
  title: '오시는 길 - CMSH',
  description: 'CMSH의 위치와 오시는 길을 확인해보세요.',
};

export default function LocationPage() {
  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">오시는 길</h1>
            <p className="text-xl text-blue-100">
              CMSH의 위치와 오시는 길을 확인해보세요
            </p>
          </div>
        </Section>
      </section>

      {/* 오시는 길 내용 */}
      <Section className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 회사 정보 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">회사 정보</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">주소</h3>
                  <p className="text-gray-600">
                    서울특별시 강남구 테헤란로 123<br />
                    CMSH 빌딩 10층
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">연락처</h3>
                  <p className="text-gray-600">
                    전화: 02-1234-5678<br />
                    팩스: 02-1234-5679<br />
                    이메일: info@korea-works.co.kr
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">운영시간</h3>
                  <p className="text-gray-600">
                    평일: 09:00 - 18:00<br />
                    토요일: 09:00 - 13:00<br />
                    일요일 및 공휴일: 휴무
                  </p>
                </div>
              </div>
            </div>

            {/* 지도 및 교통편 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">교통편</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">지하철</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 2호선 강남역 3번 출구 도보 5분</li>
                    <li>• 9호선 신논현역 1번 출구 도보 3분</li>
                    <li>• 분당선 선릉역 2번 출구 도보 7분</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">버스</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 간선버스: 146, 240, 360, 740</li>
                    <li>• 지선버스: 3412, 6411, 6412</li>
                    <li>• 광역버스: 1100, 1700, 7007</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">주차</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 건물 지하 주차장 이용 가능</li>
                    <li>• 주차 요금: 30분당 1,000원</li>
                    <li>• 방문객 주차 할인: 2시간 무료</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 지도 영역 */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">위치</h2>
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="text-gray-600">지도가 여기에 표시됩니다</p>
                <p className="text-sm text-gray-500 mt-2">
                  서울특별시 강남구 테헤란로 123
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
