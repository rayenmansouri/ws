import { z } from "zod";
import { validateNewId } from "./../../../../../core/validator";

const params = z.object({
  issueNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type ForwardIssueValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const forwardIssueValidation = {
  params,
};
