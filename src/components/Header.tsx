'use client';
import Link from 'next/link';
import { COMPANY } from '@/lib/company';

export default function Header(){
  return (
    <header className="header border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">{COMPANY.name}</Link>
        <nav className="hidden md:flex items-center gap-6 text-lg">
          <Link href="/" className="group px-3 py-2 !text-black transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:font-bold">
            홈
          </Link>
          <Link href="/about/greeting" className="group px-3 py-2 !text-black transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:font-bold">
            회사소개
          </Link>
          <Link href="/business" className="group px-3 py-2 !text-black transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:font-bold">
            사업소개
          </Link>
          <Link href="/notice" className="group px-3 py-2 !text-black transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:font-bold">
            공지사항
          </Link>
          <Link href="/faq" className="group px-3 py-2 !text-black transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:font-bold">
            자주묻는질문
          </Link>
          <Link href="/inquiry/board" className="group px-3 py-2 !text-black transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:font-bold">
            문의하기
          </Link>
          <a
            href="https://open.kakao.com/o/sqRWR9Qh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 transform shadow-md"
          >
            <span className="text-lg">💬</span>
            <span>카카오톡 상담</span>
          </a>
        </nav>
      </div>
      {/* 모바일 가로 스크롤 메뉴 */}
      <div className="md:hidden border-t bg-white" style={{borderColor:'var(--border)'}}>
        <div className="px-4 py-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 min-w-max">
            <Link href="/" className="group px-4 py-2 text-black text-base font-medium transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 hover:font-bold rounded-lg whitespace-nowrap flex-shrink-0">
              홈
            </Link>
            <Link href="/about/greeting" className="group px-4 py-2 text-black text-base font-medium transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 hover:font-bold rounded-lg whitespace-nowrap flex-shrink-0">
              회사소개
            </Link>
            <Link href="/business" className="group px-4 py-2 text-black text-base font-medium transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 hover:font-bold rounded-lg whitespace-nowrap flex-shrink-0">
              사업소개
            </Link>
            <Link href="/notice" className="group px-4 py-2 text-black text-base font-medium transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 hover:font-bold rounded-lg whitespace-nowrap flex-shrink-0">
              공지사항
            </Link>
            <Link href="/faq" className="group px-4 py-2 text-black text-base font-medium transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 hover:font-bold rounded-lg whitespace-nowrap flex-shrink-0">
              자주묻는질문
            </Link>
            <Link href="/inquiry/board" className="group px-4 py-2 text-black text-base font-medium transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 hover:font-bold rounded-lg whitespace-nowrap flex-shrink-0">
              문의하기
            </Link>
            <a
              href="https://open.kakao.com/o/sqRWR9Qh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 transform shadow-md whitespace-nowrap flex-shrink-0"
            >
              <span className="text-base">💬</span>
              <span>카카오톡 상담</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
