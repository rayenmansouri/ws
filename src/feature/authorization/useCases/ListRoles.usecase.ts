import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { RoleRepo } from "../domain/Role.repo";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { ListOptions } from "../../../types/types";
import { RoleMapper } from "../mappers/Role.mapper";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { RoleDTO } from "../dtos/Role.dto";
import { TLanguageEnum } from "../../../translation/constants";

@injectable()
export class ListRolesUseCase {
  constructor(@inject("RoleRepo") private roleRepo: RoleRepo) {}

  async execute(
    filter: { search?: string; userTypes?: TEndUserEnum[]; language?: TLanguageEnum },
    options: ListOptions,
  ): Promise<ResponseWithPagination<RoleDTO>> {
    const roles = await this.roleRepo.listRoles(filter, options);

    const rolesDTO = roles.docs.map(role => RoleMapper.toRoleDTO(role));

    return { docs: rolesDTO, meta: roles.meta };
  }
}
