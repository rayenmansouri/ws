import { injectable } from "inversify";
import { ClientSession } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { getNewTenantConnection } from "../../../database/connectionDB/tenantPoolConnection";
import { MongoAdminRepo } from "../../../newDatabase/mongo/repositories/MongoAdmin.repo";
import { MongoTeacherRepo } from "../../../newDatabase/mongo/repositories/MongoTeacher.repo";
import { SchoolRepo } from "../../schools/domain/School.repo";
import { RoleRepo } from "../domain/Role.repo";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { MasterRepo } from "../../masters/domain/Master.repo";

@injectable()
export class DeleteRoleUseCase {
  constructor(
    @inject("RoleRepo") private roleRepo: RoleRepo,
    @inject("SchoolRepo") private schoolRepo: SchoolRepo,
    @inject("MasterRepo") private masterRepo: MasterRepo,
    @inject("Session")
    private session: ClientSession,
  ) {}

  async execute(roleNewId: string): Promise<void> {
    const role = await this.roleRepo.findOneByNewIdOrThrow(
      roleNewId,
      "roleManagement.roleNotFound",
    );

    const schools = await this.schoolRepo.findAll();

    for (const school of schools) {
      const connection = await getNewTenantConnection(school.subdomain);

      if (role.userTypes.includes(END_USER_ENUM.ADMIN)) {
        const adminRepo = new MongoAdminRepo(connection, this.session);
        await adminRepo.removeRoleFromAdmin(role._id);
      }

      if (role.userTypes.includes(END_USER_ENUM.TEACHER)) {
        const teacherRepo = new MongoTeacherRepo(connection, this.session);
        await teacherRepo.removeRoleFromTeacher(role._id);
      }
    }

    if (role.userTypes.includes(END_USER_ENUM.MASTER))
      await this.masterRepo.removeRoleFromMaster(role._id);

    await this.roleRepo.deleteOneById(role._id);
  }
}
