import { injectable } from "inversify/lib/inversify";
import { END_USER_ENUM, TEndAdministrationUserEnums } from "../../../constants/globalEnums";
import { BaseRepo } from "../../../core/BaseRepo";
import { inject } from "../../../core/container/TypedContainer";
import { EntityMetaData, ID } from "../../../types/BaseEntity";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { AdminRepo } from "../../admins/domain/Admin.repo";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { TOPIC_TYPE_ENUM, TTopicTypeEnum } from "../../examGrade/domain/tunisian/ExamGrade.entity";
import { GroupTypeRepo } from "../../groupManagement/repos/GroupType.repo";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { BaseUserMetaData } from "../../users/domain/baseUser.entity";
import { ChapterRepo } from "../domain/Chapter.repo";
import { ChapterAttachmentRepo } from "../domain/ChapterAttachment.repo";
import { CHAPTER_ATTACHMENT_STATUS_ENUM } from "../domain/chapterAttachment.entity";
import { TeacherService } from "../../teachers/domain/Teacher.service";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { BadRequestError } from "../../../core/ApplicationErrors";

type AddChapterUseCaseData = {
  name: string;
  description: string | undefined;
  chapterAttachmentFileNewIds: string[];
  classTypeNewId: string | null;
  topicNewId: string;
  topicType: PickFromEnum<TTopicTypeEnum, "subjectType" | "subSubjectType"> | "groupType";
  userId: ID;
  userType: TEndAdministrationUserEnums;
};

@injectable()
export class AddChapterUseCase {
  constructor(
    @inject("ChapterAttachmentRepo") private chapterAttachmentRepo: ChapterAttachmentRepo,
    @inject("ChapterRepo") private chapterRepo: ChapterRepo,
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("GroupTypeRepo") private groupTypeRepo: GroupTypeRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("AdminRepo") private adminRepo: AdminRepo,
  ) {}

  async execute(data: AddChapterUseCaseData): Promise<void> {
    const {
      topicType,
      chapterAttachmentFileNewIds,
      topicNewId,
      userId,
      userType,
      classTypeNewId,
      name,
      description,
    } = data;
    const chapterAttachments = await this.chapterAttachmentRepo.findManyByNewIdsOrThrow(
      chapterAttachmentFileNewIds,
      "notFound.chapterAttachment",
    );

    const chapterAttachmentIds = chapterAttachments.map(chapterAttachment => chapterAttachment._id);

    const topicRepo: BaseRepo<EntityMetaData> =
      topicType === TOPIC_TYPE_ENUM.SUBJECT_TYPE
        ? this.subjectTypeRepo
        : topicType === TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE
        ? this.subSubjectTypeRepo
        : this.groupTypeRepo;

    const topic = await topicRepo.findOneByNewIdOrThrow(topicNewId, `notFound.${topicType}`);

    const userRepo: BaseRepo<BaseUserMetaData> =
      userType === END_USER_ENUM.TEACHER ? this.teacherRepo : this.adminRepo;

    const user = await userRepo.findOneByIdOrThrow(userId, "notFound.user");

    const classType = classTypeNewId
      ? await this.classTypeRepo.findOneByNewIdOrThrow(classTypeNewId, "notFound.classType")
      : null;

    if (userType === END_USER_ENUM.TEACHER) {
      if (topicType === TOPIC_TYPE_ENUM.SUBJECT_TYPE) {
        TeacherService.checkTeacherSubjectEligibility(user as Teacher, topic);
      }
      if (topicType === TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE && classType) {
        TeacherService.checkTeacherSubSubjectEligibility(user as Teacher, classType, topic);
      }
      if (topicType === "groupType") {
        TeacherService.checkTeacherGroupTypeEligibility(user as Teacher, topic);
      }
    }

    await this.chapterAttachmentRepo.updateManyByIds(chapterAttachmentIds, {
      status: CHAPTER_ATTACHMENT_STATUS_ENUM.USED,
    });

    if (!classType && topicType !== "groupType") {
      throw new BadRequestError("chapter.classTypeOrTopicWithGroupTypeRequired");
    }

    await this.chapterRepo.addOne({
      name: name,
      description: description || null,
      classType: classType?._id || null,
      topic: topic._id,
      topicType: topicType,
      attachments: chapterAttachmentIds,
      createdBy: user._id,
      userType,
    });
  }
}
