import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { HomeworkRepo } from "../../homeworks/domain/Homework.repo";
import { SessionRepo } from "../domain/Session.repo";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { SESSION_STATUS_ENUM } from "./../../../database/schema/pedagogy/session/session.schema";
import { HOMEWORK_STATUS_ENUM } from "./../../../features/homework/constants/shared/addHomework.constants";
import { ID } from "./../../../types/BaseEntity";
import { SessionService } from "./../domain/Session.service";

export type CloseSessionRequestDTO = {
  sessionNewId: string;
  teacherId: ID;
  tenantId: ID;
};

@injectable()
export class CloseSessionUseCase {
  constructor(
    @inject("SessionRepo") private readonly sessionRepo: SessionRepo,
    @inject("HomeworkRepo") private readonly homeworkRepo: HomeworkRepo,
  ) {}

  async execute(dto: CloseSessionRequestDTO): Promise<void> {
    const session = await this.sessionRepo.findOneByNewIdOrThrow(
      dto.sessionNewId,
      "notFound.session",
    );

    SessionService.ensureSessionCanBeTerminated(session.endTime, dto.tenantId, session.status);

    const closeSessionPromise = this.sessionRepo.updateOneById(session._id, {
      status: SESSION_STATUS_ENUM.COMPLETED,
      closeTime: getCurrentTimeOfSchool(dto.tenantId),
    });

    const updateHomeworkStatuesPromise = this.homeworkRepo.updateManyByIds(
      [...session.homeworkGiven, ...session.homeworkToDo],
      { status: HOMEWORK_STATUS_ENUM.DONE },
    );

    await Promise.all([closeSessionPromise, updateHomeworkStatuesPromise]);
  }
}
