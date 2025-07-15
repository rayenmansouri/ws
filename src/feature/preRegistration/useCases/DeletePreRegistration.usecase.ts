import { injectable } from "inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { deleteManyFile } from "../../../helpers/upload";
import { ID } from "../../../types/BaseEntity";
import { PRE_REGISTRATION_STATUES_ENUM } from "../domains/preRegistration.entity";
import { PreRegistrationRepo } from "../domains/PreRegistration.repo";

@injectable()
export class DeletePreRegistrationUseCase {
  constructor(@inject("PreRegistrationRepo") private preRegistrationRepo: PreRegistrationRepo) {}

  async execute(preRegistrationId: ID): Promise<void> {
    const preRegistration = await this.preRegistrationRepo.findOneByIdOrThrow(
      preRegistrationId,
      "notFound.preRegistration",
    );

    if (preRegistration.status === PRE_REGISTRATION_STATUES_ENUM.APPROVED)
      throw new BadRequestError("preRegistration.preRegistrationDeletionPolicy");

    const preRegistrationFilesIds: string[] = [
      ...preRegistration.birthCertificate,
      ...preRegistration.previousTranscripts,
    ].map(file => file.public_id);

    await this.preRegistrationRepo.deleteOneById(preRegistrationId);
    await deleteManyFile(preRegistrationFilesIds);
  }
}
