import { Document, Schema } from "mongoose";

export interface ICounterSchema extends Document {
  collectionName: string;
  count: number;
}

export const CounterSchema = new Schema<ICounterSchema>(
  {
    collectionName: {
      type: String,
      required: true,
      unique: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);
