'use client';

import Link from 'next/link';
import Section from '@/components/Section';
import { useState, useEffect } from 'react';
import { formatKoreanDate } from '@/lib/utils';

interface Notice {
  id: number;
  title: string;
  content: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// 하드코딩된 공지사항 데이터 (2023년 11월 ~ 2025년 9월)
const notices = [
  // 2025년 공지사항
  {
    id: 1,
    title: 'CMSH 2025년 신규 AI 기반 인재 매칭 서비스 런칭',
    content: 'CMSH에서 혁신적인 AI 기반 인재 매칭 서비스를 정식 런칭합니다. 머신러닝 알고리즘을 활용하여 기업의 요구사항과 인재의 역량을 정확히 분석하고, 최적의 매칭을 제공합니다. 이번 서비스는 기존 대비 매칭 정확도를 40% 향상시켰으며, 채용 프로세스 단축과 비용 절감 효과를 기대할 수 있습니다. 서비스 이용을 원하시는 기업 고객님들은 고객센터(1544-7494)로 문의해 주시기 바랍니다.',
    author: '관리자',
    createdAt: '2025-09-01',
    published: true
  },
  {
    id: 2,
    title: '2025년 3분기 파견업무 안전교육 및 산업안전보건법 준수 안내',
    content: '모든 파견 근로자를 대상으로 하는 정기 안전교육이 실시됩니다. 이번 교육은 산업안전보건법 개정사항을 반영하여 구성되었으며, 작업장 안전수칙, 응급처치 방법, 개인보호구 착용법 등 실무에 필요한 내용을 포함합니다. 교육 참여는 법적 의무사항이므로 반드시 참석해 주시기 바랍니다. 교육 일정 및 장소는 개별 안내드리며, 미참석 시 파견업무 중단 조치가 있을 수 있음을 안내드립니다.',
    author: '관리자',
    createdAt: '2025-08-15',
    published: true
  },
  {
    id: 3,
    title: 'CMSH 파견업 등록 갱신 완료 및 서비스 품질 향상 계획',
    content: 'CMSH의 파견업 등록이 성공적으로 갱신되었습니다. 이번 갱신을 통해 더욱 안전하고 체계적인 서비스를 제공할 수 있게 되었습니다. 앞으로 고객 만족도 향상을 위해 다음과 같은 개선사항을 적용할 예정입니다: 1) 24시간 고객지원 시스템 구축, 2) 디지털 계약서비스 도입, 3) 실시간 근무 현황 모니터링 시스템 운영. 고객 여러분의 지속적인 관심과 성원에 감사드리며, 더 나은 서비스로 보답하겠습니다.',
    author: '관리자',
    createdAt: '2025-08-01',
    published: true
  },
  {
    id: 4,
    title: '2025년 하반기 대규모 채용박람회 참가 및 신규 채용공고',
    content: '9월 15일부터 17일까지 코엑스에서 개최되는 대한민국 채용박람회에 CMSH가 참가합니다. 이번 박람회에서는 다양한 분야의 우수 인재를 모집하며, 특히 IT, 제조업, 서비스업 분야의 전문 인력 채용에 집중할 예정입니다. 박람회 참가자들에게는 특별 혜택으로 즉시 면접 기회 제공, 우대 조건 적용 등의 혜택을 드립니다. 자세한 채용 정보는 박람회 현장에서 확인하실 수 있으며, 온라인 사전 접수도 가능합니다.',
    author: '관리자',
    createdAt: '2025-07-20',
    published: true
  },
  {
    id: 5,
    title: 'RPO(채용 프로세스 아웃소싱) 서비스 확장 및 혁신적 솔루션 도입',
    content: 'CMSH의 RPO 서비스가 대폭 확장되어 더욱 체계적이고 효율적인 채용 관리가 가능해졌습니다. 새로운 서비스에는 다음과 같은 혁신적 기능이 포함됩니다: 1) AI 기반 이력서 스크리닝 시스템, 2) 화상 면접 플랫폼 통합, 3) 채용 분석 대시보드 제공, 4) 온보딩 프로세스 자동화. 이를 통해 고객사는 채용 비용을 최대 30% 절감하고, 채용 품질을 크게 향상시킬 수 있습니다. 서비스 문의는 전담 컨설턴트를 통해 상담받으실 수 있습니다.',
    author: '관리자',
    createdAt: '2025-07-10',
    published: true
  },
  {
    id: 6,
    title: 'CMSH 2025년 상반기 고객만족도 조사 결과 발표 및 품질 개선 계획',
    content: '2025년 상반기 고객만족도 조사 결과, 전체 고객 중 95%가 만족한다는 결과를 얻었습니다. 특히 서비스 품질(97%), 응답 속도(94%), 전문성(96%) 영역에서 높은 평가를 받았습니다. 고객 피드백을 바탕으로 다음과 같은 개선사항을 추진할 예정입니다: 1) 고객 맞춤형 서비스 제공, 2) 디지털 플랫폼 고도화, 3) 전문 인력 확충. 고객 여러분의 소중한 의견에 감사드리며, 지속적인 품질 향상을 위해 최선을 다하겠습니다.',
    author: '관리자',
    createdAt: '2025-06-30',
    published: true
  },
  {
    id: 7,
    title: '여름철 폭염 대비 파견 근로자 안전관리 강화 및 특별 지침 시행',
    content: '폭염기간 파견 근로자의 안전을 위한 특별 관리 체계를 구축하여 시행합니다. 주요 안전지침은 다음과 같습니다: 1) 작업시간 조정(오전 6시-10시, 오후 4시-8시), 2) 충분한 휴식시간 확보(2시간마다 15분 휴식), 3) 충분한 수분 공급 및 그늘막 설치, 4) 응급처치 키트 비치. 또한 폭염주의보 발령 시 자동으로 작업 중단 프로토콜이 적용됩니다. 모든 현장 관리자와 근로자는 이 지침을 철저히 준수해 주시기 바랍니다.',
    author: '관리자',
    createdAt: '2025-06-15',
    published: true
  },
  {
    id: 8,
    title: 'CMSH 부산 지점 개설 및 전국 서비스 네트워크 확장',
    content: 'CMSH 부산 지점이 정식 개설되어 전국 서비스 네트워크가 확장되었습니다. 부산 지점에서는 경남권 지역의 기업 고객들에게 현지화된 서비스를 제공하며, 지역 특성을 반영한 맞춤형 인력 솔루션을 제공합니다. 지점 개설과 함께 다음과 같은 서비스가 추가됩니다: 1) 현지 채용 상담 서비스, 2) 지역 맞춤형 교육 프로그램, 3) 24시간 현지 고객지원. 부산 지점 문의: 051-123-4567',
    author: '관리자',
    createdAt: '2025-06-01',
    published: true
  },
  {
    id: 9,
    title: 'CMSH 2025년 상반기 성과 발표 및 하반기 전략 공개',
    content: '2025년 상반기 성과를 발표합니다. 주요 성과는 다음과 같습니다: 배치 인력 5,000명 달성(전년 동기 대비 25% 증가), 신규 고객사 300개사 확보, 매출액 전년 동기 대비 30% 성장. 하반기에는 다음과 같은 전략을 추진할 예정입니다: 1) AI 기반 서비스 고도화, 2) 해외 진출 준비, 3) ESG 경영 강화, 4) 디지털 전환 가속화. 고객 여러분의 지속적인 성원에 감사드리며, 더욱 혁신적인 서비스로 보답하겠습니다.',
    author: '관리자',
    createdAt: '2025-05-31',
    published: true
  },
  {
    id: 10,
    title: '근로기준법 개정에 따른 서비스 업데이트 및 고객 안내',
    content: '근로기준법 개정사항을 반영한 서비스 업데이트를 완료했습니다. 주요 변경사항은 다음과 같습니다: 1) 최저임금 인상 반영(시간당 10,000원), 2) 연장근로 시간 제한 강화(주 12시간), 3) 휴게시간 확대(4시간 이상 근무 시 30분), 4) 야간근로 수당 인상(50% → 60%). 이러한 변경사항은 모든 파견 계약에 자동 적용되며, 기존 계약서도 개정된 조건으로 갱신됩니다. 고객사와 근로자 모두에게 유리한 조건이므로 적극 협조해 주시기 바랍니다.',
    author: '관리자',
    createdAt: '2025-05-15',
    published: true
  },
  // 2024년 공지사항
  {
    id: 11,
    title: 'CMSH 2024년 연말 감사인사 및 2025년 비전 발표',
    content: '2024년 한 해 동안 CMSH에 보내주신 성원과 신뢰에 진심으로 감사드립니다. 올해는 코로나19 이후 경제 회복기에 맞춰 많은 기업들이 인력 확충에 나서면서 파견업계 전반에 활기를 불어넣었습니다. CMSH도 이러한 흐름에 발맞춰 혁신적인 서비스와 고객 중심의 경영으로 성장할 수 있었습니다. 2025년에는 더욱 스마트하고 지속가능한 인력 솔루션을 제공하여 고객 여러분의 성공을 함께 만들어가겠습니다.',
    author: '관리자',
    createdAt: '2024-12-31',
    published: true
  },
  {
    id: 12,
    title: '2024년 겨울철 안전교육 실시 및 추위 대비 안전수칙 안내',
    content: '겨울철 작업 안전을 위한 특별 교육이 실시됩니다. 이번 교육에서는 저온 작업 시 주의사항, 동상 예방법, 난방 장비 안전 사용법, 겨울철 교통안전 등 실무에 필요한 내용을 다룹니다. 특히 건설현장, 물류창고, 야외 작업장에서 근무하는 파견 근로자들은 반드시 참석해야 합니다. 교육 참석자는 안전교육 수료증을 발급받게 되며, 미참석 시 겨울철 파견업무 배정이 제한될 수 있습니다.',
    author: '관리자',
    createdAt: '2024-12-15',
    published: true
  },
  {
    id: 13,
    title: 'CMSH ISO 9001 품질경영시스템 인증 갱신 완료',
    content: 'CMSH의 ISO 9001 품질경영시스템 인증이 성공적으로 갱신되었습니다. 이번 갱신을 통해 서비스 품질 관리 체계가 더욱 강화되었으며, 고객 만족도 향상을 위한 지속적인 개선 활동이 인정받았습니다. 주요 개선사항으로는 디지털화를 통한 프로세스 효율성 향상, 고객 피드백 시스템 고도화, 직원 교육 프로그램 확대 등이 있습니다. 앞으로도 국제 표준에 부합하는 서비스 제공을 위해 최선을 다하겠습니다.',
    author: '관리자',
    createdAt: '2024-11-30',
    published: true
  },
  {
    id: 14,
    title: '2024년 4분기 채용박람회 참가 및 연말 특별 채용 이벤트',
    content: '11월 20일부터 22일까지 SETEC에서 열리는 대한민국 채용박람회에 CMSH가 참가합니다. 이번 박람회에서는 연말 특별 채용 이벤트를 진행하며, 참가자들에게는 다음과 같은 특별 혜택을 제공합니다: 1) 즉시 면접 기회 제공, 2) 우대 조건 적용(경력자 20% 수당 인상), 3) 신입사원 특별 채용 프로그램, 4) 현장에서 바로 계약 체결 가능. 특히 IT, 제조업, 서비스업 분야의 우수 인재를 적극 모집하니 많은 관심과 참여 부탁드립니다.',
    author: '관리자',
    createdAt: '2024-11-10',
    published: true
  },
  {
    id: 15,
    title: '헤드헌팅 서비스 AI 기반 인재 추천 시스템 도입',
    content: 'CMSH의 헤드헌팅 서비스에 AI 기반 인재 추천 시스템을 도입하여 더욱 정확하고 효율적인 매칭을 제공합니다. 새로운 시스템은 다음과 같은 기능을 제공합니다: 1) 이력서 자동 분석 및 역량 평가, 2) 기업 문화 적합성 분석, 3) 성공 가능성 예측 모델, 4) 실시간 매칭 알림 서비스. 이를 통해 매칭 정확도가 35% 향상되었으며, 채용 프로세스도 평균 2주 단축되었습니다. 서비스 이용을 원하시는 기업 고객님들은 전담 컨설턴트를 통해 상담받으실 수 있습니다.',
    author: '관리자',
    createdAt: '2024-10-25',
    published: true
  },
  {
    id: 16,
    title: 'CMSH 고객센터 운영시간 변경 및 24시간 긴급지원 서비스 신설',
    content: '고객 편의 향상을 위해 고객센터 운영시간을 변경하고 24시간 긴급지원 서비스를 신설합니다. 변경된 운영시간은 평일 09:00-18:00이며, 주말 및 공휴일에는 24시간 긴급지원 서비스가 운영됩니다. 긴급지원 서비스는 파견 근로자의 응급상황, 현장 사고, 긴급 인력 교체 등에 대응하며, 전문 상담사가 실시간으로 지원합니다. 긴급상황 발생 시 1544-7494로 연락주시면 즉시 대응해드립니다.',
    author: '관리자',
    createdAt: '2024-10-01',
    published: true
  },
  {
    id: 17,
    title: '2024년 추석 연휴 고객센터 휴무 안내 및 긴급 연락처 공지',
    content: '추석 연휴 기간 중 고객센터가 휴무합니다. 휴무 기간: 9월 16일(월) ~ 9월 18일(수). 휴무 기간 중 긴급한 문의사항이 있으시면 24시간 긴급 핫라인(010-1234-5678)으로 연락주시기 바랍니다. 긴급 핫라인에서는 파견 근로자의 응급상황, 현장 사고, 긴급 인력 교체 등에 대해서만 대응합니다. 일반 문의는 연휴 종료 후 정상 운영되는 고객센터로 문의해 주시기 바랍니다. 즐거운 추석 연휴 보내시기 바랍니다.',
    author: '관리자',
    createdAt: '2024-09-15',
    published: true
  },
  {
    id: 18,
    title: 'CMSH 파견업무 안전수칙 개정 및 산업안전보건법 준수 강화',
    content: '산업안전보건법 개정에 따른 파견업무 안전수칙이 개정되었습니다. 주요 개정사항은 다음과 같습니다: 1) 안전교육 의무화(월 1회 이상), 2) 개인보호구 착용 의무화, 3) 작업 전 안전점검 체크리스트 작성, 4) 사고 발생 시 즉시 보고 의무화. 이러한 개정사항은 모든 파견 현장에 적용되며, 미준수 시 계약 해지 조치가 있을 수 있습니다. 안전한 작업환경 조성을 위해 모든 관계자의 적극적인 협조를 부탁드립니다.',
    author: '관리자',
    createdAt: '2024-09-01',
    published: true
  },
  {
    id: 19,
    title: '2024년 하반기 신입사원 채용 및 인재 육성 프로그램 안내',
    content: 'CMSH에서 신입사원을 채용합니다. 채용 분야는 다음과 같습니다: 1) 인사총무팀(2명), 2) 영업팀(3명), 3) 마케팅팀(1명), 4) IT개발팀(2명). 신입사원에게는 다음과 같은 혜택을 제공합니다: 경쟁력 있는 연봉, 4대보험 완비, 교육비 지원, 성과급 지급, 휴양시설 이용권. 또한 신입사원을 위한 특별 육성 프로그램도 운영합니다: 멘토링 시스템, 전문 교육 과정, 해외 연수 기회. 지원 방법 및 자세한 내용은 채용공고를 확인해주세요.',
    author: '관리자',
    createdAt: '2024-08-20',
    published: true
  },
  {
    id: 20,
    title: 'CMSH 모바일 앱 출시 및 디지털 서비스 혁신',
    content: '고객 편의를 위한 CMSH 모바일 앱이 정식 출시되었습니다. 앱에서는 다음과 같은 서비스를 이용하실 수 있습니다: 1) 실시간 근무 현황 확인, 2) 급여 명세서 조회, 3) 휴가 신청 및 승인, 4) 공지사항 및 소식 확인, 5) 고객센터 상담. 앱스토어와 구글 플레이에서 "CMSH"로 검색하여 다운로드하실 수 있습니다. 앱 출시 기념으로 첫 달 이용자에게는 특별 혜택을 제공합니다. 디지털 전환을 통해 더욱 편리한 서비스를 제공하겠습니다.',
    author: '관리자',
    createdAt: '2024-08-01',
    published: true
  },
  // 2023년 공지사항
  {
    id: 21,
    title: 'CMSH 2023년 연말 성과 발표 및 2024년 전략 방향',
    content: '2023년 한 해 동안 CMSH가 달성한 주요 성과를 발표합니다. 배치 인력 8,000명 달성(전년 대비 40% 증가), 신규 고객사 200개사 확보, 매출액 전년 대비 50% 성장, 고객만족도 96% 달성. 이러한 성과는 고객 여러분의 신뢰와 직원들의 노력 덕분입니다. 2024년에는 다음과 같은 전략을 추진할 예정입니다: 1) AI 기반 서비스 도입, 2) 전국 네트워크 확장, 3) ESG 경영 강화, 4) 디지털 플랫폼 고도화. 더욱 혁신적인 서비스로 고객 여러분의 성공을 함께 만들어가겠습니다.',
    author: '관리자',
    createdAt: '2023-12-31',
    published: true
  },
  {
    id: 22,
    title: '2023년 겨울철 안전관리 강화 및 특별 관리 체계 구축',
    content: '겨울철 작업 안전을 위한 특별 관리 체계를 구축하여 시행합니다. 주요 관리 항목은 다음과 같습니다: 1) 저온 작업 시 보호 장비 착용 의무화, 2) 충분한 휴식시간 확보(1시간마다 10분 휴식), 3) 따뜻한 음료 제공, 4) 응급처치 키트 비치. 또한 기온이 영하 10도 이하로 떨어질 경우 자동으로 작업 중단 프로토콜이 적용됩니다. 모든 현장 관리자와 근로자는 이 관리 체계를 철저히 준수해 주시기 바랍니다.',
    author: '관리자',
    createdAt: '2023-12-15',
    published: true
  },
  {
    id: 23,
    title: 'CMSH RPO(채용 프로세스 아웃소싱) 서비스 정식 런칭',
    content: '채용 프로세스 아웃소싱(RPO) 서비스가 정식 런칭되었습니다. RPO 서비스는 기업의 채용 프로세스 전체를 위탁받아 관리하는 서비스로, 다음과 같은 혜택을 제공합니다: 1) 채용 비용 최대 40% 절감, 2) 채용 품질 향상, 3) 채용 프로세스 단축, 4) 전문 인력 확보. 서비스 범위는 채용 전략 수립부터 온보딩까지 전 과정을 포함하며, 기업의 규모와 업종에 맞는 맞춤형 솔루션을 제공합니다. 서비스 문의는 전담 컨설턴트를 통해 상담받으실 수 있습니다.',
    author: '관리자',
    createdAt: '2023-11-20',
    published: true
  },
  {
    id: 24,
    title: '2023년 4분기 고객만족도 조사 결과 및 품질 개선 계획',
    content: '2023년 4분기 고객만족도 조사 결과 94%의 만족도를 기록했습니다. 세부 항목별 만족도는 서비스 품질(96%), 응답 속도(92%), 전문성(95%), 가격 경쟁력(93%) 순으로 나타났습니다. 고객 피드백을 바탕으로 다음과 같은 개선사항을 추진할 예정입니다: 1) 고객 맞춤형 서비스 제공, 2) 디지털 플랫폼 고도화, 3) 전문 인력 확충, 4) 가격 경쟁력 강화. 고객 여러분의 소중한 의견에 감사드리며, 지속적인 품질 향상을 위해 최선을 다하겠습니다.',
    author: '관리자',
    createdAt: '2023-11-01',
    published: true
  }
];

// 자주묻는질문 데이터
const faqs = [
  {
    id: 1,
    question: '파견 서비스는 어떤 업무에 활용할 수 있나요?',
    answer: '제조업, 서비스업, IT업 등 다양한 분야에서 활용 가능합니다. 생산라인 운영, 고객상담, IT 개발 등 전문 인력이 필요한 모든 업무에 파견 서비스를 제공합니다.'
  },
  {
    id: 2,
    question: '파견 근로자의 4대보험은 어떻게 처리되나요?',
    answer: 'CMSH에서 파견 근로자의 4대보험(국민연금, 건강보험, 고용보험, 산재보험)을 모두 가입하여 관리합니다. 고객사는 별도의 보험 가입 없이 안전하게 서비스를 이용할 수 있습니다.'
  },
  {
    id: 3,
    question: '파견 기간은 얼마나 되나요?',
    answer: '파견 기간은 고객사의 요구사항에 따라 유연하게 조정 가능합니다. 단기 프로젝트(1-3개월)부터 장기 계약(1년 이상)까지 다양한 기간으로 서비스를 제공합니다.'
  },
  {
    id: 4,
    question: 'RPO 서비스와 일반 채용대행의 차이점은 무엇인가요?',
    answer: 'RPO는 채용 프로세스 전체를 위탁받아 관리하는 서비스로, 채용 전략 수립부터 온보딩까지 전 과정을 담당합니다. 일반 채용대행은 단순 인재 소싱에 집중하는 반면, RPO는 채용 시스템 구축과 운영까지 포함합니다.'
  },
  {
    id: 5,
    question: '아웃소싱 서비스의 비용은 어떻게 산정되나요?',
    answer: '아웃소싱 비용은 업무의 복잡도, 필요 인력 수, 계약 기간 등을 고려하여 산정됩니다. 성과 기반 계약도 가능하며, 고객사와 상담을 통해 최적의 비용 구조를 제안드립니다.'
  },
  {
    id: 6,
    question: '헤드헌팅 서비스에서 찾을 수 있는 인재는 어떤 분야인가요?',
    answer: '경영진, 전문직, 기술직 등 다양한 분야의 핵심 인재를 발굴합니다. IT, 금융, 제조업, 서비스업 등 산업별 전문 인재와 해외 인재까지 포괄적으로 서비스를 제공합니다.'
  },
  {
    id: 7,
    question: '파견 근로자 교체는 언제 가능한가요?',
    answer: '파견 근로자 교체는 계약 조건에 따라 가능합니다. 일반적으로 1-2주 전 사전 공지 후 교체가 가능하며, 긴급한 경우에는 더 빠른 교체도 가능합니다.'
  },
  {
    id: 8,
    question: 'CMSH의 서비스 품질은 어떻게 보장되나요?',
    answer: 'ISO 9001 품질경영시스템 인증을 보유하고 있으며, 정기적인 품질 감사와 고객 만족도 조사를 실시합니다. 또한 파견업 등록업체로서 관련 법규를 완전 준수합니다.'
  },
  {
    id: 9,
    question: '전국 어디서든 서비스를 이용할 수 있나요?',
    answer: '네, 전국 주요 도시에 네트워크를 구축하여 어디서든 서비스를 이용할 수 있습니다. 수도권, 경기, 인천, 부산, 대구, 광주 등 주요 지역에서 서비스를 제공합니다.'
  },
  {
    id: 10,
    question: '문의나 상담은 어떻게 받을 수 있나요?',
    answer: '고객센터(1544-7494)를 통해 전화 상담이 가능하며, 웹사이트의 문의하기 게시판을 통한 온라인 문의도 가능합니다. 또한 현장 방문 상담도 가능합니다.'
  }
];

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNotices, setTotalNotices] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchNotices();
  }, [currentPage]);

  const fetchNotices = async () => {
    try {
      console.log('🔍 공지사항 API 호출 시작...');
      const res = await fetch(`/api/notice?page=${currentPage}&pageSize=${itemsPerPage}`, { 
        cache: 'no-store' 
      });
      
      console.log('📡 API 응답 상태:', res.status, res.statusText);
      
      if (res.ok) {
        const data = await res.json();
        console.log('✅ API 응답 데이터:', data);
        console.log('📊 받은 공지사항 수:', data.items?.length || 0);
        setNotices(data.items || []);
        setTotalNotices(data.total || 0);
      } else {
        console.error('❌ API 에러:', res.status, res.statusText);
        const errorText = await res.text();
        console.error('❌ 에러 상세:', errorText);
        // 에러 발생 시 빈 배열로 설정
        setNotices([]);
        setTotalNotices(0);
      }
    } catch (error) {
      console.error('❌ 네트워크 에러:', error);
      // 네트워크 에러 발생 시 빈 배열로 설정
      setNotices([]);
      setTotalNotices(0);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalNotices / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">공지사항</h1>
            <p className="text-xl text-blue-100">
              CMSH의 최신 소식과 공지사항을 확인해보세요
            </p>
          </div>
        </Section>
      </section>

      {/* 공지사항 목록 */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {notices.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">등록된 공지사항이 없습니다.</p>
              </div>
            ) : (
              notices.map((notice, index) => (
                <Link
                  key={notice.id}
                  href={`/notice/${notice.id}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-600"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {notice.title}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      공지
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">{notice.content}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{formatKoreanDate(notice.createdAt)}</span>
                    <span>작성자: {notice.author}</span>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  이전
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded transition-colors ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다음
                </button>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* 자주묻는질문 섹션 */}
      <Section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">자주묻는질문</h2>
            <p className="text-lg text-gray-600">
              고객님들이 자주 문의하시는 질문과 답변을 정리했습니다
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-md">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      Q{faq.id}. {faq.question}
                    </h3>
                    <svg
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}