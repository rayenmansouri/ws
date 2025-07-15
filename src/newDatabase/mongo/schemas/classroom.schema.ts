import { Types } from "mongoose";
import { createMongoSchema } from "../createSchema";
import { Classroom } from "../../../feature/classrooms/domains/classroom.entity";

export const mongoClassroomSchema = createMongoSchema<Classroom>({
  name: String,
  allowAllSubjects: Boolean,
  allowAllSessionTypes: Boolean,
  subjectTypes: [{ type: Types.ObjectId, ref: "subjectType" }],
  sessionTypes: [{ type: Types.ObjectId, ref: "sessionType" }],
});
