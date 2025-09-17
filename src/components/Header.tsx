'use client';
import Link from 'next/link';
import { useState } from 'react';
import { COMPANY } from '@/lib/company';

export default function Header(){
  const [open,setOpen]=useState(false);
  return (
    <header className="header border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">{COMPANY.name}</Link>
        <nav className="flex items-center gap-6 text-xl">
          <Link href="/" className="group px-3 py-2 text-black transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:font-bold">
            홈
          </Link>
          <Link href="/about/greeting" className="group px-3 py-2 text-black transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:font-bold">
            회사소개
          </Link>
          <Link href="/business" className="group px-3 py-2 text-black transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:font-bold">
            사업소개
          </Link>
          <Link href="/notice" className="group px-3 py-2 text-black transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:font-bold">
            공지사항
          </Link>
          <Link href="/faq" className="group px-3 py-2 text-black transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:font-bold">
            자주묻는질문
          </Link>
          <Link href="/inquiry/board" className="group px-3 py-2 text-black transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:font-bold">
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
        <button className="hidden" onClick={()=>setOpen(v=>!v)} aria-label="메뉴">≡</button>
      </div>
      {open && (
        <div className="hidden border-t" style={{borderColor:'var(--border)'}}>
          <div className="px-4 py-3 flex flex-col gap-2">
            <Link href="/" onClick={()=>setOpen(false)} className="group px-3 py-2 text-black text-xl transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 hover:font-bold rounded-lg">
              홈
            </Link>
            <Link href="/about/greeting" onClick={()=>setOpen(false)} className="group px-3 py-2 text-black text-xl transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 hover:font-bold rounded-lg">
              회사소개
            </Link>
            <Link href="/business" onClick={()=>setOpen(false)} className="group px-3 py-2 text-black text-xl transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 hover:font-bold rounded-lg">
              사업소개
            </Link>
            <Link href="/notice" onClick={()=>setOpen(false)} className="group px-3 py-2 text-black text-xl transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 hover:font-bold rounded-lg">
              공지사항
            </Link>
            <Link href="/faq" onClick={()=>setOpen(false)} className="group px-3 py-2 text-black text-xl transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 hover:font-bold rounded-lg">
              자주묻는질문
            </Link>
            <Link href="/inquiry/board" onClick={()=>setOpen(false)} className="group px-3 py-2 text-black text-xl transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 hover:font-bold rounded-lg">
              문의하기
            </Link>
            <a
              href="https://open.kakao.com/o/sqRWR9Qh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 transform shadow-md mt-2"
              onClick={()=>setOpen(false)}
            >
              <span className="text-lg">💬</span>
              <span>카카오톡 상담</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
