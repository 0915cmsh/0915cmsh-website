'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 아이콘 컴포넌트 (Heroicons 추천)
const BuildingOfficeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 12h6m-6 5.25h6M5.25 3h13.5v18h-13.5V3z" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
const AtSymbolIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" /></svg>;

export default function CorporateInquiryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    position: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
    password: '',
    privacyConsent: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone || !formData.message) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }
    
    if (!formData.privacyConsent) {
      alert('개인정보 처리방침에 동의해주세요.');
      return;
    }
    
    // 문의하기 확인 메시지
    const confirmMessage = `문의를 제출하시겠습니까?\n\n제출 후에는 수정이 어려우니 내용을 다시 한번 확인해주세요.`;
    if (!confirm(confirmMessage)) {
      return;
    }
    
    setLoading(true);
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.urbane-cmsh.com';
      const res = await fetch(`${baseUrl}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: '기업',
          title: `[기업문의] ${formData.companyName} - ${formData.serviceType || '일반 문의'}`,
          name: formData.contactName,
          phone: formData.phone,
          email: formData.email,
          content: `회사명: ${formData.companyName}
담당자: ${formData.contactName}
직책: ${formData.position}
관심 서비스: ${formData.serviceType}
문의 내용: ${formData.message}`,
          password: formData.password || '1234'
        }),
      });
      
      if (res.ok) {
        alert('문의가 성공적으로 접수되었습니다. 문의게시판에서 확인하실 수 있습니다.');
        router.push('/inquiry/board');
      } else {
        alert('문의 접수에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('문의 접수 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen py-12 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-x-12">
          {/* 왼쪽 정보 섹션 */}
          <div className="p-8 lg:p-12 bg-gradient-to-br from-gray-700 to-gray-900 text-white">
            <div className="sticky top-12">
              <h2 className="text-4xl font-black leading-tight">
                최고의 비즈니스 파트너가<br />되어드리겠습니다.
              </h2>
              <p className="mt-4 text-gray-300 max-w-lg">
                아웃소싱, 헤드헌팅, RPO 등 기업에 필요한 모든 인재 솔루션을 맞춤형으로 제공합니다. 지금 바로 문의하여 비즈니스의 성공 가능성을 높여보세요.
              </p>
              
              {/* 서비스 소개 */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">주요 서비스</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">아웃소싱 서비스</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">헤드헌팅</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">RPO (채용 대행)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">파견 서비스</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">도급 서비스</span>
                  </div>
                </div>
              </div>

              {/* 성과 지표 */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">성과 지표</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">500+</div>
                    <div className="text-sm text-gray-300">협력 기업</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">10,000+</div>
                    <div className="text-sm text-gray-300">성공 배치</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">95%</div>
                    <div className="text-sm text-gray-300">고객 만족도</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">24h</div>
                    <div className="text-sm text-gray-300">응답 시간</div>
                  </div>
                </div>
              </div>

              {/* 연락처 정보 */}
              <div className="mt-8 space-y-6 border-l-2 border-blue-400 pl-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-blue-400">📞</div>
                  <div className="ml-3">
                    <dt className="font-bold">대표 문의</dt>
                    <dd className="text-gray-300">1544-7494 / 010-5617-5949</dd>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-blue-400">📧</div>
                  <div className="ml-3">
                    <dt className="font-bold">이메일 문의</dt>
                    <dd className="text-gray-300">hj.kim@urbane-gp.com</dd>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-blue-400">⏰</div>
                  <div className="ml-3">
                    <dt className="font-bold">운영 시간</dt>
                    <dd className="text-gray-300">평일 09:00 - 18:00</dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 오른쪽 폼 섹션 */}
          <div className="p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-gray-900">파트너십 문의</h3>
            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              <div className="sm:col-span-2">
                <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">회사명 *</label>
                <div className="mt-1">
                  <input 
                    type="text" 
                    id="company-name" 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="input-field" 
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">담당자명 *</label>
                <div className="mt-1">
                  <input 
                    type="text" 
                    id="contact-name" 
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className="input-field" 
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">직책</label>
                <div className="mt-1">
                  <input 
                    type="text" 
                    id="position" 
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="input-field" 
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일 *</label>
                <div className="mt-1">
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field" 
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">연락처 *</label>
                <div className="mt-1">
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="010-0000-0000" 
                    className="input-field" 
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="service-type" className="block text-sm font-medium text-gray-700">관심 서비스</label>
                <select 
                  id="service-type" 
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="input-field mt-1"
                >
                  <option value="">서비스 유형을 선택하세요</option>
                  <option value="아웃소싱">아웃소싱</option>
                  <option value="헤드헌팅">헤드헌팅</option>
                  <option value="RPO (채용 대행)">RPO (채용 대행)</option>
                  <option value="파견 서비스">파견 서비스</option>
                  <option value="도급 서비스">도급 서비스</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">문의 내용 *</label>
                <div className="mt-1">
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5} 
                    className="input-field"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호 (문의 확인용)</label>
                <div className="mt-1">
                  <input 
                    type="password" 
                    id="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="4-6자리 비밀번호"
                    className="input-field" 
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">문의 확인 및 수정/삭제 시 사용됩니다.</p>
              </div>
              <div className="sm:col-span-2">
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input 
                      name="privacyConsent" 
                      type="checkbox" 
                      checked={formData.privacyConsent} 
                      onChange={handleChange} 
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                      required 
                    />
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">개인정보 처리방침에 동의합니다 *</span>
                      <p className="text-gray-600 mt-1">수집된 개인정보는 문의 처리 및 답변을 위해서만 사용되며, 관련 법령에 따라 보관됩니다.</p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="sm:col-span-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {loading ? '문의 접수 중...' : '문의하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}