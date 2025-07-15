import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { ChapterRepo } from "../domain/Chapter.repo";
import { ChapterService } from "../domain/Chapter.service";
import { ChapterMapper } from "../mappers/Chapter.mapper";
import { topicChapterDto } from "../dtos/Chapter.dto";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { isIncludeArrayIds } from "../../../helpers/functionsUtils";

type GetTopicsOfChaptersByClassTypeUseCaseDto = {
  classTypeNewId: string;
  teacher: Teacher | null;
};

@injectable()
export class GetTopicsOfChaptersByClassTypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ChapterRepo") private chapterRepo: ChapterRepo,
  ) {}

  async execute(dto: GetTopicsOfChaptersByClassTypeUseCaseDto): Promise<topicChapterDto[]> {
    const { classTypeNewId, teacher } = dto;
    const subjectTypeIds = teacher?.subjectTypes || [];
    const groupTypeIds = teacher?.groupTypes || [];
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
      { populate: ["subjects.subjectType", "subjects.subSubjects.subSubjectType"] },
    );

    const chapters = await this.chapterRepo.getStudentChapters({
      classTypeId: classType._id,
      groupTypeIds: undefined,
    });
    const chaptersByTopic = ChapterService.groupChaptersByTopic(chapters);

    const topicWithNoChapters: typeof chaptersByTopic = [];

    classType.subjects.forEach(subject => {
      subject.subSubjects.forEach(subSubject => {
        const existingSubSubjectType = chaptersByTopic.find(
          chapter => chapter.topic._id === subSubject.subSubjectType._id,
        );
        if (!existingSubSubjectType) {
          topicWithNoChapters.push({
            topic: subSubject.subSubjectType,
            chapters: [],
            topicType: "subSubjectType",
          });
        }
      });

      const existingSubjectType = chaptersByTopic.find(
        chapter => chapter.topic._id === subject.subjectType._id,
      );
      if (!existingSubjectType) {
        topicWithNoChapters.push({
          topic: subject.subjectType,
          chapters: [],
          topicType: "subjectType",
        });
      }
    });

    const topicOfChapterDto = chaptersByTopic
      .map(chapter => ChapterMapper.toTopicChapterDto(chapter))
      .concat(topicWithNoChapters.map(chapter => ChapterMapper.toTopicChapterDto(chapter)))
      //Filter chapters based on teacher's subject and group types
      .filter(chapter =>
        teacher
          ? isIncludeArrayIds(subjectTypeIds, chapter.topic._id) ||
            isIncludeArrayIds(groupTypeIds, chapter.topic._id)
          : true,
      );

    return topicOfChapterDto;
  }
}
