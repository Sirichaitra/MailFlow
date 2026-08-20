import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import EmailTemplate from "../models/EmailTemplate";

// CREATE TEMPLATE
export const createTemplate = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { name, subject, content } = req.body;

        if (!name || !subject || !content) {
            res.status(400).json({
                message: "All fields are required",
            });
            return;
        }

        const template = await EmailTemplate.create({
            userId: req.user?.userId,
            name,
            subject,
            content,
        });

        res.status(201).json({
            message: "Template created successfully",
            template,
        });
    } catch (error) {
        console.error("Create template error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

// GET ALL TEMPLATES
export const getTemplates = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const templates = await EmailTemplate.find({
            userId: req.user?.userId,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Templates fetched successfully",
            templates,
        });
    } catch (error) {
        console.error("Get templates error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

// UPDATE TEMPLATE
export const updateTemplate = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, subject, content } = req.body;

        const template = await EmailTemplate.findOne({
            _id: id,
            userId: req.user?.userId,
        });

        if (!template) {
            res.status(404).json({
                message: "Template not found",
            });
            return;
        }

        if (name) {
            template.name = name;
        }

        if (subject) {
            template.subject = subject;
        }

        if (content) {
            template.content = content;
        }

        await template.save();

        res.status(200).json({
            message: "Template updated successfully",
            template,
        });
    } catch (error) {
        console.error("Update template error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

// DELETE TEMPLATE
export const deleteTemplate = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;

        const template = await EmailTemplate.findOne({
            _id: id,
            userId: req.user?.userId,
        });

        if (!template) {
            res.status(404).json({
                message: "Template not found",
            });
            return;
        }

        await EmailTemplate.deleteOne({
            _id: id,
            userId: req.user?.userId,
        });

        res.status(200).json({
            message: "Template deleted successfully",
        });
    } catch (error) {
        console.error("Delete template error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};