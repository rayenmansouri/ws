import { z } from "zod";
import { paginationOptionsValidation, validateDate } from "../../../../../core/validator";
import { NOTIFICATION_STATUS_ENUM } from "../../../../../features/notification/constants/constants";

const query = z
  .object({
    status: z.nativeEnum(NOTIFICATION_STATUS_ENUM).optional(),
    startDate: validateDate().optional(),
    endDate: validateDate().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListNotificationsValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listNotificationsValidation = {
  query,
};
