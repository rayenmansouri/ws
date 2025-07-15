import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { AdminRepo } from "../../admins/domain/Admin.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

export type unArchiveAdminUseCaseRequestDto = {
  adminNewId: string;
};

@injectable()
export class UnArchiveAdminUseCase {
  constructor(@inject("AdminRepo") private adminRepo: AdminRepo) {}

  async execute(dto: unArchiveAdminUseCaseRequestDto): Promise<void> {
    const admin = await this.adminRepo.findOneByNewIdOrThrow(dto.adminNewId, "notFound.admin");

    if (!admin.isArchived) throw new BadRequestError("admin.alreadyUnArchived");

    await this.adminRepo.updateOneById(admin._id, {
      isArchived: false,
    });
  }
}
