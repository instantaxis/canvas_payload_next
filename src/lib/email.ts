import nodemailer from 'nodemailer'

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  // Configure your SMTP transport here
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'no-reply@example.com',
    to,
    subject: 'Password Reset',
    text: `Reset your password: ${resetUrl}`,
    html: `<p>Reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`,
  })
}
