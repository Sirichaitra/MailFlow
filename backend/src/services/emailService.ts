import { BrevoClient } from "@getbrevo/brevo";

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {

  console.log("Starting Brevo email service...");

  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.BREVO_FROM_EMAIL;

  console.log(
    "Brevo API key exists:",
    !!apiKey
  );

  console.log(
    "Brevo sender email:",
    fromEmail
  );

  if (!apiKey) {
    throw new Error("BREVO_API_KEY is missing");
  }

  if (!fromEmail) {
    throw new Error("BREVO_FROM_EMAIL is missing");
  }

  const brevo = new BrevoClient({
    apiKey: apiKey,
  });

  console.log("Sending request to Brevo...");

  const result =
    await brevo.transactionalEmails.sendTransacEmail({
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

  console.log("Brevo request completed.");

  return {
    message: "Email sent successfully",
    messageId: result.messageId,
  };
};