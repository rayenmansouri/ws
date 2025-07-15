import mongoose, { ObjectId, Schema } from "mongoose";

export interface ICentralUser {
  _id: ObjectId;
  newId: string;
  email?: string;
  phoneNumber?: string;
  userId: ObjectId;
  tenantId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
export const centralUserSchema = new Schema<ICentralUser>(
  {
    email: { type: String, unique: true, sparse: true },
    newId: { type: String, unique: true, index: true },
    phoneNumber: { type: String, unique: true, sparse: true },
    userId: { type: mongoose.Types.ObjectId, unique: true },
    tenantId: { type: mongoose.Types.ObjectId },
    createdAt: Date,
    updatedAt: Date,
  },
  { versionKey: false, timestamps: true, excludeIndexes: true },
);
