import { injectable } from "inversify";
import { School } from "../../schools/domain/school.entity";
import { SmartCalendarSchedule } from "../domain/smartCalendarSchedule.entity";
import { SmartCalendarConfigDTO } from "../dtos/SmartCalendarConfig.dto";
import { inject } from "../../../core/container/TypedContainer";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";
import { SessionTypeRepo } from "../../sessionTypes/repos/SessionType.repo";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { TOPIC_TYPE_ENUM } from "../../examGrade/domain/tunisian/ExamGrade.entity";
import { MINUTES_IN_HOUR } from "../../../helpers/constants";

@injectable()
export class SmartCalendarConfigFactory {
  constructor(
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo,
    @inject("SessionTypeRepo") private sessionTypeRepo: SessionTypeRepo,
    @inject("ClassroomRepo") private classroomRepo: ClassroomRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
  ) {}

  async create(
    smartCalendarSchedule: SmartCalendarSchedule,
    school: School,
  ): Promise<SmartCalendarConfigDTO> {
    const numberOfSlotsInOneHour = 1 / school.schedule.step;

    const studySlots = Array.from(
      { length: (school.schedule.endHour - school.schedule.startHour) * numberOfSlotsInOneHour },
      (_, i) => school.schedule.startHour + i * school.schedule.step,
    );

    const allTeachersPromise = this.teacherRepo.findAllUnArchivedTeachers();
    const allSubjectTypesPromise = this.subjectTypeRepo.findAll();
    const allSubSubjectTypesPromise = this.subSubjectTypeRepo.findAll();
    const allSessionTypesPromise = this.sessionTypeRepo.findAll();
    const allClassroomsPromise = this.classroomRepo.findAll();
    const allLevelsPromise = this.levelRepo.findAll();

    const [
      allTeachers,
      allSubjectTypes,
      allSubSubjectTypes,
      allSessionTypes,
      allClassrooms,
      allLevels,
    ] = await Promise.all([
      allTeachersPromise,
      allSubjectTypesPromise,
      allSubSubjectTypesPromise,
      allSessionTypesPromise,
      allClassroomsPromise,
      allLevelsPromise,
    ]);

    const currentSchoolYearIds = allLevels.map(level => level.currentSchoolYear._id);

    const allClasses = await this.classRepo.findBySchoolYearIds(currentSchoolYearIds, {
      populate: ["classType"],
    });

    return {
      id: smartCalendarSchedule._id,
      schoolSubdomain: school.subdomain,
      globalSchoolConfig: {
        studyDays: school.schedule.days.map(day => day.toString()),
        studySlots,
        notAvailableSlots: school.notAvailableTimes.flatMap(({ day, hours }) => {
          return hours.map(hour => ({
            day: day.toString(),
            slot: hour,
          }));
        }),
        numberOfSlotsInOneHour: school.schedule.step,
      },
      teachers: allTeachers.map(teacher => ({
        name: teacher._id,
        maxGapsPerDay: teacher.maxGapsPerDay,
        preferredClassroom: teacher.preferredClassroom,
        notAvailableSlots: teacher.notAvailableTimes.flatMap(({ day, hours }) => {
          return hours.map(hour => ({
            day: day.toString(),
            slot: hour,
          }));
        }),
      })),
      subjects: [...allSubjectTypes, ...allSubSubjectTypes].map(subject => ({
        name: subject._id,
        preferredStartingSlots: subject.preferredStartingHours.map(hour => hour.toString()),
      })),
      activityTags: allSessionTypes.map(sessionType => ({
        name: sessionType._id,
      })),
      classrooms: allClassrooms.map(classroom => ({
        name: classroom._id,
        allowedSubjects: classroom.allowAllSubjects
          ? [...allSubjectTypes, ...allSubSubjectTypes].map(subject => subject._id)
          : classroom.subjectTypes,
        allowedActivityTags: classroom.allowAllSessionTypes
          ? allSessionTypes.map(sessionType => sessionType._id)
          : classroom.sessionTypes,
      })),
      studentSets: allClasses.map(classDoc => ({
        name: classDoc._id,
        preferredClassroom: classDoc.preferredClassroom,
        notAvailableSlots: classDoc.notAvailableTimes.flatMap(({ day, hours }) => {
          return hours.map(hour => ({
            day: day.toString(),
            slot: hour,
          }));
        }),
        maxGapsPerDay: classDoc.maxGapsPerDay,
        maxDurationPerDay: classDoc.maxHoursPerDay,
      })),
      activities: allClasses.flatMap(classDoc => {
        return classDoc.classType.activities.map(activity => {
          const teacher = activity.subSubjectType
            ? classDoc.subSubjectTeacherMap[activity.subSubjectType]
            : classDoc.subjectTeacherMap[activity.subjectType];

          if (!teacher) throw new BadRequestError("smartCalendar.activityWithoutTeacher");

          return {
            topicId: activity.subSubjectType || activity.subjectType,
            topicType: activity.subSubjectType
              ? TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE
              : TOPIC_TYPE_ENUM.SUBJECT_TYPE,
            durationInSlots: activity.durationInMinutes / (school.schedule.step * MINUTES_IN_HOUR),
            activityTags: activity.sessionType,
            studentSets: classDoc._id,
            isPerGroup: activity.perGroup,
            week: activity.week,
            teacher,
          };
        });
      }),
    };
  }
}
