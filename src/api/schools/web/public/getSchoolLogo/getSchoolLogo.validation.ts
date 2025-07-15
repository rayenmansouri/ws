import { z } from "zod";
import { validateID } from "../../../../../core/validator";

const params = z.object({
  schoolId: validateID(),
});
type TParams = z.infer<typeof params>;

export type GetSchoolLogoValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getSchoolLogoValidation = {
  params,
};
