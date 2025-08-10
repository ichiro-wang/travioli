import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer/index.js";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

export class EmailService {
  private transporter: Mail<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;

  constructor() {
    /**
     * using Gmail SMTP to send emails
     */
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    const info = await this.transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      html, // HTML body
    });

    console.log("Message sent:", info.messageId);
  }
}
