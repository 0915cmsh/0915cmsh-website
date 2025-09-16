'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatKoreanDate, calculateDisplayNumber } from '@/lib/utils';

interface Inquiry {
  id: number;
  type: string;
  name: string;
  title: string;
  createdAt: string;
  replies: any[];
}

interface Notice {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'notices'>('inquiries');
  
  // 페이지네이션 상태
  const [inquiryPage, setInquiryPage] = useState(1);
  const [noticePage, setNoticePage] = useState(1);
  const [inquiryTotal, setInquiryTotal] = useState(0);
  const [noticeTotal, setNoticeTotal] = useState(0);
  const pageSize = 20; // 한 페이지당 20개씩 표시
  
  // 요약 카드용 전체 통계
  const [allInquiries, setAllInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  // 페이지 변경 시 데이터 다시 로드
  useEffect(() => {
    if (activeTab === 'inquiries') {
      fetchInquiries();
    } else {
      fetchNotices();
    }
  }, [inquiryPage, noticePage, activeTab]);

  const fetchData = async () => {
    try {
      await Promise.all([fetchInquiries(), fetchNotices(), fetchAllInquiries()]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllInquiries = async () => {
    try {
      const inquiryRes = await fetch('/api/inquiry?pageSize=1000', { cache: 'no-store' });
      if (inquiryRes.ok) {
        const inquiryData = await inquiryRes.json();
        setAllInquiries(inquiryData.items || []);
      }
    } catch (error) {
      console.error('Error fetching all inquiries:', error);
    }
  };

  const fetchInquiries = async () => {
    try {
      const inquiryRes = await fetch(`/api/inquiry?page=${inquiryPage}&pageSize=${pageSize}`, { cache: 'no-store' });
      if (inquiryRes.ok) {
        const inquiryData = await inquiryRes.json();
        setInquiries(inquiryData.items || []);
        setInquiryTotal(inquiryData.total || 0);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const fetchNotices = async () => {
    try {
      const noticeRes = await fetch(`/api/notice?page=${noticePage}&pageSize=${pageSize}`, { cache: 'no-store' });
      if (noticeRes.ok) {
        const noticeData = await noticeRes.json();
        setNotices(noticeData.items || []);
        setNoticeTotal(noticeData.total || 0);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const getTypeLabel = (type: string) => {
    const typeMapping: { [key: string]: string } = {
      'employee': '직원 문의',
      'corporate': '기업 문의',
      'jobseeker': '구직자 문의',
      'dispatch': '파견 문의',
      'outsourcing': '아웃소싱 문의',
      'headhunting': '헤드헌팅 문의',
      'rpo': 'RPO 문의'
    };
    return typeMapping[type] || type || '일반';
  };

  const getStatusLabel = (inquiry: Inquiry) => {
    return inquiry.replies && inquiry.replies.length > 0 ? '답변완료' : '답변대기';
  };

  // 페이지네이션 계산
  const getTotalPages = (total: number) => Math.ceil(total / pageSize);
  
  // Admin용 순번 계산 함수 (문의게시판과 다름)
  const calculateAdminNumber = (totalCount: number, currentPage: number, rowIndex: number) => {
    return totalCount - ((currentPage - 1) * pageSize + rowIndex);
  };
  
  const getPageNumbers = (currentPage: number, totalPages: number) => {
    const pages = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handleDeleteInquiry = async (inquiryId: number) => {
    if (!confirm('정말로 이 문의를 삭제하시겠습니까?')) return;

    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5203';
      const res = await fetch(`${baseUrl}/api/inquiry/${inquiryId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('문의가 삭제되었습니다.');
        // 데이터 새로고침
        await Promise.all([fetchInquiries(), fetchNotices(), fetchAllInquiries()]);
      } else {
        alert('문의 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      alert('문의 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteNotice = async (noticeId: number) => {
    if (!confirm('정말로 이 공지사항을 삭제하시겠습니까?')) return;

    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5203';
      const res = await fetch(`${baseUrl}/api/notice/${noticeId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('공지사항이 삭제되었습니다.');
        // 데이터 새로고침
        await fetchNotices();
      } else {
        alert('공지사항 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
      alert('공지사항 삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CMSH 관리자 대시보드</h1>
              <p className="text-gray-600 mt-2">문의사항과 공지사항을 관리할 수 있습니다.</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                홈으로
              </Link>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                로그아웃
              </button>
            </div>
          </div>
        </div>

        {/* 요약 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">전체 문의</p>
                <p className="text-2xl font-bold text-blue-600">{inquiryTotal}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">답변 완료</p>
                <p className="text-2xl font-bold text-green-600">
                  {allInquiries.filter(inquiry => inquiry.replies && inquiry.replies.length > 0).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">대기 중</p>
                <p className="text-2xl font-bold text-orange-600">
                  {allInquiries.filter(inquiry => !inquiry.replies || inquiry.replies.length === 0).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">공지사항</p>
                <p className="text-2xl font-bold text-purple-600">{noticeTotal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button 
                onClick={() => setActiveTab('inquiries')}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'inquiries' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                문의 관리
              </button>
              <button 
                onClick={() => setActiveTab('notices')}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'notices' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                공지사항 관리
              </button>
            </nav>
          </div>
        </div>

        {/* 문의 관리 탭 */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">문의 목록</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      번호
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      유형
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      제목
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작성자
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작성일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        등록된 문의가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    inquiries.map((inquiry, index) => (
                      <tr key={inquiry.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {calculateAdminNumber(inquiryTotal, inquiryPage, index)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getTypeLabel(inquiry.type)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {inquiry.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {inquiry.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatKoreanDate(inquiry.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                            getStatusLabel(inquiry) === '답변완료' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {getStatusLabel(inquiry)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                                        <Link
                                          href={`/admin/inquiry/${inquiry.id}`}
                                          className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded text-xs"
                                        >
                                          답변하기
                                        </Link>
                            <button 
                              onClick={() => handleDeleteInquiry(inquiry.id)}
                              className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-xs"
                            >
                              삭제
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* 문의 페이지네이션 */}
            {getTotalPages(inquiryTotal) > 1 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="text-center text-sm text-gray-700 mb-3">
                  총 {inquiryTotal}개의 문의 중 {((inquiryPage - 1) * pageSize) + 1}-{Math.min(inquiryPage * pageSize, inquiryTotal)}개 표시
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setInquiryPage(Math.max(1, inquiryPage - 1))}
                      disabled={inquiryPage === 1}
                      className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      이전
                    </button>
                    
                    {getPageNumbers(inquiryPage, getTotalPages(inquiryTotal)).map((pageNum, index) => (
                      pageNum === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2 py-1 text-sm text-gray-500">...</span>
                      ) : (
                        <button
                          key={pageNum}
                          onClick={() => setInquiryPage(pageNum as number)}
                          className={`px-2 py-1 text-sm border rounded min-w-[28px] h-7 flex items-center justify-center ${
                            inquiryPage === pageNum ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    ))}
                    
                    <button
                      onClick={() => setInquiryPage(Math.min(getTotalPages(inquiryTotal), inquiryPage + 1))}
                      disabled={inquiryPage === getTotalPages(inquiryTotal)}
                      className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      다음
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="px-6 py-4 border-t border-gray-200">
              <Link
                href="/inquiry/board"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                전체 문의 보기 →
              </Link>
            </div>
          </div>
        )}

        {/* 공지사항 관리 탭 */}
        {activeTab === 'notices' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">공지사항 목록</h2>
                <Link
                  href="/admin/notice/new"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  style={{ color: 'white' }}
                >
                  새 공지사항 작성
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      번호
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      제목
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작성자
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작성일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notices.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        등록된 공지사항이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    notices.map((notice, index) => (
                      <tr key={notice.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {calculateAdminNumber(noticeTotal, noticePage, index)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {notice.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {notice.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatKoreanDate(notice.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link
                              href={`/notice/${notice.id}`}
                              className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded text-xs"
                            >
                              보기
                            </Link>
                            <Link
                              href={`/admin/notice/${notice.id}`}
                              className="text-green-600 hover:text-green-900 bg-green-100 hover:bg-green-200 px-3 py-1 rounded text-xs"
                            >
                              수정
                            </Link>
                            <button 
                              onClick={() => handleDeleteNotice(notice.id)}
                              className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-xs"
                            >
                              삭제
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* 공지사항 페이지네이션 */}
            {getTotalPages(noticeTotal) > 1 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="text-center text-sm text-gray-700 mb-3">
                  총 {noticeTotal}개의 공지사항 중 {((noticePage - 1) * pageSize) + 1}-{Math.min(noticePage * pageSize, noticeTotal)}개 표시
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setNoticePage(Math.max(1, noticePage - 1))}
                      disabled={noticePage === 1}
                      className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      이전
                    </button>
                    
                    {getPageNumbers(noticePage, getTotalPages(noticeTotal)).map((pageNum, index) => (
                      pageNum === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2 py-1 text-sm text-gray-500">...</span>
                      ) : (
                        <button
                          key={pageNum}
                          onClick={() => setNoticePage(pageNum as number)}
                          className={`px-2 py-1 text-sm border rounded min-w-[28px] h-7 flex items-center justify-center ${
                            noticePage === pageNum ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    ))}
                    
                    <button
                      onClick={() => setNoticePage(Math.min(getTotalPages(noticeTotal), noticePage + 1))}
                      disabled={noticePage === getTotalPages(noticeTotal)}
                      className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      다음
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="px-6 py-4 border-t border-gray-200">
              <Link
                href="/notice"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                전체 공지사항 보기 →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}