'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface InquiryFormProps {
  type: 'corporate' | 'jobseeker' | 'employee';
}

export default function InquiryForm({ type }: InquiryFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    type,
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    title: '',
    message: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: getTypeLabel(),
          title: formData.title,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          content: formData.message,
        }),
      });

      const json = await response.json();
      
      if (json?.ok) {
        alert(`접수되었습니다.${json.emailSent ? '' : '\n(알림: 메일 발송만 실패)'}`);
        router.push('/inquiry/board');
      } else {
        alert('문의 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('문의 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'corporate': return '기업 문의';
      case 'jobseeker': return '구직자 문의';
      case 'employee': return '재직자 문의';
      default: return '문의';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 히어로 섹션 */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 mb-8 shadow-xl">
            <div className="text-6xl mb-4">
              {type === 'corporate' ? '🏢' : type === 'jobseeker' ? '👤' : '💼'}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{getTypeLabel()}</h1>
            <p className="text-xl text-blue-100">
              {type === 'corporate' 
                ? '전문적인 인력 솔루션으로 비즈니스 성장을 지원합니다'
                : type === 'jobseeker'
                ? '나에게 맞는 최적의 기회를 찾아보세요'
                : '안정적인 근무 환경에서 전문성을 발휘하세요'
              }
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">문의하기</h2>
            <p className="text-gray-600">궁금한 점이 있으시면 언제든 문의해주세요</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                  이름 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="이름을 입력해주세요"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                  이메일 *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="이메일을 입력해주세요"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3">
                  전화번호 *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="010-1234-5678"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                  비밀번호 (4-6자리) *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={4}
                  maxLength={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="비밀번호를 입력해주세요"
                />
              </div>

              {type === 'corporate' && (
                <>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-3">
                      회사명
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="회사명을 입력해주세요"
                    />
                  </div>

                  <div>
                    <label htmlFor="position" className="block text-sm font-semibold text-gray-700 mb-3">
                      직책
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="직책을 입력해주세요"
                    />
                  </div>
                </>
              )}
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3">
                제목 *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="문의 제목을 입력해주세요"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3">
                문의 내용 *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                placeholder="문의하실 내용을 자세히 작성해주세요."
              />
            </div>

            <div className="flex justify-center space-x-6 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                {isSubmitting ? '등록 중...' : '문의 등록'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}