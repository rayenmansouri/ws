import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";
import { ESTABLISHMENT_TITLE_ENUM } from "../../../../../feature/levels/domains/level.entity";

const body = z.object({
  name: z.string().optional(),
  color: z.string().optional(),
  establishmentTitle: z.nativeEnum(ESTABLISHMENT_TITLE_ENUM).optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  levelNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateLevelValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateLevelValidation = {
  body,
  params,
};
