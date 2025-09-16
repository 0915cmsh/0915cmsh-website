# Node.js 18 Alpine 이미지 사용
FROM node:18-alpine AS base

# 의존성 설치를 위한 단계
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# 빌드를 위한 단계
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma 클라이언트 생성
RUN npx prisma generate

# Next.js 빌드
RUN npm run build:prod

# 프로덕션 실행을 위한 단계
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# 시스템 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 필요한 파일들 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# 권한 설정
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 데이터베이스 마이그레이션 및 서버 시작
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]


