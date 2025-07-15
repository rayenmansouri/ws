import { z } from "zod";

const params = z.object({ searchTerm: z.string() });

type TParams = z.infer<typeof params>;

export type GetSearchInvoiceValidation = {
  body: never;
  query: never;
  params: TParams;
};

export const getSearchInvoiceValidation = {
  params,
};
