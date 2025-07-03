import { injectable } from "inversify/lib/inversify";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager } from "../../../core/fileManager/FileManager";
import { RoleRepo } from "../../authorization/domain/Role.repo";
import { School } from "../../schools/domain/school.entity";
import { CentralUserRepo } from "../../users/domain/CentralUser.repo";
import {
  BaseUpdateUserUseCase,
  UpdateBaseUserRequest,
} from "../../users/useCases/BaseUpdateUser.usecase";
import { Admin } from "../domain/admin.entity";
import { AdminRepo } from "../domain/Admin.repo";

export type UpdateAdminRequest = UpdateBaseUserRequest;

@injectable()
export class UpdateAdminUseCase extends BaseUpdateUserUseCase<UpdateAdminRequest, Admin> {
  constructor(
    @inject("AdminRepo") private adminRepo: AdminRepo,
    @inject("FileManager") fileManager: FileManager,
    @inject("School") school: School,
    @inject("CentralUserRepo") centralUserRepo: CentralUserRepo,
    @inject("RoleRepo") private roleRepo: RoleRepo,
  ) {
    super(fileManager, END_USER_ENUM.ADMIN, school, centralUserRepo);
  }

  protected async findUserByNewId(newId: string): Promise<Admin> {
    return await this.adminRepo.findOneByNewIdOrThrow(newId, "notFound.admin");
  }

  protected async updateUserInDB(admin: Admin, updatePayload: Partial<Admin>): Promise<Admin> {
    const updatedAdmin = (await this.adminRepo.updateOneById(admin._id, updatePayload))!;

    return updatedAdmin;
  }

  protected async preUpdateUser(_: Admin, userDetails: UpdateAdminRequest): Promise<void> {
    if (userDetails.roles && userDetails.roles.length > 0)
      await this.roleRepo.findAdminRoleByIdsOrThrow(userDetails.roles);
  }

  protected async postUpdateUser(): Promise<void> {
    // Nothing additional to do after updating an admin
  }
}
