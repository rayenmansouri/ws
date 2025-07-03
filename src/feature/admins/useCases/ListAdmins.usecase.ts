import { injectable } from "inversify/lib/inversify";
import { RoleRepo } from "../../authorization/domain/Role.repo";
import { inject } from "../../../core/container/TypedContainer";
import { AdminRepo } from "../domain/Admin.repo";
import { ListOptions } from "../../../types/types";
import { AdminDTO } from "../dtos/Admin.dto";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { AdminMapper } from "../mappers/Admin.mapper";
import { TLanguageEnum } from "../../../translation/constants";

@injectable()
export class ListAdminsUseCase {
  constructor(
    @inject("AdminRepo") private adminRepo: AdminRepo,
    @inject("RoleRepo") private roleRepo: RoleRepo,
    @inject("Language") private language: TLanguageEnum,
  ) {}

  async execute(
    filter: { search?: string; isArchived?: boolean },
    options: ListOptions,
  ): Promise<ResponseWithPagination<AdminDTO>> {
    const response = await this.adminRepo.listAdmins(filter, options);

    const roles = await this.roleRepo.findAll();

    const formattedResponse = {
      docs: response.docs.map(admin => {
        const adminRoles = roles.filter(role => admin.roles.includes(role._id));

        return AdminMapper.toDTO(admin, adminRoles, this.language);
      }),
      meta: response.meta,
    };

    return formattedResponse;
  }
}
