import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";
import { FILE_EXPORT_EXTENSION_ENUM } from "../../../../../constants/fileExportExtension.constant";

const params = z.object({
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  export: z.nativeEnum(FILE_EXPORT_EXTENSION_ENUM).optional(),
});
type TQuery = z.infer<typeof query>;

export type GetStudentsOfClassValidation = {
  params: TParams;
  query: TQuery;
  body: never;
};

export const getStudentsOfClassValidation = {
  params,
  query,
};
