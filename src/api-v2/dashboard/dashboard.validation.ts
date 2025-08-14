import { z } from "zod";
import { paginationOptionsValidation, validateDate, validateID } from "../../core/validator";

const query = z.object({
    levels: z.array(validateID()).optional(),
    dateInterval: z.object({
        from: validateDate(),
        to: validateDate()
    }).optional(),
    search: z.string().optional(),
    tabName: z.enum(["all", "active", "inactive","attendance"]).optional(),
}).merge(paginationOptionsValidation)

type TQuery = z.infer<typeof query>;

export type GetDashboardValidation = {
    body: never,
    params: never,
    query: TQuery
}

export const getDashboardValidation = {
    query
}