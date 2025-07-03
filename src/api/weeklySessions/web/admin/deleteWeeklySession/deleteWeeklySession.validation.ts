import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  weeklySessionNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteWeeklySessionValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteWeeklySessionValidation = {
  params,
};
