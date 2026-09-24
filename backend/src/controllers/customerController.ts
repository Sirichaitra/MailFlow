import { Request, Response } from "express";
import Customer from "../models/Customer";

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required",
            });
        }

        const customer = await Customer.create({
            userId: (req as any).user.userId,
            name,
            email,
        });

        return res.status(201).json({
            message: "Customer created successfully",
            customer,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to create customer",
        });
    }
};