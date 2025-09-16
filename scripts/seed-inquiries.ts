import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// 자연스러운 문의 제목들
const inquiryTitles = {
  기업: [
    '파견 인력 서비스 문의드립니다',
    'RPO 서비스 상담 요청',
    '아웃소싱 업무 문의',
    '인력 파견 계약 관련 문의',
    '채용대행 서비스 비용 문의',
    '임시직 채용 관련 상담',
    '생산라인 인력 지원 문의',
    '고객상담센터 아웃소싱 문의',
    'IT 개발 인력 파견 문의',
    '물류센터 인력 지원 문의',
    '제조업 파견 인력 문의',
    '서비스업 임시직 채용 문의',
    '건설현장 인력 지원 문의',
    '유통업 파견 인력 문의',
    '금융업 아웃소싱 문의',
    '의료업 임시직 채용 문의',
    '교육업 파견 인력 문의',
    '관광업 아웃소싱 문의',
    '식품업 임시직 채용 문의',
    '화학업 파견 인력 문의'
  ],
  재직자: [
    '파견 근무 관련 문의',
    '근무지 변경 요청',
    '급여 관련 문의',
    '휴가 신청 방법 문의',
    '4대보험 관련 문의',
    '근무시간 조정 요청',
    '교육 참여 문의',
    '안전교육 관련 문의',
    '근무환경 개선 요청',
    '복리후생 관련 문의',
    '퇴직 관련 문의',
    '계약 갱신 문의',
    '근무지 이동 문의',
    '야간근무 관련 문의',
    '주말근무 문의',
    '휴게시간 관련 문의',
    '작업복 지급 문의',
    '교통비 지원 문의',
    '식대 지원 문의',
    '상여금 관련 문의'
  ],
  구직자: [
    '채용 공고 문의',
    '지원 방법 문의',
    '면접 일정 문의',
    '합격 발표 문의',
    '채용 절차 문의',
    '근무 조건 문의',
    '급여 수준 문의',
    '복리후생 문의',
    '근무지 위치 문의',
    '근무 시간 문의',
    '교육 기회 문의',
    '승진 기회 문의',
    '경력 인정 문의',
    '자격증 관련 문의',
    '외국어 요구사항 문의',
    '경력자 채용 문의',
    '신입사원 채용 문의',
    '인턴십 프로그램 문의',
    '정규직 전환 문의',
    '파견직 채용 문의'
  ]
}

// 자연스러운 문의 내용들
const inquiryContents = {
  기업: [
    '안녕하세요. 저희 회사에서 파견 인력이 필요한 상황입니다. 어떤 서비스를 제공하시는지 궁금합니다.',
    'RPO 서비스에 대해 문의드립니다. 비용과 절차에 대해 알고 싶습니다.',
    '아웃소싱 업무를 고려하고 있습니다. 상담 가능하신가요?',
    '인력 파견 계약 관련해서 문의드립니다. 계약 기간과 조건에 대해 알고 싶습니다.',
    '채용대행 서비스 비용이 궁금합니다. 상세한 견적을 받고 싶습니다.',
    '임시직 채용이 필요한데 어떤 절차로 진행되나요?',
    '생산라인 인력 지원이 필요합니다. 언제부터 가능한지 문의드립니다.',
    '고객상담센터 아웃소싱을 고려하고 있습니다. 상담 요청드립니다.',
    'IT 개발 인력 파견이 필요합니다. 어떤 인력들이 있는지 궁금합니다.',
    '물류센터 인력 지원이 필요합니다. 비용과 조건에 대해 문의드립니다.'
  ],
  재직자: [
    '파견 근무 관련해서 문의드립니다. 근무지 변경이 가능한지 궁금합니다.',
    '근무지 변경을 요청하고 싶습니다. 어떤 절차로 진행되나요?',
    '급여 관련해서 문의드립니다. 지급일과 계산 방법이 궁금합니다.',
    '휴가 신청 방법을 모르겠습니다. 어떻게 신청하나요?',
    '4대보험 관련해서 문의드립니다. 가입 현황을 확인하고 싶습니다.',
    '근무시간 조정을 요청하고 싶습니다. 가능한지 문의드립니다.',
    '교육 참여 기회가 있는지 궁금합니다. 어떤 교육들이 있나요?',
    '안전교육 관련해서 문의드립니다. 언제 받을 수 있나요?',
    '근무환경 개선을 요청하고 싶습니다. 어떤 절차로 진행되나요?',
    '복리후생 관련해서 문의드립니다. 어떤 혜택들이 있나요?'
  ],
  구직자: [
    '채용 공고를 보고 문의드립니다. 지원 방법을 알려주세요.',
    '지원 방법이 궁금합니다. 어떤 서류가 필요한가요?',
    '면접 일정을 문의드립니다. 언제 진행되나요?',
    '합격 발표는 언제 되나요? 결과 확인 방법을 알려주세요.',
    '채용 절차가 궁금합니다. 단계별로 설명해주세요.',
    '근무 조건에 대해 문의드립니다. 급여와 근무시간이 궁금합니다.',
    '급여 수준이 궁금합니다. 어느 정도인지 알려주세요.',
    '복리후생에 대해 문의드립니다. 어떤 혜택들이 있나요?',
    '근무지 위치가 궁금합니다. 교통편은 어떻게 되나요?',
    '근무 시간이 궁금합니다. 주 5일 근무인가요?'
  ]
}

