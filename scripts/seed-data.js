const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// 50개 공지사항 데이터 생성
const generateNotices = () => {
  const notices = [];
  
  // 2025년 9월 공지사항 (1-10)
  const notice2025Titles = [
    "2025년 4분기 아웃소싱 서비스 확대 안내",
    "신규 파견 인력 모집 공고",
    "고객 만족도 조사 결과 발표",
    "추석 연휴 고객센터 운영 안내",
    "RPO 서비스 신규 런칭",
    "기업 맞춤형 인력 솔루션 출시",
    "파견직 근로자 복리후생 개선안",
    "2025년 하반기 사업계획 발표",
    "신규 파트너사 업무협약 체결",
    "고객 상담 서비스 시간 연장 안내"
  ];
  
  const dates2025 = [
    new Date(2025, 0, 8),   // 1월 8일
    new Date(2025, 1, 14),  // 2월 14일
    new Date(2025, 2, 5),   // 3월 5일
    new Date(2025, 3, 12),  // 4월 12일
    new Date(2025, 4, 20),  // 5월 20일
    new Date(2025, 5, 3),   // 6월 3일
    new Date(2025, 6, 18),  // 7월 18일
    new Date(2025, 7, 25),  // 8월 25일
    new Date(2025, 8, 7),   // 9월 7일
    new Date(2025, 8, 15)   // 9월 15일
  ];
  
  for (let i = 0; i < 10; i++) {
    notices.push({
      title: notice2025Titles[i],
      content: `CMSH의 ${notice2025Titles[i]}에 대한 상세 내용을 안내드립니다. 자세한 사항은 고객센터(1544-7494)로 문의해주시기 바랍니다.`,
      author: "관리자",
      published: true,
      createdAt: dates2025[i],
      updatedAt: dates2025[i]
    });
  }
  
  // 2024년 공지사항 (11-30)
  const notice2024Titles = [
    "2024년 신년 인사 및 사업계획 발표",
    "겨울철 안전사고 예방 교육 실시",
    "신규 아웃소싱 프로젝트 수주",
    "파견직 근로자 건강검진 지원",
    "고객사와의 MOU 체결",
    "인력 파견 서비스 품질 인증 획득",
    "신규 채용 공고 - 영업팀 모집",
    "고객 만족도 향상 프로그램 도입",
    "파견 인력 교육 프로그램 개편",
    "기업 고객 대상 세미나 개최",
    "여름휴가 고객센터 운영 안내",
    "신규 RPO 서비스 런칭",
    "파견직 근로자 복리후생 확대",
    "고객사 현장 안전점검 실시",
    "인력 파견 서비스 가이드라인 개정",
    "신규 파트너사와 업무협약",
    "고객 상담 서비스 개선안 발표",
    "파견 인력 스킬업 교육 과정 신설",
    "기업 맞춤형 솔루션 개발 완료",
    "고객 만족도 조사 실시"
  ];
  
  const dates2024 = [
    new Date(2024, 0, 12),  // 1월 12일
    new Date(2024, 1, 8),   // 2월 8일
    new Date(2024, 2, 15),  // 3월 15일
    new Date(2024, 3, 3),   // 4월 3일
    new Date(2024, 4, 18),  // 5월 18일
    new Date(2024, 5, 7),   // 6월 7일
    new Date(2024, 6, 22),  // 7월 22일
    new Date(2024, 7, 9),   // 8월 9일
    new Date(2024, 8, 25),  // 9월 25일
    new Date(2024, 9, 11),  // 10월 11일
    new Date(2024, 10, 6),  // 11월 6일
    new Date(2024, 11, 19), // 12월 19일
    new Date(2024, 0, 28),  // 1월 28일
    new Date(2024, 1, 14),  // 2월 14일
    new Date(2024, 2, 2),   // 3월 2일
    new Date(2024, 3, 16),  // 4월 16일
    new Date(2024, 4, 4),   // 5월 4일
    new Date(2024, 5, 21),  // 6월 21일
    new Date(2024, 6, 8),   // 7월 8일
    new Date(2024, 7, 26)   // 8월 26일
  ];
  
  for (let i = 0; i < 20; i++) {
    notices.push({
      title: notice2024Titles[i],
      content: `CMSH의 ${notice2024Titles[i]}에 대한 상세 내용을 안내드립니다. 자세한 사항은 고객센터(1544-7494)로 문의해주시기 바랍니다.`,
      author: "관리자",
      published: true,
      createdAt: dates2024[i],
      updatedAt: dates2024[i]
    });
  }
  
  // 2023년 공지사항 (31-45)
  const notice2023Titles = [
    "2023년 신년 인사 및 사업계획 발표",
    "겨울철 안전사고 예방 교육 실시",
    "신규 아웃소싱 프로젝트 수주",
    "파견직 근로자 건강검진 지원",
    "고객사와의 MOU 체결",
    "인력 파견 서비스 품질 인증 획득",
    "신규 채용 공고 - 영업팀 모집",
    "고객 만족도 향상 프로그램 도입",
    "파견 인력 교육 프로그램 개편",
    "기업 고객 대상 세미나 개최",
    "여름휴가 고객센터 운영 안내",
    "신규 RPO 서비스 런칭",
    "파견직 근로자 복리후생 확대",
    "고객사 현장 안전점검 실시",
    "인력 파견 서비스 가이드라인 개정"
  ];
  
  const dates2023 = [
    new Date(2023, 0, 15),  // 1월 15일
    new Date(2023, 1, 7),   // 2월 7일
    new Date(2023, 2, 20),  // 3월 20일
    new Date(2023, 3, 5),   // 4월 5일
    new Date(2023, 4, 18),  // 5월 18일
    new Date(2023, 5, 2),   // 6월 2일
    new Date(2023, 6, 25),  // 7월 25일
    new Date(2023, 7, 11),  // 8월 11일
    new Date(2023, 8, 6),   // 9월 6일
    new Date(2023, 9, 22),  // 10월 22일
    new Date(2023, 10, 9),  // 11월 9일
    new Date(2023, 11, 16), // 12월 16일
    new Date(2023, 0, 3),   // 1월 3일
    new Date(2023, 1, 28),  // 2월 28일
    new Date(2023, 2, 12)   // 3월 12일
  ];
  
  for (let i = 0; i < 15; i++) {
    notices.push({
      title: notice2023Titles[i],
      content: `CMSH의 ${notice2023Titles[i]}에 대한 상세 내용을 안내드립니다. 자세한 사항은 고객센터(1544-7494)로 문의해주시기 바랍니다.`,
      author: "관리자",
      published: true,
      createdAt: dates2023[i],
      updatedAt: dates2023[i]
    });
  }
  
  // 2022년 공지사항 (46-50)
  const notice2022Titles = [
    "2022년 신년 인사 및 사업계획 발표",
    "겨울철 안전사고 예방 교육 실시",
    "신규 아웃소싱 프로젝트 수주",
    "파견직 근로자 건강검진 지원",
    "고객사와의 MOU 체결"
  ];
  
  const dates2022 = [
    new Date(2022, 0, 18),  // 1월 18일
    new Date(2022, 1, 14),  // 2월 14일
    new Date(2022, 2, 8),   // 3월 8일
    new Date(2022, 3, 25),  // 4월 25일
    new Date(2022, 4, 12)   // 5월 12일
  ];
  
  for (let i = 0; i < 5; i++) {
    notices.push({
      title: notice2022Titles[i],
      content: `CMSH의 ${notice2022Titles[i]}에 대한 상세 내용을 안내드립니다. 자세한 사항은 고객센터(1544-7494)로 문의해주시기 바랍니다.`,
      author: "관리자",
      published: true,
      createdAt: dates2022[i],
      updatedAt: dates2022[i]
    });
  }
  
  return notices;
};

