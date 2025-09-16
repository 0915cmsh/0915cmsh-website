const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// 랜덤 이름 생성
const names = [
  '김민수', '이지영', '박성호', '최수진', '정현우', '한소영', '윤태준', '강미영', '조현수', '임지은',
  '송민재', '오유진', '신동현', '백지혜', '홍성민', '서예린', '권태호', '노수정', '문현우', '안지영',
  '유민수', '전소영', '고현우', '배지은', '남태준', '심미영', '허동현', '표수진', '차민재', '구예린',
  '나지혜', '도성민', '라현우', '마지영', '바태호', '사수정', '아민수', '자소영', '차현우', '카지은',
  '타태준', '파미영', '하동현', '김수진', '이민재', '박예린', '최지혜', '정성민', '한현우', '윤지영'
];

// 랜덤 이메일 도메인
const emailDomains = [
  'gmail.com', 'naver.com', 'daum.net', 'hanmail.net', 'yahoo.com', 'hotmail.com',
  'outlook.com', 'nate.com', 'kakao.com', 'company.co.kr', 'business.com'
];

// 랜덤 회사명
const companies = [
  '삼성전자', 'LG전자', '현대자동차', 'SK하이닉스', '네이버', '카카오', '쿠팡', '배달의민족',
  '토스', '당근마켓', '야놀자', '직방', '마켓컬리', '우아한형제들', '라인', 'NHN',
  '넷마블', 'NC소프트', '크래프톤', '펄어비스', '스마일게이트', '데브시스터즈',
  '아이오닉', '엔씨소프트', '한게임', '웹젠', '컴투스', '게임빌', '플레이디',
  '스타일쉐어', '무신사', '29CM', '위메프', '티몬', 'G마켓', '옥션', '11번가',
  '롯데온', '신세계몰', '현대백화점', '롯데백화점', '갤러리아', '더현대', '신세계갤러리'
];

// 랜덤 직책
const positions = [
  '대표이사', '부사장', '사장', '이사', '부장', '차장', '과장', '대리', '주임', '사원',
  '팀장', '실장', '본부장', '부문장', '센터장', '그룹장', '파트장', '리더', '매니저',
  'HR담당자', '채용담당자', '인사담당자', '경영지원', '총무', '인사팀장', '채용팀장'
];

// 문의 유형
const inquiryTypes = ['corporate', 'jobseeker', 'employee'];

// 문의 제목 템플릿
const titleTemplates = [
  '아웃소싱 서비스 문의드립니다',
  '인력 파견 서비스 상담 요청',
  'RPO 서비스 문의',
  '헤드헌팅 서비스 상담',
  '인재 채용 관련 문의',
  '아웃소싱 비용 문의',
  '서비스 상세 내용 문의',
  '계약 조건 문의',
  '서비스 기간 문의',
  '전문 인력 파견 문의',
  '채용 프로세스 문의',
  '인력 관리 서비스 문의',
  '비용 절감 방안 문의',
  '서비스 품질 문의',
  '계약 갱신 문의'
];

// 문의 내용 템플릿
const contentTemplates = [
  '안녕하세요. 저희 회사에서 전문 인력이 필요한 상황입니다. 아웃소싱 서비스에 대해 상세히 알고 싶습니다.',
  '인력 부족으로 인해 파견 서비스를 고려하고 있습니다. 서비스 내용과 비용에 대해 문의드립니다.',
  'RPO 서비스를 통해 채용을 진행하고 싶습니다. 어떤 프로세스로 진행되는지 궁금합니다.',
  '헤드헌팅 서비스로 고급 인재를 찾고 있습니다. 서비스 범위와 성공률에 대해 문의드립니다.',
  '아웃소싱 서비스를 통해 비용을 절감하고 싶습니다. 구체적인 방안을 제시해주시면 감사하겠습니다.',
  '전문 인력 파견 서비스에 관심이 있습니다. 서비스 품질과 관리 방안에 대해 알고 싶습니다.',
  '채용 프로세스의 효율성을 높이고 싶습니다. RPO 서비스가 도움이 될지 문의드립니다.',
  '인력 관리의 어려움을 겪고 있습니다. 아웃소싱 서비스로 해결할 수 있는지 상담받고 싶습니다.',
  '서비스 계약 조건과 기간에 대해 자세히 알고 싶습니다. 상담 가능한 시간을 알려주세요.',
  '비용 대비 효과적인 인력 확보 방안을 찾고 있습니다. 다양한 서비스 옵션을 제안해주세요.'
];

// 랜덤 데이터 생성 함수
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomEmail(name) {
  const domain = getRandomItem(emailDomains);
  const randomNum = Math.floor(Math.random() * 1000);
  return `${name}${randomNum}@${domain}`;
}

function generateRandomPhone() {
  const prefixes = ['010', '011', '016', '017', '018', '019'];
  const prefix = getRandomItem(prefixes);
  const middle = Math.floor(Math.random() * 9000) + 1000;
  const last = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}-${middle}-${last}`;
}

function generateRandomPassword() {
  return Math.floor(Math.random() * 900000) + 100000; // 6자리 숫자
}

async function generateInquiries() {
  console.log('문의글 127개 생성 시작...');
  
  const inquiries = [];
  
  for (let i = 0; i < 127; i++) {
    const name = getRandomItem(names);
    const email = generateRandomEmail(name);
    const phone = generateRandomPhone();
    const company = getRandomItem(companies);
    const position = getRandomItem(positions);
    const type = getRandomItem(inquiryTypes);
    const title = getRandomItem(titleTemplates);
    const body = getRandomItem(contentTemplates);
    const password = generateRandomPassword().toString();
    
    // 랜덤 날짜 생성 (2024년 1월 ~ 2025년 9월)
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2025-09-08');
    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    const createdAt = new Date(randomTime);
    
    inquiries.push({
      type,
      name,
      email,
      phone,
      company,
      position,
      title,
      body,
      password,
      isAdmin: false,
      createdAt
    });
  }
  
  try {
    // 데이터베이스에 일괄 삽입
    await prisma.inquiry.createMany({
      data: inquiries
    });
    
    console.log(`✅ ${inquiries.length}개의 문의글이 성공적으로 생성되었습니다!`);
    
    // 생성된 문의글 수 확인
    const count = await prisma.inquiry.count();
    console.log(`📊 현재 데이터베이스에 총 ${count}개의 문의글이 있습니다.`);
    
  } catch (error) {
    console.error('❌ 문의글 생성 중 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 스크립트 실행
generateInquiries();
