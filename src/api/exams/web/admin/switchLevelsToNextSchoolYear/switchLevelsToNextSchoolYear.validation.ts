import { z } from "zod";

const body = z.object({
  schoolYearName: z.string(),
});
type TBody = z.infer<typeof body>;

export type SwitchLevelsToNextSchoolYearValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const switchLevelsToNextSchoolYearValidation = {
  body,
};
