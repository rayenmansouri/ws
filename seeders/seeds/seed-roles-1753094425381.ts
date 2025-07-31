import { END_USER_ENUM } from "../../src/constants/globalEnums";
import { SUPER_ADMIN_ROLE } from "../../src/feature/authorization/domain/role.entity";
import { ISeeder } from "../interface";
import { mongoRoleModel } from "../../src/newDatabase/mongo/schemas/role.schema";
import { UserTypeEnum } from "../../src/feature/user-management/factory/enums";

export default class SeedRoles implements ISeeder {
    roles = [
        {
          name: SUPER_ADMIN_ROLE,
          permissions: [],
          userTypes: [END_USER_ENUM.MASTER],
          description: "Super Admin Role",
          translation: {
            ar: "المدير العام",
            en: "Super Admin",
            fr: "Super Admin",
          },
        }, 
        {
          name: UserTypeEnum.ADMIN,
          permissions: [],
          userTypes: [END_USER_ENUM.ADMIN],
          description: "Admin Role",
          translation: {
            ar: "المدير",
            en: "Admin",
          },
        },
        {
          name: UserTypeEnum.TEACHER,
          permissions: [],
          userTypes: [END_USER_ENUM.TEACHER],
        }
    ]
    
    async seed(): Promise<void> {
        console.log("seeding roles")
        await mongoRoleModel.insertMany(this.roles);
    }  
    
     async preSeed(): Promise<void> {
        console.log("removing all roles from database");
        await mongoRoleModel.deleteMany({});
    }
}
