const https = require('https');

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: response.statusCode, data: jsonData });
        } catch (error) {
          resolve({ status: response.statusCode, data: data, error: error.message });
        }
      });
    });
    
    request.on('error', (error) => {
      reject(error);
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function testAPI() {
  console.log('🔍 API 엔드포인트 테스트 시작...\n');
  
  try {
    // 1. 프로덕션 API 테스트
    console.log('1️⃣ 프로덕션 API 테스트');
    const prodResult = await makeRequest('https://www.urbane-cmsh.com/api/notice?debug=1');
    console.log(`📡 프로덕션 API 상태: ${prodResult.status}`);
    
    if (prodResult.status === 200) {
      console.log(`📊 프로덕션 API 응답: ${prodResult.data.items?.length || 0}개 공지사항`);
      console.log(`📝 프로덕션 API 노트: ${prodResult.data.note || 'none'}`);
      
      if (prodResult.data.items && prodResult.data.items.length > 0) {
        console.log(`📋 첫 번째 공지사항: ${prodResult.data.items[0].title}`);
        console.log(`📋 첫 번째 공지사항 내용: ${prodResult.data.items[0].content?.substring(0, 50)}...`);
      }
    } else {
      console.log(`❌ 프로덕션 API 실패: ${prodResult.status}`);
      console.log(`📄 응답 내용: ${JSON.stringify(prodResult.data, null, 2)}`);
    }
    console.log('');
    
    // 2. 헬스체크 API 테스트
    console.log('2️⃣ 헬스체크 API 테스트');
    const healthResult = await makeRequest('https://www.urbane-cmsh.com/api/_health/db');
    console.log(`📡 헬스체크 상태: ${healthResult.status}`);
    
    if (healthResult.status === 200) {
      console.log(`📊 헬스체크 응답:`, healthResult.data);
    } else {
      console.log(`❌ 헬스체크 실패: ${healthResult.status}`);
    }
    
  } catch (error) {
    console.error('❌ 테스트 중 오류:', error.message);
  }
}

testAPI();
