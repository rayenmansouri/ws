import { UserProfileDTO } from "../../../users/dtos/userProfile.dto";
import { TIBAnnualGradeLevelsEnum } from "../../domain/ib/IBClassAverage.valueobject";
import { TPromotionStatusEnum } from "../../domain/tunisian/ExamGrade.entity";

export type IBAnnualAveragesOfClassDTO = {
  termNames: string[];
  studentAverages: {
    student: UserProfileDTO;
    termAverages: Record<string, string | null>;
    annualAverage: string | null;
    promotionStatus: TPromotionStatusEnum;
    adminObservation: string | null;
    annualLevel: TIBAnnualGradeLevelsEnum | null;
  }[];
};
