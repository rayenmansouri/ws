import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const query = z.object({
  studentNewId: validateNewId(),
});
type Query = z.infer<typeof query>;

export type GetDashboardValidation = {
  query: Query;
  body: never;
  params: never;
};

export const getDashboardValidation = {
  query,
};
