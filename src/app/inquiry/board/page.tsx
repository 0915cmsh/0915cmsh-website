'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Section from '@/components/Section';
import { formatDate } from '@/lib/date';

type Inquiry = {
  id: number;
  type: string;
  title: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  status: string;
  createdAt: string;
  replies: any[];
};

export default function InquiryBoard() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetchInquiries();
  }, [page]);

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`/api/inquiry?page=${page}&pageSize=${pageSize}`, { cache: 'no-store' });
      const json = await res.json();
      setItems(json.items);
      setTotal(json.total);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">문의 게시판</h1>
            <p className="text-xl text-blue-100">
              궁금한 점이 있으시면 언제든 문의해주세요
            </p>
          </div>
        </Section>
      </section>

      {/* 문의 게시판 */}
      <Section className="py-16">
        <div className="max-w-6xl mx-auto">
          {/* 문의 유형 안내 - 강조된 섹션 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12 border border-blue-100 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">문의 유형 안내</h2>
              <p className="text-gray-600">원하시는 문의 유형을 선택해주세요</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 hover:border-blue-300 group">
                <div className="text-center">
                  <div className="text-4xl mb-4">🏢</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">기업 문의</h3>
                  <p className="text-sm text-gray-600 mb-4">파견, 아웃소싱, RPO 서비스 문의</p>
                  <Link 
                    href="/inquiry/corporate" 
                    className="inline-flex items-center px-4 py-2 bg-white text-gray-900 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors group-hover:scale-105 shadow-lg border-2 border-blue-600"
                  >
                    기업 문의하기 →
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 hover:border-blue-300 group">
                <div className="text-center">
                  <div className="text-4xl mb-4">👤</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">구직자 문의</h3>
                  <p className="text-sm text-gray-600 mb-4">헤드헌팅, 채용대행 서비스 문의</p>
                  <Link 
                    href="/inquiry/jobseeker" 
                    className="inline-flex items-center px-4 py-2 bg-white text-gray-900 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors group-hover:scale-105 shadow-lg border-2 border-blue-600"
                  >
                    구직자 문의하기 →
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 hover:border-blue-300 group">
                <div className="text-center">
                  <div className="text-4xl mb-4">💼</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">재직자 문의</h3>
                  <p className="text-sm text-gray-600 mb-4">파견 근로자 관련 문의</p>
                  <Link 
                    href="/inquiry/employee" 
                    className="inline-flex items-center px-4 py-2 bg-white text-gray-900 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors group-hover:scale-105 shadow-lg border-2 border-blue-600"
                  >
                    재직자 문의하기 →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 문의 게시판 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">문의 게시판</h2>
            <Link href="/inquiry/new" className="btn-primary">
              새 문의 작성
            </Link>
          </div>

          {/* 문의 목록 */}
          <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">아직 문의가 없습니다</h3>
                <p className="text-gray-600 mb-4">첫 번째 문의를 작성해보세요</p>
                <Link href="/inquiry/new" className="btn-primary">
                  문의 작성하기
                </Link>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="p-4 text-left w-16">번호</th>
                        <th className="p-4 text-left">제목</th>
                        <th className="p-4 text-left w-32">문의유형</th>
                        <th className="p-4 text-left w-32">작성자</th>
                        <th className="p-4 text-left w-40">작성일</th>
                        <th className="p-4 text-left w-24">상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((it, idx) => (
                        <tr key={it.id} className="border-t hover:bg-gray-50 transition-colors">
                          <td className="p-4 text-gray-500">{total - (startIndex + idx)}</td>
                          <td className="p-4">
                            <Link 
                              href={`/inquiry/${it.id}`}
                              className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                            >
                              {it.title}
                            </Link>
                            <span className="ml-2 text-xs text-gray-500">🔒</span>
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {it.type || '일반'}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600">{it.name}</td>
                          <td className="p-4 text-gray-500">
                            {formatDate(it.createdAt)}
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                              it.replies && it.replies.length > 0
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {it.replies && it.replies.length > 0 ? '답변완료' : '대기'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                  <div className="px-6 py-3 border-t bg-gray-50">
                    {/* 총 문의 수 정보를 위로 이동 */}
                    <div className="text-center text-sm text-gray-700 mb-3">
                      총 {total}개의 문의 중 {startIndex + 1}-{Math.min(startIndex + pageSize, total)}개 표시
                    </div>
                    
                    {/* 페이지네이션 컨트롤 */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="px-2 py-1 text-xs border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                          이전
                        </button>
                        
                        {/* 페이지 번호들 - 스마트 페이지네이션 */}
                        {(() => {
                          const pages = [];
                          const maxVisiblePages = 7; // 최대 7개 페이지 번호만 표시
                          
                          if (totalPages <= maxVisiblePages) {
                            // 전체 페이지가 7개 이하면 모두 표시
                            for (let i = 1; i <= totalPages; i++) {
                              pages.push(i);
                            }
                          } else {
                            // 현재 페이지 주변의 페이지들만 표시
                            let startPage = Math.max(1, page - 3);
                            let endPage = Math.min(totalPages, page + 3);
                            
                            // 시작 부분 조정
                            if (endPage - startPage < maxVisiblePages - 1) {
                              startPage = Math.max(1, endPage - maxVisiblePages + 1);
                            }
                            
                            // 첫 페이지
                            if (startPage > 1) {
                              pages.push(1);
                              if (startPage > 2) {
                                pages.push('...');
                              }
                            }
                            
                            // 중간 페이지들
                            for (let i = startPage; i <= endPage; i++) {
                              pages.push(i);
                            }
                            
                            // 마지막 페이지
                            if (endPage < totalPages) {
                              if (endPage < totalPages - 1) {
                                pages.push('...');
                              }
                              pages.push(totalPages);
                            }
                          }
                          
                          return pages.map((pageNum, index) => (
                            pageNum === '...' ? (
                              <span key={`ellipsis-${index}`} className="px-2 py-1 text-xs text-gray-500">
                                ...
                              </span>
                            ) : (
                              <button
                                key={pageNum}
                                onClick={() => setPage(pageNum as number)}
                                className={`px-2 py-1 text-xs border rounded min-w-[28px] h-7 flex items-center justify-center ${
                                  page === pageNum
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'hover:bg-gray-100'
                                }`}
                              >
                                {pageNum}
                              </button>
                            )
                          ));
                        })()}
                        
                        <button
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                          className="px-2 py-1 text-xs border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                          다음
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 연락처 정보 */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">빠른 연락처</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">📞</div>
                <h4 className="font-semibold text-gray-900 mb-2">전화 문의</h4>
                <p className="text-blue-600 font-medium">1544-7494</p>
                <p className="text-sm text-gray-600">평일 09:00-18:00</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📧</div>
                <h4 className="font-semibold text-gray-900 mb-2">이메일 문의</h4>
                <p className="text-blue-600 font-medium">hj.kim@urbane-gp.com</p>
                <p className="text-sm text-gray-600">24시간 접수</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📍</div>
                <h4 className="font-semibold text-gray-900 mb-2">방문 문의</h4>
                <p className="text-blue-600 font-medium">경기도 안산시</p>
                <p className="text-sm text-gray-600">상록구 조구나리1길 56</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}