import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { AdminRepo } from "../../admins/domain/Admin.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

export type ArchiveAdminUseCaseRequestDto = {
  adminNewId: string;
  tenantId: string;
  currentUserNewId: string;
};

@injectable()
export class ArchiveAdminUseCase {
  constructor(@inject("AdminRepo") private adminRepo: AdminRepo) {}

  async execute(dto: ArchiveAdminUseCaseRequestDto): Promise<void> {
    if (dto.currentUserNewId === dto.adminNewId)
      throw new BadRequestError("admin.CannotArchiveYourself");
    const admin = await this.adminRepo.findOneByNewIdOrThrow(dto.adminNewId, "notFound.teacher");

    if (admin.isArchived) throw new BadRequestError("admin.alreadyArchived");

    await this.adminRepo.updateOneById(admin._id, {
      isArchived: true,
      archivedAt: getCurrentTimeOfSchool(dto.tenantId),
    });
  }
}
