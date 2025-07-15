import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";

import { BadRequestError } from "../../../core/ApplicationErrors";
import { ParentRepo } from "../../parents/domain/Parent.repo";

export type unArchiveParentUseCaseRequestDto = {
  parentNewId: string;
};

@injectable()
export class UnArchiveParentUseCase {
  constructor(@inject("ParentRepo") private parentRepo: ParentRepo) {}

  async execute(dto: unArchiveParentUseCaseRequestDto): Promise<void> {
    const parent = await this.parentRepo.findOneByNewIdOrThrow(dto.parentNewId, "notFound.parent");

    if (!parent.isArchived) throw new BadRequestError("parent.alreadyUnArchived");

    await this.parentRepo.updateOneById(parent._id, {
      isArchived: false,
    });
  }
}
