import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { StudentApplicationService } from "../../students/application/Student.application.service";
import { StudentRepo } from "../../students/domain/Student.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import {
  WeeklySessionRepo,
  enrichedWeeklySessionData,
} from "../../weeklySessions/repos/WeeklySession.repo";

@injectable()
export class WeeklyScheduleApplicationService {
  constructor(
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("ClassroomRepo") private classroomRepo: ClassroomRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
  ) {}

  async getTeacherSchedule(
    teacherNewId: string,
    scheduleFilterOptions: { isDraft: boolean },
  ): Promise<enrichedWeeklySessionData[]> {
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(teacherNewId, "notFound.teacher");
    const { isDraft } = scheduleFilterOptions;
    return this.weeklySessionRepo.findTeacherSchedule(teacher._id, { isDraft });
  }

  async getStudentSchedule(
    studentNewId: string,
    scheduleFilterOptions: { isDraft: boolean },
  ): Promise<enrichedWeeklySessionData[]> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(studentNewId, "notFound.student");
    const { isDraft } = scheduleFilterOptions;
    const studentProfiles = await this.studentApplicationService.getCurrentAcademicDetails(student);

    if (!studentProfiles.classId) throw new BadRequestError("student.notAssignedToClass");

    return this.weeklySessionRepo.findStudentSchedule(
      studentProfiles.classId,
      studentProfiles.groupIds,
      { isDraft },
    );
  }

  async getClassroomSchedule(
    classroomNewId: string,
    scheduleFilterOptions: { isDraft: boolean },
  ): Promise<enrichedWeeklySessionData[]> {
    const classroom = await this.classroomRepo.findOneByNewIdOrThrow(
      classroomNewId,
      "notFound.classroom",
    );
    const { isDraft } = scheduleFilterOptions;
    return this.weeklySessionRepo.findClassroomSchedule(classroom._id, { isDraft });
  }

  async getClassSchedule(
    classNewId: string,
    scheduleFilterOptions: { isDraft: boolean },
  ): Promise<enrichedWeeklySessionData[]> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");
    const { isDraft } = scheduleFilterOptions;
    return this.weeklySessionRepo.findClassSchedule(classDoc._id, { isDraft });
  }

  async getGroupSchedule(
    groupNewId: string,
    scheduleFilterOptions: { isDraft: boolean },
  ): Promise<enrichedWeeklySessionData[]> {
    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group");

    const { isDraft } = scheduleFilterOptions;
    return this.weeklySessionRepo.findGroupSchedule(group._id, {
      isDraft,
    });
  }
}
