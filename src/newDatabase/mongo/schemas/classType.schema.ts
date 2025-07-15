import { Types } from "mongoose";
import { ClassType } from "../../../feature/classTypes/repo/classType.entity";
import { createMongoSchema } from "../createSchema";

export const mongoClassTypeSchema = createMongoSchema<ClassType>({
  name: String,
  capacity: Number,
  subLevel: { type: Types.ObjectId, ref: "subLevel" },
  section: { type: Types.ObjectId, ref: "section" },
  isTerminal: Boolean,
  nextClassTypes: [{ type: Types.ObjectId, ref: "classType" }],
  activities: [
    {
      durationInMinutes: Number,
      sessionType: { type: Types.ObjectId, ref: "sessionType" },
      subjectType: { type: Types.ObjectId, ref: "subjectType" },
      subSubjectType: { type: Types.ObjectId, ref: "subSubjectType" },
      perGroup: Boolean,
      week: String,
    },
  ],
  fields: [
    {
      _id: Types.ObjectId,
      coefficient: Number,
      name: String,
      subjects: [{ type: Types.ObjectId, ref: "subjectType" }],
    },
  ],
  maxGapsPerWeekInMinutes: Number,
  subjects: [
    {
      subjectType: { type: Types.ObjectId, ref: "subjectType" },
      coefficient: Number,
      exams: [
        {
          coefficient: Number,
          examType: { type: Types.ObjectId, ref: "examType" },
        },
      ],
      subSubjects: [
        {
          subSubjectType: { type: Types.ObjectId, ref: "subSubjectType" },
          coefficient: Number,
          exams: [
            {
              coefficient: Number,
              examType: { type: Types.ObjectId, ref: "examType" },
            },
          ],
        },
      ],
    },
  ],
});
