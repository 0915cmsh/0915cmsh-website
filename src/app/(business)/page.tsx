import Link from 'next/link';
import Section from '@/components/Section';

const SERVICES = [
  { key:'dispatch', name:'인재파견', desc:'필요 시점에 적합 인재를 배치', href:'/business/dispatch' },
  { key:'outsourcing', name:'도급/업무위탁', desc:'성과기반 운영과 비용 효율', href:'/business/outsourcing' },
  { key:'headhunting', name:'헤드헌팅/채용대행', desc:'핵심인재 탐색 및 선발', href:'/business/headhunting' },
  { key:'rpo', name:'RPO', desc:'채용 전 과정 위탁(설계–운영–분석)', href:'/business/rpo' },
];

export default function BusinessIndex(){
  return (
    <div>
      <div className="section-pad text-center" style={{background:'var(--surface)'}}>
        <Section>
          <h1 className="h1-pp font-bold">사업소개</h1>
          <p className="mt-2 opacity-85">우리의 모든 서비스를 한눈에 확인하세요</p>
        </Section>
      </div>
      <Section className="section-pad">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(s=>(
            <Link key={s.key} href={s.href} className="card p-6 hover:shadow">
              <h3 className="text-lg font-semibold">{s.name}</h3>
              <p className="mt-2 opacity-85">{s.desc}</p>
              <span className="mt-4 inline-block" style={{color:'var(--primary)'}}>자세히 보기 →</span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
