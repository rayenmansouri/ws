import { UserTypeEnum } from "../user-management/factory/enums";
import { SUPER_ADMIN_ROLE } from "./constant";

export const UserRoleMap = {
    [UserTypeEnum.MASTER]: SUPER_ADMIN_ROLE,
    [UserTypeEnum.ADMIN]: UserTypeEnum.ADMIN,
    [UserTypeEnum.COACH]: UserTypeEnum.COACH,
    [UserTypeEnum.PARTICIPANT]: UserTypeEnum.PARTICIPANT,
}

