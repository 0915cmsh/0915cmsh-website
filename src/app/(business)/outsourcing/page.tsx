export default function OutsourcingPage(){
  return (
    <article className="prose max-w-none prose-zinc">
      <h1>도급/업무위탁 서비스</h1>
      
      <h2>서비스 개요</h2>
      <p>
        도급/업무위탁은 <strong>성과 기반 계약 구조</strong>로 특정 업무나 공정의 
        <strong>전체 운영을 외부 전문 조직에 위탁</strong>하는 서비스입니다. 
        인력의 채용·노무 관리부터 성과 달성까지 당사가 전담하여 
        <strong>KPI 중심의 투명한 운영</strong>을 제공합니다.
      </p>

      <h2>핵심 특징</h2>
      <ul>
        <li><strong>성과 기반 계약</strong>: 결과물과 KPI 달성도에 따른 정산</li>
        <li><strong>전문 운영</strong>: 현장 PM-반장-팀원 체계의 전문 조직</li>
        <li><strong>표준화 운영</strong>: SOP 기반의 일관된 품질 관리</li>
        <li><strong>리스크 이전</strong>: 인건비·노무 관리 부담 완전 이전</li>
      </ul>

      <h2>적용 분야</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3>제조업</h3>
          <ul>
            <li>생산라인 전체 운영 및 관리</li>
            <li>품질관리 및 검사 업무</li>
            <li>물류창고 운영 및 재고관리</li>
            <li>설비 유지보수 및 점검</li>
          </ul>
        </div>
        <div>
          <h3>서비스업</h3>
          <ul>
            <li>고객센터 운영 및 CS 업무</li>
            <li>데이터 입력 및 처리 업무</li>
            <li>영업지원 및 마케팅 업무</li>
            <li>IT 운영 및 유지보수</li>
          </ul>
        </div>
      </div>

      <h2>운영 모델 (5단계)</h2>
      <ol>
        <li><strong>범위 정의</strong>: 업무 범위, 목표 KPI, 품질 기준, 성과 지표 설정</li>
        <li><strong>조직 구성</strong>: 현장 PM-반장-팀원 체계의 전문 조직 구성</li>
        <li><strong>표준화</strong>: 작업표준(SOP), 안전/품질 매뉴얼, 교육 프로그램 개발</li>
        <li><strong>운영 관리</strong>: 출결/생산성/불량률/사고 모니터링 및 개선</li>
        <li><strong>정산 및 평가</strong>: 성과 연동 단가, 패널티/인센티브 적용</li>
      </ol>

      <h2>성과 관리 체계</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4>생산성 지표</h4>
          <ul className="text-sm">
            <li>단위시간 처리량</li>
            <li>작업 완료율</li>
            <li>효율성 개선율</li>
          </ul>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4>품질 지표</h4>
          <ul className="text-sm">
            <li>불량률</li>
            <li>재작업률</li>
            <li>고객 만족도</li>
          </ul>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4>운영 지표</h4>
          <ul className="text-sm">
            <li>출결 안정성</li>
            <li>안전사고율</li>
            <li>이직률</li>
          </ul>
        </div>
      </div>

      <h2>비용 구조 및 정산</h2>
      <p>
        <strong>기본 운영비 + 성과 연동비</strong>로 구성되며, 
        KPI 달성도에 따라 <strong>인센티브</strong>가 지급됩니다. 
        미달성 시에는 <strong>패널티</strong>가 적용되어 
        고객사의 리스크를 최소화합니다.
      </p>

      <h2>기대 효과</h2>
      <ul>
        <li><strong>원가 구조 개선</strong>: 인건비 최적화 및 관리 비용 절감</li>
        <li><strong>투명한 성과 관리</strong>: KPI 기반의 객관적 평가 체계</li>
        <li><strong>리스크 분산</strong>: 인력 관리 및 운영 리스크 외부 이전</li>
        <li><strong>품질 안정화</strong>: 전문 조직의 표준화된 운영</li>
        <li><strong>핵심 업무 집중</strong>: 비핵심 업무 외주화로 경쟁력 강화</li>
      </ul>

      <div className="not-prose mt-8 rounded-2xl border bg-blue-50 p-6">
        <h3 className="text-lg font-semibold mb-2">도급/업무위탁 상담</h3>
        <p className="text-sm text-gray-700 mb-4">
          업무 범위와 성과 기준을 상세히 논의하여 최적의 운영 방안을 제시해드립니다.
        </p>
        <div className="flex gap-3">
          <a href="tel:15447494" className="inline-block rounded-lg bg-blue-600 px-5 py-2 text-white">1544-7494</a>
          <a href="/inquiry/board" className="inline-block rounded-lg border border-blue-600 px-5 py-2 text-blue-600">온라인 문의</a>
        </div>
      </div>
    </article>
  );
}
