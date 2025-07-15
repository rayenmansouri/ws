import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentApplicationService } from "../../students/application/Student.application.service";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { ChapterRepo } from "../domain/Chapter.repo";
import { ChapterService } from "../domain/Chapter.service";
import { ChapterMapper } from "../mappers/Chapter.mapper";
import { topicChapterDto } from "../dtos/Chapter.dto";

@injectable()
//TODO need to change the name of this use case to GetStudentTopicChaptersUseCase
export class GetStudentChaptersUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("ChapterRepo") private chapterRepo: ChapterRepo,
  ) {}

  async execute(studentNewId: string): Promise<topicChapterDto[]> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(studentNewId, "notFound.student");

    const { groupIds, classId } = await this.studentApplicationService.getCurrentAcademicDetails(
      student,
    );

    const [groups, classDoc] = await Promise.all([
      this.groupRepo.findManyByIdsOrThrow(groupIds, "notFound.group"),
      classId ? this.classRepo.findOneByIdOrThrow(classId, "notFound.class") : null,
    ]);

    const classTypeId = classDoc?.classType;
    const groupTypeIds = groups.map(group => group._id);

    const chapters = await this.chapterRepo.getStudentChapters({
      classTypeId,
      groupTypeIds,
    });

    const chaptersByTopic = ChapterService.groupChaptersByTopic(chapters);

    const topicOfChapterDto = chaptersByTopic.map(ChapterMapper.toTopicChapterDto);

    return topicOfChapterDto;
  }
}
