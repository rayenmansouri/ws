import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { ChapterRepo } from "../domain/Chapter.repo";
import { GroupTypeRepo } from "../../groupManagement/repos/GroupType.repo";
import { ID } from "../../../types/BaseEntity";
import { END_USER_ENUM, TEndAdministrationUserEnums } from "../../../constants/globalEnums";
import { ChapterService } from "../domain/Chapter.service";
import { ChapterMapper } from "../mappers/Chapter.mapper";
import { topicChapterDto } from "../dtos/Chapter.dto";

type GetGroupTypesOfChaptersDto = {
  userId: ID;
  userType: TEndAdministrationUserEnums;
};

@injectable()
export class GetGroupTypesOfChaptersUseCase {
  constructor(
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("ChapterRepo") private chapterRepo: ChapterRepo,
    @inject("GroupTypeRepo") private groupTypeRepo: GroupTypeRepo,
  ) {}

  async execute(dto: GetGroupTypesOfChaptersDto): Promise<topicChapterDto[]> {
    const { userId, userType } = dto;

    const teacher =
      userType === END_USER_ENUM.TEACHER
        ? await this.teacherRepo.findOneByIdOrThrow(userId, "notFound.teacher")
        : null;

    const allGroupTypes = await this.groupTypeRepo.findAll();

    const groupTypesIds = teacher?.groupTypes || allGroupTypes.map(groupType => groupType._id);

    const chapters = await this.chapterRepo.getStudentChapters({
      groupTypeIds: groupTypesIds,
      classTypeId: undefined,
    });
    const chapterByTopic = ChapterService.groupChaptersByTopic(chapters);

    const groupTypesWithNoChapters = allGroupTypes
      .filter(groupType => !chapterByTopic.some(chapter => chapter.topic._id === groupType._id))
      .map(groupType => ({ topic: groupType, topicType: "groupType" as const, chapters: [] }));

    return [...chapterByTopic, ...groupTypesWithNoChapters].map(chapter =>
      ChapterMapper.toTopicChapterDto(chapter),
    );
  }
}
