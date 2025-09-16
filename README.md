# KOREA WORKS - 인재 솔루션 전문 기업

KOREA WORKS는 대한민국 최고의 인재 솔루션을 제공하는 전문 기업입니다. 파견, 아웃소싱, 헤드헌팅, RPO 등 다양한 서비스를 통해 고객의 성공을 지원합니다.

## 🚀 기술 스택

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**

## 📁 프로젝트 구조

```
src/
├── app/                    # App Router 페이지
│   ├── about/             # 회사소개 페이지
│   │   ├── greeting/      # 인사말 (/46)
│   │   ├── company-overview/ # 회사개요 (/54)
│   │   ├── organization/  # 조직도 (/56)
│   │   └── location/      # 오시는 길 (/84)
│   ├── business/          # 사업소개 페이지
│   │   ├── dispatch/      # 파견 서비스 (/57)
│   │   ├── outsourcing/   # 아웃소싱 (/59)
│   │   ├── headhunting/   # 헤드헌팅 (/60)
│   │   └── rpo/           # RPO (/61)
│   ├── notice/            # 공지사항
│   │   └── [id]/          # 공지사항 상세 (/85, /86)
│   ├── inquiry/           # 문의 폼
│   │   ├── corporate/     # 기업 문의 (/49)
│   │   ├── jobseeker/     # 구직자 문의 (/51)
│   │   └── employee/      # 재직자 문의 (/52)
│   ├── media/             # 미디어
│   │   └── [id]/          # 미디어 상세 (/75)
│   ├── basic/             # 이용약관 (/basic)
│   └── policy/            # 개인정보 처리방침
│       └── privacy/
├── components/            # 재사용 가능한 컴포넌트
│   ├── Header.tsx         # 헤더
│   ├── Footer.tsx         # 푸터
│   ├── Hero.tsx           # 히어로 섹션
│   ├── Section.tsx        # 섹션 래퍼
│   ├── ServiceCard.tsx    # 서비스 카드
│   ├── PartnerGrid.tsx    # 파트너 그리드
│   ├── InquiryForm.tsx    # 문의 폼
│   └── YouTubeEmbed.tsx   # YouTube 임베드
└── globals.css            # 전역 스타일
```

## 🛠️ 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 3. 빌드

```bash
npm run build
```

### 4. 프로덕션 실행

```bash
npm start
```

## 📱 주요 기능

### 🏠 홈페이지 (/)
- 히어로 섹션
- 서비스 소개
- 파트너 그리드
- 연락처 섹션

### 🏢 회사소개
- **인사말** (/46): 대표의 인사말
- **회사개요** (/54): 회사 기본 정보
- **조직도** (/56): 조직 구조
- **오시는 길** (/84): 위치 및 교통편

### 💼 사업소개
- **파견 서비스** (/57): 전문 인력 파견
- **아웃소싱** (/59): 비즈니스 프로세스 아웃소싱
- **헤드헌팅** (/60): 고급 인재 발굴
- **RPO** (/61): 채용 프로세스 아웃소싱

### 📢 공지사항
- **공지사항 목록** (/notice): 공지사항 리스트
- **공지사항 상세** (/85, /86): 개별 공지사항

### 📝 문의하기
- **기업 문의** (/49): 기업 고객용 문의 폼
- **구직자 문의** (/51): 구직자용 문의 폼
- **재직자 문의** (/52): 재직자용 문의 폼

### 🎥 미디어
- **미디어 상세** (/75): YouTube 영상 임베드

### 📋 기타
- **이용약관** (/basic): 서비스 이용약관
- **개인정보 처리방침** (/policy/privacy): 개인정보 보호 정책

## 🔗 라우팅

이 프로젝트는 원본 사이트의 숫자 경로를 유지하기 위해 Next.js의 `rewrites` 기능을 사용합니다:

- `/46` → `/about/greeting`
- `/53` → `/about`
- `/54` → `/about/company-overview`
- `/56` → `/about/organization`
- `/57` → `/business/dispatch`
- `/59` → `/business/outsourcing`
- `/60` → `/business/headhunting`
- `/61` → `/business/rpo`
- `/75` → `/media/75`
- `/85` → `/notice/1`
- `/86` → `/notice/2`
- `/49` → `/inquiry/corporate`
- `/51` → `/inquiry/jobseeker`
- `/52` → `/inquiry/employee`
- `/notice01` → `/notice`
- `/basic` → `/basic`
- `/84` → `/about/location`

## 🎨 디자인 시스템

### 색상
- **Primary**: Blue (600, 700, 800)
- **Secondary**: Gray (50, 100, 200, 300, 600, 700, 900)
- **Accent**: Green (600, 700)

### 타이포그래피
- **Font Family**: Geist Sans, Geist Mono
- **Headings**: 2xl, 3xl, 4xl, 5xl, 6xl
- **Body**: base, lg

### 컴포넌트
- **Cards**: rounded-lg, shadow-md
- **Buttons**: rounded-lg, hover effects
- **Forms**: border, focus states
- **Sections**: max-w-7xl, responsive padding

## 📱 반응형 디자인

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1280px+

## 🔧 개발 도구

- **ESLint**: 코드 품질 관리
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 유틸리티 우선 CSS
- **Next.js**: React 프레임워크

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 연락처

- **이메일**: info@korea-works.co.kr
- **전화**: 02-1234-5678
- **주소**: 서울특별시 강남구 테헤란로 123

---

© 2024 KOREA WORKS. All rights reserved.