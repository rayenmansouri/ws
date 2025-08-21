import { z } from "zod";
import { createUserValidationSchema } from "../../../feature/user-management/base-user/domain/validation.schema";

type TCreateUser = z.infer<typeof createUserValidationSchema>;

export type CreateUserValidation = {
    body: TCreateUser;
    params: never;
    query: never;
};

export const createUserValidation = {
    createUser: createUserValidationSchema,
}; 