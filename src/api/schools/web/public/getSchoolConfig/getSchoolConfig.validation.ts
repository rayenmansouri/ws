import { z } from "zod";

const params = z.object({
  subdomain: z.string().min(1),
});
type TParams = z.infer<typeof params>;

export type GetSchoolConfigValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getSchoolConfigValidation = {
  params,
};
