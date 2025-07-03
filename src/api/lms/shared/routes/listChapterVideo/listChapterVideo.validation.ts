import { z } from "zod";
import { paginationOptionsValidation, validateID } from "../../../../../core/validator";

const query = z
  .object({
    search: z.string().optional(),
    classTypeIds: z.array(validateID()).optional(),
    subjectTypeIds: z.array(validateID()).optional(),
    subSubjectTypeIds: z.array(validateID()).optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListChapterVideoValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listChapterVideoValidation = {
  query,
};
