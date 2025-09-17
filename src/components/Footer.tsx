import Link from 'next/link';
import { COMPANY } from '@/lib/company';

export default function Footer(){
  return (
    <footer className="footer border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">{COMPANY.name}</h3>
            <p className="opacity-85 mb-4">{COMPANY.tagline}</p>
            <div className="text-sm opacity-85 space-y-1">
              <p>주소: {COMPANY.address}</p>
              <p>전화: {COMPANY.tel} / {COMPANY.mobile}</p>
              <p>이메일: {COMPANY.email}</p>
            </div>
          </div>
          <div>
            <h4 className="cap-pp mb-3">빠른 링크</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about/greeting">회사소개</Link></li>
              <li><Link href="/business">사업소개</Link></li>
              <li><Link href="/notice">공지사항</Link></li>
              <li><Link href="/49">문의하기</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="cap-pp mb-3">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/business/dispatch">인재파견</Link></li>
              <li><Link href="/business/outsourcing">도급/업무위탁</Link></li>
              <li><Link href="/business/headhunting">헤드헌팅/채용대행</Link></li>
              <li><Link href="/business/rpo">RPO</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t" style={{borderColor:'var(--border)'}}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm opacity-85">
            <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/policy/privacy">개인정보처리방침</Link>
              <Link href="/basic">이용약관</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
