import { END_USER_ENUM } from "./../../../../../constants/globalEnums";
import { validateNewId, validateID } from "./../../../../../core/validator";
import { z } from "zod";

const body = z.object({
  participants: z
    .array(
      z.object({
        _id: validateID(),
        userType: z.nativeEnum(END_USER_ENUM),
      }),
    )
    .min(1),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  conversationNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type AddParticipantToGroupValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const addParticipantToGroupValidation = {
  body,
  params,
};
