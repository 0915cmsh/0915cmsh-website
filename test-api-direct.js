const fetch = require('node-fetch');

async function testAPIDirect() {
  console.log('🔍 API 엔드포인트 직접 테스트 시작...\n');
  
  try {
    // 1. 로컬 API 테스트
    console.log('1️⃣ 로컬 API 테스트 (http://localhost:3000)');
    try {
      const localResponse = await fetch('http://localhost:3000/api/notice?debug=1');
      console.log(`📡 로컬 API 상태: ${localResponse.status}`);
      
      if (localResponse.ok) {
        const localData = await localResponse.json();
        console.log(`📊 로컬 API 응답: ${localData.items?.length || 0}개 공지사항`);
        console.log(`📝 로컬 API 노트: ${localData.note || 'none'}`);
      } else {
        console.log(`❌ 로컬 API 실패: ${localResponse.statusText}`);
      }
    } catch (localError) {
      console.log(`❌ 로컬 API 연결 실패: ${localError.message}`);
    }
    console.log('');
    
    // 2. 프로덕션 API 테스트
    console.log('2️⃣ 프로덕션 API 테스트 (https://www.urbane-cmsh.com)');
    try {
      const prodResponse = await fetch('https://www.urbane-cmsh.com/api/notice?debug=1');
      console.log(`📡 프로덕션 API 상태: ${prodResponse.status}`);
      
      if (prodResponse.ok) {
        const prodData = await prodResponse.json();
        console.log(`📊 프로덕션 API 응답: ${prodData.items?.length || 0}개 공지사항`);
        console.log(`📝 프로덕션 API 노트: ${prodData.note || 'none'}`);
        
        if (prodData.items && prodData.items.length > 0) {
          console.log(`📋 첫 번째 공지사항: ${prodData.items[0].title}`);
        }
      } else {
        console.log(`❌ 프로덕션 API 실패: ${prodResponse.statusText}`);
      }
    } catch (prodError) {
      console.log(`❌ 프로덕션 API 연결 실패: ${prodError.message}`);
    }
    console.log('');
    
    // 3. 헬스체크 API 테스트
    console.log('3️⃣ 헬스체크 API 테스트');
    try {
      const healthResponse = await fetch('https://www.urbane-cmsh.com/api/_health/db');
      console.log(`📡 헬스체크 상태: ${healthResponse.status}`);
      
      if (healthResponse.ok) {
        const healthData = await healthResponse.json();
        console.log(`📊 헬스체크 응답:`, healthData);
      } else {
        console.log(`❌ 헬스체크 실패: ${healthResponse.statusText}`);
      }
    } catch (healthError) {
      console.log(`❌ 헬스체크 연결 실패: ${healthError.message}`);
    }
    
  } catch (error) {
    console.error('❌ 테스트 중 오류:', error.message);
  }
}

testAPIDirect();
