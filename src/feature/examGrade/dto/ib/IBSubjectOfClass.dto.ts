import { UserProfileDTO } from "../../../users/dtos/userProfile.dto";

export type IBSubjectOfClassDTO = {
  canCompleteTerm: boolean;
  subjects: {
    name: string;
    newId: string;
    isCovered: boolean;
    degreesCovered: number;
    totalDegrees: number;
    teachers: UserProfileDTO[];
  }[];
};
