import { z } from "zod";
import { APP_PLATFORM_ENUM } from "../../../../../feature/masters/domain/AppVersion.entity";

const body = z.record(z.nativeEnum(APP_PLATFORM_ENUM), z.string());

type TBody = z.infer<typeof body>;

export type UpdateAppVersionValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const updateAppVersionValidation = {
  body,
};
