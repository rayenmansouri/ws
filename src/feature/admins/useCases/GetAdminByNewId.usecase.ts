import { injectable } from "inversify/lib/inversify";
import { AdminRepo } from "../domain/Admin.repo";
import { inject } from "../../../core/container/TypedContainer";
import { RoleRepo } from "../../authorization/domain/Role.repo";
import { AdminDTO } from "../dtos/Admin.dto";
import { AdminMapper } from "../mappers/Admin.mapper";
import { TLanguageEnum } from "../../../translation/constants";

@injectable()
export class GetAdminByNewIdUseCase {
  constructor(
    @inject("AdminRepo") private adminRepo: AdminRepo,
    @inject("RoleRepo") private roleRepo: RoleRepo,
    @inject("Language") private language: TLanguageEnum,
  ) {}

  async execute(adminNewId: string): Promise<AdminDTO> {
    const admin = await this.adminRepo.findOneByNewIdOrThrow(adminNewId, "notFound.admin");

    const roles = await this.roleRepo.findAdminRoleByIdsOrThrow(admin.roles);

    return AdminMapper.toDTO(admin, roles, this.language);
  }
}
