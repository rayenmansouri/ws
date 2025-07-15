import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { TPromotionStatusEnum } from "../domain/tunisian/ExamGrade.entity";

export type AnnualAveragesOfClassDTO = {
  termNames: string[];
  studentAverages: {
    student: UserProfileDTO;
    termAverages: Record<string, string | null>;
    annualAverage: string | null;
    rank: number | null;
    promotionStatus: TPromotionStatusEnum;
  }[];
};
