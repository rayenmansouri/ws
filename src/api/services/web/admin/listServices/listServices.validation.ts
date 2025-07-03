import { z } from "zod";
import { paginationOptionsValidation } from "../../../../../core/validator";
import { SERVICE_TYPE_ENUM } from "../../../../../feature/studentPayments/service.entity";

const query = z
  .object({
    search: z.string().optional(),
    showByDefault: z.boolean().optional(),
    invoiceType: z.nativeEnum(SERVICE_TYPE_ENUM).optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListServicesValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listServicesValidation = {
  query,
};
