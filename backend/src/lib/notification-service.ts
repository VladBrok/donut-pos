import { logError } from "donut-shared/src/lib/log.js";
import * as nodemailer from "nodemailer";

export async function sendEmailNotification(toEmail: string, text: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL || "",
        pass: process.env.EMAIL_PASSWORD || "",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL || "",
      to: toEmail,
      subject: "Dev donut notification",
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    logError(`Error sending email ${text} to ${toEmail}: `, error);
  }
}
