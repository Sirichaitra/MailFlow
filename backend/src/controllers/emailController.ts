import { Request, Response } from "express";
import { sendEmail } from "../services/emailService";

export const sendTestEmail = async (
  req: Request,
  res: Response
): Promise<void> => {

  console.log("========== EMAIL REQUEST RECEIVED ==========");
  console.log("Body:", req.body);

  const { to, subject, html } = req.body;

  if (
    typeof to !== "string" ||
    typeof subject !== "string" ||
    typeof html !== "string" ||
    !to.trim() ||
    !subject.trim() ||
    !html.trim()
  ) {
    console.log("Invalid email request");

    res.status(400).json({
      message: "Please provide to, subject, and html.",
    });

    return;
  }

  console.log("Calling Brevo...");

  try {
    const result = await sendEmail(
      to,
      subject,
      html
    );

    console.log("Brevo response:", result);

    res.status(200).json(result);

  } catch (error) {

    console.error("========== BREVO ERROR ==========");
    console.error(error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to send email.";

    res.status(500).json({
      message,
    });
  }
};