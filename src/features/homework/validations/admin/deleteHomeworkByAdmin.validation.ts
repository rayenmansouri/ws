import { z } from "zod";
import { validateNewId } from "../../../../core/validator";

const params = z.object({
  newId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type TDeleteHomeworkByAdminValidation = { params: TParams };

export const deleteHomeworkByAdminValidation = { params };
