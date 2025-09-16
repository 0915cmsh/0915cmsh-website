const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkData() {
  try {
    // 문의글 수 확인
    const inquiryCount = await prisma.inquiry.count();
    console.log(`📊 문의글 수: ${inquiryCount}`);
    
    // 공지사항 수 확인
    const noticeCount = await prisma.notice.count();
    console.log(`📊 공지사항 수: ${noticeCount}`);
    
    // 최근 문의글 5개 확인
    const recentInquiries = await prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });
    console.log('📋 최근 문의글:');
    recentInquiries.forEach(inquiry => {
      console.log(`- ${inquiry.id}: ${inquiry.title} (${inquiry.name})`);
    });
    
    // 최근 공지사항 5개 확인
    const recentNotices = await prisma.notice.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });
    console.log('📋 최근 공지사항:');
    recentNotices.forEach(notice => {
      console.log(`- ${notice.id}: ${notice.title}`);
    });
    
  } catch (error) {
    console.error('❌ 데이터 확인 중 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
