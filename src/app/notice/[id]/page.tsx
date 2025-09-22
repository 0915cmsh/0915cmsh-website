export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Section from '@/components/Section';
import { getBaseUrl } from '@/lib/base-url';

async function getItem(id: string) {
  const res = await fetch(`${getBaseUrl()}/api/notice`, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = await res.json();
  const items = Array.isArray(data) ? data : (data.items ?? []);
  return items.find((x: any) => String(x.id) === id) ?? null;
}

export default async function NoticeDetail({ params }: { params: { id: string } }) {
  const item = await getItem(params.id);
  
  if (!item) {
    return (
      <div>
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <Section>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">공지사항</h1>
            </div>
          </Section>
        </section>
        <Section className="py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 공지입니다</h2>
            <p className="text-gray-600 mb-6">요청하신 공지사항을 찾을 수 없습니다.</p>
            <Link 
              href="/notice" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              공지사항 목록으로 돌아가기
            </Link>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">공지사항</h1>
            <p className="text-xl text-blue-100">
              CMSH의 최신 소식과 공지사항을 확인해보세요
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
                <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  게시됨
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-4">작성자: 관리자</span>
                <span className="mr-4">작성일: {new Date(item.createdAt).toLocaleDateString('ko-KR')}</span>
                <span>수정일: {new Date(item.createdAt).toLocaleDateString('ko-KR')}</span>
              </div>
            </div>

            {/* 공지사항 내용 */}
            <div className="px-8 py-8">
              <div className="prose max-w-none">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {item.body}
                  </div>
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
                  className="px-6 py-3 bg-blue-600 !text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                    className="inline-flex items-center px-4 py-2 bg-blue-600 !text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
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