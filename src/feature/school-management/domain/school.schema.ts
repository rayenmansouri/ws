import { model, Schema } from "mongoose";
import { School } from "./school.entity";

export const SchoolSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String, required: true },
  subdomain: { type: String, required: true },
});

export const SchoolModel = model<School>("School", SchoolSchema);