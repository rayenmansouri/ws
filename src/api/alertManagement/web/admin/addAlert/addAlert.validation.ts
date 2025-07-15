import { z } from "zod";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { validateDate } from "../../../../../core/validator";
import { validateID } from "./../../../../../core/validator";

const body = z.object({
  types: z
    .object({
      sms: z.boolean(),
      notification: z.boolean(),
    })
    .refine(data => data.sms || data.notification, {
      message: "At least one of 'sms' or 'notification' must be true.",
      path: [],
    }),
  content: z.string().min(1),
  isDraft: z.boolean(),
  scheduledAt: validateDate().optional(),
  users: z
    .array(
      z.object({
        userType: z.nativeEnum(END_USER_ENUM),
        userId: validateID(),
      }),
    )
    .refine(
      users => {
        const userPairs = users.map(u => `${u.userType}-${u.userId}`);
        const uniquePairs = new Set(userPairs);
        return uniquePairs.size === userPairs.length;
      },
      {
        message: "Duplicate userId and userType combinations are not allowed",
      },
    ),
});
type TBody = z.infer<typeof body>;

export type AddAlertValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addAlertValidation = {
  body,
};
