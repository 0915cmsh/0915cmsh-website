'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Section from '@/components/Section';

export default function AdminNewNotice() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('Creating notice with data:', formData); // 디버깅 로그
      const res = await fetch('/api/notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      console.log('Create response status:', res.status); // 디버깅 로그
      
      if (res.ok) {
        const data = await res.json();
        console.log('Created notice:', data); // 디버깅 로그
        alert('공지사항이 작성되었습니다.');
        router.push('/admin/dashboard');
      } else {
        const errorData = await res.json();
        console.error('Create error:', errorData); // 디버깅 로그
        alert('공지사항 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error creating notice:', error);
      alert('공지사항 작성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">새 공지사항 작성</h1>
            <p className="text-xl text-purple-100">
              새로운 공지사항을 작성합니다
            </p>
          </div>
        </Section>
      </section>

      {/* Notice Form */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">공지사항 작성</h2>
              <p className="text-gray-600">공지사항 내용을 작성해주세요. 모든 항목을 정확히 입력해주시면 사용자들에게 정확한 정보를 전달할 수 있습니다.</p>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <form onSubmit={onSubmit} className="space-y-6">
                {/* 제목 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">제목 *</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="공지사항 제목을 입력해주세요"
                    required
                    className="input-field"
                  />
                </div>

                {/* 내용 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">내용 *</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="공지사항 내용을 자세히 입력해주세요"
                    rows={12}
                    required
                    className="input-field"
                  />
                </div>

                {/* 공개 설정 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      name="published"
                      type="checkbox"
                      checked={formData.published}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">즉시 공개 게시</span>
                      <p className="text-gray-600 mt-1">
                        체크하면 사용자들이 바로 볼 수 있습니다. 체크 해제하면 비공개 상태로 저장됩니다.
                      </p>
                    </div>
                  </label>
                </div>

                {/* 제출 버튼 */}
                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-12 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-xl hover:from-purple-700 hover:to-purple-800 disabled:opacity-60 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>작성 중...</span>
                      </div>
                    ) : (
                      '공지사항 작성하기'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 안내 정보 */}
          <div className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">공지사항 작성 안내</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">📝</div>
                <h4 className="font-semibold text-gray-900 mb-2">명확한 제목</h4>
                <p className="text-sm text-gray-600">사용자가 쉽게 이해할 수 있는 간결하고 명확한 제목을 작성해주세요.</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📋</div>
                <h4 className="font-semibold text-gray-900 mb-2">상세한 내용</h4>
                <p className="text-sm text-gray-600">필요한 모든 정보를 포함하여 사용자가 이해하기 쉽게 작성해주세요.</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">👁️</div>
                <h4 className="font-semibold text-gray-900 mb-2">공개 설정</h4>
                <p className="text-sm text-gray-600">즉시 공개할지 비공개로 저장할지 선택할 수 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
