import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { TAttendanceEnum } from "../../../database/schema/pedagogy/session/session.schema";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { enrichedSessionData, SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { SessionService } from "../../sessionManagement/domain/Session.service";
import { StudentApplicationService } from "../../students/application/Student.application.service";
import { StudentRepo } from "../../students/domain/Student.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { ScheduleMapper } from "../mappers/schedule.mapper";

type sessionDetailsAttendance = enrichedSessionData & {
  attendance: TAttendanceEnum | null;
};

@injectable()
export class ScheduleApplicationService {
  constructor(
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("ClassroomRepo") private classroomRepo: ClassroomRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
  ) {}

  async getTeacherSchedule(
    teacherNewId: string,
    range: { startDate: Date; endDate: Date },
  ): Promise<sessionDetailsAttendance[]> {
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(teacherNewId, "notFound.teacher");

    const sessions = await this.sessionRepo.findTeacherSchedule(teacher._id, range);

    return sessions.map(session =>
      ScheduleMapper.toScheduleDTO(session, SessionService.getTeacherAttendance(session)),
    );
  }

  async getStudentSchedule(
    studentNewId: string,
    range: { startDate: Date; endDate: Date },
  ): Promise<sessionDetailsAttendance[]> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(studentNewId, "notFound.student");

    const studentProfiles = await this.studentApplicationService.getCurrentAcademicDetails(student);

    const sessions = await this.sessionRepo.getStudentSchedule({
      classId: studentProfiles.classId,
      groupIds: studentProfiles.groupIds,
      classGroupId: studentProfiles.classGroup,
      startDate: range.startDate,
      endDate: range.endDate,
    });
    return sessions.map(session =>
      ScheduleMapper.toScheduleDTO(session, session.attendence[student._id] || null),
    );
  }

  async getClassroomSchedule(
    classroomNewId: string,
    range: { startDate: Date; endDate: Date },
  ): Promise<sessionDetailsAttendance[]> {
    const classroom = await this.classroomRepo.findOneByNewIdOrThrow(
      classroomNewId,
      "notFound.classroom",
    );

    const sessions = await this.sessionRepo.findClassroomSchedule(classroom._id, range);

    return sessions.map(session => ScheduleMapper.toScheduleDTO(session, null));
  }

  async getClassSchedule(
    classNewId: string,
    range: { startDate: Date; endDate: Date },
  ): Promise<sessionDetailsAttendance[]> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");

    const sessions = await this.sessionRepo.findClassSchedule(classDoc._id, range);

    return sessions.map(session => ScheduleMapper.toScheduleDTO(session, null));
  }

  async getGroupSchedule(
    groupNewId: string,
    range: { startDate: Date; endDate: Date },
  ): Promise<sessionDetailsAttendance[]> {
    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group");

    const sessions = await this.sessionRepo.findGroupSchedule(group._id, range);
    return sessions.map(session => ScheduleMapper.toScheduleDTO(session, null));
  }
}
