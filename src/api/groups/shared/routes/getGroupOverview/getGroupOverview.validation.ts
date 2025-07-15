import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  groupNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetGroupOverviewValidation = {
  params: TParams;
  query: never;
  body: never;
};

export const getGroupOverviewValidation = {
  params,
};
