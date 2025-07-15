import { CustomValidation } from "./../../../../../core/validation/custom.validation";
import { validateNewId } from "../../../../../core/validator";
import { z } from "zod";

const body = z.object({
  notes: z
    .array(
      z.object({
        title: z.string().min(1),
        text: CustomValidation.validateHTML(),
      }),
    )
    .optional(),
  sessionSummary: CustomValidation.validateHTML().optional(),
  deletedAttachments: z.array(z.string()).optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  sessionNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateSessionDetailsValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSessionDetailsValidation = {
  body,
  params,
};
