import { Schema } from "mongoose";

export const CoachSchema = new Schema({
    description: { type: String, required: false },
});