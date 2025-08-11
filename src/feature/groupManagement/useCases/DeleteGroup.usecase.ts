import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { GroupRepo } from "../repos/Group.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";

@injectable()
export class DeleteGroupUseCase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
  ) {}

  async execute(groupNewId: string): Promise<void> {
    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group");

    if (group.students.length > 0) throw new BadRequestError("groupRules.groupHasStudent");

    const promises: Promise<void>[] = [];
    promises.push(this.weeklySessionRepo.deleteManyByGroup(group._id));
    promises.push(this.sessionRepo.deleteManyByGroup(group._id));
    promises.push(this.groupRepo.deleteOneById(group._id));
    await Promise.all(promises);
    return;
  }
}
