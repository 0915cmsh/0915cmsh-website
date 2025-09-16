import { PrismaClient as SQLitePrismaClient } from '@prisma/client';
import { PrismaClient as PostgresPrismaClient } from '@prisma/client';

// SQLite 클라이언트 (로컬 데이터베이스)
const sqlitePrisma = new SQLitePrismaClient({
  datasources: {
    db: {
      url: 'file:./dev.db'
    }
  }
});

// PostgreSQL 클라이언트 (Vercel Postgres)
const postgresPrisma = new PostgresPrismaClient({
  datasources: {
    db: {
      url: 'postgres://0c3d3cccef842ca6b1509dbf1e98c7bfd783a680ae8cffc594690edd07a492c7:sk_FA_LWQ_RQ3QT2rS8pfklv@db.prisma.io:5432/postgres?sslmode=require'
    }
  }
});

async function migrateData() {
  try {
    console.log('🔄 데이터 이전을 시작합니다...');

    // 1. 기존 PostgreSQL 데이터 삭제
    console.log('📝 기존 PostgreSQL 데이터를 삭제합니다...');
    await postgresPrisma.reply.deleteMany();
    await postgresPrisma.inquiry.deleteMany();
    await postgresPrisma.notice.deleteMany();

    // 2. SQLite에서 데이터 조회
    console.log('📖 SQLite에서 데이터를 조회합니다...');
    const inquiries = await sqlitePrisma.inquiry.findMany({
      include: { replies: true }
    });
    const notices = await sqlitePrisma.notice.findMany();

    console.log(`📊 조회된 데이터: 문의 ${inquiries.length}개, 공지사항 ${notices.length}개`);

    // 3. 공지사항 이전
    console.log('📝 공지사항을 이전합니다...');
    for (const notice of notices) {
      await postgresPrisma.notice.create({
        data: {
          title: notice.title,
          content: notice.content,
          author: notice.author,
          published: notice.published,
          createdAt: notice.createdAt,
          updatedAt: notice.updatedAt
        }
      });
    }

    // 4. 문의 및 답변 이전
    console.log('📝 문의 및 답변을 이전합니다...');
    for (const inquiry of inquiries) {
      // 문의 생성
      const createdInquiry = await postgresPrisma.inquiry.create({
        data: {
          type: inquiry.type,
          title: inquiry.title,
          message: inquiry.message,
          name: inquiry.name,
          phone: inquiry.phone,
          email: inquiry.email,
          password: inquiry.password,
          status: inquiry.status,
          createdAt: inquiry.createdAt,
          updatedAt: inquiry.updatedAt
        }
      });

      // 답변 이전
      for (const reply of inquiry.replies) {
        await postgresPrisma.reply.create({
          data: {
            inquiryId: createdInquiry.id,
            content: reply.content,
            author: reply.author,
            createdAt: reply.createdAt
          }
        });
      }
    }

    console.log('✅ 데이터 이전이 완료되었습니다!');
    console.log(`📊 이전된 데이터: 문의 ${inquiries.length}개, 공지사항 ${notices.length}개`);

  } catch (error) {
    console.error('❌ 데이터 이전 중 오류가 발생했습니다:', error);
  } finally {
    await sqlitePrisma.$disconnect();
    await postgresPrisma.$disconnect();
  }
}

migrateData();
