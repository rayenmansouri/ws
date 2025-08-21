import { z } from "zod";
import { UserTypeEnum } from "../../../feature/user-management/factory/enums";

const updateUser = z.object({
    firstName: z.string().min(1, "First name is required").optional(),
    lastName: z.string().min(1, "Last name is required").optional(),
    type: z.enum([UserTypeEnum.ADMIN, UserTypeEnum.COACH]).optional(),
    email: z.string().email("Invalid email format").optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
    phoneNumber: z.string().optional(),
    gender: z.string().optional(),
    birthDate: z.string().optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
});

const updateUserParams = z.object({
    userId: z.string().min(1, "User ID is required"),
});

type TUpdateUser = z.infer<typeof updateUser>;
type TUpdateUserParams = z.infer<typeof updateUserParams>;

export const updateUserValidation = {
    updateUser,
    updateUserParams,
};

export type UpdateUserValidation = {
    body: TUpdateUser;
    params: TUpdateUserParams;
    query: never;
};