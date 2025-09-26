export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { READ_MODE, CAN_USE_DB } from '@/lib/runtime';

type Inquiry = { 
  id: number; 
  type: string; 
  title: string; 
  message: string; 
  name: string; 
  phone: string; 
  email?: string; 
  status?: string; 
  createdAt: string; 
  Reply?: Array<{id: number}> 
};

function loadSnapshot(): Inquiry[] {
  // 인라인 데이터만 사용 - 파일 로드 없이 직접 반환
  return [
    {
      id: 1,
      type: "corporate",
      title: "파견 서비스 문의",
      message: "안녕하세요. 저희 회사에서 제조업 파견 서비스를 이용하고 싶습니다. 50명 규모의 생산라인 운영 인력이 필요한데, 가능한지 문의드립니다. 계약 기간은 6개월 예정이고, 4대보험은 어떻게 처리되는지도 궁금합니다.",
      name: "김대표",
      phone: "010-1234-5678",
      email: "ceo@company.com",
      status: "대기",
      createdAt: "2025-09-20T10:30:00.000Z",
      Reply: []
    },
    {
      id: 2,
      type: "jobseeker",
      title: "개인 구직 문의",
      message: "안녕하세요. IT 개발자로 구직 중인데, CMSH를 통해 파견 근무를 할 수 있는지 문의드립니다. 3년 경력의 React, Node.js 개발자이고, 원하는 지역은 서울 강남구입니다. 어떤 프로젝트들이 있는지 알려주시면 감사하겠습니다.",
      name: "박개발",
      phone: "010-9876-5432",
      email: "dev@email.com",
      status: "답변완료",
      createdAt: "2025-09-18T14:20:00.000Z",
      Reply: [
        {
          id: 1,
          content: "안녕하세요. 문의해주신 내용에 대해 답변드립니다. 현재 React, Node.js 개발 프로젝트가 여러 개 진행 중이며, 강남구 지역 프로젝트도 있습니다. 상세한 내용은 개별 연락드리겠습니다.",
          author: "관리자",
          createdAt: "2025-09-19T09:15:00.000Z"
        }
      ]
    },
    {
      id: 3,
      type: "employee",
      title: "RPO 서비스 상담 요청",
      message: "저희 회사에서 채용이 어려워 RPO 서비스를 고려하고 있습니다. 30명 규모의 스타트업이고, 개발자 10명, 마케팅 5명, 영업 15명을 채용해야 합니다. RPO 서비스의 전체적인 프로세스와 비용에 대해 상담받고 싶습니다.",
      name: "이인사",
      phone: "010-5555-1234",
      email: "hr@startup.com",
      status: "대기",
      createdAt: "2025-09-15T16:45:00.000Z",
      Reply: []
    },
    {
      id: 4,
      type: "corporate",
      title: "아웃소싱 비용 문의",
      message: "고객상담 업무를 아웃소싱하고 싶은데, 비용이 궁금합니다. 상담원 20명이 필요하고, 24시간 운영을 원합니다. 월 예상 비용과 계약 조건에 대해 알려주세요.",
      name: "최고객",
      phone: "010-7777-8888",
      email: "customer@biz.com",
      status: "답변완료",
      createdAt: "2025-09-12T11:30:00.000Z",
      Reply: [
        {
          id: 2,
          content: "안녕하세요. 24시간 고객상담 아웃소싱 서비스에 대해 답변드립니다. 상담원 20명 기준 월 예상 비용은 1,500만원 정도이며, 계약 기간에 따라 할인 혜택이 있습니다. 상세한 제안서를 이메일로 발송드리겠습니다.",
          author: "관리자",
          createdAt: "2025-09-13T14:20:00.000Z"
        }
      ]
    },
    {
      id: 5,
      type: "jobseeker",
      title: "파견 근무 조건 문의",
      message: "파견 근무를 고려하고 있는데, 근무 조건이 궁금합니다. 4대보험은 어떻게 처리되고, 휴가나 복리후생은 어떻게 되는지 알려주세요. 또한 파견 기간은 보통 얼마나 되는지도 궁금합니다.",
      name: "정구직",
      phone: "010-3333-4444",
      email: "job@seeker.com",
      status: "대기",
      createdAt: "2025-09-10T09:15:00.000Z",
      Reply: []
    }
  ];
}

// lazy prisma helper
type PrismaClientT = typeof import('@prisma/client').PrismaClient;
let _prisma: PrismaClientT | null = null;

async function getPrisma() {
  if (_prisma) return _prisma;
  const mod = await import('@prisma/client');
  _prisma = new mod.PrismaClient({
    log: process.env.VERCEL_ENV === 'production' ? ['error'] : ['warn', 'error'],
  });
  return _prisma;
}

// GET - 문의 목록 조회
export async function GET() {
  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    const items = loadSnapshot();
    return NextResponse.json({ items, total: items.length, note: 'snapshot' });
  }

  try {
    const prisma = await getPrisma();
    const items = await prisma.inquiry.findMany({ 
      orderBy: { createdAt: 'desc' }, 
      include: { Reply: { select: { id: true } } }
    });
    
    const mapped = items.map((x: any) => ({ 
      ...x, 
      status: x.Reply.length ? '답변완료' : '대기' 
    }));
    
    return NextResponse.json({ items: mapped, total: mapped.length, note: 'db' });
  } catch (e: any) {
    const snap = loadSnapshot();
    return NextResponse.json({ 
      items: snap, 
      total: snap.length, 
      note: 'db-error-snapshot' 
    }, { status: 200 });
  }
}

// POST - 문의 작성 (스냅샷 모드/DB 미연결 시 503으로 안내)
export async function POST(req: Request) {
  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    return NextResponse.json({ 
      error: '현재 점검 중입니다. 문의는 이메일로 부탁드립니다.',
      contact: 'hj.kim@urbane-gp.com'
    }, { status: 503 });
  }

  return NextResponse.json({ error: 'Not Implemented' }, { status: 501 });
}