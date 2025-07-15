import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const query = z.object({
  studentNewId: validateNewId().optional(),
});
type TQuery = z.infer<typeof query>;

export type GetStudentTopicsChaptersValidation = {
  query: TQuery;
  body: never;
  params: never;
};

export const getStudentTopicsChaptersValidation = {
  query,
};
