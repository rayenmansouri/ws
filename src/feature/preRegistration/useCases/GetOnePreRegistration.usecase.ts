import { injectable } from "inversify/lib/inversify";
import { PreRegistrationRepo } from "../domains/PreRegistration.repo";
import { ID } from "../../../types/BaseEntity";
import { PreRegistrationMapper } from "../mappers/PreRegistration.mapper";
import { PreRegistrationDTO } from "../dtos/PreRegistration.dto";
import { inject } from "../../../core/container/TypedContainer";

@injectable()
export class GetOnePreRegistrationUseCase {
  constructor(@inject("PreRegistrationRepo") private preRegistrationRepo: PreRegistrationRepo) {}

  async execute(preRegistrationId: ID): Promise<PreRegistrationDTO> {
    const preRegistration = await this.preRegistrationRepo.findOneByIdOrThrow(
      preRegistrationId,
      "notFound.preRegistration",
      { populate: ["classType", "level"] },
    );

    return PreRegistrationMapper.toPreRegistrationDTO(preRegistration);
  }
}
