import { z } from "zod";

export const editFlagValidation = z.object({
    featureFlags: z.record(z.string(),z.boolean())
})

export const editFlagParamsValidation = z.object({
    id: z.string()
})

export type EditFlagValidation = z.infer<typeof editFlagValidation>;
export type EditFlagParamsValidation = z.infer<typeof editFlagParamsValidation>;