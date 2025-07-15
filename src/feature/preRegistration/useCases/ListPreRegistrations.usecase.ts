import { injectable } from "inversify/lib/inversify";
import { PreRegistrationRepo } from "../domains/PreRegistration.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { PreRegistrationDTO } from "../dtos/PreRegistration.dto";
import { ID } from "../../../types/BaseEntity";
import { PreRegistrationMapper } from "../mappers/PreRegistration.mapper";
import { inject } from "../../../core/container/TypedContainer";

@injectable()
export class ListPreRegistrationsUseCase {
  constructor(@inject("PreRegistrationRepo") private preRegistrationRepo: PreRegistrationRepo) {}

  async execute(
    filter: {
      search?: string;
      level?: ID;
      status?: string;
      isRegistered?: boolean;
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<PreRegistrationDTO>> {
    const preRegistrations = await this.preRegistrationRepo.listPreRegistrations(filter, options);

    return {
      docs: preRegistrations.docs.map(preRegistration =>
        PreRegistrationMapper.toPreRegistrationDTO(preRegistration),
      ),
      meta: preRegistrations.meta,
    };
  }
}
