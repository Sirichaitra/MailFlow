import { Router } from "express";
import { sendTestEmail } from "../controllers/emailController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/send", protect, sendTestEmail);

export default router;