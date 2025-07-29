import * as moongoose from "mongoose";
import { Schema } from "mongoose";
import { School } from "../../../feature/schools/domain/school.entity";
import { createMongoSchema } from "../createSchema";
import { newfileSchema } from "../../../types/entities";

const mongoSchoolSchema = createMongoSchema<School>({
  name: String,
  subdomain: String,
  address: String,
  phoneNumber: String,
  email: String,
  directorName: String,
  dueDate: Number,
  taxRate: Number,
  timeZone: String,
  currency: String,
  logo: String,
  forceCloseSessionDelayInMin: Number,
  openSessionDelayInMin: Number,
  openSessionAdvanceInMin: Number,
  maxStudentSeats: Number,
  notAvailableTimes: [
    {
      day: Number,
      hours: [{ type: Number }],
    },
  ],
  educationDepartment: String,
  enableSms: Boolean,
  enableEmail: Boolean,
  instanceType: String,
  cover: String,
  gradeBookTheme: String,
  featureFlags: Schema.Types.Mixed,
  schedule: {
    startHour: Number,
    endHour: Number,
    days: [{ type: Number }],
    step: Number,
  },
  signature: { type: newfileSchema },
  financeSignature: { type: newfileSchema },
  academicSignature: { type: newfileSchema },
  totalSmsSold: Number,
  schoolSystem: String,
});

export const mongoSchoolModel = moongoose.model<School>("schools", mongoSchoolSchema);
