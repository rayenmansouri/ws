import { injectable } from "inversify/lib/inversify";
import { omit } from "lodash";
import moment from "moment";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { BaseEntity } from "../../../types/BaseEntity";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { School } from "../../schools/domain/school.entity";
import { Session } from "../../sessionManagement/domain/session.entity";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { SessionTypeRepo } from "../../sessionTypes/repos/SessionType.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";
import { WeeklyScheduleService } from "../domains/WeeklySchedule.service";

@injectable()
export class ApplyWeeklyScheduleForClassUseCase {
  constructor(
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("School") private school: School,
    @inject("SessionTypeRepo") private sessionTypeRepo: SessionTypeRepo,
  ) {}

  async execute(classNewId: string): Promise<void> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["schoolYear"],
    });

    const currentTimeOfSchool = getCurrentTimeOfSchool(this.school._id);

    WeeklyScheduleService.ensureSchoolYearNotEnded(classDoc.schoolYear, currentTimeOfSchool);

    await this.weeklySessionRepo.deletePublishedWeeklySessionsByClass(classDoc._id);

    const draftWeeklySessions = await this.weeklySessionRepo.findDraftWeeklySessionsByClass(
      classDoc._id,
    );
    const weeklySessionToBePublished = draftWeeklySessions.map(weeklySession => ({
      ...omit(weeklySession, ["_id", "newId", "createdAt", "updatedAt"]),
      isDraft: false,
    }));

    await this.weeklySessionRepo.addMany(weeklySessionToBePublished);

    await this.sessionRepo.deleteWaitingSessionsOfClass(classDoc._id);

    const schoolYear = classDoc.schoolYear;

    const sessionTypes = await this.sessionTypeRepo.findAll();

    const firstSundayOfSchoolYear = moment(schoolYear.startDate).startOf("week").toDate();

    const sessionPayloads: Omit<Session, keyof BaseEntity>[] =
      WeeklyScheduleService.generateSessionsFromWeeklySessions({
        weeklySessionToBePublished,
        sessionTypes,
        schoolYear: classDoc.schoolYear,
        holidays: [],
        currentTimeOfSchool,
        firstSundayOfSchoolYear,
      });

    await this.sessionRepo.addMany(sessionPayloads);

    return;
  }
}
