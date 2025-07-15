import { FilesInRequest } from "../../../../types/app-request";
import { TUpdateHomeworkValidation } from "../../validations/shared/updateHomework.validation";

export type TUpdateHomeworkRouteConfig = TUpdateHomeworkValidation & {
  files: FilesInRequest<"homeworks">;
};

export type TUpdateHomeworkResponse = boolean;
