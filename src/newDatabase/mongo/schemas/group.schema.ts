import { Types } from "mongoose";
import { Group } from "../../../feature/groupManagement/domains/group.entity";
import { createMongoSchema } from "../createSchema";
import { mongoGroupTypeSchema } from "./groupType.schema";

export const mongoGroupSchema = createMongoSchema<Group>({
  name: String,
  groupType: mongoGroupTypeSchema,
  teacher: { type: Types.ObjectId, ref: "teacher" },
  students: [{ type: Types.ObjectId, ref: "student" }],
  schoolYears: [{ type: Types.ObjectId, ref: "schoolYear" }],
  levels: [{ type: Types.ObjectId, ref: "level" }],
  classTypes: [{ type: Types.ObjectId, ref: "classType" }],
});
