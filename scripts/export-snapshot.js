// Node 18+ (fetch 내장). Node<18이면 node-fetch 설치하여 import 교체.
import fs from 'fs';

const base = process.env.BASE_URL || 'http://localhost:3000';
const j = (x) => JSON.stringify(x, null, 2);

const main = async () => {
  try {
    console.log('🚀 스냅샷 생성 시작...');
    console.log('📡 API 베이스 URL:', base);
    
    const n = await fetch(`${base}/api/notice`).then(r => r.json()).catch(()=>({items:[]}));
    fs.writeFileSync('src/fallback/notice.json', j(n.items || []));
    console.log(`✅ 공지사항 스냅샷 저장: ${(n.items || []).length}개 항목`);
    
    const i = await fetch(`${base}/api/inquiry`).then(r => r.json()).catch(()=>({items:[]}));
    fs.writeFileSync('src/fallback/inquiry.json', j(i.items || []));
    console.log(`✅ 문의 스냅샷 저장: ${(i.items || []).length}개 항목`);
    
    console.log('✓ snapshots written to src/fallback/');
  } catch (error) {
    console.error('❌ 스냅샷 생성 오류:', error.message);
    process.exit(1);
  }
};

main();
