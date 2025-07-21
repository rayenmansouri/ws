import { END_USER_ENUM } from "../../src/constants/globalEnums";
import { SUPER_ADMIN_ROLE } from "../../src/feature/authorization/domain/role.entity";
import { ISeeder } from "../interface";
import { mongoRoleModel } from "../../src/newDatabase/mongo/schemas/role.schema";

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
