import { UserProfileDTO } from "../../../users/dtos/userProfile.dto";

export type CambridgeAveragesOfClassDTO = {
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
    rank: number | null;
    average: string | null;
    numberOfStudents: number;
  }[];
  studentAverages: {
    student: UserProfileDTO;
    average: string | null;
    averageEquivalence: string | null;
    letterGrade: string | null;
    rank: number | null;
    diplomaName: string | null;
  }[];
};
