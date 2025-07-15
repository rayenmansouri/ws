import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { RoleRepo } from "../domain/Role.repo";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { RoleService } from "../domain/Role.service";
import { TLanguageEnum } from "../../../translation/constants";

type AddRoleUseCaseRequest = {
  name: string;
  userTypes: TEndUserEnum[];
  permissions: string[];
  translation: Record<TLanguageEnum, string>;
};

@injectable()
export class AddRoleUseCase {
  constructor(@inject("RoleRepo") private RoleRepo: RoleRepo) {}

  async execute(payload: AddRoleUseCaseRequest): Promise<void> {
    await this.RoleRepo.ensureFieldUniqueness("name", payload.name, "alreadyUsed.name");

    RoleService.ensurePermissionsAreValid(payload.permissions);

    await this.RoleRepo.addOne(payload);
  }
}
