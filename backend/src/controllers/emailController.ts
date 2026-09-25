import { Request, Response } from "express";
import { sendEmail } from "../services/emailService";

export const sendTestEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { to, subject, html } = req.body;

  if (
    typeof to !== "string" ||
    typeof subject !== "string" ||
    typeof html !== "string" ||
    !to.trim() ||
    !subject.trim() ||
    !html.trim()
  ) {
    res.status(400).json({
      message: "Please provide to, subject, and html.",
    });
    return;
  }

  try {
    const result = await sendEmail(to, subject, html);
    res.status(200).json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send email.";

    res.status(500).json({ message });
  }
};