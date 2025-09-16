import { COMPANY } from '@/lib/company';

export default function GreetingPage() {
  return (
    <article className="prose max-w-none prose-h1:text-3xl prose-p:leading-8">
      <h1 className="!mb-8 text-center">인사말</h1>
      <p className="text-center text-lg font-semibold" style={{color:'var(--primary)'}}>
        우리는 대한민국 <strong>취업률과 기업 고용률을 높이는 일</strong>을 합니다.
      </p>
      <p>
        {COMPANY.name}는 인력 아웃소싱 분야의 전문성과 현장 실행력을 기반으로, 고객사가 핵심 업무에 집중할 수 있도록
        검증된 인재를 적시에 연결합니다. 단순 매칭을 넘어 <strong>채용–배치–운영–평가</strong> 전 과정을 표준화(SOP)하고,
        KPI(출결·생산성·품질) 중심의 데이터 운영으로 비용 효율과 성과를 동시에 달성합니다.
      </p>
      <p>
        우리는 <strong>윤리·준법·안전</strong>을 최우선 가치로 삼습니다. 근로계약·4대보험·산재·개인정보·파견법 등
        법규 준수 체계를 엄격히 운영하며, 산업별 특성에 맞춘 맞춤형 운영모델로 현장의 리스크를 선제적으로 관리합니다.
      </p>
      <p>
        {COMPANY.name} 임직원 모두는 고객의 현장을 우리의 현장으로 여기며, <strong>정직과 품질</strong>로 신뢰를 쌓겠습니다.
        귀사의 든든한 아웃소싱 파트너가 되겠습니다.
      </p>
      <div className="mt-12 border-t pt-8" style={{borderColor:'var(--border)'}}>
        <p className="text-right">{COMPANY.name} 대표 <strong>배 경 호</strong></p>
      </div>
    </article>
  );
}
