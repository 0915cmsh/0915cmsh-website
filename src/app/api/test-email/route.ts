import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    console.log('이메일 테스트 시작...');
    console.log('환경 변수 확인:', {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_SECURE: process.env.SMTP_SECURE,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS ? '***설정됨***' : '미설정'
    });

    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.worksmobile.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'hj.kim@urbane-gp.com',
        pass: process.env.SMTP_PASS || '3Pbh15p2vwsA',
      },
    });

    // SMTP 연결 테스트
    console.log('SMTP 연결 테스트 중...');
    await transporter.verify();
    console.log('SMTP 연결 성공!');

    // 테스트 이메일 발송
    const mailOptions = {
      from: process.env.SMTP_USER || 'hj.kim@urbane-gp.com',
      to: process.env.SMTP_USER || 'hj.kim@urbane-gp.com',
      subject: '[CMSH 테스트] 이메일 발송 테스트',
      html: `
        <h2>이메일 발송 테스트</h2>
        <p>이 이메일이 정상적으로 수신되었다면 SMTP 설정이 올바르게 작동하고 있습니다.</p>
        <p><strong>발송 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
      `,
    };

    console.log('테스트 이메일 발송 중...');
    const result = await transporter.sendMail(mailOptions);
    console.log('테스트 이메일 발송 완료!', result.messageId);

    return NextResponse.json({ 
      success: true, 
      message: '이메일 발송 테스트 성공',
      messageId: result.messageId 
    });
  } catch (error) {
    console.error('이메일 발송 테스트 실패:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: {
        code: error.code,
        response: error.response
      }
    }, { status: 500 });
  }
}


