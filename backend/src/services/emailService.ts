
import { BrevoClient } from "@getbrevo/brevo";

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.BREVO_FROM_EMAIL;

  if (!apiKey) {
    throw new Error("BREVO_API_KEY is missing");
  }

  if (!fromEmail) {
    throw new Error("BREVO_FROM_EMAIL is missing");
  }

  const brevo = new BrevoClient({
    apiKey: apiKey,
  });

  const result = await brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: "MailFlow",
      email: fromEmail,
    },
    to: [
      {
        email: to,
      },
    ],
    subject: subject,
    htmlContent: html,
  });

  return {
    message: "Email sent successfully",
    messageId: result.messageId,
  };
};