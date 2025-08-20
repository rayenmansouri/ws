import { z } from "zod";

const deleteUserParams = z.object({
    id: z.string().min(1, "User ID is required"),
});

type TDeleteUserParams = z.infer<typeof deleteUserParams>;

export type DeleteUserValidation = {
    body: never;
    params: TDeleteUserParams;
    query: never;
};

export const deleteUserValidation = {
    deleteUserParams,
};