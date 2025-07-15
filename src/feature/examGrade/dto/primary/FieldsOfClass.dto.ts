import { UserProfileDTO } from "../../../users/dtos/userProfile.dto";

export type ExamFieldListDTO = {
  canCompleteTerm: boolean;
  fields: {
    name: string;
    newId: string;
    subjects: {
      name: string;
      subSubjects: { name: string }[];
      isCovered: boolean;
      degreesCovered: number;
      totalDegrees: number;
    }[];
    teachers: UserProfileDTO[];
  }[];
};
