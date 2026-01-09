import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Gmail 은 2단계 인증하고 앱비밀번호를 발행하여
// nodemailer 에서 사용해야 합니다.
// https://support.google.com/accounts/answer/185833?hl=ko
// https://myaccount.google.com/apppasswords
// 앱비밀번호는 공백을 없애고 .env 파일에 MAIL_PW 로 저장합니다.

router.post('/send-password-mail', async (req, res) => {
  const { email, pwd } = req.body;

  console.log('Received request to send password mail to:', email);
  console.log('Received request to send password mail to:', pwd);

  if (!email || !pwd) {
    return res
      .status(400)
      .json({ success: false, message: 'email 또는 pwd 누락' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PW,
      },
    });

    console.log('email:', email);
    console.log('pwd:', pwd);

    await transporter.verify();
    console.log('✅ SMTP 연결 성공');

    await transporter.sendMail({
      from: `"G-Travel" <${process.env.MAIL_ID}>`,
      to: email,
      subject: '[G-Travel] 비밀번호 안내',
      html: `
        <p>안녕하세요.</p>
        <p>요청하신 비밀번호 안내 메일입니다.</p>
        <p>비밀번호 : 비밀번호는 흰 글자색으로 되어 있습니다. 아래줄을 선택하세요</p>
        <p style="color: white;">${pwd}</p>
      `,
    });

    res.json({ success: true });
    console.log('메일 발송 성공');
  } catch (err) {
    console.error('메일 발송 실패', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router; // ✅ ES Module default export
