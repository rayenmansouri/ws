import { z } from "zod";
import { validateNewId } from "./../../../../../core/validator";

const body = z.object({
  reasonForCanceling: z.string().min(2),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  sessionNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type CancelSessionValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const cancelSessionValidation = {
  body,
  params,
};
