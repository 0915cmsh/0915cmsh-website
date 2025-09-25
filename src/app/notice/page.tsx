export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Section from '@/components/Section';
import { getBaseUrl } from '@/lib/base-url';

async function getNotices() {
  try {
    // 프로덕션에서는 절대 URL 사용, 개발에서는 상대 URL 사용
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://www.urbane-cmsh.com' 
      : 'http://localhost:3000';
    
    console.log('🔍 API 호출 URL:', `${baseUrl}/api/notice`);
    
    const res = await fetch(`${baseUrl}/api/notice`, { cache: 'no-store' });
    
    console.log('📡 API 응답 상태:', res.status);
    
    if (!res.ok) {
      console.error('❌ API 호출 실패:', res.status, res.statusText);
      return [];
    }
    
    const data = await res.json();
    console.log('📊 API 응답 데이터:', { 
      itemsCount: data.items?.length || 0, 
      total: data.total || 0,
      note: data.note || 'none'
    });
    
    return Array.isArray(data) ? data : (data.items ?? []);
  } catch (error) {
    console.error('❌ getNotices 오류:', error);
    return [];
  }
}

export default async function NoticePage() {
  const items = await getNotices();

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

      {/* 공지사항 목록 */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          {!items.length ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">등록된 공지사항이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((n: any) => (
                <div key={n.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-600">
                  <Link href={`/notice/${n.id}`} className="block">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        {n.title}
                      </h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        공지
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{n.content}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{new Date(n.createdAt).toLocaleDateString('ko-KR')}</span>
                      <span>작성자: 관리자</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* 자주묻는질문 섹션 */}
      <Section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">자주묻는질문</h2>
            <p className="text-lg text-gray-600">
              고객님들이 자주 문의하시는 질문과 답변을 정리했습니다
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                id: 1,
                question: '파견 서비스는 어떤 업무에 활용할 수 있나요?',
                answer: '제조업, 서비스업, IT업 등 다양한 분야에서 활용 가능합니다. 생산라인 운영, 고객상담, IT 개발 등 전문 인력이 필요한 모든 업무에 파견 서비스를 제공합니다.'
              },
              {
                id: 2,
                question: '파견 근로자의 4대보험은 어떻게 처리되나요?',
                answer: 'CMSH에서 파견 근로자의 4대보험(국민연금, 건강보험, 고용보험, 산재보험)을 모두 가입하여 관리합니다. 고객사는 별도의 보험 가입 없이 안전하게 서비스를 이용할 수 있습니다.'
              },
              {
                id: 3,
                question: '파견 기간은 얼마나 되나요?',
                answer: '파견 기간은 고객사의 요구사항에 따라 유연하게 조정 가능합니다. 단기 프로젝트(1-3개월)부터 장기 계약(1년 이상)까지 다양한 기간으로 서비스를 제공합니다.'
              },
              {
                id: 4,
                question: 'RPO 서비스와 일반 채용대행의 차이점은 무엇인가요?',
                answer: 'RPO는 채용 프로세스 전체를 위탁받아 관리하는 서비스로, 채용 전략 수립부터 온보딩까지 전 과정을 담당합니다. 일반 채용대행은 단순 인재 소싱에 집중하는 반면, RPO는 채용 시스템 구축과 운영까지 포함합니다.'
              },
              {
                id: 5,
                question: '아웃소싱 서비스의 비용은 어떻게 산정되나요?',
                answer: '아웃소싱 비용은 업무의 복잡도, 필요 인력 수, 계약 기간 등을 고려하여 산정됩니다. 성과 기반 계약도 가능하며, 고객사와 상담을 통해 최적의 비용 구조를 제안드립니다.'
              }
            ].map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-md">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      Q{faq.id}. {faq.question}
                    </h3>
                    <svg
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}