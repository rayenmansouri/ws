import { END_USER_ENUM } from "../../src/constants/globalEnums";
import { ISeeder } from "../interface";
import { UserTypeEnum } from "../../src/feature/user-management/factory/enums";
import { ACTION_ENUM, RESOURCES_ENUM } from "../../src/constants/ActionsResource";
import { RoleModel } from "../../src/feature/roles/role.schema";
import { SUPER_ADMIN_ROLE } from "../../src/feature/roles/constant";
import { RoleService } from "../../src/core/express/middlewares/authorize";

export default class SeedRoles implements ISeeder {
    roles = [
        {
          name: SUPER_ADMIN_ROLE,
          userTypes: [END_USER_ENUM.MASTER],
          description: "Super Admin Role",
          permissions: [
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.USER),
          ],
          translation: {
            ar: "المدير العام",
            en: "Super Admin",
            fr: "Super Admin",
          },
        }, 
        {
          name: UserTypeEnum.ADMIN,
          permissions: [
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.USER),
          ],
          userTypes: [END_USER_ENUM.ADMIN],
          description: "Admin Role",
          translation: {
            ar: "المدير",
            en: "Admin",
          },
        },
        {
          name: UserTypeEnum.COACH,
          userTypes: [END_USER_ENUM.COACH],
          description: "Coach Role",
          translation: {
            ar: "المدرب",
            en: "Coach",
          },
        },
        {
          name: UserTypeEnum.PARTICIPANT,
          userTypes: [END_USER_ENUM.PARTICIPANT],
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
