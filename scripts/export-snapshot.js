/**
 * 스냅샷 자동 생성 스크립트
 * 로컬 서버에서 실행 중인 API를 호출하여 스냅샷 파일을 생성합니다.
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const base = process.env.BASE_URL || 'http://localhost:3000';

console.log('🚀 스냅샷 생성 시작...');
console.log('📡 API 베이스 URL:', base);

(async () => {
  try {
    // 공지사항 스냅샷 생성
    console.log('📰 공지사항 스냅샷 생성 중...');
    const resN = await fetch(`${base}/api/notice`);
    
    if (!resN.ok) {
      throw new Error(`공지사항 API 호출 실패: ${resN.status} ${resN.statusText}`);
    }
    
    const dataN = await resN.json();
    const noticeData = dataN.items || [];
    
    // 공지사항 스냅샷 파일 저장
    const noticePath = join(__dirname, '../src/fallback/notice.json');
    fs.writeFileSync(noticePath, JSON.stringify(noticeData, null, 2));
    console.log(`✅ 공지사항 스냅샷 저장 완료: ${noticeData.length}개 항목`);
    
    // 문의 스냅샷 생성
    console.log('💬 문의 스냅샷 생성 중...');
    const resI = await fetch(`${base}/api/inquiry`);
    
    if (!resI.ok) {
      throw new Error(`문의 API 호출 실패: ${resI.status} ${resI.statusText}`);
    }
    
    const dataI = await resI.json();
    const inquiryData = dataI.items || [];
    
    // 문의 스냅샷 파일 저장
    const inquiryPath = join(__dirname, '../src/fallback/inquiry.json');
    fs.writeFileSync(inquiryPath, JSON.stringify(inquiryData, null, 2));
    console.log(`✅ 문의 스냅샷 저장 완료: ${inquiryData.length}개 항목`);
    
    console.log('🎉 스냅샷 생성 완료!');
    console.log('📁 저장 위치: src/fallback/');
    
  } catch (error) {
    console.error('❌ 스냅샷 생성 오류:', error.message);
    process.exit(1);
  }
})();
