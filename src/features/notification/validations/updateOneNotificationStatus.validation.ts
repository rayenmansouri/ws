import { z } from "zod";
import { validateNewId } from "../../../core/validator";

const params = z.object({
  broadcastId: validateNewId(),
});

type TParams = z.infer<typeof params>;

export type TUpdateOneNotificationStatusValidation = {
  params: TParams;
};

export const updateOneNotificationStatusValidation = {
  params,
};
