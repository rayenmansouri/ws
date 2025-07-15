import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z
  .object({
    name: z.string().optional(),
    capacity: z.number().positive(),
    sectionNewId: validateNewId().optional(),
    isTerminal: z.boolean().optional(),
    subLevelNewId: validateNewId().optional(),
  })
  .partial()
  .and(
    z.union([
      z.object({
        nextClassTypeNewIds: z.array(validateNewId()).min(1),
        isTerminal: z.literal(false),
      }),
      z.object({
        nextClassTypeNewIds: z.array(validateNewId()).length(0).optional(),
        isTerminal: z.literal(true),
      }),
    ]),
  );
type TBody = z.infer<typeof body>;

const params = z.object({
  classTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateClassTypeValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateClassTypeValidation = {
  body,
  params,
};
