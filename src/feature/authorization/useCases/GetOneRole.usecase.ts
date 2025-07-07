import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { RoleRepo } from "../domain/Role.repo";
import { RoleDTO } from "../dtos/Role.dto";
import { RoleMapper } from "../mappers/Role.mapper";

@injectable()
export class GetOneRoleUseCase {
  constructor(@inject("RoleRepo") private roleRepo: RoleRepo) {}

  async execute(roleNewId: string): Promise<RoleDTO> {
    const role = await this.roleRepo.findOneByNewIdOrThrow(
      roleNewId,
      "roleManagement.roleNotFound",
    );

    return RoleMapper.toRoleDTO(role);
  }
}
