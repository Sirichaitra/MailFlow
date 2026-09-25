
import { Response } from "express";
import mongoose from "mongoose";
import Campaign from "../models/Campaign";
import EmailTemplate from "../models/EmailTemplate";
import { AuthRequest } from "../middleware/authMiddleware";


// Create Campaign
export const createCampaign = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { name, subject, template, recipients, status } = req.body;

        const templateExists = await EmailTemplate.findOne({
            _id: template,
            userId: req.user?.userId,
        });

        if (!templateExists) {
            res.status(404).json({
                message: "Email template not found",
            });
            return;
        }

        const campaign = await Campaign.create({
            name,
            subject,
            template,
            recipients,
            status: status || "draft",
            createdBy: req.user?.userId,
        });

        res.status(201).json(campaign);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create campaign",
            error,
        });
    }
};


// Get all campaigns
export const getCampaigns = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const campaigns = await Campaign.find({
            createdBy: req.user?.userId,
        }).populate("template");

        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get campaigns",
            error,
        });
    }
};


// Get one campaign
export const getCampaign = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const id = req.params.id as string;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid campaign ID",
            });
            return;
        }

        const campaign = await Campaign.findOne({
            _id: id,
            createdBy: req.user?.userId,
        }).populate("template");

        if (!campaign) {
            res.status(404).json({
                message: "Campaign not found",
            });
            return;
        }

        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get campaign",
            error,
        });
    }
};


// Update Campaign
export const updateCampaign = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const id = req.params.id as string;
        const { name, subject, template, recipients, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid campaign ID",
            });
            return;
        }

        if (template) {
            const templateExists = await EmailTemplate.findOne({
                _id: template,
                userId: req.user?.userId,
            });

            if (!templateExists) {
                res.status(404).json({
                    message: "Email template not found",
                });
                return;
            }
        }

        const campaign = await Campaign.findOneAndUpdate(
            {
                _id: id,
                createdBy: req.user?.userId,
            },
            {
                name,
                subject,
                template,
                recipients,
                status,
            },
            {
                new: true,
                runValidators: true,
            }
        ).populate("template");

        if (!campaign) {
            res.status(404).json({
                message: "Campaign not found",
            });
            return;
        }

        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update campaign",
            error,
        });
    }
};


// Delete Campaign
export const deleteCampaign = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const id = req.params.id as string;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid campaign ID",
            });
            return;
        }

        const campaign = await Campaign.findOneAndDelete({
            _id: id,
            createdBy: req.user?.userId,
        });

        if (!campaign) {
            res.status(404).json({
                message: "Campaign not found",
            });
            return;
        }

        res.status(200).json({
            message: "Campaign deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete campaign",
            error,
        });
    }
};
