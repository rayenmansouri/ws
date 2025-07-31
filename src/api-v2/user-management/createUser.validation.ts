import { z } from "zod";

const createUser = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    type: z.string().min(1, "User type is required"),
    roles: z.array(z.string()).optional(),
});

type TCreateUser = z.infer<typeof createUser>;

export type CreateUserValidation = {
    body: TCreateUser;
    params: never;
    query: never;
};

export const createUserValidation = {
    createUser,
    paramSchema: z.object({
        schoolId: z.string().min(1, "School ID is required"),
    }),
}; 