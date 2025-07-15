import { UserProfileDTO } from "../../users/dtos/userProfile.dto";

export type BlankExamPageDTO = {
  records: {
    student: UserProfileDTO;
    grades: Record<string, string | null>;
  }[];
  headers: string[];
  schoolInformation: {
    name: string;
    address: string | null;
    phoneNumber: string | null;
    email: string | null;
  };
  termName: string;
  className: string;
  teacherName: string | null;
  subjectName: string;
};
