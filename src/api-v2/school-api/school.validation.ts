import { z } from "zod";

const createSchool = z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email(),
    website: z.string().min(1),
    subdomain: z.string().min(1),
});

type TCreateSchool = z.infer<typeof createSchool>;

export type SchoolValidation = {
    body: TCreateSchool;
    params: never;
    query: never;
};

export const schoolValidation = {
    createSchool,
};

