import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  sessionTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteSessionTypeValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const DeleteSessionTypeValidation = {
  params,
};
