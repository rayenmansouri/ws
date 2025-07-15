import { SchoolYearDto } from "./../../../../../feature/schoolYears/dtos/schoolYear.dto";
import { EntityDto } from "../../../../../feature/entity/dto/entity.dto";
import { UserProfileDTO } from "../../../../../feature/users/dtos/userProfile.dto";
import { GetGroupListValidation } from "./getGroupList.validation";

export type GetGroupsSummaryResponse = {
  selectedGroupType: EntityDto | null;
  groupTypes: EntityDto[];
  groupLists: (EntityDto & {
    teacher: UserProfileDTO;
    classTypes: EntityDto[];
    levels: EntityDto[];
    studentNumber: number;
    students: UserProfileDTO[];
  })[];
  schoolYears: SchoolYearDto[];
  selectedSchoolYear: SchoolYearDto | null;
};
export type GetGroupListRouteConfig = GetGroupListValidation & { files: never };
export type GetGroupListResponse = GetGroupsSummaryResponse;
