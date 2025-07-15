import { z } from "zod";
import { paginationOptionsValidation } from "../../../../../core/validator";
import { HOMEWORK_STATUS_ENUM } from "../../../../../features/homework/constants/shared/addHomework.constants";

const query = z
  .object({
    status: z.nativeEnum(HOMEWORK_STATUS_ENUM).optional(),
    search: z.string().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListHomeworksByStudentValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listHomeworksByStudentValidation = {
  query,
};
