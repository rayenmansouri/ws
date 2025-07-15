import { UserProfileDTO } from "../../../../../feature/users/dtos/userProfile.dto";
import { GetStudentsCodeBarePdfValidation } from "./getStudentsCodeBarePdf.validation";

export type GetStudentsCodeBarePdfRouteConfig = GetStudentsCodeBarePdfValidation & { files: never };
export type GetStudentsCodeBarePdfResponse = {
  students: UserProfileDTO[];
  schoolInformation: {
    className: string;
  };
};
