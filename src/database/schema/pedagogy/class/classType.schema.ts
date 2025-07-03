import mongoose, { ObjectId, Types } from "mongoose";
import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";

export interface ISubSubjectOfClassType {
  subSubjectType: ObjectId;
  coefficient: number;
  exams: { examType: ObjectId; coefficient: number }[];
}

export interface ISubjectOfClassType {
  subjectType: ObjectId;
  subSubjects: ISubSubjectOfClassType[];
  coefficient: number;
  exams: { examType: ObjectId; coefficient: number }[];
}

export type TActivityOfClassType = {
  durationInMinutes: number;
  sessionTypeId: ObjectId;
  week?: "A" | "B";
  perGroup?: boolean;
} & (
  | { subjectTypeId: undefined; subSubjectTypeId: ObjectId }
  | { subjectTypeId: ObjectId; subSubjectTypeId: undefined }
);

export interface IClassType extends IEntity {
  name: string;
  subLevel: ObjectId;
  section: ObjectId;
  nextClassTypes: ObjectId[];
  subjects: ISubjectOfClassType[];
  fields: {
    _id: Types.ObjectId;
    name: string;
    subjects: ObjectId[];
    coefficient: number;
  }[];
  isTerminal: boolean;
  capacity: number;
  activities: TActivityOfClassType[];
  maxGapsPerWeekInMinutes: number;
}

export const classTypeSchema = createSchema<IClassType>({
  name: {
    type: String,
    unique: true,
  },
  subLevel: {
    type: mongoose.Types.ObjectId,
    ref: "subLevel",
  },
  section: {
    type: mongoose.Types.ObjectId,
    ref: "section",
  },
  nextClassTypes: [{ type: mongoose.Types.ObjectId, ref: "classType", default: [] }],
  subjects: [
    {
      subjectType: { type: mongoose.Types.ObjectId, ref: "subjectType" },
      subSubjects: [
        {
          subSubjectType: { type: mongoose.Types.ObjectId, ref: "subSubjectType" },
          coefficient: Number,
          exams: [
            {
              examType: { type: mongoose.Types.ObjectId, ref: "examType" },
              coefficient: Number,
              default: [],
            },
          ],
        },
      ],
      coefficient: Number,
      exams: [
        {
          examType: { type: mongoose.Types.ObjectId, ref: "examType" },
          coefficient: Number,
          default: [],
        },
      ],
    },
  ],
  fields: [
    {
      _id: Types.ObjectId,
      name: String,
      subjects: [{ type: mongoose.Types.ObjectId, ref: "subjectType" }],
      coefficient: Number,
    },
  ],
  capacity: Number,
  isTerminal: Boolean,
  activities: [
    {
      subjectTypeId: { type: mongoose.Types.ObjectId, ref: "subjectType" },
      subSubjectTypeId: { type: mongoose.Types.ObjectId, ref: "subSubjectType" },
      durationInMinutes: Number,
      sessionTypeId: { type: mongoose.Types.ObjectId, ref: "sessionType" },
      week: String,
      perGroup: Boolean,
    },
  ],
  maxGapsPerWeekInMinutes: Number,
});
