import { UserProfileDTO } from "../../../users/dtos/userProfile.dto";

export type IBAdminObservationsDTO = {
  records: {
    student: UserProfileDTO;
    observation: string | null;
  }[];
};
