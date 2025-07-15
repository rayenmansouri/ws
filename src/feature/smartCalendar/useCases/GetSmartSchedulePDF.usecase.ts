import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SmartCalendarScheduleRepo } from "../domain/SmartCalendarSchedule.repo";
import { SmartCalendarSessionRepo } from "../domain/SmartCalendarSession.repo";
import { SmartCalendarPdfDTO } from "../dtos/SmartCalendarPDF.dto";
import { SmartCalendarSessionMapper } from "../mappers/SmartCalendarSession.mapper";

@injectable()
export class GetSmartSchedulePDFUseCase {
  constructor(
    @inject("SmartCalendarScheduleRepo")
    private readonly smartCalendarScheduleRepo: SmartCalendarScheduleRepo,
    @inject("SmartCalendarSessionRepo")
    private readonly smartCalendarSessionRepo: SmartCalendarSessionRepo,
  ) {}

  async execute(scheduleNewId: string): Promise<SmartCalendarPdfDTO> {
    const schedule = await this.smartCalendarScheduleRepo.findOneByNewIdOrThrow(
      scheduleNewId,
      "notFound.schedule",
    );

    const sessions = await this.smartCalendarSessionRepo.findManyBySmartCalendarSchedule(
      schedule._id,
      {
        populate: [
          "class",
          "teacher",
          "classroom",
          "sessionType",
          "classGroup",
          "subSubjectType",
          "subjectType",
        ],
      },
    );

    const result: SmartCalendarPdfDTO = {
      teachers: [],
      classes: [],
      classrooms: [],
    };

    for (const session of sessions) {
      const weeklySessionDTO = SmartCalendarSessionMapper.toWeeklySessionDTO(session);

      let teacherScheduleIndex = result.teachers.findIndex(
        teacher => teacher._id === session.teacher._id,
      );
      if (teacherScheduleIndex === -1) {
        result.teachers.push({
          _id: session.teacher._id,
          name: session.teacher.fullName,
          sessions: [],
        });
        teacherScheduleIndex = result.teachers.length - 1;
      }
      result.teachers[teacherScheduleIndex].sessions.push(weeklySessionDTO);

      let classScheduleIndex = result.classes.findIndex(
        classDoc => classDoc._id === session.class?._id,
      );
      if (classScheduleIndex === -1 && session.class) {
        result.classes.push({
          _id: session.class._id,
          name: session.class.name,
          sessions: [],
        });
        classScheduleIndex = result.classes.length - 1;
      }
      result.classes[classScheduleIndex].sessions.push(weeklySessionDTO);

      let classroomScheduleIndex = result.classrooms.findIndex(
        classroomDoc => classroomDoc._id === session.classroom?._id,
      );
      if (classroomScheduleIndex === -1) {
        result.classrooms.push({
          _id: session.classroom._id,
          name: session.classroom.name,
          sessions: [],
        });
        classroomScheduleIndex = result.classrooms.length - 1;
      }
      result.classrooms[classroomScheduleIndex].sessions.push(weeklySessionDTO);
    }

    return result;
  }
}
