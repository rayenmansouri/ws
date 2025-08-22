import { z } from "zod";
import { UserTypeEnum } from "../../feature/user-management/factory/enums";

const updateUser = z.object({
    firstName: z.string().min(1, "First name is required").optional(),
    lastName: z.string().min(1, "Last name is required").optional(),
    type: z.enum([UserTypeEnum.ADMIN, UserTypeEnum.COACH, UserTypeEnum.PARTICIPANT]).optional(),
    schoolSubdomain: z.string().min(1, "School subdomain is required").optional(),
    email: z.string().email("Invalid email format").optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

const updateUserParams = z.object({
    userId: z.string().min(1, "User ID is required"),
});

type TUpdateUser = z.infer<typeof updateUser>;
type TUpdateUserParams = z.infer<typeof updateUserParams>;

export type UpdateUserValidation = {
    body: TUpdateUser;
    params: TUpdateUserParams;
    query: never;
};

export const updateUserValidation = {
    updateUser,
    updateUserParams,
};