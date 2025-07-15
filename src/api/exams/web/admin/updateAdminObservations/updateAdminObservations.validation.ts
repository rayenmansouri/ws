import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  termNewId: validateNewId(),
  adminObservations: z.record(z.string(), z.string().nullable()),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateAdminObservationsValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateAdminObservationsValidation = {
  body,
  params,
};
