import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ObservationRepo } from "../domain/Observation.repo";
import { ObservationDTO } from "../dtos/observation.dto";
import { ObservationMapper } from "../mappers/Observation.mapper";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";

@injectable()
export class ListObservationsUseCase {
  constructor(
    @inject("ObservationRepo") private observationRepo: ObservationRepo,
    @inject("SessionRepo") private readonly sessionRepo: SessionRepo,
  ) {}

  async execute(
    filter: {
      classId?: ID;
      groupId?: ID;
      studentId?: ID;
      teacherId?: ID;
      observationReasonId?: ID;
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<ObservationDTO>> {
    const data = await this.observationRepo.list(
      {
        classId: filter.classId,
        teacherIds: filter.teacherId ? [filter.teacherId] : undefined,
        studentId: filter.studentId,
        groupIds: filter.groupId ? [filter.groupId] : undefined,
        observationReasonId: filter.observationReasonId,
      },
      { ...options, populate: ["issuer", "students"] },
    );

    const sessionIds = data.docs
      .map(observation => observation.session)
      .filter(sessionId => sessionId !== null);

    const sessions = await this.sessionRepo.findManyByIds(sessionIds, {
      populate: ["subjectType", "subSubjectType", "group"],
    });

    const observationDTOs = data.docs.map(observation => {
      const matchedSession = sessions.find(session => session._id === observation.session);

      const topicName =
        matchedSession?.subjectType?.name ||
        matchedSession?.subSubjectType?.name ||
        matchedSession?.group?.groupType?.name ||
        null;

      return ObservationMapper.toObservationDTO(observation, topicName);
    });

    return {
      meta: data.meta,
      docs: observationDTOs,
    };
  }
}
