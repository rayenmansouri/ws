import { Types } from "mongoose";
import { ClassGroup } from "../../../feature/classes/domain/classGroup.entity";
import { createMongoSchema } from "../createSchema";

export const mongoClassGroupSchema = createMongoSchema<ClassGroup>({
  name: String,
  class: { type: Types.ObjectId, ref: "class" },
  students: [{ type: Types.ObjectId, ref: "student" }],
});
