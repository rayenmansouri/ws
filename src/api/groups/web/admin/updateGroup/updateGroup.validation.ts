import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({ name: z.string(), teacherNewId: validateNewId() }).partial();
type TBody = z.infer<typeof body>;

const params = z.object({
  groupNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateGroupValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateGroupValidation = {
  body,
  params,
};
