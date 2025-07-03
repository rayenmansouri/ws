import { z } from "zod";
import { validateNewId } from "./../../../../../core/validator";

const params = z.object({
  conversationNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  fullName: z.string().default(""),
});
type TQuery = z.infer<typeof query>;

export type ListTargetUsersForGroupConversationAssignmentValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const listTargetUsersForGroupConversationAssignmentValidation = {
  params,
  query,
};
