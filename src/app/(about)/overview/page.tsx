import { COMPANY } from '@/lib/company';

export default function OverviewPage() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* 약식 표 */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">회사개요</h2>
        <dl className="mt-6 divide-y rounded-2xl border" style={{borderColor:'var(--border)'}}>
          {[
            ['회사명', `${COMPANY.name} (${COMPANY.legalName})`],
            ['주소', COMPANY.address],
            ['대표전화', COMPANY.tel],
            ['대표핸드폰', COMPANY.mobile],
            ['이메일', COMPANY.email],
            ['사업영역', '인재파견 · 도급/업무위탁 · 헤드헌팅 · RPO'],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-3 gap-4 p-4">
              <dt className="col-span-1 text-sm font-medium opacity-70">{k}</dt>
              <dd className="col-span-2 text-sm">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* 핵심 역량 */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold">핵심 역량</h3>
        <ul className="mt-4 list-disc pl-5 space-y-2">
          <li>산업별 표준 운영 매뉴얼(SOP) 기반의 안정적 현장 운영</li>
          <li>법규 준수(파견법·근기법·산안법·개인정보) 및 리스크 사전 예방</li>
          <li>KPI(출결·생산성·품질) 대시보드로 데이터 기반 운영</li>
          <li>전국 채용 네트워크와 캠페인형 대량 충원 역량</li>
        </ul>
      </div>
    </div>
  );
}
