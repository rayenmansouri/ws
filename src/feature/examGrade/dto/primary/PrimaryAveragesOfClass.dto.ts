import { UserProfileDTO } from "../../../users/dtos/userProfile.dto";

export type PrimaryAveragesOfClassDTO = {
  stats: {
    studentWithHighestAverage: {
      student: UserProfileDTO | null;
      average: string | null;
    };
    studentWithLowestAverage: {
      student: UserProfileDTO | null;
      average: string | null;
    };
    numberOfStudents: number;
  };
  classAverages: {
    className: string;
    classNewId: string;
    rank: number | null;
    average: string | null;
    numberOfStudents: number;
  }[];
  studentAverages: {
    student: UserProfileDTO;
    average: string | null;
    rank: number | null;
    diplomaName: string | null;
  }[];
};
