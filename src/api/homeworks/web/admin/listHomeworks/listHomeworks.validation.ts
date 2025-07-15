import { validateID } from "./../../../../../core/validator";
import { z } from "zod";
import { paginationOptionsValidation, validateNewId } from "../../../../../core/validator";
import { HOMEWORK_STATUS_ENUM } from "../../../../../features/homework/constants/shared/addHomework.constants";

const query = z
  .object({
    classNewId: validateNewId().optional(),
    teacherNewId: validateNewId().optional(),
    studentNewId: validateNewId().optional(),
    groupNewId: validateNewId().optional(),
    search: z.string().optional(),
    status: z.nativeEnum(HOMEWORK_STATUS_ENUM).optional(),
    schoolYearId: validateID().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListHomeworksValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listHomeworksValidation = {
  query,
};
