import { z } from "zod";
import { END_USER_WITHOUT_MASTER_ENUM } from "./../../../constants/globalEnums";
import { validId } from "./../../../core/validator";

const body = z.object({
  usersIds: z.array(validId("users")),
  usersType: z.nativeEnum(END_USER_WITHOUT_MASTER_ENUM),
  notificationSettings: z.object({
    title: z.string(),
    body: z.string(),
    imageUrl: z.string().optional(),
  }),
});
type TBody = z.infer<typeof body>;

export type TSendNotificationToUsersValidation = {
  body: TBody;
};

export const sendNotificationToUsersValidation = {
  body,
};
