import { model, Schema } from "mongoose";
import { createCompleteSchema } from "../../../core/database/schema";
import { OrganizationSystemType, FEATURE_FLAGS_ENUM, ZoneTemplate } from "../enums";

export const OrganizationKey = "organizations";


export const OrganizationSchema = createCompleteSchema<any>({
  name: "Organization",
  schemaDefinition: new Schema({
  name: { type: String, required: true },
  address: { type: String, required: false, default: "" },
  phone: { type: String, required: false, default: "" },
  email: { type: String, required: true },
  website: { type: String, required: false, default: "" },
  subdomain: { type: String, required: true },
  directorName: { type: String, required: true },
  configName: { type: String, required: false, default: "Default Config" },
  maxStudentSeats: { type: Number, required: false, default: 100 },
  timeZone: { type: String, required: false },
  logo: { type: String, required: false },
  forceCloseSessionDelayInMin: { type: Number, required: false, default: 30 },
  openSessionDelayInMin: { type: Number, required: false, default: 15 },
  openSessionAdvanceInMin: { type: Number, required: false, default: 5 },
  notAvailableTimes: { type: [{ day: Number, hours: [Number] }], required: false, default: [] },
  cover: { type: String, required: false, default: "" },
  phoneNumber: { type: String, required: false, default: "" },
  organizationSystemType: { type: String, enum: Object.values(OrganizationSystemType), required: false, default: OrganizationSystemType.DNC },
  enableSms: { type: Boolean, required: false, default: false },
  zonetemplate: { type: String, enum: Object.values(ZoneTemplate), required: false },
  country: { type: String, required: false, default: "" },
  featureFlags: { 
    type: Object, 
    required: false, 
    default: {
      [FEATURE_FLAGS_ENUM.MESSAGES]: true,
      [FEATURE_FLAGS_ENUM.ANNOUNCEMENTS]: true,
      [FEATURE_FLAGS_ENUM.SMART_CALENDAR]: true,
      [FEATURE_FLAGS_ENUM.TUTORIALS]: true,
      [FEATURE_FLAGS_ENUM.DARK_MODE]: false,
      [FEATURE_FLAGS_ENUM.LMS]: false
    }
  }})})



export const OrganizationModel = model<any>(OrganizationKey, OrganizationSchema);