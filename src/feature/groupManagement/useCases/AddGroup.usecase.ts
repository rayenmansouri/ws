import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { GroupDto } from "../../classes/dto/Group.dto";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { TeacherProfileRepo } from "../../teachers/domain/TeacherProfile.repo";
import { GroupApplicationService } from "../applicationServices/Group.application.service";
import { GroupService } from "../domains/Group.service";
import { GroupMapper } from "../mappers/Group.mapper";
import { GroupRepo } from "../repos/Group.repo";
import { GroupTypeRepo } from "../repos/GroupType.repo";
import { uniq } from "lodash";
import { TeacherService } from "../../teachers/domain/Teacher.service";

type AddGroupUseCaseInput = {
  name: string;
  groupTypeNewId: string;
  teacherNewId: string;
  studentNewIds: string[];
  classTypeNewIds: string[];
};

@injectable()
export class AddGroupUseCase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("GroupTypeRepo") private groupTypeRepo: GroupTypeRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("TeacherProfileRepo") private teacherProfileRepo: TeacherProfileRepo,
    @inject("GroupApplicationService") private groupApplicationService: GroupApplicationService,
  ) {}

  async execute(data: AddGroupUseCaseInput): Promise<GroupDto> {
    const { name, groupTypeNewId, teacherNewId, studentNewIds, classTypeNewIds } = data;
    await this.groupRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    const groupType = await this.groupTypeRepo.findOneByNewIdOrThrow(
      groupTypeNewId,
      "notFound.groupType",
    );

    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(teacherNewId, "notFound.teacher");

    const students = await this.studentRepo.findManyByNewIdsOrThrow(
      studentNewIds,
      "notFound.student",
    );
    const classTypes = await this.classTypeRepo.findManyByNewIdsOrThrow(
      classTypeNewIds,
      "notFound.classType",
      { populate: ["subLevel"] },
    );

    const levels = classTypes.map(classType => classType.subLevel.level);
    const levelIds = uniq(levels.map(level => level._id));

    GroupService.ensureGroupHasOneLevelWhenIncludeInGradeBook({
      groupType,
      levels: levelIds,
    });

    TeacherService.checkTeacherGroupTypeEligibility(teacher, groupType);

    const schoolYearIds = levels.map(level => level.currentSchoolYear._id);

    const studentIds = students.map(student => student._id);
    const newGroup = await this.groupRepo.addOne({
      name,
      groupType,
      teacher: teacher._id,
      students: studentIds,
      classTypes: classTypes.map(classType => classType._id),
      levels: levelIds,
      schoolYears: schoolYearIds,
    });

    const studentProfiles = await this.studentProfileRepo.getManyStudentProfilesOfSchoolYears(
      studentIds,
      schoolYearIds,
    );

    const teacherProfiles = await this.teacherProfileRepo.getTeacherProfilesBySchoolYears(
      teacher._id,
      schoolYearIds,
    );

    const studentProfilesIds = studentProfiles.map(studentProfile => studentProfile._id);
    const teacherProfilesIds = teacherProfiles.map(teacherProfile => teacherProfile._id);

    await this.studentProfileRepo.addGroup(studentProfilesIds, newGroup._id);
    await this.teacherProfileRepo.addGroup(teacherProfilesIds, newGroup._id);

    const terms = levels.at(0)!.currentSchoolYear.terms;
    await this.groupApplicationService.createGroupExamGradesAndObservations(
      students,
      newGroup,
      terms,
    );

    return GroupMapper.toGroupDto(newGroup);
  }
}
