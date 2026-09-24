import mongoose, { Document, Schema } from "mongoose";

export interface ICustomer extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    email: string;
}

const customerSchema = new Schema<ICustomer>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
    },
    {
        timestamps: true,
    }
);

const Customer = mongoose.model<ICustomer>(
    "Customer",
    customerSchema
);

export default Customer;