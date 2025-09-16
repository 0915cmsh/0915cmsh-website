const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// 공지사항 데이터 (50개)
const notices = [
  // 2025년 공지사항
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
  },
  {
    title: '2025년 2분기 성과 보고',
    content: '2025년 2분기 성과를 공유드립니다. 고객 만족도 95% 달성했습니다.\n\n문의: 010-5617-5949',
    author: '관리자',
    isPublished: true
  },
  {
    title: '여름휴가 관련 업무 안내',
    content: '8월 15일-16일 여름휴가로 인한 업무 중단 안내입니다.\n\n긴급 문의: 010-5617-5949',
    author: '관리자',
    isPublished: true
  },
  {
    title: 'CMSH 웹사이트 리뉴얼 완료',
    content: '더욱 편리한 서비스 이용을 위해 웹사이트를 리뉴얼했습니다.\n\n문의: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2025년 신입사원 채용 공고',
    content: 'CMSH에서 신입사원을 채용합니다. 지원 문의는 010-5617-5949로 연락주세요.',
    author: '관리자',
    isPublished: true
  },
  {
    title: '고객 만족도 조사 실시',
    content: '고객 만족도 향상을 위한 조사를 실시합니다. 많은 참여 부탁드립니다.\n\n문의: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  // 2024년 공지사항
  {
    title: '2024년 연말 감사 인사',
    content: '2024년 한 해 동안 보내주신 관심과 사랑에 감사드립니다.\n\n고객센터: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2024년 4분기 성과 발표',
    content: '2024년 4분기 성과를 발표합니다. 목표 대비 110% 달성했습니다.\n\n문의: 010-5617-5949',
    author: '관리자',
    isPublished: true
  },
  {
    title: '크리스마스 휴무 안내',
    content: '12월 25일 크리스마스 휴무로 인한 업무 중단 안내입니다.\n\n긴급 문의: 010-5617-5949',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2024년 겨울 교육 프로그램',
    content: '겨울철 인재 교육 프로그램을 시작합니다. 참여 문의는 1544-7494로 연락주세요.',
    author: '관리자',
    isPublished: true
  },
  {
    title: 'CMSH 연말 파티 개최',
    content: '12월 20일 CMSH 연말 파티를 개최합니다. 많은 참여 부탁드립니다.\n\n문의: 010-5617-5949',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2024년 3분기 실적 보고',
    content: '2024년 3분기 실적을 보고드립니다. 전년 대비 15% 성장했습니다.\n\n문의: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  {
    title: '추석 연휴 업무 안내',
    content: '추석 연휴 기간 중 업무 안내입니다. 긴급 문의는 010-5617-5949로 연락주세요.',
    author: '관리자',
    isPublished: true
  },
  {
    title: 'CMSH 신규 사무실 이전',
    content: '더 나은 서비스를 위해 사무실을 이전했습니다. 새 주소는 웹사이트를 확인해주세요.\n\n문의: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2024년 하반기 채용 설명회',
    content: '2024년 하반기 채용 설명회를 개최합니다. 참여 문의는 010-5617-5949로 연락주세요.',
    author: '관리자',
    isPublished: true
  },
  {
    title: '여름철 안전사고 예방 교육',
    content: '여름철 안전사고 예방을 위한 교육을 실시합니다. 모든 직원 참여 필수입니다.\n\n문의: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  // 2023년 공지사항
  {
    title: '2023년 연말 정산 안내',
    content: '2023년 연말 정산 관련 안내입니다. 문의사항은 010-5617-5949로 연락주세요.',
    author: '관리자',
    isPublished: true
  },
  {
    title: 'CMSH 10주년 기념 이벤트',
    content: 'CMSH 10주년을 기념하여 다양한 이벤트를 진행합니다.\n\n자세한 내용은 1544-7494로 문의해주세요.',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2023년 4분기 성과 평가',
    content: '2023년 4분기 성과 평가 결과를 공유합니다. 목표 대비 120% 달성했습니다.\n\n문의: 010-5617-5949',
    author: '관리자',
    isPublished: true
  },
  {
    title: '겨울철 업무 시간 조정',
    content: '겨울철 업무 시간을 조정합니다. 자세한 내용은 1544-7494로 문의해주세요.',
    author: '관리자',
    isPublished: true
  },
  {
    title: 'CMSH 신규 서비스 출시',
    content: 'CMSH에서 새로운 인재 매칭 서비스를 출시했습니다.\n\n문의: 010-5617-5949',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2023년 3분기 실적 발표',
    content: '2023년 3분기 실적을 발표합니다. 전년 대비 20% 성장했습니다.\n\n문의: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  {
    title: '중秋 연휴 업무 안내',
    content: '중秋 연휴 기간 중 업무 안내입니다. 긴급 문의는 010-5617-5949로 연락주세요.',
    author: '관리자',
    isPublished: true
  },
  {
    title: 'CMSH 직원 교육 프로그램',
    content: '직원 역량 강화를 위한 교육 프로그램을 시작합니다.\n\n문의: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2023년 하반기 채용 공고',
    content: '2023년 하반기 신입사원 채용 공고입니다. 지원 문의는 010-5617-5949로 연락주세요.',
    author: '관리자',
    isPublished: true
  },
  {
    title: '여름철 안전 점검 실시',
    content: '여름철 안전 점검을 실시합니다. 모든 직원 협조 부탁드립니다.\n\n문의: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  // 2022년 공지사항
  {
    title: '2022년 연말 감사 인사',
    content: '2022년 한 해 동안 보내주신 관심과 사랑에 감사드립니다.\n\n고객센터: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2022년 4분기 성과 보고',
    content: '2022년 4분기 성과를 보고드립니다. 목표 대비 105% 달성했습니다.\n\n문의: 010-5617-5949',
    author: '관리자',
    isPublished: true
  },
  {
    title: '크리스마스 휴무 안내',
    content: '12월 25일 크리스마스 휴무로 인한 업무 중단 안내입니다.\n\n긴급 문의: 010-5617-5949',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2022년 겨울 교육 과정',
    content: '겨울철 인재 교육 과정을 시작합니다. 참여 문의는 1544-7494로 연락주세요.',
    author: '관리자',
    isPublished: true
  },
  {
    title: 'CMSH 연말 모임',
    content: '12월 15일 CMSH 연말 모임을 개최합니다. 많은 참여 부탁드립니다.\n\n문의: 010-5617-5949',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2022년 3분기 실적 발표',
    content: '2022년 3분기 실적을 발표합니다. 전년 대비 10% 성장했습니다.\n\n문의: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  {
    title: '추석 연휴 업무 안내',
    content: '추석 연휴 기간 중 업무 안내입니다. 긴급 문의는 010-5617-5949로 연락주세요.',
    author: '관리자',
    isPublished: true
  },
  {
    title: 'CMSH 사무실 확장',
    content: '서비스 확장에 따라 사무실을 확장했습니다. 새 주소는 웹사이트를 확인해주세요.\n\n문의: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2022년 하반기 채용 설명회',
    content: '2022년 하반기 채용 설명회를 개최합니다. 참여 문의는 010-5617-5949로 연락주세요.',
    author: '관리자',
    isPublished: true
  },
  {
    title: '여름철 안전 교육',
    content: '여름철 안전 교육을 실시합니다. 모든 직원 참여 필수입니다.\n\n문의: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  {
    title: 'CMSH 신규 서비스 런칭',
    content: 'CMSH에서 새로운 인재 솔루션 서비스를 런칭했습니다.\n\n자세한 내용은 010-5617-5949로 문의해주세요.',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2022년 2분기 성과 평가',
    content: '2022년 2분기 성과 평가 결과를 공유합니다. 목표 대비 110% 달성했습니다.\n\n문의: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  {
    title: '봄철 업무 시간 조정',
    content: '봄철 업무 시간을 조정합니다. 자세한 내용은 010-5617-5949로 문의해주세요.',
    author: '관리자',
    isPublished: true
  },
  {
    title: 'CMSH 직원 복지 개선',
    content: '직원 복지를 개선하기 위한 새로운 제도를 도입했습니다.\n\n문의: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  {
    title: '2022년 1분기 실적 발표',
    content: '2022년 1분기 실적을 발표합니다. 전년 대비 8% 성장했습니다.\n\n문의: 010-5617-5949',
    author: '관리자',
    isPublished: true
  },
  {
    title: '신년 인사',
    content: '2022년 새해를 맞아 인사드립니다. 더 나은 서비스로 보답하겠습니다.\n\n고객센터: 1544-7494',
    author: '관리자',
    isPublished: true
  },
  {
    title: 'CMSH 신규 채용',
    content: 'CMSH에서 신규 직원을 채용합니다. 지원 문의는 010-5617-5949로 연락주세요.',
    author: '관리자',
    isPublished: true
  },
  {
    title: '겨울철 안전 점검',
    content: '겨울철 안전 점검을 실시합니다. 모든 직원 협조 부탁드립니다.\n\n문의: 1544-7494',
    author: '관리자',
    isPublished: true
  }
];

async function generateNotices() {
  try {
    // 기존 공지사항 삭제
    await prisma.notice.deleteMany({});
    
    // 공지사항 생성
    for (const notice of notices) {
      await prisma.notice.create({
        data: {
          ...notice,
          createdAt: new Date(2022 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
          updatedAt: new Date()
        }
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

generateNotices();
