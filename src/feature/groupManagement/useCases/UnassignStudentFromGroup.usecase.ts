import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { GroupRepo } from "../repos/Group.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { GroupApplicationService } from "../applicationServices/Group.application.service";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";

type UnassignStudentFromGroupInput = {
  groupNewId: string;
  studentNewIds: string[];
};

@injectable()
export class UnassignStudentFromGroupUseCase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("GroupApplicationService") private groupApplicationService: GroupApplicationService,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
  ) {}

  async execute(data: UnassignStudentFromGroupInput): Promise<void> {
    const { groupNewId, studentNewIds } = data;

    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group");

    const students = await this.studentRepo.findManyByNewIdsOrThrow(
      studentNewIds,
      "notFound.student",
    );

    const studentIds = students.map(student => student._id);

    const studentProfiles = await this.studentProfileRepo.getManyStudentProfilesOfSchoolYears(
      studentIds,
      group.schoolYears,
    );

    const studentProfilesIds = studentProfiles.map(studentProfile => studentProfile._id);

    await this.studentProfileRepo.removeGroup(studentProfilesIds, group._id);

    const remainingStudents = group.students.filter(student => !studentIds.includes(student));

    await this.groupRepo.updateOneById(group._id, { students: remainingStudents });

    return;
  }
}
