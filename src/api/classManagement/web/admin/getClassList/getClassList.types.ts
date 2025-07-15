import { SchoolYearDto } from "./../../../../../feature/schoolYears/dtos/schoolYear.dto";
import { EntityDto } from "../../../../../feature/entity/dto/entity.dto";
import { UserProfileDTO } from "../../../../../feature/users/dtos/userProfile.dto";
import { GetClassListValidation } from "./getClassList.validation";

export type GetClassListResponseDto = {
  classList: (EntityDto & {
    students: UserProfileDTO[];
    teachers: UserProfileDTO[];
  })[];
  hasSection: boolean;
  level: EntityDto | null;
  selectedClassType: EntityDto | null;
  classTypes: EntityDto[] | null;
  schoolYears: SchoolYearDto[];
  selectedSchoolYear: SchoolYearDto;
};

export type GetClassListRouteConfig = GetClassListValidation & { files: never };
export type GetClassListResponse = GetClassListResponseDto;
