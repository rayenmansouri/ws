import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  name: z.string().min(1),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateClassValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateClassValidation = {
  body,
  params,
};
