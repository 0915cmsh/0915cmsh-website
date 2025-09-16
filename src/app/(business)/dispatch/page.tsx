export default function DispatchPage() {
  return (
    <article className="prose max-w-none prose-zinc">
      <h1>인재파견 서비스</h1>
      
      <h2>서비스 개요</h2>
      <p>
        인재파견은 <strong>파견법 제2조</strong>에 근거하여 파견업체가 근로자를 고용한 후, 
        사용기업의 지휘·명령 하에 업무를 수행하도록 파견하는 <strong>법정 서비스</strong>입니다. 
        당사는 파견업 등록업체로서 <strong>근로기준법, 산업안전보건법, 개인정보보호법</strong> 등 
        관련 법규를 완전 준수하며 운영합니다.
      </p>

      <h2>핵심 가치 제안</h2>
      <ul>
        <li><strong>법적 안전성</strong>: 파견법 완전 준수, 4대보험 가입, 산재보험 적용</li>
        <li><strong>운영 효율성</strong>: HR/노무 관리 부담 제거, 인건비 최적화</li>
        <li><strong>유연성</strong>: 계절성·프로젝트성 수요 대응, 신속한 인력 조정</li>
        <li><strong>품질 보장</strong>: 사전 검증된 인재, 지속적 성과 관리</li>
      </ul>

      <h2>적용 분야 및 사례</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3>제조업</h3>
          <ul>
            <li>생산라인 운영 및 품질관리</li>
            <li>물류창고 운영 및 재고관리</li>
            <li>설비점검 및 유지보수</li>
          </ul>
        </div>
        <div>
          <h3>서비스업</h3>
          <ul>
            <li>고객상담 및 CS 업무</li>
            <li>영업지원 및 마케팅</li>
            <li>IT 개발 및 운영업무</li>
          </ul>
        </div>
      </div>

      <h2>운영 프로세스 (6단계)</h2>
      <ol>
        <li><strong>요구사항 분석</strong>: 업무범위, 필요인원, 근무조건, 성과기준 정의</li>
        <li><strong>인재 소싱 및 선발</strong>: 다중채널 모집, 구조화 면접, 적성검사 실시</li>
        <li><strong>계약 체결 및 배치</strong>: 근로계약, 4대보험 가입, 안전교육 후 현장 투입</li>
        <li><strong>온보딩 및 교육</strong>: 역할교육, OJT, 멘토링을 통한 현장 적응 지원</li>
        <li><strong>운영 및 성과관리</strong>: 출결·생산성·품질 KPI 주간/월간 모니터링</li>
        <li><strong>정산 및 리포팅</strong>: 월 정산, 성과 리포트, 개선안 제시</li>
      </ol>

      <h2>차별화 요소</h2>
      <ul>
        <li><strong>신속한 충원</strong>: 48-72시간 내 인력 배치 가능한 전국 네트워크</li>
        <li><strong>법규 준수</strong>: 파견법, 근기법, 산안법 완전 준수 체계</li>
        <li><strong>데이터 기반 관리</strong>: KPI 대시보드를 통한 실시간 성과 모니터링</li>
        <li><strong>리스크 관리</strong>: 표준 서류, 감사 체크리스트, 보험 가입</li>
      </ul>

      <h2>성과 지표 (KPI)</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4>출결 안정성</h4>
          <p className="text-sm">결근률 &lt; 3%, 지각률 &lt; 5%</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4>생산성</h4>
          <p className="text-sm">단위시간 처리량 기준 달성률 95%+</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4>품질</h4>
          <p className="text-sm">불량률 &lt; 1%, CS 만족도 4.5/5.0</p>
        </div>
      </div>

      <h2>비용 구조</h2>
      <p>
        파견비용은 <strong>기본급 + 제수당 + 4대보험료 + 관리비</strong>로 구성되며, 
        고객사는 인건비와 노무관리 비용을 절감할 수 있습니다. 
        계약 기간과 인원에 따라 <strong>할인율</strong>이 적용됩니다.
      </p>

      <div className="not-prose mt-8 rounded-2xl border bg-blue-50 p-6">
        <h3 className="text-lg font-semibold mb-2">상담 및 견적 문의</h3>
        <p className="text-sm text-gray-700 mb-4">
          요구사항을 상세히 알려주시면 24시간 내 맞춤형 충원 계획과 견적을 제공해드립니다.
        </p>
        <div className="flex gap-3">
          <a href="tel:15447494" className="inline-block rounded-lg bg-blue-600 px-5 py-2 text-white">1544-7494</a>
          <a href="/inquiry/board" className="inline-block rounded-lg border border-blue-600 px-5 py-2 text-blue-600">온라인 문의</a>
        </div>
      </div>
    </article>
  );
}
