import { z } from "zod";
import { UserTypeEnum } from "../../feature/user-management/factory/enums";

const createUser = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    type: z.enum([UserTypeEnum.ADMIN, UserTypeEnum.COACH]),
    organizationSubdomain: z.string().min(1, "Organization subdomain is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type TCreateUser = z.infer<typeof createUser>;

export type CreateUserValidation = {
    body: TCreateUser;
    params: never;
    query: never;
};

export const createUserValidation = {
    createUser,
}; 