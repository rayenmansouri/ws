import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const terminal = z.object({
  isTerminal: z.literal(true),
  nextClassTypeNewIds: z.undefined(),
});

const notTerminal = z.object({
  isTerminal: z.literal(false),
  nextClassTypeNewIds: z.array(validateNewId()).min(0),
});

const body = z
  .object({
    name: z.string(),
    subLevelNewId: validateNewId(),
    sectionNewId: validateNewId().optional(),
    capacity: z.number().positive(),
  })
  .and(terminal.or(notTerminal));

type TBody = z.infer<typeof body>;

export type AddClassTypeValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addClassTypeValidation = {
  body,
};
