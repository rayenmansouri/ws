import { z } from "zod";
import { PROMOTION_STATUS_ENUM } from "../../../../../feature/examGrade/domain/tunisian/ExamGrade.entity";

const body = z.object({
  promotionStatus: z.enum([
    PROMOTION_STATUS_ENUM.EXCEPTIONALLY_PROMOTED,
    PROMOTION_STATUS_ENUM.NOT_PROMOTED,
  ]),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  studentNewId: z.string(),
});
type TParams = z.infer<typeof params>;

export type UpdateStudentPromotionStatusValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateStudentPromotionStatusValidation = {
  body,
  params,
};
