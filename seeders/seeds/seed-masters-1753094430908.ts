import { SUPER_ADMIN_ROLE } from "../../src/feature/authorization/domain/role.entity";
import { UserTypeEnum } from "../../src/feature/user-management/factory/enums";
import { getUserModel } from "../../src/feature/user-management/factory/models-factory";
import { HashingHelper } from "../../src/helpers/HashUtils";
import { mongoMasterModel } from "../../src/newDatabase/mongo/schemas/master.schema";
import { mongoRoleModel } from "../../src/newDatabase/mongo/schemas/role.schema";
import { ISeeder } from "../interface";

export default class SeedMasters implements ISeeder {
    masters = [
        {
            firstName: "admin",
            lastName: "admin",
            email: "admin@gmail.com",
            schoolSubdomain:"$",
            fullName: "admin",
            password: "password",
            address1: "sahloul",
            address2: "tunis",
            birthDate: new Date("1990-01-01"),
            phoneNumber: "1234567890",
            role:SUPER_ADMIN_ROLE
        }
    ]

    async seed(): Promise<void> {
        console.log("seeding masters");
        await mongoMasterModel.deleteMany({});
        const masterModel = getUserModel(UserTypeEnum.MASTER);
        for (const master of this.masters) {
            const hashedPassword = await HashingHelper.generateHash(master.password);
            const role = await mongoRoleModel.findOne({
                name:SUPER_ADMIN_ROLE
            });
            if(!role){
                throw new Error("Role not found");
            }
            await masterModel.create({
                ...master,
                password:hashedPassword,
                roles:[role._id]
            });
        }
        console.log("seeding seed-masters");
    }
    async preSeed(): Promise<void> {
        console.log("removing all seed-masters from database");
        await mongoMasterModel.deleteMany({});
    }
}
