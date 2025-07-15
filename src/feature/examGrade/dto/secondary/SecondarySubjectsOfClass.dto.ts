import { UserProfileDTO } from "../../../users/dtos/userProfile.dto";

export type SecondarySubjectsOfClassDTO = {
  canCompleteTerm: boolean;
  subjects: {
    name: string;
    newId: string;
    isCovered: boolean;
    degreesCovered: number;
    totalDegrees: number;
    subSubjects: {
      name: string;
    }[];
    teachers: UserProfileDTO[];
  }[];
};
