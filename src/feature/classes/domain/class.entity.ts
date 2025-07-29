import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Classroom } from "../../classrooms/domains/classroom.entity";
import { ClassType } from "../../classTypes/repo/classType.entity";
import { SchoolYear } from "../../schoolYears/domain/schoolYear.entity";
import { Student } from "../../students/domain/student.entity";
import { ClassGroup } from "./classGroup.entity";

type teacherId = ID;

type SubjectTeacherMap = Record<string, teacherId | null>;
type SubSubjectTeacherMap = Record<string, teacherId | null>;

export type Class = {
  name: string;
  classType: ID;
  schoolYear: ID;
  students: ID[];
  subjectTeacherMap: SubjectTeacherMap;
  subSubjectTeacherMap: SubSubjectTeacherMap;
  classGroups: ID[];
  notAvailableTimes: { day: number; hours: number[] }[];
  maxHoursPerDay: number | null;
  maxGapsPerDay: number | null;
  maxContinuousHours: number | null;
  preferredClassroom: ID | null;
} & BaseEntity;

export type ClassMetaData = GenerateMetaData<
  Class,
  {
    classType: ClassType;
    students: Student[];
    schoolYear: SchoolYear;
    classGroups: ClassGroup[];
    preferredClassroom: Classroom;
  }
>;
