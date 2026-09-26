import { Request, Response } from "express";
import Campaign from "../models/Campaign";
import Customer from "../models/Customer";
import EmailTemplate from "../models/EmailTemplate";

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const totalCampaigns = await Campaign.countDocuments({
      createdBy: userId,
    });

    const totalCustomers = await Customer.countDocuments({
      userId,
    });

    const totalTemplates = await EmailTemplate.countDocuments({
      userId,
    });

    const successfulCampaigns = await Campaign.countDocuments({
      createdBy: userId,
      status: "sent",
    });

    const failedCampaigns = await Campaign.countDocuments({
      createdBy: userId,
      status: "failed",
    });

    res.status(200).json({
      totalCampaigns,
      totalCustomers,
      totalTemplates,
      successfulCampaigns,
      failedCampaigns,
    });
  } catch (error) {
    console.error("Analytics error:", error);

    res.status(500).json({
      message: "Failed to fetch analytics",
    });
  }
};
