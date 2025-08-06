import { model } from "mongoose";
import { Organization, GradeBookTheme } from "./organization.entity";
import { createCompleteSchema } from "../../../core/database/schema";
import { OrganizationSystemType } from "../enums";

export const OrganizationKey = "organizations";
export const OrganizationSchema = createCompleteSchema<Organization>({
  name: "Organization",
  schemaDefinition: {
  name: { type: String, required: true },
  address: { type: String, required: false, default: "" },
  email: { type: String, required: true },
  website: { type: String, required: false, default: "" },
  subdomain: { type: String, required: true },
  directorName: { type: String, required: true },
  configName: { type: String, required: false, default: "Default Config" },
  maxStudentSeats: { type: Number, required: false, default: 100 },
  gradeBookTheme: { type: String, enum: Object.values(GradeBookTheme), required: false, default: GradeBookTheme.BLUE },
  enableEmail: { type: Boolean, required: false, default: true },
  timeZone: { type: String, required: false },
  logo: { type: String, required: false },
  forceCloseSessionDelayInMin: { type: Number, required: false, default: 30 },
  openSessionDelayInMin: { type: Number, required: false, default: 15 },
  openSessionAdvanceInMin: { type: Number, required: false, default: 5 },
  notAvailableTimes: { type: [{ day: Number, hours: [Number] }], required: false, default: [] },
  cover: { type: String, required: false, default: "" },
  phoneNumber: { type: String, required: false, default: "" },
  organizationSystemType: { type: String, enum: Object.values(OrganizationSystemType), required: false, default: OrganizationSystemType.DNC },
  },
  options: {
    timestamps: true,
  },
});

export const OrganizationModel = model<Organization>(OrganizationKey, OrganizationSchema);