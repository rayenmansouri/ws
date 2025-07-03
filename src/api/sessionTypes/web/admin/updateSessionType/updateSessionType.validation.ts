import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  name: z.string().optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  sessionTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateSessionTypeValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSessionTypeValidation = {
  body,
  params,
};
