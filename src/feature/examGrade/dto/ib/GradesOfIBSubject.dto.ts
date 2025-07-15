import { ID } from "../../../../types/BaseEntity";
import { UserProfileDTO } from "../../../users/dtos/userProfile.dto";

export type GradesOfIBSubjectDTO = {
  subjectName: string;
  totalNumberOfStudents: number;
  highestAverage: string | null;
  lowestAverage: string | null;
  canEdit: boolean;
  headers: {
    name: string;
    examGradeId: ID;
    coefficient: number;
  }[];
  studentGrades: {
    student: UserProfileDTO;
    average: string | null;
    investment: string | null;
    teacherObservation: string | null;
    grades: Record<string, string | null>;
  }[];
};
