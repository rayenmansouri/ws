import { CustomValidation } from "./../../../../../core/validation/custom.validation";
import { z } from "zod";
import { END_USER_ENUM } from "./../../../../../constants/globalEnums";
import { validateID, validateNewId } from "./../../../../../core/validator";

const body = z.object({
  links: z.array(z.string()).optional().default([]),
  content: CustomValidation.validateHTML().optional(),
  replyTo: validateNewId().optional(),
  conversationNewId: validateNewId().optional(),
  participants: z
    .array(
      z.object({
        _id: validateID(),
        userType: z.nativeEnum(END_USER_ENUM),
      }),
    )
    .min(1)
    .refine(
      participants => {
        const ids = participants.map(p => p._id);
        return new Set(ids).size === ids.length;
      },
      {
        message: "Duplicate participants are not allowed",
        path: ["participants"],
      },
    ),
});

type TBody = z.infer<typeof body>;

export type AddMessageValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const AddMessageValidation = {
  body,
};
