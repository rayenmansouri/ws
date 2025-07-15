import { injectable } from "inversify";
import { uniq } from "lodash";
import { InternalError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { ClassTypeService } from "../../classTypes/domains/ClassType.service";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { TeacherService } from "../../teachers/domain/Teacher.service";
import { TeacherProfileRepo } from "../../teachers/domain/TeacherProfile.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";
import { ClassRepo } from "../domain/Class.repo";

type AssignTeachersToSubjectsInClassUseCaseParams = {
  classNewId: string;
  teacherSubjectMappings: { teacherId: ID; subjectTypeId: ID }[];
};

@injectable()
export class AssignTeachersToSubjectsInClassUseCase {
  constructor(
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("TeacherProfileRepo") private teacherProfileRepo: TeacherProfileRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
  ) {}

  async execute(data: AssignTeachersToSubjectsInClassUseCaseParams): Promise<void> {
    const { classNewId, teacherSubjectMappings } = data;

    const teacherIds = teacherSubjectMappings.map(mapping => mapping.teacherId);
    const subjectTypeIds = teacherSubjectMappings.map(mapping => mapping.subjectTypeId);

    const teachers = await this.teacherRepo.findManyByIdsOrThrow(teacherIds, "notFound.teacher");
    const subjectTypes = await this.subjectTypeRepo.findManyByIdsOrThrow(
      subjectTypeIds,
      "notFound.subjectType",
    );
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["classType", "schoolYear"],
    });

    const assignedTeachersAndSubjects = teacherSubjectMappings.map(mapping => {
      const teacher = teachers.find(teacher => teacher._id === mapping.teacherId);
      const subjectType = subjectTypes.find(
        subjectType => subjectType._id === mapping.subjectTypeId,
      );
      if (!teacher || !subjectType) throw new InternalError("notFound.teacherOrSubjectType");
      return { teacher, subjectType };
    });

    assignedTeachersAndSubjects.forEach(({ teacher, subjectType }) => {
      ClassTypeService.ensureSubjectTypeIncludeInClassType(classDoc.classType, subjectType._id);
      ClassTypeService.ensureNoTeacherAssignedToSubjectTypeInClass(subjectType._id, classDoc);
      TeacherService.checkTeacherSubjectEligibility(teacher, subjectType);
      TeacherService.checkTeacherLevelEligibility(teacher, { _id: classDoc.schoolYear.level });
    });

    const teacherProfiles =
      await this.teacherProfileRepo.getManyTeacherProfilesByCurrentSchoolYears(teacherIds, [
        classDoc.schoolYear._id,
      ]);

    const newAssignedTeachersMap = {} as Record<string, ID>;

    assignedTeachersAndSubjects.forEach(({ teacher, subjectType }) => {
      newAssignedTeachersMap[subjectType._id] = teacher._id;
    });

    const newSubjectTeachersMap = { ...classDoc.subjectTeacherMap, ...newAssignedTeachersMap };

    await this.classRepo.updateOneById(classDoc._id, { subjectTeacherMap: newSubjectTeachersMap });

    const promise: Promise<unknown>[] = [];

    teacherProfiles.forEach(teacherProfile => {
      const subjectTypeIdToBeAssigned = assignedTeachersAndSubjects.find(
        mapping => mapping.teacher._id === teacherProfile.teacher,
      )?.subjectType._id;
      if (!subjectTypeIdToBeAssigned) throw new InternalError("notFound.subjectTypeIdToBeAssigned");

      const teacherClasses = uniq(teacherProfile.classes.concat(classDoc._id));
      promise.push(
        this.teacherProfileRepo.updateOneById(teacherProfile._id, { classes: teacherClasses }),
        this.sessionRepo.assignTeacherToWaitingSessionOfSubjectType(
          classDoc._id,
          subjectTypeIdToBeAssigned,
          teacherProfile.teacher,
        ),
        this.weeklySessionRepo.assignTeacherToWeeklySessionsOfSubjectTypeByClass(
          classDoc._id,
          teacherProfile.teacher,
          subjectTypeIdToBeAssigned,
        ),
      );
    });

    await Promise.all(promise);
  }
}
