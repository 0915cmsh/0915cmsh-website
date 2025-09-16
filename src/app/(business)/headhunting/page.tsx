export default function HeadhuntingPage() {
  return (
    <article className="prose max-w-none prose-zinc">
      <h1>헤드헌팅/채용대행 서비스</h1>
      
      <h2>서비스 개요</h2>
      <p>
        헤드헌팅/채용대행은 <strong>핵심 인재 확보</strong>를 위한 전문 서치 서비스로, 
        <strong>직무 정의부터 온보딩까지</strong> 전 과정을 관리합니다. 
        당사의 <strong>산업별 전문 컨설턴트</strong>가 고객사의 요구사항에 맞는 
        최적의 인재를 찾아 연결해드립니다.
      </p>

      <h2>핵심 가치 제안</h2>
      <ul>
        <li><strong>전문성</strong>: 산업별·직무별 전담 컨설턴트 체계</li>
        <li><strong>신속성</strong>: 평균 2-4주 내 매칭 완료</li>
        <li><strong>정확성</strong>: 구조화된 평가 체계로 적합도 극대화</li>
        <li><strong>지속성</strong>: 온보딩 케어 및 조기 이탈 방지</li>
      </ul>

      <h2>서비스 프로세스 (5단계)</h2>
      <ol>
        <li><strong>요구사항 분석</strong>: JD 리파인, 필수/우대 역량, 성과 기대치 정의</li>
        <li><strong>인재 소싱</strong>: 다중 채널 소싱(직접서치·레퍼럴·커뮤니티·DB·광고)</li>
        <li><strong>평가 및 선별</strong>: 이력검증, 구조화 인터뷰, 레퍼런스 체크</li>
        <li><strong>매칭 및 오퍼</strong>: 오퍼 전략 수립, 협상 지원, 계약 체결</li>
        <li><strong>온보딩 케어</strong>: 입사 지원, 적응 프로그램, 조기 이탈 방지</li>
      </ol>

      <h2>전문 분야</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4>IT/디지털</h4>
          <ul className="text-sm">
            <li>개발자 (Frontend/Backend)</li>
            <li>데이터 사이언티스트</li>
            <li>프로덕트 매니저</li>
            <li>UX/UI 디자이너</li>
          </ul>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4>경영/전략</h4>
          <ul className="text-sm">
            <li>경영진 및 임원</li>
            <li>전략 기획자</li>
            <li>마케팅 전문가</li>
            <li>재무 전문가</li>
          </ul>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4>제조/기술</h4>
          <ul className="text-sm">
            <li>생산 관리자</li>
            <li>품질 관리자</li>
            <li>R&D 전문가</li>
            <li>기술 영업</li>
          </ul>
        </div>
      </div>

      <h2>평가 체계</h2>
      <ul>
        <li><strong>이력 검증</strong>: 경력, 학력, 자격증 등 기본 요건 확인</li>
        <li><strong>역량 평가</strong>: 직무 관련 핵심 역량 및 스킬 평가</li>
        <li><strong>인성 평가</strong>: 조직 적합성 및 문화 적합성 평가</li>
        <li><strong>레퍼런스 체크</strong>: 이전 직장 동료 및 상사의 객관적 평가</li>
      </ul>

      <h2>성과 지표 (KPI)</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4>매칭 성과</h4>
          <ul>
            <li>평균 매칭 리드타임: <strong>2-4주</strong></li>
            <li>서류→1차 면접 전환율: <strong>18-32%</strong></li>
            <li>오퍼 수락률: <strong>85%+</strong></li>
          </ul>
        </div>
        <div>
          <h4>정착 성과</h4>
          <ul>
            <li>3개월 정착률: <strong>90%+</strong></li>
            <li>6개월 정착률: <strong>85%+</strong></li>
            <li>고객 만족도: <strong>4.8/5.0</strong></li>
          </ul>
        </div>
      </div>

      <h2>차별화 요소</h2>
      <ul>
        <li><strong>전문 네트워크</strong>: 산업별·직무별 전문 인재 풀 보유</li>
        <li><strong>맞춤형 서치</strong>: 고객사 특성에 맞는 커스텀 서치 전략</li>
        <li><strong>데이터 기반</strong>: 채용 파이프라인 전환율 실시간 관리</li>
        <li><strong>지속적 관리</strong>: 입사 후 6개월간 적응 지원</li>
      </ul>

      <h2>비용 구조</h2>
      <p>
        <strong>성공 수수료</strong> 방식으로, 채용 성공 시에만 비용이 발생합니다. 
        수수료는 <strong>연봉의 15-25%</strong> 수준이며, 
        직무 복잡도와 시장 상황에 따라 조정됩니다.
      </p>

      <div className="not-prose mt-8 rounded-2xl border bg-blue-50 p-6">
        <h3 className="text-lg font-semibold mb-2">헤드헌팅 상담</h3>
        <p className="text-sm text-gray-700 mb-4">
          채용 요구사항을 상세히 논의하여 최적의 인재 확보 전략을 수립해드립니다.
        </p>
        <div className="flex gap-3">
          <a href="tel:15447494" className="inline-block rounded-lg bg-blue-600 px-5 py-2 text-white">1544-7494</a>
          <a href="/inquiry/board" className="inline-block rounded-lg border border-blue-600 px-5 py-2 text-blue-600">온라인 문의</a>
        </div>
      </div>
    </article>
  );
}
