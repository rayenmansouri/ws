import { z } from "zod";

const body = z.object({});

type TBody = z.infer<typeof body>;

export type MeValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const meValidation = {
  body,
};
