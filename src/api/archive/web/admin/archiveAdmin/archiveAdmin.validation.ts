import { z } from "zod";
import { validateNewId } from "./../../../../../core/validator";

const params = z.object({
  adminNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type ArchiveAdminValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const archiveAdminValidation = {
  params,
};
