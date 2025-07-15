import { UserProfileDTO } from "../../../users/dtos/userProfile.dto";

export type IBAveragesOfClassDTO = {
  numberOfStudents: number;
  studentAverages: {
    student: UserProfileDTO;
    average: string | null;
    diplomaName: string | null;
  }[];
};
