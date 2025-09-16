const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function redistributeInquiryDates() {
  try {
    console.log('문의 데이터 날짜 재배분 시작...');
    
    // 모든 문의 가져오기
    const inquiries = await prisma.inquiry.findMany({
      select: { id: true, createdAt: true },
      orderBy: { id: 'asc' }
    });
    
    console.log(`총 ${inquiries.length}개의 문의를 처리합니다.`);
    
    // 날짜 범위: 2023년 11월 1일 ~ 2025년 9월 10일
    const startDate = new Date('2023-11-01');
    const endDate = new Date('2025-09-10');
    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    console.log(`날짜 범위: ${startDate.toISOString().split('T')[0]} ~ ${endDate.toISOString().split('T')[0]}`);
    console.log(`총 ${totalDays}일간에 걸쳐 배분합니다.`);
    
    // 각 문의에 대해 새로운 날짜 할당
    for (let i = 0; i < inquiries.length; i++) {
      const inquiry = inquiries[i];
      
      // 전체 기간을 문의 수로 나누어 일정한 간격으로 배분
      const dayOffset = Math.floor((totalDays * i) / inquiries.length);
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + dayOffset);
      
      // 시간도 랜덤하게 설정 (09:00 ~ 18:00)
      const randomHour = 9 + Math.floor(Math.random() * 10);
      const randomMinute = Math.floor(Math.random() * 60);
      newDate.setHours(randomHour, randomMinute, 0, 0);
      
      // 데이터베이스 업데이트
      await prisma.inquiry.update({
        where: { id: inquiry.id },
        data: { createdAt: newDate }
      });
      
      if ((i + 1) % 50 === 0) {
        console.log(`${i + 1}개 문의 처리 완료...`);
      }
    }
    
    console.log('모든 문의의 날짜가 성공적으로 재배분되었습니다!');
    
    // 결과 확인
    const sampleInquiries = await prisma.inquiry.findMany({
      select: { id: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    
    console.log('\n최근 10개 문의의 새로운 작성일:');
    sampleInquiries.forEach(inq => {
      const date = new Date(inq.createdAt);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      console.log(`ID ${inq.id}: ${year}.${month}.${day}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

redistributeInquiryDates();
