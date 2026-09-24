import express from "express";
import { createCustomer } from "../controllers/customerController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, createCustomer);

export default router;