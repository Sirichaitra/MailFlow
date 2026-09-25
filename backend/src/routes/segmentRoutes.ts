import express from "express";
import { createSegment } from "../controllers/segmentController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, createSegment);

export default router;