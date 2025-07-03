import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  homeworkNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetOneHomeworkValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getOneHomeworkValidation = {
  params,
};
