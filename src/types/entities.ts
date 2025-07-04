import { ObjectId } from "mongoose";

export interface IEntity {
  _id: ObjectId;
  newId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const fileSchema = {
  name: String,
  link: String,
  uploadedAt: Date,
  path: String,
  size: Number,
  mimeType: String,
};
