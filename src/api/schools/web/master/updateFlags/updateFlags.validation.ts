import { z } from "zod";
import { FEATURE_FLAGS_ENUM } from "../../../../../feature/schools/constants/featureFlags";

const body = z.object({
  flags: z.record(z.nativeEnum(FEATURE_FLAGS_ENUM), z.boolean()),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  schoolNewId: z.string(),
});
type TParams = z.infer<typeof params>;

export type UpdateFlagsValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateFlagsValidation = {
  body,
  params,
};
