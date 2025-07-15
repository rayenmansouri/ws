import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { GroupTypeRepo } from "../../groupManagement/repos/GroupType.repo";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

type DeleteGroupTypeParams = {
  groupTypeNewId: string;
};

@injectable()
export class DeleteGroupTypeUseCase {
  constructor(
    @inject("GroupTypeRepo") private groupTypeRepo: GroupTypeRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
  ) {}

  async execute(params: DeleteGroupTypeParams): Promise<void> {
    const groupTypeNewId = params.groupTypeNewId;

    const groupType = await this.groupTypeRepo.findOneByNewIdOrThrow(
      groupTypeNewId,
      "notFound.groupType",
    );
    const groupUsedThisGroupType = await this.groupRepo.findManyByGroupTypes([groupType._id]);

    if (groupUsedThisGroupType.length > 0) {
      throw new BadRequestError("groupTypeRules.groupTypeUsedInGroup");
    }

    await this.groupTypeRepo.deleteOneById(groupType._id);
  }
}
