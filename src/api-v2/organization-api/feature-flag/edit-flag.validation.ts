import { z } from "zod";
import { FEATURE_FLAGS_ENUM } from "../../../feature/organization-magement/enums";

export const editFlagValidation = z.object({
    featureFlags: z.record(z.enum(Object.values(FEATURE_FLAGS_ENUM) as [string, ...string[]]), z.boolean()).optional(),

})

export const editFlagParamsValidation = z.object({
    id: z.string()
})

export type EditFlagValidation = z.infer<typeof editFlagValidation>;
export type EditFlagParamsValidation = z.infer<typeof editFlagParamsValidation>;