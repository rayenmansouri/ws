import { injectable } from "inversify/lib/inversify";
import { BaseRepo } from "../../../core/BaseRepo";
import { inject } from "../../../core/container/TypedContainer";
import { EntityMetaData } from "../../../types/BaseEntity";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { TOPIC_TYPE_ENUM, TTopicTypeEnum } from "../../examGrade/domain/tunisian/ExamGrade.entity";
import { GroupTypeRepo } from "../../groupManagement/repos/GroupType.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";
import { ChapterRepo } from "../domain/Chapter.repo";
import { ChapterDetailsDto } from "../dtos/Chapter.dto";
import { ChapterMapper } from "../mappers/Chapter.mapper";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";

type GetStudentChaptersUseCasePrams = {
  topicType: PickFromEnum<TTopicTypeEnum, "subjectType" | "subSubjectType"> | "groupType";
  topicNewId: string;
  classTypeNewId?: string;
};
@injectable()
export class GetChaptersByTopicUseCase {
  constructor(
    @inject("ChapterRepo") private chapterRepo: ChapterRepo,
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo,
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
    @inject("GroupTypeRepo") private groupTypeRepo: GroupTypeRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {}

  async execute(params: GetStudentChaptersUseCasePrams): Promise<ChapterDetailsDto[]> {
    const { topicType, topicNewId, classTypeNewId } = params;

    const topicRepo: BaseRepo<EntityMetaData> =
      topicType === TOPIC_TYPE_ENUM.SUBJECT_TYPE
        ? this.subjectTypeRepo
        : topicType === TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE
        ? this.subSubjectTypeRepo
        : this.groupTypeRepo;

    const topic = await topicRepo.findOneByNewIdOrThrow(topicNewId, `notFound.${topicType}`);
    const classType = classTypeNewId
      ? await this.classTypeRepo.findOneByNewIdOrThrow(classTypeNewId, "notFound.classType")
      : undefined;

    const chapters = await this.chapterRepo.getChaptersByTopic(
      topicType,
      topic._id,
      classType?._id,
    );

    return chapters.map(chapter => ChapterMapper.toChapterDetailsDto(chapter));
  }
}
