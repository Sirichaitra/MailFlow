import { Router } from "express";
import {
    register,
    login
} from "../controllers/authController";
import {
    protect,
    AuthRequest
} from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", protect, (req: AuthRequest, res) => {
    res.json({
        message: "Profile accessed successfully",
        user: req.user
    });
});

export default router;