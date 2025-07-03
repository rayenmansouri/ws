import { validateID, validateNewId } from "./../../../../../core/validator";

import { z } from "zod";

const body = z.object({
  participantIds: z.array(validateID()).min(1),
});

type TBody = z.infer<typeof body>;

const params = z.object({
  conversationNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteParticipantFromGroupValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const deleteParticipantFromGroupValidation = {
  body,
  params,
};
