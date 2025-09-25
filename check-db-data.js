const { PrismaClient } = require('@prisma/client');

async function checkData() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 데이터베이스 연결 중...');
    
    // Notice 테이블 확인
    const noticeCount = await prisma.notice.count();
    console.log(`📢 공지사항 개수: ${noticeCount}`);
    
    if (noticeCount > 0) {
      const notices = await prisma.notice.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' }
      });
      console.log('📋 최근 공지사항:');
      notices.forEach(notice => {
        console.log(`  - ${notice.id}: ${notice.title}`);
      });
    }
    
    // Inquiry 테이블 확인
    const inquiryCount = await prisma.inquiry.count();
    console.log(`📝 문의 개수: ${inquiryCount}`);
    
    if (inquiryCount > 0) {
      const inquiries = await prisma.inquiry.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' }
      });
      console.log('📋 최근 문의:');
      inquiries.forEach(inquiry => {
        console.log(`  - ${inquiry.id}: ${inquiry.title} (${inquiry.type})`);
      });
    }
    
    if (noticeCount === 0 && inquiryCount === 0) {
      console.log('❌ 데이터가 없습니다!');
      console.log('💡 해결 방법:');
      console.log('  1. 데이터를 다시 생성하거나');
      console.log('  2. 다른 데이터베이스로 마이그레이션');
    }
    
  } catch (error) {
    console.error('❌ 데이터베이스 연결 오류:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
