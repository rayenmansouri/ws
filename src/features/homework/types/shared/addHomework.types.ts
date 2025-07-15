import { IHomework } from "../../../../database/schema/pedagogy/Performance/homework.schema";
import { FilesInRequest } from "../../../../types/app-request";
import { TAddHomeworkValidation } from "../../validations/shared/addHomework.validation";

export type TAddHomeworkResponse = IHomework;
export type TAddHomeworkRouteConfig = TAddHomeworkValidation & {
  files: FilesInRequest<"homeworks">;
};