// 127개 문의 데이터 생성
const generateInquiries = () => {
  const inquiries = [];
  const types = ['corporate', 'jobseeker', 'employee'];
  const names = ['김철수', '이영희', '박민수', '정수진', '최동현', '한미영', '강태호', '윤서연', '임재현', '송지은'];
  const companies = ['삼성전자', 'LG전자', '현대자동차', 'SK하이닉스', '네이버', '카카오', '쿠팡', '배달의민족', '토스', '당근마켓'];
  const positions = ['대리', '과장', '부장', '차장', '팀장', '실장', '본부장', '이사', '대표이사', '사장'];
  
  const inquiryTitles = [
    '파견 서비스 문의',
    '아웃소싱 관련 상담',
    '헤드헌팅 서비스 문의',
    'RPO 서비스 문의',
    '인력 파견 비용 문의',
    '계약 조건 문의',
    '근무 환경 문의',
    '복리후생 문의',
    '채용 프로세스 문의',
    '교육 프로그램 문의',
    '안전 교육 문의',
    '급여 체계 문의',
    '근무 시간 문의',
    '휴가 제도 문의',
    '보험 혜택 문의'
  ];
  
  const inquiryContents = [
    '안녕하세요. 파견 서비스에 대해 문의드립니다.',
    '아웃소싱 서비스 비용과 조건을 알고 싶습니다.',
    '헤드헌팅 서비스를 이용하고 싶습니다.',
    'RPO 서비스에 대해 상담받고 싶습니다.',
    '인력 파견 비용이 궁금합니다.',
    '계약 조건에 대해 문의드립니다.',
    '근무 환경이 어떤지 궁금합니다.',
    '복리후생 혜택을 알고 싶습니다.',
    '채용 프로세스에 대해 문의드립니다.',
    '교육 프로그램이 있는지 궁금합니다.',
    '안전 교육을 받을 수 있나요?',
    '급여는 어떻게 지급되나요?',
    '근무 시간은 어떻게 되나요?',
    '휴가 제도는 어떻게 되나요?',
    '보험 혜택이 있나요?'
  ];
  
  for (let i = 0; i < 127; i++) {
    const type = types[i % types.length];
    const name = names[i % names.length];
    const company = type === 'corporate' ? companies[i % companies.length] : null;
    const position = type === 'corporate' ? positions[i % positions.length] : null;
    const title = inquiryTitles[i % inquiryTitles.length];
    const content = inquiryContents[i % inquiryContents.length];
    
    // 랜덤한 날짜 생성 (최근 1년 내)
    const randomDays = Math.floor(Math.random() * 365);
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - randomDays);
    
    inquiries.push({
      type,
      name: name,
      email: `user${i + 1}@example.com`,
      phone: `010-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      title: title,
      message: `${content} (문의번호: ${i + 1})`,
      password: String(Math.floor(Math.random() * 900000) + 100000), // 6자리 숫자
      createdAt
    });
  }
  
  return inquiries;
};

async function seedData() {
  try {
    console.log('데이터 시딩을 시작합니다...');
    
    // 기존 데이터 삭제
    await prisma.reply.deleteMany();
    await prisma.inquiry.deleteMany();
    await prisma.notice.deleteMany();
    
    console.log('기존 데이터를 삭제했습니다.');
    
    // 공지사항 생성
    const notices = generateNotices();
    await prisma.notice.createMany({
      data: notices
    });
    console.log(`${notices.length}개의 공지사항을 생성했습니다.`);
    
    // 문의 생성
    const inquiries = generateInquiries();
    await prisma.inquiry.createMany({
      data: inquiries
    });
    console.log(`${inquiries.length}개의 문의를 생성했습니다.`);
    
    console.log('데이터 시딩이 완료되었습니다!');
  } catch (error) {
    console.error('데이터 시딩 중 오류가 발생했습니다:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();

