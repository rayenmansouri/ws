import { z } from "zod";

const body = z.object({
  name: z.string(),
  numRows: z.number(),
  numCodes: z.number(),
  top: z.number(),
  left: z.number(),
  width: z.number(),
  height: z.number(),
});
type TBody = z.infer<typeof body>;

export type AddBarCodeConfigValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addBarCodeConfigValidation = {
  body,
};
