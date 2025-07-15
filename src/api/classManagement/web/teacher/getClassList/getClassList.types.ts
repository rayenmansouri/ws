import { UserProfileDTO } from "../../../../../feature/users/dtos/userProfile.dto";
import { ID } from "../../../../../types/BaseEntity";
import { GetClassListValidation } from "./getClassList.validation";

export type GetClassListRouteConfig = GetClassListValidation & { files: never };
export type GetClassListResponse = {
  classes: {
    _id: ID;
    newId: string;
    name: string;
    students: UserProfileDTO[];
    levelName: string;
    studentsNumbers: number;
  }[];
  groups: {
    _id: ID;
    newId: string;
    name: string;
    students: UserProfileDTO[];
    levelName: string;
    studentsNumbers: number;
  }[];
};
