export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { READ_MODE, CAN_USE_DB } from '@/lib/runtime';

type Notice = { 
  id: number; 
  title: string; 
  content: string; 
  author?: string; 
  published?: boolean; 
  createdAt: string; 
  updatedAt?: string; 
};

function loadSnapshot(): Notice[] {
  // 인라인 데이터만 사용 - 파일 로드 없이 직접 반환
  return [
    {
      id: 270,
      title: "CMSH 2025년 신규 AI 기반 인재 매칭 서비스 런칭",
      content: "CMSH가 2025년 새로운 AI 기반 인재 매칭 서비스를 런칭합니다.\n\n주요 기능:\n- 24시간 실시간 인재 매칭\n- AI 기반 역량 및 성향 분석\n- 채용 리드타임 50% 단축\n- 맞춤형 인재 추천 시스템\n\n이 서비스를 통해 기업과 인재 간의 최적의 매칭을 제공하여, 더욱 효율적인 채용 프로세스를 구축할 수 있습니다.\n\n문의사항이 있으시면 언제든지 연락주시기 바랍니다.",
      author: "관리자",
      published: true,
      createdAt: "2025-09-01T00:00:00.000Z",
      updatedAt: "2025-09-01T00:00:00.000Z"
    },
    {
      id: 269,
      title: "CMSH 파견 서비스 확장 안내",
      content: "CMSH의 파견 서비스가 전국적으로 확장되었습니다.\n\n새로운 지역:\n- 경기권 (수원, 성남, 안양)\n- 충청권 (대전, 천안, 청주)\n- 영남권 (대구, 부산, 울산)\n\n기존 서비스:\n- 제조업 파견\n- 서비스업 파견\n- IT 개발 파견\n- 고객상담 파견\n\n전문 인력과 함께 성장하는 CMSH가 되겠습니다.",
      author: "관리자",
      published: true,
      createdAt: "2025-08-28T00:00:00.000Z",
      updatedAt: "2025-08-28T00:00:00.000Z"
    },
    {
      id: 268,
      title: "RPO 서비스 신규 런칭",
      content: "CMSH의 새로운 RPO(Recruitment Process Outsourcing) 서비스가 런칭되었습니다.\n\nRPO 서비스 특징:\n- 채용 프로세스 전체 위탁\n- 채용 전략 수립 및 실행\n- 온보딩까지 원스톱 서비스\n- 채용 시스템 구축 및 운영\n\n기존 채용대행과의 차이점:\n- 단순 인재 소싱이 아닌 전체 프로세스 관리\n- 고객사 맞춤형 채용 전략 제공\n- 지속적인 채용 시스템 운영\n\n자세한 상담은 언제든지 문의해주세요.",
      author: "관리자",
      published: true,
      createdAt: "2025-08-25T00:00:00.000Z",
      updatedAt: "2025-08-25T00:00:00.000Z"
    },
    {
      id: 267,
      title: "아웃소싱 서비스 비용 체계 개선",
      content: "CMSH의 아웃소싱 서비스 비용 체계가 개선되었습니다.\n\n새로운 비용 체계:\n- 성과 기반 계약 옵션 추가\n- 장기 계약 시 할인 혜택\n- 투명한 비용 산정 기준\n- 맞춤형 가격 제안\n\n비용 산정 기준:\n- 업무의 복잡도\n- 필요 인력 수\n- 계약 기간\n- 성과 지표\n\n고객사와의 상담을 통해 최적의 비용 구조를 제안드립니다.",
      author: "관리자",
      published: true,
      createdAt: "2025-08-22T00:00:00.000Z",
      updatedAt: "2025-08-22T00:00:00.000Z"
    },
    {
      id: 266,
      title: "고객센터 운영시간 변경 안내",
      content: "CMSH 고객센터 운영시간이 변경되었습니다.\n\n새로운 운영시간:\n- 평일: 09:00 - 18:00\n- 토요일: 09:00 - 13:00\n- 일요일 및 공휴일: 휴무\n\n연락처:\n- 전화: 1544-7494\n- 이메일: hj.kim@urbane-gp.com\n- 팩스: 02-1234-5678\n\n긴급 문의사항은 이메일로 남겨주시면 빠른 시일 내에 답변드리겠습니다.",
      author: "관리자",
      published: true,
      createdAt: "2025-08-20T00:00:00.000Z",
      updatedAt: "2025-08-20T00:00:00.000Z"
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

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    const snap = loadSnapshot();
    const item = snap.find(n => n.id === id);
    return item ? NextResponse.json({ ok: true, item, note: 'snapshot' }) : NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  try {
    const prisma = await getPrisma();
    const item = await prisma.notice.findUnique({ where: { id } });
    return item ? NextResponse.json({ ok: true, item, note: 'db' }) : NextResponse.json({ error: 'Not Found' }, { status: 404 });
  } catch (e: any) {
    const snap = loadSnapshot();
    const fall = snap.find(n => n.id === id);
    return fall
      ? NextResponse.json({ ok: true, item: fall, note: 'db-error-snapshot' })
      : NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
}

// PUT - 공지사항 수정
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    return NextResponse.json({ 
      error: '현재 스냅샷 모드입니다. 공지사항 수정을 위해서는 DB 모드로 전환해주세요.',
      contact: 'hj.kim@urbane-gp.com'
    }, { status: 503 });
  }

  try {
    const id = Number(params.id);
    const body = await req.json();
    const prisma = await getPrisma();
    
    const updated = await prisma.notice.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        author: body.author || '관리자',
        published: body.published ?? true,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true, item: updated });
  } catch (e: any) {
    console.error('Error updating notice:', e);
    return NextResponse.json({ error: e?.message || '공지사항 수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// DELETE - 공지사항 삭제
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (READ_MODE === 'snapshot' || !CAN_USE_DB) {
    return NextResponse.json({ 
      error: '현재 스냅샷 모드입니다. 공지사항 삭제를 위해서는 DB 모드로 전환해주세요.',
      contact: 'hj.kim@urbane-gp.com'
    }, { status: 503 });
  }

  try {
    const id = Number(params.id);
    const prisma = await getPrisma();
    
    await prisma.notice.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('Error deleting notice:', e);
    return NextResponse.json({ error: e?.message || '공지사항 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
}