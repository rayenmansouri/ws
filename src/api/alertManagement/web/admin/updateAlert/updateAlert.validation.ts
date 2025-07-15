import { END_USER_ENUM } from "./../../../../../constants/globalEnums";
import { validateNewId, validateDate, validateID } from "./../../../../../core/validator";
import { z } from "zod";

const body = z.object({
  isDraft: z.boolean().optional(),
  scheduledAt: validateDate().optional(),
  content: z.string().min(1).max(200),
  types: z
    .object({
      sms: z.boolean(),
      notification: z.boolean(),
    })
    .optional(),
  users: z
    .array(
      z.object({
        userType: z.nativeEnum(END_USER_ENUM),
        userId: validateID(),
      }),
    )
    .optional()
    .refine(
      user => {
        if (!user) return true;
        const users = user.map(u => `${u.userType}-${u.userId}`);
        const uniqueUsers = new Set(users);
        return uniqueUsers.size === users.length;
      },
      {
        message: "Duplicate users are not allowed",
      },
    ),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  alertNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateAlertValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateAlertValidation = {
  body,
  params,
};
