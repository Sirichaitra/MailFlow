import { Request, Response } from "express";
import mongoose from "mongoose";
import Segment from "../models/Segment";
import Customer from "../models/Customer";

export const createSegment = async (req: Request, res: Response) => {
    try {
        const { name, description, customerIds } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                message: "Name and description are required",
            });
        }

        if (!Array.isArray(customerIds)) {
            return res.status(400).json({
                message: "customerIds must be an array",
            });
        }

        const userId = (req as any).user.userId;

        const validIds = customerIds.every((id: string) =>
            mongoose.Types.ObjectId.isValid(id)
        );

        if (!validIds) {
            return res.status(400).json({
                message: "Invalid customer ID",
            });
        }

        const customers = await Customer.find({
            _id: { $in: customerIds },
            userId: userId,
        });

        if (customers.length !== customerIds.length) {
            return res.status(403).json({
                message: "You can only add your own customers",
            });
        }

        const segment = await Segment.create({
            name,
            description,
            customerIds,
            createdBy: userId,
        });

        return res.status(201).json({
            message: "Segment created successfully",
            segment,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to create segment",
        });
    }
};