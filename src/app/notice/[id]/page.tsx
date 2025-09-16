'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Section from '@/components/Section';
import { formatKoreanDate } from '@/lib/utils';

interface Notice {
  id: number;
  title: string;
  content: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotice();
  }, [resolvedParams.id]);

  const fetchNotice = async () => {
    try {
      const res = await fetch(`/api/notice/${resolvedParams.id}`, { 
        cache: 'no-store' 
      });
      if (res.ok) {
        const data = await res.json();
        setNotice(data.item || null);
      }
    } catch (error) {
      console.error('Error fetching notice:', error);
    } finally {
      setLoading(false);
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

  if (!notice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">공지사항을 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-6">요청하신 공지사항이 존재하지 않거나 삭제되었습니다.</p>
          <Link href="/notice" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            공지사항 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">공지사항</h1>
            <p className="text-xl text-blue-100">
              CMSH의 최신 소식과 중요한 안내사항을 확인하세요
            </p>
          </div>
        </Section>
      </section>

      {/* 공지사항 상세 내용 */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* 공지사항 헤더 */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{notice.title}</h2>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  notice.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {notice.published ? '게시됨' : '비공개'}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>작성자: {notice.author}</span>
                <span>작성일: {formatKoreanDate(notice.createdAt)}</span>
                <span>수정일: {formatKoreanDate(notice.updatedAt)}</span>
              </div>
            </div>

            {/* 공지사항 내용 */}
            <div className="px-8 py-8">
              <div className="prose max-w-none">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div dangerouslySetInnerHTML={{ __html: notice.content.replace(/\n/g, '<br>') }} />
                </div>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="px-8 py-6 bg-gray-50 border-t">
              <div className="flex justify-between items-center">
                <Link 
                  href="/notice" 
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  목록으로
                </Link>
                <Link 
                  href="/inquiry/new" 
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  문의하기
                </Link>
              </div>
            </div>
          </div>

          {/* 관련 공지사항 */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">관련 안내</h3>
            </div>
            
            <div className="p-8">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">문의하기</h4>
                  <p className="text-gray-600 mb-4">궁금한 점이 있으시면 언제든지 문의해주세요. 전문 상담사가 신속하게 답변드립니다.</p>
                  <Link
                    href="/inquiry/new"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    문의하기
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                
                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">고객센터</h4>
                  <p className="text-gray-600 mb-2">전화: 1544-7494</p>
                  <p className="text-gray-600 mb-2">이메일: hj.kim@urbane-gp.com</p>
                  <p className="text-gray-600">운영시간: 평일 09:00-18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}