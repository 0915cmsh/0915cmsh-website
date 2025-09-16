// 실제 사람이 작성한 것처럼 자연스러운 문의 데이터 생성

const realisticInquiries = [
  // 기업 문의
  {
    type: '기업',
    title: '제조업 파견 인력 문의',
    name: '김영수',
    phone: '010-1234-5678',
    email: 'kim.youngsu@company.com',
    message: '안녕하세요. 저희 회사에서 생산라인 운영을 위한 파견 인력이 필요합니다. 월 20명 정도의 인력이 필요한데, 가능한지 문의드립니다.',
    status: '답변완료',
    createdAt: new Date('2025-09-10T09:15:00')
  },
  {
    type: '기업',
    title: 'IT 개발자 아웃소싱 문의',
    name: '박민정',
    phone: '010-2345-6789',
    email: 'park.minjung@techcorp.com',
    message: '웹 개발 프로젝트를 진행하려고 하는데, 프론트엔드 개발자 3명과 백엔드 개발자 2명이 필요합니다. 기간은 6개월 정도 예상됩니다.',
    status: '대기',
    createdAt: new Date('2025-09-10T10:30:00')
  },
  {
    type: '기업',
    title: 'RPO 서비스 상담 요청',
    name: '이성호',
    phone: '010-3456-7890',
    email: 'lee.sungho@hrcompany.com',
    message: '저희 회사에서 채용 프로세스를 아웃소싱하고 싶습니다. RPO 서비스에 대해 자세히 상담받고 싶습니다.',
    status: '답변완료',
    createdAt: new Date('2025-09-10T11:45:00')
  },
  {
    type: '기업',
    title: '고객상담센터 파견 인력',
    name: '최수진',
    phone: '010-4567-8901',
    email: 'choi.sujin@service.com',
    message: '고객상담센터 운영을 위해 상담원 15명 정도가 필요합니다. 경험 있는 분들로 구성해주시면 감사하겠습니다.',
    status: '대기',
    createdAt: new Date('2025-09-10T14:20:00')
  },
  {
    type: '기업',
    title: '물류센터 운영 인력 문의',
    name: '정태현',
    phone: '010-5678-9012',
    email: 'jung.taehyun@logistics.com',
    message: '물류센터에서 상품 포장 및 배송 업무를 담당할 인력이 필요합니다. 야간 근무 가능한 분들로 부탁드립니다.',
    status: '답변완료',
    createdAt: new Date('2025-09-10T15:30:00')
  },
  // 구직자 문의
  {
    type: '구직자',
    title: 'IT 개발자 채용 기회 문의',
    name: '홍길동',
    phone: '010-6789-0123',
    email: 'hong.gildong@gmail.com',
    message: '안녕하세요. 3년 경력의 프론트엔드 개발자입니다. React, Vue.js 경험이 있고, 새로운 기회를 찾고 있습니다.',
    status: '대기',
    createdAt: new Date('2025-09-10T16:15:00')
  },
  {
    type: '구직자',
    title: '마케팅 전문가 채용 문의',
    name: '김미영',
    phone: '010-7890-1234',
    email: 'kim.miyoung@naver.com',
    message: '디지털 마케팅 5년 경력자입니다. 구글 애즈, 페이스북 광고 운영 경험이 풍부합니다. 좋은 기회가 있으면 연락 부탁드립니다.',
    status: '답변완료',
    createdAt: new Date('2025-09-10T17:00:00')
  },
  {
    type: '구직자',
    title: '영업직 채용 기회',
    name: '박준호',
    phone: '010-8901-2345',
    email: 'park.junho@daum.net',
    message: 'B2B 영업 7년 경력자입니다. 제조업, IT 분야 영업 경험이 있습니다. 새로운 도전을 찾고 있습니다.',
    status: '대기',
    createdAt: new Date('2025-09-10T18:30:00')
  },
  {
    type: '구직자',
    title: '디자이너 채용 문의',
    name: '이지은',
    phone: '010-9012-3456',
    email: 'lee.jieun@yahoo.com',
    message: 'UI/UX 디자이너로 4년 경력이 있습니다. Figma, Sketch, Adobe XD 사용 가능합니다. 포트폴리오도 보내드릴 수 있습니다.',
    status: '답변완료',
    createdAt: new Date('2025-09-10T19:15:00')
  },
  {
    type: '구직자',
    title: '회계사 채용 기회',
    name: '최민수',
    phone: '010-0123-4567',
    email: 'choi.minsu@outlook.com',
    message: '공인회계사 자격증을 보유하고 있으며, 대형 회계법인에서 3년 경력이 있습니다. 기업 내부 회계 업무를 찾고 있습니다.',
    status: '대기',
    createdAt: new Date('2025-09-10T20:00:00')
  },
  // 재직자 문의
  {
    type: '재직자',
    title: '파견 근무지 변경 요청',
    name: '김철수',
    phone: '010-1234-5678',
    email: 'kim.chulsoo@email.com',
    message: '현재 파견 근무 중인데, 거리가 너무 멀어서 교통비 부담이 큽니다. 가까운 곳으로 변경 가능한지 문의드립니다.',
    status: '답변완료',
    createdAt: new Date('2025-09-10T21:00:00')
  },
  {
    type: '재직자',
    title: '급여 관련 문의',
    name: '박영희',
    phone: '010-2345-6789',
    email: 'park.younghee@email.com',
    message: '이번 달 급여에서 야간수당이 빠진 것 같습니다. 확인 부탁드립니다.',
    status: '대기',
    createdAt: new Date('2025-09-10T22:15:00')
  },
  {
    type: '재직자',
    title: '휴가 신청 관련',
    name: '이민호',
    phone: '010-3456-7890',
    email: 'lee.minho@email.com',
    message: '다음 주에 가족 행사로 휴가가 필요합니다. 승인 가능한지 확인 부탁드립니다.',
    status: '답변완료',
    createdAt: new Date('2025-09-10T23:30:00')
  },
  {
    type: '재직자',
    title: '4대보험 가입 확인',
    name: '정수진',
    phone: '010-4567-8901',
    email: 'jung.sujin@email.com',
    message: '4대보험 가입이 제대로 되어 있는지 확인하고 싶습니다. 증명서 발급도 가능한지 문의드립니다.',
    status: '대기',
    createdAt: new Date('2025-09-11T09:00:00')
  },
  {
    type: '재직자',
    title: '근무 환경 개선 요청',
    name: '최동현',
    phone: '010-5678-9012',
    email: 'choi.donghyun@email.com',
    message: '현재 근무지의 작업 환경이 열악합니다. 안전장비나 작업복 지원이 가능한지 문의드립니다.',
    status: '답변완료',
    createdAt: new Date('2025-09-11T10:15:00')
  },
  // 추가 기업 문의
  {
    type: '기업',
    title: '건설현장 안전관리 인력',
    name: '강민수',
    phone: '010-6789-0123',
    email: 'kang.minsu@construction.com',
    message: '건설현장에서 안전관리 업무를 담당할 인력이 필요합니다. 안전관리자 자격증 보유자 우대합니다.',
    status: '대기',
    createdAt: new Date('2025-09-11T11:30:00')
  },
  {
    type: '기업',
    title: '음식점 서비스 인력',
    name: '윤서연',
    phone: '010-7890-1234',
    email: 'yoon.seoyeon@restaurant.com',
    message: '프랜차이즈 음식점에서 서비스 인력이 필요합니다. 주말 근무 가능한 분들로 부탁드립니다.',
    status: '답변완료',
    createdAt: new Date('2025-09-11T12:45:00')
  },
  {
    type: '기업',
    title: '병원 행정직 채용',
    name: '임태영',
    phone: '010-8901-2345',
    email: 'lim.taeyoung@hospital.com',
    message: '종합병원에서 행정 업무를 담당할 직원이 필요합니다. 의료진 경험이 있으신 분 우대합니다.',
    status: '대기',
    createdAt: new Date('2025-09-11T14:00:00')
  },
  {
    type: '기업',
    title: '금융권 영업직 채용',
    name: '한지훈',
    phone: '010-9012-3456',
    email: 'han.jihun@finance.com',
    message: '은행에서 개인고객 영업을 담당할 직원을 찾습니다. 금융권 경험자 우대합니다.',
    status: '답변완료',
    createdAt: new Date('2025-09-11T15:15:00')
  },
  {
    type: '기업',
    title: '교육기관 강사 채용',
    name: '송미라',
    phone: '010-0123-4567',
    email: 'song.mira@education.com',
    message: '학원에서 영어 강사를 찾습니다. 토익, 토플 강의 경험이 있으신 분 우대합니다.',
    status: '대기',
    createdAt: new Date('2025-09-11T16:30:00')
  },
  // 추가 구직자 문의
  {
    type: '구직자',
    title: '간호사 채용 기회',
    name: '오수정',
    phone: '010-1234-5678',
    email: 'oh.sujung@email.com',
    message: '간호사 자격증을 보유하고 있으며, 병원에서 2년 경력이 있습니다. 새로운 병원에서 근무하고 싶습니다.',
    status: '답변완료',
    createdAt: new Date('2025-09-11T17:45:00')
  },
  {
    type: '구직자',
    title: '요리사 채용 문의',
    name: '배준영',
    phone: '010-2345-6789',
    email: 'bae.junyoung@email.com',
    message: '한식 요리사로 5년 경력이 있습니다. 새로운 레스토랑에서 근무하고 싶습니다.',
    status: '대기',
    createdAt: new Date('2025-09-11T18:00:00')
  },
  {
    type: '구직자',
    title: '운전기사 채용 기회',
    name: '신동호',
    phone: '010-3456-7890',
    email: 'shin.dongho@email.com',
    message: '화물차 운전기사 자격증을 보유하고 있습니다. 장거리 운송 업무 가능합니다.',
    status: '답변완료',
    createdAt: new Date('2025-09-11T19:15:00')
  },
  {
    type: '구직자',
    title: '보안요원 채용 문의',
    name: '조성민',
    phone: '010-4567-8901',
    email: 'cho.sungmin@email.com',
    message: '경비업체에서 3년 경력이 있습니다. 건물 보안 업무 경험이 풍부합니다.',
    status: '대기',
    createdAt: new Date('2025-09-11T20:30:00')
  },
  {
    type: '구직자',
    title: '청소업무 채용 기회',
    name: '허영숙',
    phone: '010-5678-9012',
    email: 'heo.youngsook@email.com',
    message: '오피스 청소 업무 경험이 있습니다. 성실하고 책임감 있게 일하겠습니다.',
    status: '답변완료',
    createdAt: new Date('2025-09-11T21:45:00')
  },
  // 추가 재직자 문의
  {
    type: '재직자',
    title: '교대근무 관련 문의',
    name: '노영수',
    phone: '010-6789-0123',
    email: 'no.youngsu@email.com',
    message: '현재 야간 교대근무를 하고 있는데, 주간 근무로 변경 가능한지 문의드립니다.',
    status: '대기',
    createdAt: new Date('2025-09-12T09:00:00')
  },
  {
    type: '재직자',
    title: '교육비 지원 문의',
    name: '문지현',
    phone: '010-7890-1234',
    email: 'moon.jihyun@email.com',
    message: '자격증 취득을 위한 교육비 지원이 가능한지 문의드립니다.',
    status: '답변완료',
    createdAt: new Date('2025-09-12T10:15:00')
  },
  {
    type: '재직자',
    title: '상여금 지급 문의',
    name: '양준호',
    phone: '010-8901-2345',
    email: 'yang.junho@email.com',
    message: '올해 상여금 지급 일정을 확인하고 싶습니다.',
    status: '대기',
    createdAt: new Date('2025-09-12T11:30:00')
  },
  {
    type: '재직자',
    title: '건강검진 관련',
    name: '백미영',
    phone: '010-9012-3456',
    email: 'baek.miyoung@email.com',
    message: '건강검진 일정과 비용 지원에 대해 문의드립니다.',
    status: '답변완료',
    createdAt: new Date('2025-09-12T12:45:00')
  },
  {
    type: '재직자',
    title: '퇴직금 관련 문의',
    name: '서동현',
    phone: '010-0123-4567',
    email: 'seo.donghyun@email.com',
    message: '퇴직금 계산 방법과 지급 일정에 대해 문의드립니다.',
    status: '대기',
    createdAt: new Date('2025-09-12T14:00:00')
  }
];

