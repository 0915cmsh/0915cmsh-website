import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// 이메일 설정 (네이버 웍스)
const transporter = nodemailer.createTransport({
  host: 'smtp.naver.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'hj.kim@urbane-gp.com',
    pass: process.env.EMAIL_PASS || 'your-naver-password' // 네이버 웍스 비밀번호
  }
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, email, phone, company, position, title, body: content } = body;

    // 이메일 제목
    const subject = `[CMSH 문의] ${title} - ${name}`;

    // 이메일 내용
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          새로운 문의가 접수되었습니다
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">문의 정보</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">문의 유형:</td>
              <td style="padding: 8px 0;">${type === 'outsourcing' ? '아웃소싱' : 
                                         type === 'dispatch' ? '파견' : 
                                         type === 'contract' ? '도급' : type}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">제목:</td>
              <td style="padding: 8px 0;">${title}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">작성자:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">이메일:</td>
              <td style="padding: 8px 0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">전화번호:</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">회사:</td>
              <td style="padding: 8px 0;">${company}</td>
            </tr>
            ` : ''}
            ${position ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">직책:</td>
              <td style="padding: 8px 0;">${position}</td>
            </tr>
            ` : ''}
          </table>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="color: #1e40af; margin-top: 0;">문의 내용</h3>
          <p style="line-height: 1.6; color: #374151;">${content.replace(/\n/g, '<br>')}</p>
        </div>

        <div style="margin-top: 30px; padding: 15px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">
            <strong>관리자 대시보드에서 답변을 확인하고 처리해주세요.</strong><br>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4115'}/admin/dashboard" 
               style="color: #2563eb; text-decoration: none;">
              관리자 대시보드 바로가기
            </a>
          </p>
        </div>

        <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
          <p>이 이메일은 CMSH 문의 시스템에서 자동으로 발송되었습니다.</p>
        </div>
      </div>
    `;

    // 이메일 발송
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'hj.kim@urbane-gp.com',
      to: 'hj.kim@urbane-gp.com',
      subject: subject,
      html: htmlContent
    });

    return NextResponse.json({ success: true, message: '이메일이 성공적으로 발송되었습니다.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
