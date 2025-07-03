import mongoose, { ObjectId, Schema } from "mongoose";
import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";

type teacherId = ObjectId;

type SubjectTeacherMap = Record<string, teacherId | null>;
type SubSubjectTeacherMap = Record<string, teacherId | null>;

export interface IClass extends IEntity {
  name: string;
  classType: ObjectId;
  schoolYear: ObjectId;
  students: ObjectId[];
  subjectTeacherMap: SubjectTeacherMap;
  subSubjectTeacherMap: SubSubjectTeacherMap;
  classGroups: ObjectId[];
  notAvailableTimes: { day: number; hours: number[] }[];
  maxHoursPerDay: number | null;
  minHoursPerDay: number | null;
  maxContinuousHours: number | null;
  preferredClassroom: ObjectId | null;
  gradeReports: { term: ObjectId }[];
}

export const gradeReportSchema = new Schema(
  {
    term: { type: mongoose.Types.ObjectId, ref: "term" },
  },
  { _id: false },
);

const notAvailableTimeSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
    },
    hours: {
      type: [Number],
      default: [],
    },
  },
  { _id: false },
);

export const classSchema = createSchema<IClass>(
  {
    name: String,
    classType: {
      type: mongoose.Types.ObjectId,
      ref: "classType",
    },
    schoolYear: {
      type: mongoose.Types.ObjectId,
      ref: "schoolYear",
    },
    students: [{ type: mongoose.Types.ObjectId, ref: "student" }],
    subjectTeacherMap: { type: Schema.Types.Mixed, default: {} },
    subSubjectTeacherMap: { type: Schema.Types.Mixed, default: {} },
    notAvailableTimes: { type: [notAvailableTimeSchema] },
    maxHoursPerDay: { type: Number, default: null },
    minHoursPerDay: { type: Number, default: null },
    maxContinuousHours: { type: Number, default: null },
    preferredClassroom: { type: mongoose.Types.ObjectId, ref: "classroom", default: null },
    classGroups: [{ type: mongoose.Types.ObjectId, ref: "classGroup" }],
    gradeReports: {
      type: [gradeReportSchema],
      default: [],
    },
  },
  { minimize: false },
);

classSchema.index({ name: 1, schoolYear: 1, classType: 1 }, { unique: true });
