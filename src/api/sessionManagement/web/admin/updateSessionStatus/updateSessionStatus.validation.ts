import { z } from "zod";
import { validateNewId } from "./../../../../../core/validator";
import { SESSION_STATUS_ENUM } from "./../../../../../database/schema/pedagogy/session/session.schema";

const body = z.object({
  newStatus: z.nativeEnum(SESSION_STATUS_ENUM),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  sessionNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateSessionStatusValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSessionStatusValidation = {
  body,
  params,
};
