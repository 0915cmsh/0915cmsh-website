/**
 * 런타임 환경 설정 및 모드 관리
 * 스냅샷 모드와 데이터베이스 모드를 동적으로 전환할 수 있도록 지원
 */

export const IS_PROD = process.env.VERCEL_ENV === 'production';
export const READ_MODE = (process.env.READ_MODE ?? 'db') as 'db' | 'snapshot';
export const CAN_USE_DB = !!process.env.DATABASE_URL && READ_MODE === 'db';

/**
 * 현재 모드가 스냅샷 모드인지 확인
 */
export const isSnapshotMode = () => READ_MODE === 'snapshot';

/**
 * 데이터베이스를 사용할 수 있는지 확인
 */
export const canUseDatabase = () => CAN_USE_DB;

/**
 * 현재 실행 환경 정보를 반환
 */
export const getRuntimeInfo = () => ({
  isProduction: IS_PROD,
  readMode: READ_MODE,
  canUseDb: CAN_USE_DB,
  hasDatabaseUrl: !!process.env.DATABASE_URL,
  vercelEnv: process.env.VERCEL_ENV || 'unknown',
  nodeEnv: process.env.NODE_ENV || 'unknown'
});
