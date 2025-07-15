import { z } from "zod";

const body = z.object({
  userAgent: z.string(),
  isPushNotificationEnabled: z.boolean().optional(),
  isSmsNotificationEnabled: z.boolean().optional(),
  isEmailNotificationEnabled: z.boolean().optional(),
  preferences: z.object({
    homework: z.boolean().optional(),
    payment: z.boolean().optional(),
    observations: z.boolean().optional(),
    schedule: z.boolean().optional(),
    informations: z.boolean().optional(),
    attendance: z.boolean().optional(),
    messages: z.boolean().optional(),
  }),
});
type TBody = z.infer<typeof body>;

export type TUpdateNotificationSettingsValidation = {
  body: TBody;
};

export const updateNotificationSettingsValidation = {
  body,
};
