'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Section from '@/components/Section';

interface Inquiry {
  id: number;
  type: string;
  name: string;
  email?: string;
  phone: string;
  title: string;
  message: string;
  password?: string;
  status: string;
  createdAt: string;
  replies: Reply[];
}

interface Reply {
  id: number;
  inquiryId: number;
  content: string;
  author: string;
  createdAt: string;
}

export default function AdminInquiryDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newReply, setNewReply] = useState('');

  useEffect(() => {
    fetchInquiry();
  }, [resolvedParams.id]);

  const fetchInquiry = async () => {
    try {
      console.log('Fetching inquiry with ID:', resolvedParams.id); // 디버깅 로그
      const res = await fetch(`/api/inquiry/${resolvedParams.id}`, { 
        cache: 'no-store' 
      });
      console.log('API Response status:', res.status); // 디버깅 로그
      
      if (res.ok) {
        const inquiryData = await res.json();
        console.log('Inquiry data:', inquiryData); // 디버깅 로그
        setInquiry(inquiryData);
      } else {
        const errorData = await res.json();
        console.error('API Error:', errorData); // 디버깅 로그
      }
    } catch (error) {
      console.error('Error fetching inquiry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    try {
      const res = await fetch(`/api/inquiry/${resolvedParams.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newReply,
          author: '관리자'
        }),
      });

      if (res.ok) {
        setNewReply('');
        fetchInquiry(); // 답변 목록 새로고침
        alert('답변이 작성되었습니다.');
      } else {
        alert('답변 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error creating reply:', error);
      alert('답변 작성 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteReply = async (replyId: number) => {
    if (!confirm('이 답변을 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/inquiry/${resolvedParams.id}/reply`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ replyId }),
      });

      if (res.ok) {
        fetchInquiry(); // 답변 목록 새로고침
        alert('답변이 삭제되었습니다.');
      } else {
        alert('답변 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting reply:', error);
      alert('답변 삭제 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">로딩 중...</p>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">문의를 찾을 수 없습니다</h1>
        <p className="text-gray-600 mb-6">요청하신 문의가 존재하지 않거나 삭제되었습니다.</p>
        <Link href="/admin/dashboard" className="btn-primary">
          관리자 대시보드로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">관리자 문의 관리</h1>
            <p className="text-xl text-blue-100">
              문의 내용을 확인하고 답변을 작성하세요
            </p>
          </div>
        </Section>
      </section>

      {/* 문의 상세 내용 */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* 문의 헤더 */}
            <div className="bg-gray-50 px-8 py-6 border-b">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{inquiry.title}</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {inquiry.type || '일반'}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>작성자: {inquiry.name}</span>
                <span>작성일: {new Date(inquiry.createdAt).toLocaleDateString()}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  inquiry.replies && inquiry.replies.length > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {inquiry.replies && inquiry.replies.length > 0 ? '답변완료' : '답변대기'}
                </span>
              </div>
            </div>

            {/* 문의 내용 */}
            <div className="px-8 py-8">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">문의 내용</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {inquiry.message}
                  </p>
                </div>
              </div>
            </div>

            {/* 작성자 정보 */}
            <div className="bg-gray-50 px-8 py-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">작성자 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inquiry.email && (
                  <div>
                    <span className="text-sm text-gray-600">이메일:</span>
                    <p className="font-medium">{inquiry.email}</p>
                  </div>
                )}
                <div>
                  <span className="text-sm text-gray-600">연락처:</span>
                  <p className="font-medium">{inquiry.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 답변 섹션 */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">답변 관리</h3>
            
            {/* 답변 목록 */}
            <div className="space-y-4 mb-8">
              {inquiry.replies && inquiry.replies.length > 0 ? (
                inquiry.replies.map((reply) => (
                  <div key={reply.id} className="p-4 rounded-lg bg-blue-50 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <h4 className="font-semibold text-gray-900">{reply.author}</h4>
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          관리자
                        </span>
                        <span className="ml-4 text-sm text-gray-500">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteReply(reply.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        삭제
                      </button>
                    </div>
                    <p className="text-gray-700">{reply.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">아직 답변이 없습니다.</p>
                </div>
              )}
            </div>

            {/* 답변 작성 폼 */}
            <form onSubmit={handleReplySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  답변 작성
                </label>
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="답변을 입력해주세요..."
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  답변 작성
                </button>
              </div>
            </form>
          </div>

          {/* 액션 버튼 */}
          <div className="mt-8 flex justify-between">
            <Link 
              href="/admin/dashboard" 
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              대시보드로
            </Link>
            <div className="space-x-4">
              <Link 
                href={`/inquiry/${resolvedParams.id}`} 
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                사용자 화면 보기
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