// 자연스러운 이름들
const names = [
  '김민수', '이영희', '박철수', '최지영', '정민호', '강수진', '윤태호', '임소영',
  '한동욱', '오미경', '송재현', '조은정', '신현우', '백지은', '홍성민', '서유진',
  '권도현', '안수빈', '노지훈', '문혜진', '유재석', '김태희', '이병헌', '전지현',
  '송강호', '김혜수', '차승원', '김하늘', '장동건', '고소영', '원빈', '김희선',
  '현빈', '송혜교', '이민호', '박신혜', '김수현', '전지현', '이영애', '최민수',
  '김준호', '이서연', '박민준', '최유나', '정지훈', '강민지', '윤서준', '임하늘',
  '한지우', '오민석', '송지은', '조현우', '신예은', '백준호', '홍서영', '서민재'
]

// 자연스러운 이메일 도메인들
const emailDomains = [
  'gmail.com', 'naver.com', 'daum.net', 'hanmail.net', 'yahoo.co.kr',
  'hotmail.com', 'outlook.com', 'nate.com', 'kakao.com'
]

// 자연스러운 전화번호 생성
function generatePhoneNumber(): string {
  const prefixes = ['010', '011', '016', '017', '018', '019']
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const middle = Math.floor(Math.random() * 9000) + 1000
  const last = Math.floor(Math.random() * 9000) + 1000
  return `${prefix}-${middle}-${last}`
}

// 랜덤 날짜 생성 (2022년 9월부터 현재까지)
function generateRandomDate(): Date {
  const startDate = new Date(2022, 8, 1) // 2022년 9월 1일
  const endDate = new Date()
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
  return new Date(randomTime)
}

async function main() {
  const count = await prisma.inquiry.count()
  if (count >= 255) {
    console.log('Seed skipped: already >= 255')
    return
  }

  const toCreate = 255 - count
  const types = ['기업', '재직자', '구직자'] as const

  const rows = Array.from({ length: toCreate }).map((_, i) => {
    const type = types[i % types.length]
    const titleOptions = inquiryTitles[type]
    const contentOptions = inquiryContents[type]
    
    const title = titleOptions[Math.floor(Math.random() * titleOptions.length)]
    const content = contentOptions[Math.floor(Math.random() * contentOptions.length)]
    const name = names[Math.floor(Math.random() * names.length)]
    const phone = generatePhoneNumber()
    const email = `${name.toLowerCase()}${Math.floor(Math.random() * 100)}@${emailDomains[Math.floor(Math.random() * emailDomains.length)]}`
    const createdAt = generateRandomDate()
    
    return {
      type,
      title,
      message: content,
      name,
      phone,
      email,
      status: Math.random() > 0.7 ? '답변완료' : '대기', // 30% 확률로 답변완료
      createdAt
    }
  })

  await prisma.inquiry.createMany({ data: rows })
  console.log('Seeded inquiries:', rows.length)
}

main().finally(() => prisma.$disconnect())