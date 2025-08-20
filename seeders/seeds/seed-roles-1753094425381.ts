import { END_USER_ENUM } from "../../src/constants/globalEnums";
import { ISeeder } from "../interface";
import { UserTypeEnum } from "../../src/feature/user-management/factory/enums";
import { ACTION_ENUM, RESOURCES_ENUM } from "../../src/constants/ActionsResource";
import { RoleModel } from "../../src/feature/roles/role.schema";
import { RoleService } from "../../src/core/express/middlewares/authorize";
import { UserRoleMap } from "../../src/feature/roles/enums";

export default class SeedRoles implements ISeeder {
    roles = [
        {
          name: UserRoleMap[UserTypeEnum.MASTER],
          userTypes: [UserTypeEnum.MASTER, UserTypeEnum.ADMIN],
          description: "Super Admin Role",
          permissions: [ 
          ],
          translation: {
            ar: "المدير العام",
            en: "Super Admin",
            fr: "Super Admin",
          },
        }, 
        {
          name: UserRoleMap[UserTypeEnum.ADMIN],
          permissions: [
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.STUDENT),
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.STUDENT),
            RoleService.formatPermission(ACTION_ENUM.EDIT, RESOURCES_ENUM.STUDENT),
            RoleService.formatPermission(ACTION_ENUM.DELETE, RESOURCES_ENUM.STUDENT),
            RoleService.formatPermission(ACTION_ENUM.UNASSIGN, RESOURCES_ENUM.STUDENT),
            RoleService.formatPermission(ACTION_ENUM.EXPORT, RESOURCES_ENUM.STUDENT),
            RoleService.formatPermission(ACTION_ENUM.SWITCH, RESOURCES_ENUM.STUDENT),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.TEACHER),
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.TEACHER),
            RoleService.formatPermission(ACTION_ENUM.EDIT, RESOURCES_ENUM.TEACHER),
            RoleService.formatPermission(ACTION_ENUM.DELETE, RESOURCES_ENUM.TEACHER),
            RoleService.formatPermission(ACTION_ENUM.UNASSIGN, RESOURCES_ENUM.TEACHER),
            RoleService.formatPermission(ACTION_ENUM.EXPORT, RESOURCES_ENUM.TEACHER),
            RoleService.formatPermission(ACTION_ENUM.SWITCH, RESOURCES_ENUM.TEACHER),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.PARENT),
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.PARENT),
            RoleService.formatPermission(ACTION_ENUM.EDIT, RESOURCES_ENUM.PARENT),
            RoleService.formatPermission(ACTION_ENUM.DELETE, RESOURCES_ENUM.PARENT),
            RoleService.formatPermission(ACTION_ENUM.SWITCH, RESOURCES_ENUM.PARENT),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.ROLE),
            RoleService.formatPermission(ACTION_ENUM.EDIT, RESOURCES_ENUM.PASSWORD),
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.NOTIFICATION),
            RoleService.formatPermission(ACTION_ENUM.ASSIGN, RESOURCES_ENUM.STUDENT),
            RoleService.formatPermission(ACTION_ENUM.ASSIGN, RESOURCES_ENUM.TEACHER),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.NOTIFICATION), 
          ],
          userTypes: [UserTypeEnum.ADMIN],
          description: "Admin Role",
          translation: {
            ar: "المدير",
            en: "Admin",
          },
        },
        {
          name: UserTypeEnum.COACH,
          userTypes: [UserTypeEnum.COACH],
          description: "Coach Role",
          translation: {
            ar: "المدرب",
            en: "Coach",
          },
        },
        {
          name: UserTypeEnum.PARTICIPANT,
          userTypes: [UserTypeEnum.PARTICIPANT],
          description: "Participant Role",
          translation: {
            ar: "المشارك",
            en: "Participant",
          },
        }
    ]
    
    async seed(): Promise<void> {
        console.log("seeding roles")
        await RoleModel.insertMany(this.roles);
    }  
    
     async preSeed(): Promise<void> {
        console.log("removing all roles from database");
        await RoleModel.deleteMany({});
    }
}
