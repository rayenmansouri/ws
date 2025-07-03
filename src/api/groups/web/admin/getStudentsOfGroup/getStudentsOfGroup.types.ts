import { StudentInGroupDto } from "../../../../../feature/groupManagement/dtos/StudentInGroup.dto";
import { ID } from "../../../../../types/BaseEntity";
import { GetStudentsOfGroupValidation } from "./getStudentsOfGroup.validation";

export type GetStudentsOfGroupRouteConfig = GetStudentsOfGroupValidation & {
  files: never;
};
export type GetStudentsOfGroupResponse = {
  studentList: StudentInGroupDto[];
  classTypes: ID[];
};
