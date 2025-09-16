export default function OrgPage() {
  const teams = [
    { name: '경영지원본부', duties: ['재무/회계', 'HR/총무', '법무/컴플라이언스'] },
    { name: '영업본부', duties: ['신규 영업', '솔루션 제안', '계약/정산'] },
    { name: '운영본부', duties: ['현장 배치', '교육/안전', '성과관리(KPI)'] },
    { name: '채용본부', duties: ['소싱/면접', '대량 채용 캠페인', '브랜딩'] },
    { name: '품질/리스크관리', duties: ['표준 매뉴얼', '감사/점검', '이슈 대응'] },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-6">조직도</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((t) => (
          <div key={t.name} className="card p-6 hover:shadow-sm">
            <h3 className="font-semibold">{t.name}</h3>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              {t.duties.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
