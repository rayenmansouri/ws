import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  sessionNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteSessionValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteSessionValidation = {
  params,
};
