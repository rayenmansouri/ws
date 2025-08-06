import { TActionsEnum, TResourcesEnum } from "./../../../constants/ActionsResource";
import { ID } from "./../../../types/BaseEntity";
import { inject } from "../../../core/container/TypedContainer";
import { injectable } from "inversify";
import { RoleRepo } from "../../authorization/domain/Role.repo";
import { AdminRepo } from "../domain/Admin.repo";

@injectable()
export class AdminApplicationService {
  constructor(
    @inject("RoleRepo") private roleRepo: RoleRepo,
    @inject("AdminRepo") private adminRepo: AdminRepo,
  ) {}

  async getAdminIdsByActionAndResource(
    action: TActionsEnum,
    resource: TResourcesEnum,
  ): Promise<ID[]> {
    const authorizedAdminRoles = await this.roleRepo.findRolesByPermission(action, resource);

    const rolesIds = authorizedAdminRoles.map(role => (role as any)._id || (role as any).id);

    const admins = await this.adminRepo.findManyByRoleIds(rolesIds);

    return admins.map(admin => admin.id as any);
  }
}
