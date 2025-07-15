import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { MasterRepo } from "../domain/Master.repo";
import { HashingHelper } from "../../../helpers/HashUtils";
import { defaultAvatar, TGenderEnum } from "../../users/domain/baseUser.entity";
import { ID } from "../../../types/BaseEntity";
import { RoleRepo } from "../../authorization/domain/Role.repo";

type AddMasterUseCaseRequest = {
  firstName: string;
  lastName: string;
  gender: TGenderEnum;
  address1?: string;
  address2?: string;
  birthDate: Date;
  email?: string;
  phoneNumber?: string;
  password: string;
  roles: ID[];
};

@injectable()
export class AddMasterUseCase {
  constructor(
    @inject("MasterRepo") private masterRepo: MasterRepo,
    @inject("RoleRepo") private roleRepo: RoleRepo,
  ) {}

  async execute(payload: AddMasterUseCaseRequest): Promise<void> {
    if (payload.email)
      await this.masterRepo.ensureFieldUniqueness("email", payload.email, "alreadyUsed.email");

    if (payload.phoneNumber)
      await this.masterRepo.ensureFieldUniqueness(
        "phoneNumber",
        payload.phoneNumber,
        "alreadyUsed.phoneNumber",
      );

    await this.roleRepo.findMasterRoleByIdsOrThrow(payload.roles);

    await this.masterRepo.addOne({
      ...payload,
      email: payload.email || null,
      phoneNumber: payload.phoneNumber || null,
      address1: payload.address1 || null,
      address2: payload.address2 || null,
      fullName: `${payload.firstName} ${payload.lastName}`,
      avatar: {
        link: defaultAvatar,
        name: defaultAvatar,
        path: defaultAvatar,
        uploadedAt: new Date(),
        size: 660,
        mimeType: "svg",
      },
      password: await HashingHelper.generateHash(payload.password),
      passwordChangedAt: null,
      isArchived: false,
      archivedAt: null,
      isActive: true,
    });
  }
}
