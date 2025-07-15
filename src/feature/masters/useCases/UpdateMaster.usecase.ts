import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { RoleRepo } from "../../authorization/domain/Role.repo";
import { MasterRepo } from "../domain/Master.repo";
import { TGenderEnum } from "../../users/domain/baseUser.entity";

type UpdateMasterUseCaseRequest = {
  firstName?: string;
  lastName?: string;
  gender?: TGenderEnum;
  address1?: string;
  address2?: string;
  birthDate?: Date;
  email?: string;
  phoneNumber?: string;
  roles?: ID[];
};

@injectable()
export class UpdateMasterUseCase {
  constructor(
    @inject("MasterRepo") private masterRepo: MasterRepo,
    @inject("RoleRepo") private roleRepo: RoleRepo,
  ) {}

  async execute(masterNewId: string, payload: UpdateMasterUseCaseRequest): Promise<void> {
    const master = await this.masterRepo.findOneByNewIdOrThrow(masterNewId, "notFound.master");

    if (payload.email && payload.email !== master.email)
      await this.masterRepo.ensureFieldUniqueness("email", payload.email, "alreadyUsed.email");

    if (payload.phoneNumber && payload.phoneNumber !== master.phoneNumber)
      await this.masterRepo.ensureFieldUniqueness(
        "phoneNumber",
        payload.phoneNumber,
        "alreadyUsed.phoneNumber",
      );

    if (payload.roles) await this.roleRepo.findMasterRoleByIdsOrThrow(payload.roles);

    const firstName = payload.firstName || master.firstName;
    const lastName = payload.lastName || master.lastName;
    const fullName = `${firstName} ${lastName}`;

    await this.masterRepo.updateOneById(master._id, { ...payload, fullName });
  }
}
