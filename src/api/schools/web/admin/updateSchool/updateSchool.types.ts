import { FilesInRequest } from "../../../../../types/app-request";
import { UpdateSchoolValidation } from "./updateSchool.validation";

export type UpdateSchoolRouteConfig = UpdateSchoolValidation & {
  files: FilesInRequest<"logo" | "cover" | "financeSignature" | "academicSignature">;
};
export type UpdateSchoolResponse = void;
