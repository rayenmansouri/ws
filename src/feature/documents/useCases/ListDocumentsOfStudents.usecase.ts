import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { paginateResult } from "../../../helpers/paginateResult";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { HomeworkRepo } from "../../homeworks/domain/Homework.repo";
import { ObservationRepo } from "../../observations/domain/Observation.repo";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { StudentApplicationService } from "../../students/application/Student.application.service";
import { StudentRepo } from "../../students/domain/Student.repo";
import { DOCUMENT_SOURCE_ENUM, DocumentDto, TDocumentSourceEnum } from "../dtos/document.dto";
import { DocumentMapper } from "../mappers/document.mapper";

type ListDocumentsOfStudentsUseCaseInput = {
  studentNewId: string;
  search?: string;
  teacherIds?: ID[];
  groupIds?: ID[];
  subjectTypeIds?: ID[];
  sources: TDocumentSourceEnum[];
} & ListOptions;

@injectable()
export class ListDocumentsOfStudentsUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("ObservationRepo") private observationRepo: ObservationRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("HomeworkRepo") private homeworkRepo: HomeworkRepo,
  ) {}

  async execute(
    filter: ListDocumentsOfStudentsUseCaseInput,
  ): Promise<ResponseWithPagination<DocumentDto>> {
    const {
      studentNewId,
      sources,
      teacherIds,
      subjectTypeIds,
      groupIds: selectedGroupIds,
    } = filter;
    const student = await this.studentRepo.findOneByNewIdOrThrow(studentNewId, "notFound.student");

    const { classId, groupIds } = await this.studentApplicationService.getCurrentAcademicDetails(
      student,
    );

    const isHomeworkIncluded =
      sources.length === 0 ? true : sources.includes(DOCUMENT_SOURCE_ENUM.HOMEWORK);
    const isObservationIncluded =
      sources.length === 0 ? true : sources.includes(DOCUMENT_SOURCE_ENUM.OBSERVATION);
    const isSessionIncluded =
      sources.length === 0 ? true : sources.includes(DOCUMENT_SOURCE_ENUM.SESSION_SUMMARY);

    const homeworksPromises = isHomeworkIncluded
      ? this.homeworkRepo.listHomeworks(
          {
            classId: selectedGroupIds ? undefined : classId || undefined,
            groupIds: selectedGroupIds || groupIds,
            search: filter.search,
            excludeEmptyFiles: true,
            teacherIds,
            subjectTypeIds,
          },
          { limit: filter.limit, page: filter.page, populate: ["teacher", "addedByAdmin"] },
        )
      : null;

    const observationsPromises = isObservationIncluded
      ? this.observationRepo.list(
          {
            classId: selectedGroupIds ? undefined : classId || undefined,
            groupIds: selectedGroupIds || groupIds,
            studentId: student._id,
            search: filter.search,
            excludeEmptyFiles: true,
            teacherIds,
            subjectTypeIds,
          },
          { limit: filter.limit, page: filter.page, populate: ["issuer"] },
        )
      : null;

    const sessionsPromises = isSessionIncluded
      ? this.sessionRepo.listSessions(
          {
            classId: selectedGroupIds ? undefined : classId || undefined,
            groupIds: selectedGroupIds || groupIds,
            search: filter.search,
            excludeEmptyFiles: true,
            teacherIds,
            subjectTypeIds,
          },
          { limit: filter.limit, page: filter.page },
        )
      : null;

    const [homeworks, observations, sessions] = await Promise.all([
      homeworksPromises,
      observationsPromises,
      sessionsPromises,
    ]);

    const homeworkDocuments = homeworks?.docs.map(homework =>
      DocumentMapper.toDocumentDto({ homework, session: undefined, observation: undefined }),
    );

    const observationDocuments = observations?.docs.map(observation =>
      DocumentMapper.toDocumentDto({
        observation: observation,
        homework: undefined,
        session: undefined,
      }),
    );

    const sessionDocuments = sessions?.docs.map(session =>
      DocumentMapper.toDocumentDto({ session, homework: undefined, observation: undefined }),
    );

    const fileWithPagination = paginateResult(
      [...(homeworkDocuments || []), ...(observationDocuments || []), ...(sessionDocuments || [])],
      filter.limit,
      filter.page,
    );

    return fileWithPagination;
  }
}
