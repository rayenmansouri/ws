import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SCHEDULE_ENTITY_ENUM } from "../../../helpers/constants";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { EntityScheduleDto } from "../dtos/entitySchedule.dto";
import { EntityScheduleMapper } from "../mappers/entitySchedule.mapper";
import { UserMapper } from "../../users/mappers/User.mapper";

@injectable()
export class GetEntityScheduleUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("ClassroomRepo") private classroomRepo: ClassroomRepo,
  ) {}

  async execute(query: { search: string }): Promise<EntityScheduleDto[]> {
    const defaultOptions = { limit: 5 };

    const studentPromises = this.studentRepo.find({ search: query.search }, defaultOptions);
    const teacherPromises = this.teacherRepo.find({ search: query.search }, defaultOptions);
    const classPromises = this.classRepo.find({ search: query.search }, defaultOptions);
    const groupPromises = this.groupRepo.find({ search: query.search }, defaultOptions);
    const classroomPromises = this.classroomRepo.find({ name: query.search }, defaultOptions);

    const [students, teachers, classDocs, group, classrooms] = await Promise.all([
      studentPromises,
      teacherPromises,
      classPromises,
      groupPromises,
      classroomPromises,
    ]);

    const studentDto = students.map(student =>
      EntityScheduleMapper.toEntityScheduleDto({
        ...UserMapper.toUserProfileDTO(student),
        type: SCHEDULE_ENTITY_ENUM.STUDENT,
        name: student.fullName,
      }),
    );
    const teacherDto = teachers.map(teacher =>
      EntityScheduleMapper.toEntityScheduleDto({
        ...UserMapper.toUserProfileDTO(teacher),
        type: SCHEDULE_ENTITY_ENUM.TEACHER,
        name: teacher.fullName,
      }),
    );

    const classDto = classDocs.map(classDoc =>
      EntityScheduleMapper.toEntityScheduleDto({
        ...classDoc,
        type: SCHEDULE_ENTITY_ENUM.CLASS,
        avatar: null,
      }),
    );

    const groupDto = group.map(group =>
      EntityScheduleMapper.toEntityScheduleDto({
        ...group,
        type: SCHEDULE_ENTITY_ENUM.GROUP,
        avatar: null,
      }),
    );

    const classroomDto = classrooms.map(classroom =>
      EntityScheduleMapper.toEntityScheduleDto({
        ...classroom,
        type: SCHEDULE_ENTITY_ENUM.CLASSROOM,
        avatar: null,
      }),
    );

    return [...studentDto, ...teacherDto, ...classDto, ...groupDto, ...classroomDto].slice(0, 5);
  }
}
