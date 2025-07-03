import { z } from "zod";
import {
  paginationOptionsValidation,
  validateID,
  validateNewId,
} from "../../../../../core/validator";
import { DOCUMENT_SOURCE_ENUM } from "../../../../../feature/documents/dtos/document.dto";

const query = z
  .object({
    search: z.string().optional(),
    teacherIds: z.array(validateID()).optional(),
    groupIds: z.array(validateID()).optional(),
    subjectTypeIds: z.array(validateID()).optional(),
    sources: z.array(z.nativeEnum(DOCUMENT_SOURCE_ENUM)).optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

const params = z.object({
  studentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type ListDocumentsOfStudentValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const listDocumentsOfStudentValidation = {
  params,
  query,
};
