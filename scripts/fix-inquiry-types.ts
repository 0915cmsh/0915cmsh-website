/* scripts/fix-inquiry-types.ts */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const map: Record<string, string> = {
  corporate: '기업',
  jobseeker: '구직자',
  employee: '재직자',
  outsourcing: '아웃소싱',
  dispatch: '파견',
  contract: '도급',
  rpo: 'RPO',
  headhunting: '헤드헌팅',
};

async function main() {
  const all = await prisma.inquiry.findMany();
  for (const it of all) {
    const t = it.type?.toLowerCase();
    if (t && map[t]) {
      await prisma.inquiry.update({
        where: { id: it.id },
        data: { type: map[t] },
      });
    }
  }
  console.log('문의유형 한글 일괄변환 완료');
}

main().finally(() => prisma.$disconnect());
