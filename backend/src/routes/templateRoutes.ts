import { Router } from "express";

import {
    createTemplate,
    getTemplates,
    updateTemplate,
    deleteTemplate,
} from "../controllers/templateController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

// Create template
router.post("/", protect, createTemplate);

// Get all templates
router.get("/", protect, getTemplates);

// Update template
router.put("/:id", protect, updateTemplate);

// Delete template
router.delete("/:id", protect, deleteTemplate);

export default router;