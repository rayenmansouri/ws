import { z } from "zod";
import { validateID, validateNewId } from "../../../../../core/validator";

const body = z.object({
  durationInMinutes: z.number().optional(),
  sessionType: validateID().optional(),
  perGroup: z.boolean().optional(),
  week: z.enum(["A", "B"]).optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classTypeNewId: validateNewId(),
  activityIndex: z.string(),
});
type TParams = z.infer<typeof params>;

export type UpdateClassTypeActivityValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateClassTypeActivityValidation = {
  body,
  params,
};
