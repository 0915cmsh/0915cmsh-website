const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const typeMap = {
  'corporate': '기업',
  'jobseeker': '구직자', 
  'employee': '재직자',
  'outsourcing': '아웃소싱',
  'dispatch': '파견',
  'contract': '도급',
  'rpo': 'RPO',
  'headhunting': '헤드헌팅'
};

async function main() {
  try {
    console.log('문의 유형 한글화 시작...');
    
    const inquiries = await prisma.inquiry.findMany();
    let updatedCount = 0;
    
    for (const inquiry of inquiries) {
      const englishType = inquiry.type?.trim().toLowerCase();
      const koreanType = typeMap[englishType];
      
      if (koreanType && koreanType !== inquiry.type) {
        await prisma.inquiry.update({
          where: { id: inquiry.id },
          data: { type: koreanType }
        });
        updatedCount++;
        console.log(`문의 ${inquiry.id}: ${inquiry.type} → ${koreanType}`);
      }
    }
    
    console.log(`✅ 문의 유형 한글화 완료: ${updatedCount}개 업데이트`);
  } catch (error) {
    console.error('문의 유형 한글화 중 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();