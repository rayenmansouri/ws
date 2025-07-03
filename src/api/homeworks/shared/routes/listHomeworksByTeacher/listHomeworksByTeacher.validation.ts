import { z } from "zod";
import { paginationOptionsValidation, validateNewId } from "../../../../../core/validator";
import { HOMEWORK_STATUS_ENUM } from "../../../../../features/homework/constants/shared/addHomework.constants";

const query = z
  .object({
    status: z.nativeEnum(HOMEWORK_STATUS_ENUM).optional(),
    search: z.string().optional(),
    classNewId: validateNewId().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListHomeworksByTeacherValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listHomeworksByTeacherValidation = {
  query,
};
