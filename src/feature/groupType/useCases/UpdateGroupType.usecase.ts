import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { GroupTypeRepo } from "../../groupManagement/repos/GroupType.repo";

type UpdateGroupTypeParams = Partial<{
  name: string;
  coefficient: number | null;
  exams: { examTypeNewId: string; coefficient: number }[];
  illustration: string;
}> & { groupTypeNewId: string };

@injectable()
export class UpdateGroupTypeUseCase {
  constructor(
    @inject("GroupTypeRepo") private groupTypeRepo: GroupTypeRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
  ) {}

  async execute(data: UpdateGroupTypeParams): Promise<void> {
    const { groupTypeNewId, name } = data;

    const groupType = await this.groupTypeRepo.findOneByNewIdOrThrow(
      groupTypeNewId,
      "notFound.groupType",
    );

    if (name && name !== groupType.name) {
      await this.groupTypeRepo.ensureFieldUniqueness("name", name, "alreadyUsed.name");
    }

    const updatedGroupType = await this.groupTypeRepo.updateOneById(groupType._id, {
      name: data.name ?? groupType.name,
      coefficient: data.coefficient ?? groupType.coefficient,
      illustration: data.illustration,
    });

    await this.groupRepo.updateManyByGroupType(groupType._id, {
      groupType: updatedGroupType!,
    });
  }
}
