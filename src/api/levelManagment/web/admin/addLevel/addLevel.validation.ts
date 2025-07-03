import { z } from "zod";
import { validateDate, validateNewId } from "../../../../../core/validator";
import {
  ESTABLISHMENT_TITLE_ENUM,
  EXAM_GRADE_SYSTEM_ENUM,
} from "../../../../../feature/levels/domains/level.entity";

const body = z.object({
  name: z.string(),
  color: z.string(),
  schoolYear: z.object({
    name: z.string(),
    startDate: validateDate(),
    endDate: validateDate(),
    terms: z.array(
      z.object({
        termNewId: validateNewId(),
        startDate: validateDate(),
        endDate: validateDate(),
      }),
    ),
  }),
  establishmentTitle: z.nativeEnum(ESTABLISHMENT_TITLE_ENUM).optional(),
  examGradeSystem: z.nativeEnum(EXAM_GRADE_SYSTEM_ENUM).optional(),
});
type TBody = z.infer<typeof body>;

export type AddLevelValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addLevelValidation = {
  body,
};
