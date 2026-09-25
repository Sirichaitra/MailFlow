import mongoose, { Document, Schema } from "mongoose";

export interface ICampaign extends Document {
    name: string;
    subject: string;
    template: mongoose.Types.ObjectId;
    recipients: string[];
    status: string;
    createdBy: mongoose.Types.ObjectId;
}

const campaignSchema = new Schema<ICampaign>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        subject: {
            type: String,
            required: true,
            trim: true,
        },

        template: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "EmailTemplate",
            required: true,
        },

        recipients: {
            type: [String],
            required: true,
        },

        status: {
            type: String,
            default: "draft",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Campaign = mongoose.model<ICampaign>(
    "Campaign",
    campaignSchema
);

export default Campaign;