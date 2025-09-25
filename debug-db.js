const { PrismaClient } = require('@prisma/client');

async function debugDatabase() {
  console.log('🔍 데이터베이스 디버깅 시작...\n');
  
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
  
  try {
    // 1. 데이터베이스 연결 테스트
    console.log('1️⃣ 데이터베이스 연결 테스트');
    await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ 데이터베이스 연결 성공\n');
    
    // 2. Notice 테이블 구조 확인
    console.log('2️⃣ Notice 테이블 구조 확인');
    const tableInfo = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'Notice' 
      ORDER BY ordinal_position
    `;
    console.log('📋 Notice 테이블 컬럼:');
    tableInfo.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
    });
    console.log('');
    
    // 3. 전체 데이터 개수 확인
    console.log('3️⃣ 데이터 개수 확인');
    const totalCount = await prisma.notice.count();
    const publishedCount = await prisma.notice.count({
      where: { published: true }
    });
    console.log(`📊 전체 공지사항: ${totalCount}개`);
    console.log(`📊 발행된 공지사항: ${publishedCount}개\n`);
    
    // 4. 최근 5개 데이터 확인
    console.log('4️⃣ 최근 5개 데이터 확인');
    const recentNotices = await prisma.notice.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
        content: true
      }
    });
    
    console.log('📋 최근 공지사항:');
    recentNotices.forEach((notice, index) => {
      console.log(`  ${index + 1}. [${notice.id}] ${notice.title}`);
      console.log(`     - 발행상태: ${notice.published ? '발행' : '미발행'}`);
      console.log(`     - 작성일: ${notice.createdAt}`);
      console.log(`     - 내용 길이: ${notice.content?.length || 0}자`);
      console.log('');
    });
    
    // 5. API와 동일한 쿼리 테스트
    console.log('5️⃣ API와 동일한 쿼리 테스트');
    const apiQuery = await prisma.notice.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    console.log(`📡 API 쿼리 결과: ${apiQuery.length}개`);
    
    if (apiQuery.length > 0) {
      console.log('✅ API 쿼리가 정상적으로 작동합니다');
      console.log(`📋 첫 번째 공지사항: ${apiQuery[0].title}`);
    } else {
      console.log('❌ API 쿼리 결과가 비어있습니다!');
    }
    
  } catch (error) {
    console.error('❌ 데이터베이스 오류:', error.message);
    console.error('상세 오류:', error);
  } finally {
    await prisma.$disconnect();
    console.log('\n🔚 데이터베이스 연결 종료');
  }
}

debugDatabase();
