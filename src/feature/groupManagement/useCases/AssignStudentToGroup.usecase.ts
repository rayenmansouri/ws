import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { GroupRepo } from "../repos/Group.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { GroupService } from "../domains/Group.service";
import { GroupApplicationService } from "../applicationServices/Group.application.service";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";

type AssignStudentToGroupUseCaseInput = {
  studentNewIds: string[];
  groupNewId: string;
};

@injectable()
export class AssignStudentToGroupUseCase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("GroupApplicationService") private groupApplicationService: GroupApplicationService,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
  ) {}

  async execute(data: AssignStudentToGroupUseCaseInput): Promise<void> {
    const { studentNewIds, groupNewId } = data;

    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group");

    const students = await this.studentRepo.findManyByNewIdsOrThrow(
      studentNewIds,
      "notFound.student",
    );
    const studentIds = students.map(student => student._id);

    GroupService.ensureStudentsNotIncludedInGroup(studentIds, group);
    GroupService.verifyStudentGroupLevelMatch(students, group);
    GroupService.ensureStudentClassTypeMatchesGroupClassType(students, group);

    const newStudentGroup = group.students.concat(studentIds);
    const studentProfiles = await this.studentProfileRepo.getManyStudentProfilesOfSchoolYears(
      studentIds,
      group.schoolYears,
    );

    const studentProfileIds = studentProfiles.map(studentProfile => studentProfile._id);

    await this.studentProfileRepo.addGroup(studentProfileIds, group._id);

    await this.groupRepo.updateOneById(group._id, {
      students: newStudentGroup,
    });

    return;
  }
}
