import { z } from "zod";

const updateUserParams = z.object({
    id: z.string().min(1, "User ID is required"),
});

const updateUserBody = z.object({
    firstName: z.string().min(1, "First name is required").optional(),
    lastName: z.string().min(1, "Last name is required").optional(),
    gender: z.enum(['Male', 'Female']).optional(),
    participantData: z.record(z.any()).optional(),
});

type TUpdateUserParams = z.infer<typeof updateUserParams>;
type TUpdateUserBody = z.infer<typeof updateUserBody>;

export type UpdateUserValidation = {
    body: TUpdateUserBody;
    params: TUpdateUserParams;
    query: never;
};

export const updateUserValidation = {
    updateUserParams,
    updateUserBody,
};