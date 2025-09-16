import nodemailer from 'nodemailer';

export const mailer = nodemailer.createTransport({
  host: 'smtp.worksmobile.com',
  port: 465,
  secure: true, // 465=SSL
  auth: {
    user: 'hj.kim@urbane-gp.com',
    pass: '3Pbh15p2vwsA',
  },
});

export async function sendInquiryMail(payload: {
  type: string; title: string; name: string; phone: string;
  email?: string; content: string;
}) {
  // 이메일 발송 (하드코딩된 설정 사용)
  console.log('이메일 발송 시도:', payload.title);

  const to = 'hj.kim@urbane-gp.com'; // 운영 수신함
  const subject = `[CMSH 문의] ${payload.type} - ${payload.title}`;
  const html = `
    <h2>새 문의 접수</h2>
    <ul>
      <li><b>유형</b>: ${payload.type}</li>
      <li><b>제목</b>: ${payload.title}</li>
      <li><b>이름</b>: ${payload.name}</li>
      <li><b>연락처</b>: ${payload.phone}</li>
      <li><b>이메일</b>: ${payload.email ?? '-'}</li>
      <li><b>내용</b>: ${payload.content.replace(/\n/g,'<br/>')}</li>
    </ul>
    <p>※ 본 메일은 시스템에서 자동 발송되었습니다.</p>
  `;
  return mailer.sendMail({
    from: 'hj.kim@urbane-gp.com',
    to,
    subject,
    html,
  });
}
