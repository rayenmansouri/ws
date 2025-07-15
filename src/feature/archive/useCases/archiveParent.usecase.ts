import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ParentRepo } from "../../parents/domain/Parent.repo";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { BadRequestError } from "../../../core/ApplicationErrors";

export type ArchiveParentUseCaseRequestDto = {
  parentNewId: string;
  tenantId: string;
};

@injectable()
export class ArchiveParentUseCase {
  constructor(@inject("ParentRepo") private parentRepo: ParentRepo) {}

  async execute(dto: ArchiveParentUseCaseRequestDto): Promise<void> {
    const parent = await this.parentRepo.findOneByNewIdOrThrow(dto.parentNewId, "notFound.teacher");

    if (parent.isArchived) throw new BadRequestError("parent.alreadyArchived");

    await this.parentRepo.updateOneById(parent._id, {
      isArchived: true,
      archivedAt: getCurrentTimeOfSchool(dto.tenantId),
    });
  }
}
