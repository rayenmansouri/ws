import { ObjectId } from "mongoose";
import { FileDetails } from "../core/fileManager/FileManager";

export interface IEntity {
  _id: ObjectId;
  newId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IEntity {
  firstName: string;
  lastName: string;
  avatar: FileDetails;
  fullName: string;
  gender: string;
  address1: string;
  address2?: string;
  phoneNumber?: string;
  birthDate: Date;
  bloodType?: string;
  email?: string;
  password: string;
  passwordChangedAt?: Date;
  isArchived: boolean;
  archivedAt: Date | null;
  isActive: boolean;
}

export const newfileSchema = {
  name: String,
  link: String,
  uploadedAt: Date,
  path: String,
  size: Number,
  mimeType: String,
};

export type entityWithSchedule =
  | "student"
  | "parent"
  | "teacher"
  | "class"
  | "classroom"
  | "optionalSubject";
