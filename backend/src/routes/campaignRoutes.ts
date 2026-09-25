import express from "express";

import {
    createCampaign,
    getCampaigns,
    getCampaign,
    updateCampaign,
    deleteCampaign,
} from "../controllers/campaignController";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, createCampaign);

router.get("/", protect, getCampaigns);

router.get("/:id", protect, getCampaign);

router.put("/:id", protect, updateCampaign);

router.delete("/:id", protect, deleteCampaign);

export default router;