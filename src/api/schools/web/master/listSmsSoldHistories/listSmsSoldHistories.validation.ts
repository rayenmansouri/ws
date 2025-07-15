import { z } from "zod";
import { paginationOptionsValidation } from "./../../../../../core/validator";
import { validateID } from "./../../../../../core/validator";

const query = paginationOptionsValidation;
type TQuery = z.infer<typeof query>;

const params = z.object({
  tenantId: validateID(),
});

type TParams = z.infer<typeof params>;

export type ListSmsSoldHistoriesValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const listSmsSoldHistoriesValidation = {
  query,
  params,
};
