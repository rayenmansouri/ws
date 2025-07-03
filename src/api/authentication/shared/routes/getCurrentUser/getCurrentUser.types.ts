import { TExamGradeSystemEnum } from "../../../../../feature/levels/domains/level.entity";
import { TInstanceTypeEnum } from "../../../../../feature/schools/domain/school.entity";
import { CurrentUserDTO } from "../../../../../feature/users/dtos/CurrentUser.dto";
import { ID } from "../../../../../types/BaseEntity";
import { GetCurrentUserValidation } from "./getCurrentUser.validation";

export type GetCurrentUserRouteConfig = GetCurrentUserValidation & { files: never };
export type GetCurrentUserResponse = CurrentUserDTO & {
  students: {
    _id: ID;
    newId: string;
    fullName: string;
    avatar: string;
    level: string;
    instanceType: TInstanceTypeEnum;
    examGradeSystem: TExamGradeSystemEnum | null;
  }[];
};