// 더 많은 데이터를 생성하기 위한 함수
export function generateMoreInquiries(count: number = 255) {
  const types = ['기업', '구직자', '재직자'];
  const statuses = ['대기', '답변완료'];
  
  const names = [
    '김영수', '박민정', '이성호', '최수진', '정태현', '홍길동', '김미영', '박준호', '이지은', '최민수',
    '김철수', '박영희', '이민호', '정수진', '최동현', '강민수', '윤서연', '임태영', '한지훈', '송미라',
    '오수정', '배준영', '신동호', '조성민', '허영숙', '노영수', '문지현', '양준호', '백미영', '서동현',
    '김현수', '박지영', '이준호', '최수미', '정민호', '강지영', '윤동수', '임수진', '한민수', '송지영',
    '오동현', '배수진', '신민호', '조지영', '허동수', '노수진', '문민호', '양지영', '백동수', '서수진'
  ];

  const corporateTitles = [
    '제조업 파견 인력 문의', 'IT 개발자 아웃소싱 문의', 'RPO 서비스 상담 요청', '고객상담센터 파견 인력',
    '물류센터 운영 인력 문의', '건설현장 안전관리 인력', '음식점 서비스 인력', '병원 행정직 채용',
    '금융권 영업직 채용', '교육기관 강사 채용', '유통업체 물류 인력', '제조업 품질관리 인력',
    'IT 인프라 운영 인력', '마케팅 전문가 채용', '회계 담당자 채용', '인사 담당자 채용',
    '영업 관리자 채용', '고객 서비스 인력', '생산 관리 인력', '물류 관리 인력'
  ];

  const jobseekerTitles = [
    'IT 개발자 채용 기회 문의', '마케팅 전문가 채용 문의', '영업직 채용 기회', '디자이너 채용 문의',
    '회계사 채용 기회', '간호사 채용 기회', '요리사 채용 문의', '운전기사 채용 기회',
    '보안요원 채용 문의', '청소업무 채용 기회', '사무직 채용 기회', '영업 관리자 채용 기회',
    '마케팅 매니저 채용 기회', '인사 담당자 채용 기회', '회계 담당자 채용 기회', '고객 서비스 채용 기회',
    '생산 관리자 채용 기회', '물류 관리자 채용 기회', 'IT 인프라 엔지니어 채용 기회', '디지털 마케팅 전문가 채용 기회'
  ];

  const employeeTitles = [
    '파견 근무지 변경 요청', '급여 관련 문의', '휴가 신청 관련', '4대보험 가입 확인',
    '근무 환경 개선 요청', '교대근무 관련 문의', '교육비 지원 문의', '상여금 지급 문의',
    '건강검진 관련', '퇴직금 관련 문의', '야간수당 관련 문의', '휴가 사용 관련 문의',
    '근무 시간 조정 요청', '안전장비 지급 문의', '작업복 지급 문의', '교통비 지원 문의',
    '식비 지원 문의', '자격증 취득 지원 문의', '근무지 변경 요청', '급여 조정 문의'
  ];

  const corporateMessages = [
    '안녕하세요. 저희 회사에서 생산라인 운영을 위한 파견 인력이 필요합니다. 월 20명 정도의 인력이 필요한데, 가능한지 문의드립니다.',
    '웹 개발 프로젝트를 진행하려고 하는데, 프론트엔드 개발자 3명과 백엔드 개발자 2명이 필요합니다. 기간은 6개월 정도 예상됩니다.',
    '저희 회사에서 채용 프로세스를 아웃소싱하고 싶습니다. RPO 서비스에 대해 자세히 상담받고 싶습니다.',
    '고객상담센터 운영을 위해 상담원 15명 정도가 필요합니다. 경험 있는 분들로 구성해주시면 감사하겠습니다.',
    '물류센터에서 상품 포장 및 배송 업무를 담당할 인력이 필요합니다. 야간 근무 가능한 분들로 부탁드립니다.'
  ];

  const jobseekerMessages = [
    '안녕하세요. 3년 경력의 프론트엔드 개발자입니다. React, Vue.js 경험이 있고, 새로운 기회를 찾고 있습니다.',
    '디지털 마케팅 5년 경력자입니다. 구글 애즈, 페이스북 광고 운영 경험이 풍부합니다. 좋은 기회가 있으면 연락 부탁드립니다.',
    'B2B 영업 7년 경력자입니다. 제조업, IT 분야 영업 경험이 있습니다. 새로운 도전을 찾고 있습니다.',
    'UI/UX 디자이너로 4년 경력이 있습니다. Figma, Sketch, Adobe XD 사용 가능합니다. 포트폴리오도 보내드릴 수 있습니다.',
    '공인회계사 자격증을 보유하고 있으며, 대형 회계법인에서 3년 경력이 있습니다. 기업 내부 회계 업무를 찾고 있습니다.'
  ];

  const employeeMessages = [
    '현재 파견 근무 중인데, 거리가 너무 멀어서 교통비 부담이 큽니다. 가까운 곳으로 변경 가능한지 문의드립니다.',
    '이번 달 급여에서 야간수당이 빠진 것 같습니다. 확인 부탁드립니다.',
    '다음 주에 가족 행사로 휴가가 필요합니다. 승인 가능한지 확인 부탁드립니다.',
    '4대보험 가입이 제대로 되어 있는지 확인하고 싶습니다. 증명서 발급도 가능한지 문의드립니다.',
    '현재 근무지의 작업 환경이 열악합니다. 안전장비나 작업복 지원이 가능한지 문의드립니다.'
  ];

  const inquiries = [...realisticInquiries];

  for (let i = realisticInquiries.length; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const name = names[Math.floor(Math.random() * names.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    let title, message;
    if (type === '기업') {
      title = corporateTitles[Math.floor(Math.random() * corporateTitles.length)];
      message = corporateMessages[Math.floor(Math.random() * corporateMessages.length)];
    } else if (type === '구직자') {
      title = jobseekerTitles[Math.floor(Math.random() * jobseekerTitles.length)];
      message = jobseekerMessages[Math.floor(Math.random() * jobseekerMessages.length)];
    } else {
      title = employeeTitles[Math.floor(Math.random() * employeeTitles.length)];
      message = employeeMessages[Math.floor(Math.random() * employeeMessages.length)];
    }

    // 날짜를 다양하게 생성 (최근 3개월)
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 90);
    const createdAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

    inquiries.push({
      type,
      title,
      name,
      phone: `010-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      email: `${name.toLowerCase().replace(/\s/g, '')}@email.com`,
      message,
      status,
      createdAt
    });
  }

  return inquiries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export { realisticInquiries };
