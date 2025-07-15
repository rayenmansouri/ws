import { Teacher } from "./../../teachers/domain/teacher.entity";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager } from "../../../core/fileManager/FileManager";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { IssueRepo } from "../domain/Issue.repo";
import { IssueReasonRepo } from "../domain/IssueReason.repo";
import { END_USER_ENUM } from "./../../../constants/globalEnums";
import { FileDetails, FileUploadPayload } from "./../../../core/fileManager/FileManager";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { ID } from "./../../../types/BaseEntity";
import { AdminApplicationService } from "./../../admins/application/admin.application.service";
import { Class } from "./../../classes/domain/class.entity";
import { Parent } from "./../../parents/domain/parent.entity";
import { StudentApplicationService } from "./../../students/application/Student.application.service";
import { StudentService } from "./../../students/domain/Student.service";
import { Issue, ISSUE_STATUS_ENUM } from "./../domain/issue.entity";
import { IssueDTO } from "./../dtos/issue.dto";
import { IssueAddedEvent } from "./../events/issueAdded.event";
import { IssueMapper } from "./../mappers/Issue.mapper";

export type addIssueRequestDto = {
  teacherId?: ID;
  studentNewId: string;
  parent: Parent;
  issueReasonId: ID;
  attachments: FileUploadPayload[];
  targetType: "admin" | "teacher";
  content: string;
  tenantId: string;
};

@injectable()
export class AddIssueUseCase {
  constructor(
    @inject("TeacherRepo") private readonly teacherRepo: TeacherRepo,
    @inject("StudentRepo") private readonly studentRepo: StudentRepo,
    @inject("IssueReasonRepo") private readonly IssueReasonRepo: IssueReasonRepo,
    @inject("FileManager") private readonly fileManager: FileManager,
    @inject("StudentApplicationService")
    private readonly studentAppService: StudentApplicationService,
    @inject("ClassRepo") private readonly classRepo: ClassRepo,
    @inject("IssueRepo") private readonly issueRepo: IssueRepo,
    @inject("AdminApplicationService") private readonly adminAppService: AdminApplicationService,
  ) {}

  async execute(dto: addIssueRequestDto): Promise<IssueDTO> {
    let teacher: Teacher | null = null;
    if (dto.teacherId) {
      teacher = (await this.teacherRepo.findUnArchivedTeacherByIds([dto.teacherId]))[0];
    }

    const student = (await this.studentRepo.findUnArchivedStudentsByNewIds([dto.studentNewId]))[0];

    StudentService.ensureStudentIsAssignedToParent(student._id, dto.parent);

    const issueReason = await this.IssueReasonRepo.findOneByIdOrThrow(
      dto.issueReasonId,
      "notFound.issueReason",
    );

    const mediaFiles = FileManager.getMediaFiles(dto.attachments);
    const attachmentsFiles = FileManager.removeMediaFiles(mediaFiles);

    const mediaPaths = mediaFiles.map(file =>
      FileManager.generateUniquePath(file.name, dto.tenantId, "issue"),
    );
    const attachmentPaths = attachmentsFiles.map(file =>
      FileManager.generateUniquePath(file.name, dto.tenantId, "issue"),
    );

    let uploadedMedia: FileDetails[] = [];

    if (mediaFiles.length > 0)
      uploadedMedia = await this.fileManager.uploadFiles(mediaFiles, mediaPaths);

    let uploadedAttachments: FileDetails[] = [];
    if (attachmentsFiles.length > 0)
      uploadedAttachments = await this.fileManager.uploadFiles(attachmentsFiles, attachmentPaths);

    const { studentProfile } = await this.studentAppService.getCurrentAcademicDetails(student);

    let classDoc: Class | null = null;
    if (studentProfile.class) classDoc = await this.classRepo.findOneById(studentProfile.class);

    const participantViewStatuses: Issue["participantViewStatuses"] = [
      { participantType: END_USER_ENUM.PARENT, isSeen: true },
      { participantType: END_USER_ENUM.TEACHER, isSeen: false },
      { participantType: END_USER_ENUM.ADMIN, isSeen: false },
    ];
    const teacherId = dto.targetType === END_USER_ENUM.TEACHER ? dto.teacherId : undefined;

    const issue = await this.issueRepo.addOne({
      author: dto.parent._id,
      authorType: END_USER_ENUM.PARENT,
      content: { text: dto.content, media: uploadedMedia, documents: uploadedAttachments },
      reason: dto.issueReasonId,
      lastInteractionDate: getCurrentTimeOfSchool(dto.tenantId),
      sentAt: getCurrentTimeOfSchool(dto.tenantId),
      targetType: dto.targetType,
      teacher: teacherId ?? null,
      status: ISSUE_STATUS_ENUM.UNRESOLVED,
      participantViewStatuses,
      studentProfile: studentProfile._id,
      isForwarded: false,
      adminParticipants: [],
      lastInteraction: null,
    });

    const adminIds = await this.adminAppService.getAdminIdsByActionAndResource("VIEW", "ISSUE");
    const issueDto: IssueDTO = IssueMapper.toIssueDTO({
      issue: {
        ...issue,
        author: dto.parent,
        teacher: teacher,
        studentProfile: studentProfile,
        reason: issueReason,
      },
      student,
      classDoc,
      userType: END_USER_ENUM.PARENT,
      lastInteraction: null,
    });

    const event = new IssueAddedEvent(dto.tenantId, issueDto);
    event.sendEventToAdmins(adminIds);

    return issueDto;
  }
}
