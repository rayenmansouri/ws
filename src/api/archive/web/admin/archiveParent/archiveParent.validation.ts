import { validateNewId } from "./../../../../../core/validator";
import { z } from "zod";

const params = z.object({
  parentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type ArchiveParentValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const archiveParentValidation = {
  params,
};
