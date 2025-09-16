const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const notices = [
  {
    title: 'CMSH 2025년 신규 서비스 런칭 안내',
    content: 'CMSH에서 AI 기반 인재 매칭 서비스를 런칭했습니다. 더욱 정확하고 효율적인 인재 매칭이 가능합니다.\n\n자세한 내용은 고객센터(1544-7494)로 문의해주시기 바랍니다.',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2025년 3분기 파견업무 안전교육 실시',
    content: '모든 파견 근로자를 대상으로 안전교육을 실시합니다. 참여 필수입니다.\n\n문의: 010-5617-5949',
    author: '관리자',
    isPublished: true
  },
  {
    title: 'CMSH 파견업 등록 갱신 완료',
    content: '파견업 등록이 성공적으로 갱신되었습니다. 계속해서 안전한 서비스를 제공하겠습니다.\n\n고객센터: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2025년 하반기 채용박람회 참가 안내',
    content: '9월 15일-17일 코엑스에서 열리는 채용박람회에 CMSH가 참가합니다.\n\n문의: 010-5617-5949',
    author: '관리자',
    isPublished: true
  },
  {
    title: 'RPO 서비스 확장 및 개선사항',
    content: 'RPO 서비스가 확장되어 더욱 체계적인 채용 관리가 가능합니다.\n\n자세한 내용은 1544-7494로 문의해주세요.',
    author: '관리자',
    isPublished: true
  }
];

async function seedNotices() {
  try {
    // 기존 공지사항 삭제
    await prisma.notice.deleteMany({});
    
    // 공지사항 생성
    for (const notice of notices) {
      await prisma.notice.create({
        data: notice
      });
    }

    console.log(`✅ ${notices.length}개의 공지사항이 성공적으로 생성되었습니다!`);

    // 생성된 공지사항 수 확인
    const count = await prisma.notice.count();
    console.log(`📊 현재 데이터베이스에 총 ${count}개의 공지사항이 있습니다.`);
  } catch (error) {
    console.error('❌ 공지사항 생성 중 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedNotices();
