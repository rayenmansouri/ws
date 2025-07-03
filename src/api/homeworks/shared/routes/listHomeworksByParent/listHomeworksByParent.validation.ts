import { z } from "zod";
import { paginationOptionsValidation, validateNewId } from "../../../../../core/validator";
import { HOMEWORK_STATUS_ENUM } from "../../../../../features/homework/constants/shared/addHomework.constants";

const params = z.object({
  studentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z
  .object({
    status: z.nativeEnum(HOMEWORK_STATUS_ENUM).optional(),
    search: z.string().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListHomeworksByParentValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const listHomeworksByParentValidation = {
  params,
  query,
};
