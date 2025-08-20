import { z } from "zod";
import { paginationOptionsValidation } from "../../../core/validator";

const query = paginationOptionsValidation.extend({
  search: z.string().optional(),
  limit: z.number(),
  page: z.number(),  
});

export const getAllOrganizationsValidation = {
  query,
};

export type GetAllOrganizationsValidation = z.infer<typeof query>;
