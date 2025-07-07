import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { RoleRepo } from "../domain/Role.repo";
import { RoleService } from "../domain/Role.service";
import { TLanguageEnum } from "../../../translation/constants";

type UpdateRoleUseCaseRequest = {
  name?: string;
  permissions?: string[];
  translation?: Record<TLanguageEnum, string>;
};

@injectable()
export class UpdateRoleUseCase {
  constructor(@inject("RoleRepo") private RoleRepo: RoleRepo) {}

  async execute(
    roleNewId: string,
    payload: UpdateRoleUseCaseRequest
  ): Promise<void> {
    const role = await this.RoleRepo.findOneByNewIdOrThrow(
      roleNewId,
      "roleManagement.roleNotFound"
    );

    if (payload.name && payload.name !== role.name)
      await this.RoleRepo.ensureFieldUniqueness(
        "name",
        payload.name,
        "alreadyUsed.name"
      );

    if (payload.permissions)
      RoleService.ensurePermissionsAreValid(payload.permissions);

    await this.RoleRepo.updateOneByNewId(roleNewId, payload);
  }
}
