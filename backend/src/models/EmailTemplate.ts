import mongoose, { Document, Schema } from "mongoose";

export interface IEmailTemplate extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    subject: string;
    content: string;
}

const emailTemplateSchema = new Schema<IEmailTemplate>(
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

        subject: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const EmailTemplate = mongoose.model<IEmailTemplate>(
    "EmailTemplate",
    emailTemplateSchema
);

export default EmailTemplate;