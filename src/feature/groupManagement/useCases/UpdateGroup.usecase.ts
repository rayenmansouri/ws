import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { GroupRepo } from "../repos/Group.repo";
import { UpdateGroupTeacherUseCase } from "./UpdateGroupTeacher.usecase";

type UpdateGroupParams = Partial<{
  name: string;
  teacherNewId: string;
}>;

@injectable()
export class UpdateGroupUseCase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("UpdateGroupTeacherUseCase")
    private updateGroupTeacherUseCase: UpdateGroupTeacherUseCase,
  ) {}

  async execute(groupNewId: string, params: UpdateGroupParams): Promise<void> {
    const { name, teacherNewId } = params;

    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group", {
      populate: ["teacher"],
    });

    if (name && name !== group.name) {
      await this.groupRepo.ensureFieldUniqueness("name", name, "alreadyUsed.name");
    }

    await this.groupRepo.updateOneById(group._id, {
      name,
    });

    if (teacherNewId && teacherNewId !== group.teacher.newId) {
      await this.updateGroupTeacherUseCase.execute({ groupNewId, teacherNewId });
    }

    return;
  }
}
