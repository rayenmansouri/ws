import { injectable } from "inversify/lib/inversify";
import { omit } from "lodash";
import moment from "moment";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { BaseEntity } from "../../../types/BaseEntity";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { School } from "../../schools/domain/school.entity";
import { Session } from "../../sessionManagement/domain/session.entity";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { SessionTypeRepo } from "../../sessionTypes/repos/SessionType.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";
import { WeeklyScheduleService } from "../domains/WeeklySchedule.service";

@injectable()
export class ApplyWeeklyScheduleForGroupUseCase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("School") private school: School,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("SessionTypeRepo") private sessionTypeRepo: SessionTypeRepo,
  ) {}

  async execute(groupNewId: string): Promise<void> {
    const groupDoc = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.schoolYear", {
      populate: ["schoolYears"],
    });

    const currentTimeOfSchool = getCurrentTimeOfSchool(this.school._id);

    WeeklyScheduleService.ensureSchoolYearNotEnded(groupDoc.schoolYears[0], currentTimeOfSchool);

    await this.weeklySessionRepo.deletePublishedWeeklySessionsByGroup(groupDoc._id);

    const draftWeeklySessions = await this.weeklySessionRepo.findDraftWeeklySessionsByGroup(
      groupDoc._id,
    );

    const weeklySessionToBePublished = draftWeeklySessions.map(weeklySession => ({
      ...omit(weeklySession, ["_id", "newId", "createdAt", "updatedAt"]),
      isDraft: false,
    }));

    await this.weeklySessionRepo.addMany(weeklySessionToBePublished);

    await this.sessionRepo.deleteWaitingSessionsOfGroup(groupDoc._id);

    const sessionTypes = await this.sessionTypeRepo.findAll();

    const schoolYears = groupDoc.schoolYears;

    const range = WeeklyScheduleService.getMaxRangeDate(schoolYears);

    const firstSundayOfSchoolYear = moment(range.startDate).startOf("week").toDate();

    const sessionPayloads: Omit<Session, keyof BaseEntity>[] =
      WeeklyScheduleService.generateSessionsFromWeeklySessions({
        weeklySessionToBePublished,
        sessionTypes,
        schoolYear: groupDoc.schoolYears[0],
        holidays: [], // Assuming holidays are not needed here
        currentTimeOfSchool,
        firstSundayOfSchoolYear,
      });

    await this.sessionRepo.addMany(sessionPayloads);

    return;
  }
}
