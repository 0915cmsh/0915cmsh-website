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

export default function InquiryDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    message: '',
    name: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    fetchInquiry();
  }, [resolvedParams.id]);

  const fetchInquiry = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5203';
      const res = await fetch(`${baseUrl}/api/inquiry`);
      if (res.ok) {
        const data = await res.json();
        // API 응답이 { items: [], total: number } 형태이므로 items를 사용
        const inquiries = data.items || [];
        const foundInquiry = inquiries.find((i: Inquiry) => i.id === parseInt(resolvedParams.id));
        setInquiry(foundInquiry || null);
      }
    } catch (error) {
      console.error('Error fetching inquiry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiry && password === inquiry.password) {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleEdit = () => {
    if (inquiry) {
      setEditData({
        title: inquiry.title,
        message: inquiry.message,
        name: inquiry.name,
        phone: inquiry.phone,
        email: inquiry.email || ''
      });
      setIsEditing(true);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5203';
      const res = await fetch(`${baseUrl}/api/inquiry/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (res.ok) {
        setIsEditing(false);
        fetchInquiry(); // 문의 내용 새로고침
        alert('문의가 수정되었습니다.');
      } else {
        alert('문의 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error updating inquiry:', error);
      alert('문의 수정 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말로 이 문의를 삭제하시겠습니까?')) return;

    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5203';
      const res = await fetch(`${baseUrl}/api/inquiry/${resolvedParams.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('문의가 삭제되었습니다.');
        window.location.href = '/inquiry/board';
      } else {
        alert('문의 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      alert('문의 삭제 중 오류가 발생했습니다.');
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
        <Link href="/inquiry/board" className="btn-primary">
          문의 게시판으로 돌아가기
        </Link>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div>
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <Section>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">문의 확인</h1>
              <p className="text-xl text-blue-100">
                문의를 확인하려면 비밀번호를 입력해주세요
              </p>
            </div>
          </Section>
        </section>

        {/* 비밀번호 입력 폼 */}
        <Section className="py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">비밀번호 입력</h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="4-6자리 비밀번호를 입력하세요"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  확인
                </button>
              </form>
              <div className="mt-6 text-center">
                <Link href="/inquiry/board" className="text-blue-600 hover:underline">
                  문의 게시판으로 돌아가기
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </div>
    );
  }


  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">문의 상세</h1>
            <p className="text-xl text-blue-100">
              문의 내용을 확인하고 답변을 받아보세요
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
              </div>
            </div>

            {/* 문의 내용 */}
            <div className="px-8 py-8">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">문의 내용</h3>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData({...editData, title: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                      <textarea
                        value={editData.message}
                        onChange={(e) => setEditData({...editData, message: e.target.value})}
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={handleEditSubmit}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        수정 완료
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {inquiry.message}
                    </p>
                  </div>
                )}
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">답변</h3>
            
            {/* 답변 목록 */}
            <div className="space-y-4 mb-8">
              {inquiry.replies && inquiry.replies.length > 0 ? (
                inquiry.replies.map((reply) => (
                  <div key={reply.id} className="p-4 rounded-lg bg-blue-50 border-l-4 border-blue-500">
                    <div className="flex items-center mb-2">
                      <h4 className="font-semibold text-gray-900">{reply.author}</h4>
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        관리자
                      </span>
                      <span className="ml-auto text-sm text-gray-500">
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{reply.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">아직 답변이 없습니다.</p>
                  <p className="text-sm text-gray-400">관리자가 답변을 작성하면 여기에 표시됩니다.</p>
                </div>
              )}
            </div>

            {/* 관리자 전용 답변 작성 안내 */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-gray-500 mb-2">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="font-medium text-gray-700">답변 작성은 관리자 전용입니다</p>
                <p className="text-sm text-gray-500 mt-1">
                  답변이 필요하시면 관리자에게 직접 연락해주세요
                </p>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="mt-8 flex justify-between">
            <Link 
              href="/inquiry/board" 
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              목록으로
            </Link>
            <div className="space-x-4">
              <button
                onClick={handleEdit}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                수정하기
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                삭제하기
              </button>
              <Link 
                href={`/inquiry/new`} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                새 문의 작성
              </Link>
            </div>
          </div>

          {/* 연락처 정보 */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">추가 문의</h3>
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