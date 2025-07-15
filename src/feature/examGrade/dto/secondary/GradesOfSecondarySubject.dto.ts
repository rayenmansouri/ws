import { ID } from "../../../../types/BaseEntity";
import { UserProfileDTO } from "../../../users/dtos/userProfile.dto";

export type GradesOfSecondarySubjectDTO = {
  subjectName: string;
  totalNumberOfStudents: number;
  highestAverage: string | null;
  lowestAverage: string | null;
  canEdit: boolean;
  hasSubSubjects: boolean;
  subSubjects: {
    name: string;
    newId: string;
  }[];
  selectedSubSubject: {
    name: string;
    newId: string;
  } | null;
  headers: {
    name: string;
    examGradeId: ID;
    coefficient: number;
  }[];
  studentGrades: {
    student: UserProfileDTO;
    average: string | null;
    teacherObservation: string | null;
    grades: Record<string, string | null>;
  }[];
};
