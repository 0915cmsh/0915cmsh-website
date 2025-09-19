'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Section from '@/components/Section';

function InquiryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') || 'corporate';
  
  const typeMapping = {
    'corporate': '기업',
    'employee': '재직자',
    'jobseeker': '구직자'
  };
  
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [selectedType, setSelectedType] = useState(typeMapping[typeParam as keyof typeof typeMapping] || '기업');
  
  // 각 문의 유형별 폼 데이터
  const [corporateData, setCorporateData] = useState({
    companyName: '',
    contactName: '',
    position: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
    password: ''
  });

  const [jobseekerData, setJobseekerData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    interestArea: '',
    message: '',
    password: ''
  });

  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
    password: ''
  });

  const typeDescriptions = {
    '기업': '아웃소싱/파견/도급/RPO/헤드헌팅 등 기업용 인력 솔루션을 안내드립니다.',
    '재직자': '근무·배치·계약 관련 문의를 남겨주세요.',
    '구직자': '지원·서류·면접·배치 관련 문의를 남겨주세요.'
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const handleCorporateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCorporateData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleJobseekerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJobseekerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployeeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (selectedType === '기업') {
      return corporateData.companyName && corporateData.contactName && corporateData.email && corporateData.phone && corporateData.message;
    } else if (selectedType === '구직자') {
      return jobseekerData.name && jobseekerData.email && jobseekerData.phone && jobseekerData.message;
    } else if (selectedType === '재직자') {
      return employeeData.name && employeeData.email && employeeData.phone && employeeData.message;
    }
    return false;
  };

  const getFormData = () => {
    if (selectedType === '기업') {
      return {
        type: '기업',
        title: `[기업문의] ${corporateData.companyName} - ${corporateData.serviceType || '일반 문의'}`,
        name: corporateData.contactName,
        phone: corporateData.phone,
        email: corporateData.email,
        content: `회사명: ${corporateData.companyName}
담당자: ${corporateData.contactName}
직책: ${corporateData.position}
관심 서비스: ${corporateData.serviceType}
문의 내용: ${corporateData.message}`,
        password: corporateData.password || '1234'
      };
    } else if (selectedType === '구직자') {
      return {
        type: '구직자',
        title: `[구직자문의] ${jobseekerData.name} - ${jobseekerData.interestArea || '일반 문의'}`,
        name: jobseekerData.name,
        phone: jobseekerData.phone,
        email: jobseekerData.email,
        content: `이름: ${jobseekerData.name}
경력: ${jobseekerData.experience}
관심 분야: ${jobseekerData.interestArea}
문의 내용: ${jobseekerData.message}`,
        password: jobseekerData.password || '1234'
      };
    } else if (selectedType === '재직자') {
      return {
        type: '재직자',
        title: `[재직자문의] ${employeeData.name} - ${employeeData.inquiryType || '일반 문의'}`,
        name: employeeData.name,
        phone: employeeData.phone,
        email: employeeData.email,
        content: `이름: ${employeeData.name}
문의 유형: ${employeeData.inquiryType}
문의 내용: ${employeeData.message}`,
        password: employeeData.password || '1234'
      };
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }
    
    setLoading(true);
    
    try {
      const formData = getFormData();
      if (!formData) {
        alert('문의 유형을 선택해주세요.');
        return;
      }

      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.urbane-cmsh.com';
      const res = await fetch(`${baseUrl}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setOk(true);
        setTimeout(() => {
          router.push('/inquiry/board');
        }, 2000);
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

  if (ok) {
    return (
      <div>
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
          <Section>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">문의 접수 완료</h1>
              <p className="text-xl text-green-100">
                문의가 성공적으로 접수되었습니다
              </p>
            </div>
          </Section>
        </section>

        {/* 성공 메시지 */}
        <Section className="py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">접수되었습니다</h2>
              <p className="text-gray-600 mb-4">문의게시판에 등록되었고, 담당자 메일로도 전송되었습니다.</p>
              <p className="text-sm text-gray-500 mb-6">잠시 후 문의게시판으로 이동합니다...</p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">새 문의 작성</h1>
            <p className="text-xl text-blue-100">
              문의 유형을 선택하고 내용을 작성해주세요
            </p>
          </div>
        </Section>
      </section>

      {/* 문의 폼 */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* 폼 헤더 */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">문의 작성</h2>
              <p className="text-gray-600">문의 유형을 선택하고 내용을 작성해주세요. 모든 항목을 정확히 입력해주시면 빠른 답변을 받으실 수 있습니다.</p>
            </div>

            {/* 폼 내용 */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 문의 유형 선택 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">문의 유형 *</label>
                  <select
                    value={selectedType}
                    onChange={handleTypeChange}
                    className="input-field"
                    required
                  >
                    <option value="기업">기업 문의</option>
                    <option value="재직자">재직자 문의</option>
                    <option value="구직자">구직자 문의</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-2">
                    {typeDescriptions[selectedType as keyof typeof typeDescriptions]}
                  </p>
                </div>

                {/* 기업 문의 폼 */}
                {selectedType === '기업' && (
                  <div className="space-y-6 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900">기업 정보</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">회사명 *</label>
                        <input
                          name="companyName"
                          value={corporateData.companyName}
                          onChange={handleCorporateChange}
                          placeholder="회사명을 입력해주세요"
                          required
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">담당자명 *</label>
                        <input
                          name="contactName"
                          value={corporateData.contactName}
                          onChange={handleCorporateChange}
                          placeholder="담당자명을 입력해주세요"
                          required
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">직책</label>
                        <input
                          name="position"
                          value={corporateData.position}
                          onChange={handleCorporateChange}
                          placeholder="직책을 입력해주세요"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">관심 서비스</label>
                        <select
                          name="serviceType"
                          value={corporateData.serviceType}
                          onChange={handleCorporateChange}
                          className="input-field"
                        >
                          <option value="">서비스 유형을 선택하세요</option>
                          <option value="아웃소싱">아웃소싱</option>
                          <option value="헤드헌팅">헤드헌팅</option>
                          <option value="RPO (채용 대행)">RPO (채용 대행)</option>
                          <option value="파견 서비스">파견 서비스</option>
                          <option value="기타">기타</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">이메일 *</label>
                        <input
                          name="email"
                          type="email"
                          value={corporateData.email}
                          onChange={handleCorporateChange}
                          placeholder="이메일 주소를 입력해주세요"
                          required
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">연락처 *</label>
                        <input
                          name="phone"
                          value={corporateData.phone}
                          onChange={handleCorporateChange}
                          placeholder="010-0000-0000"
                          required
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">문의 내용 *</label>
                      <textarea
                        name="message"
                        value={corporateData.message}
                        onChange={handleCorporateChange}
                        placeholder="문의하실 내용을 자세히 입력해주세요"
                        rows={6}
                        required
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">비밀번호 (문의 확인용)</label>
                      <input
                        name="password"
                        type="password"
                        value={corporateData.password}
                        onChange={handleCorporateChange}
                        placeholder="4-6자리 비밀번호를 입력해주세요"
                        className="input-field"
                      />
                      <p className="text-sm text-gray-500 mt-1">문의 확인 및 수정/삭제 시 사용됩니다.</p>
                    </div>
                  </div>
                )}

                {/* 구직자 문의 폼 */}
                {selectedType === '구직자' && (
                  <div className="space-y-6 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900">구직자 정보</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">이름 *</label>
                        <input
                          name="name"
                          value={jobseekerData.name}
                          onChange={handleJobseekerChange}
                          placeholder="이름을 입력해주세요"
                          required
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">연락처 *</label>
                        <input
                          name="phone"
                          value={jobseekerData.phone}
                          onChange={handleJobseekerChange}
                          placeholder="010-0000-0000"
                          required
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">이메일 *</label>
                      <input
                        name="email"
                        type="email"
                        value={jobseekerData.email}
                        onChange={handleJobseekerChange}
                        placeholder="이메일 주소를 입력해주세요"
                        required
                        className="input-field"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">경력</label>
                        <select
                          name="experience"
                          value={jobseekerData.experience}
                          onChange={handleJobseekerChange}
                          className="input-field"
                        >
                          <option value="">경력을 선택하세요</option>
                          <option value="신입 (0-1년)">신입 (0-1년)</option>
                          <option value="주니어 (1-3년)">주니어 (1-3년)</option>
                          <option value="미들 (3-7년)">미들 (3-7년)</option>
                          <option value="시니어 (7년 이상)">시니어 (7년 이상)</option>
                          <option value="기타">기타</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">관심 분야</label>
                        <select
                          name="interestArea"
                          value={jobseekerData.interestArea}
                          onChange={handleJobseekerChange}
                          className="input-field"
                        >
                          <option value="">관심 분야를 선택하세요</option>
                          <option value="IT/개발">IT/개발</option>
                          <option value="마케팅">마케팅</option>
                          <option value="영업">영업</option>
                          <option value="인사/총무">인사/총무</option>
                          <option value="재무/회계">재무/회계</option>
                          <option value="기타">기타</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">문의 내용 *</label>
                      <textarea
                        name="message"
                        value={jobseekerData.message}
                        onChange={handleJobseekerChange}
                        placeholder="간단한 자기소개나 궁금한 점을 작성해주세요"
                        rows={6}
                        required
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">비밀번호 (문의 확인용)</label>
                      <input
                        name="password"
                        type="password"
                        value={jobseekerData.password}
                        onChange={handleJobseekerChange}
                        placeholder="4-6자리 비밀번호를 입력해주세요"
                        className="input-field"
                      />
                      <p className="text-sm text-gray-500 mt-1">문의 확인 및 수정/삭제 시 사용됩니다.</p>
                    </div>
                  </div>
                )}

                {/* 재직자 문의 폼 */}
                {selectedType === '재직자' && (
                  <div className="space-y-6 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900">재직자 정보</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">이름 *</label>
                        <input
                          name="name"
                          value={employeeData.name}
                          onChange={handleEmployeeChange}
                          placeholder="이름을 입력해주세요"
                          required
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">연락처 *</label>
                        <input
                          name="phone"
                          value={employeeData.phone}
                          onChange={handleEmployeeChange}
                          placeholder="010-0000-0000"
                          required
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">이메일 *</label>
                      <input
                        name="email"
                        type="email"
                        value={employeeData.email}
                        onChange={handleEmployeeChange}
                        placeholder="이메일 주소를 입력해주세요"
                        required
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">문의 유형</label>
                      <select
                        name="inquiryType"
                        value={employeeData.inquiryType}
                        onChange={handleEmployeeChange}
                        className="input-field"
                      >
                        <option value="">문의 유형을 선택하세요</option>
                        <option value="급여/정산">급여/정산</option>
                        <option value="휴가/근태">휴가/근태</option>
                        <option value="증명서 발급">증명서 발급</option>
                        <option value="인사/평가">인사/평가</option>
                        <option value="기타">기타</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">문의 내용 *</label>
                      <textarea
                        name="message"
                        value={employeeData.message}
                        onChange={handleEmployeeChange}
                        placeholder="육하원칙에 따라 구체적으로 작성해주시면 더 빠른 처리가 가능합니다"
                        rows={6}
                        required
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">비밀번호 (문의 확인용)</label>
                      <input
                        name="password"
                        type="password"
                        value={employeeData.password}
                        onChange={handleEmployeeChange}
                        placeholder="4-6자리 비밀번호를 입력해주세요"
                        className="input-field"
                      />
                      <p className="text-sm text-gray-500 mt-1">문의 확인 및 수정/삭제 시 사용됩니다.</p>
                    </div>
                  </div>
                )}

                {/* 제출 버튼 */}
                <div className="flex justify-center pt-6 border-t">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>전송 중...</span>
                      </div>
                    ) : (
                      '문의 제출하기'
                    )}
                  </button>
                </div>
              </form>
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

export default function NewInquiryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InquiryForm />
    </Suspense>
  );
}