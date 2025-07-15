import { z } from "zod";
import { addHomeworkValidation } from "../shared/addHomework.validation";

const body = addHomeworkValidation.body;
type TBody = z.infer<typeof body>;

export type TAddHomeworkByAdminValidation = { body: TBody };

export const addHomeworkByAdminValidation = { body };
