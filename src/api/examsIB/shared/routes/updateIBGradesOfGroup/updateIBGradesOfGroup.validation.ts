import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  termNewId: z.string(),
  grades: z.record(z.string(), z.record(z.string(), z.string().nullable())),
  observations: z.record(z.string(), z.string()),
  investments: z.record(z.string(), z.string()),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  groupNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateIBGradesOfGroupValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateIBGradesOfGroupValidation = {
  body,
  params,
};
