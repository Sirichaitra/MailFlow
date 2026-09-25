import mongoose, { Document, Schema } from "mongoose";

export interface ISegment extends Document {
    name: string;
    description: string;
    customerIds: mongoose.Types.ObjectId[];
    createdBy: mongoose.Types.ObjectId;
}

const segmentSchema = new Schema<ISegment>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        customerIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Customer",
            },
        ],

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

const Segment = mongoose.model<ISegment>(
    "Segment",
    segmentSchema
);

export default Segment;