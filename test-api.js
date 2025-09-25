const { PrismaClient } = require('@prisma/client');

async function testAPI() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 API 테스트 시작...');
    
    // 1. 데이터베이스 연결 테스트
    console.log('\n1️⃣ 데이터베이스 연결 테스트');
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ 데이터베이스 연결 성공');
    
    // 2. Notice 테이블 데이터 확인
    console.log('\n2️⃣ Notice 테이블 데이터 확인');
    const noticeCount = await prisma.notice.count();
    console.log(`📊 전체 공지사항 개수: ${noticeCount}`);
    
    const publishedNotices = await prisma.notice.count({
      where: { published: true }
    });
    console.log(`📊 발행된 공지사항 개수: ${publishedNotices}`);
    
    // 3. 최근 공지사항 5개 조회 (API와 동일한 쿼리)
    console.log('\n3️⃣ API와 동일한 쿼리 테스트');
    const items = await prisma.notice.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    
    console.log(`📋 조회된 공지사항: ${items.length}개`);
    items.forEach((notice, index) => {
      console.log(`  ${index + 1}. [${notice.id}] ${notice.title} (${notice.published ? '발행' : '미발행'})`);
    });
    
    // 4. API 응답 형식 테스트
    console.log('\n4️⃣ API 응답 형식 테스트');
    const apiResponse = {
      items: items,
      total: items.length
    };
    console.log('📤 API 응답:', JSON.stringify(apiResponse, null, 2));
    
    if (items.length === 0) {
      console.log('\n❌ 문제 발견: published=true인 공지사항이 없습니다!');
      console.log('💡 해결 방법:');
      console.log('  1. published 필드가 false로 설정된 공지사항들을 true로 변경');
      console.log('  2. 또는 published 조건을 제거');
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    console.error('상세 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAPI();
