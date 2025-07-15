import { TPromotionStatusEnum } from "../domain/tunisian/ExamGrade.entity";

export type NotPromotedStudentDTO = {
  students: {
    _id: string;
    newId: string;
    avatar: string;
    fullName: string;
    className: string;
    termAverages: Record<string, string | null>;
    annualAverage: string | null;
    promotionStatus: TPromotionStatusEnum;
  }[];
  termNames: string[];
};
