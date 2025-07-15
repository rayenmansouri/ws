import { injectable } from "inversify/lib/inversify";
import { uniq } from "lodash";
import { InternalError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { ClassTypeService } from "../../classTypes/domains/ClassType.service";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { TeacherService } from "../../teachers/domain/Teacher.service";
import { TeacherProfileRepo } from "../../teachers/domain/TeacherProfile.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";
import { ClassRepo } from "../domain/Class.repo";

type AssignTeacherToSubSubjectInClassUseCaseParams = {
  classNewId: string;
  teacherSubSubjectMappings: { teacherId: ID; subSubjectTypeId: ID }[];
};

@injectable()
export class AssignTeacherToSubSubjectInClassUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo,
    @inject("TeacherProfileRepo") private teacherProfileRepo: TeacherProfileRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
  ) {}

  async execute(params: AssignTeacherToSubSubjectInClassUseCaseParams): Promise<void> {
    const { classNewId, teacherSubSubjectMappings } = params;

    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["classType", "schoolYear"],
    });

    const teacherIds = teacherSubSubjectMappings.map(mapping => mapping.teacherId);
    const subSubjectTypeIds = teacherSubSubjectMappings.map(mapping => mapping.subSubjectTypeId);

    const teachers = await this.teacherRepo.findManyByIdsOrThrow(teacherIds, "notFound.teacher");
    const subSubjectTypes = await this.subSubjectTypeRepo.findManyByIdsOrThrow(
      subSubjectTypeIds,
      "notFound.subSubjectType",
    );

    const assignedTeachersAndSubSubjects = teacherSubSubjectMappings.map(mapping => {
      const teacher = teachers.find(teacher => teacher._id === mapping.teacherId);
      const subSubjectType = subSubjectTypes.find(
        subSubjectType => subSubjectType._id === mapping.subSubjectTypeId,
      );
      if (!teacher || !subSubjectType) throw new InternalError("notFound.teacherOrSubSubjectType");
      return { teacher, subSubjectType };
    });

    assignedTeachersAndSubSubjects.forEach(({ teacher, subSubjectType }) => {
      TeacherService.checkTeacherSubSubjectEligibility(teacher, classDoc.classType, subSubjectType);
      TeacherService.checkTeacherLevelEligibility(teacher, { _id: classDoc.schoolYear.level });
      ClassTypeService.ensureSubSubjectTypeIncludeInClassType(
        classDoc.classType,
        subSubjectType._id,
      );
      ClassTypeService.ensureNoTeacherAssignedToSubSubjectTypeInClass(subSubjectType._id, classDoc);
    });

    const newAssignedTeachersMap = {} as Record<string, ID>;

    assignedTeachersAndSubSubjects.forEach(({ teacher, subSubjectType }) => {
      newAssignedTeachersMap[subSubjectType._id] = teacher._id;
    });

    const newSubSubjectTeachersMap = {
      ...classDoc.subSubjectTeacherMap,
      ...newAssignedTeachersMap,
    };

    await this.classRepo.updateOneById(classDoc._id, {
      subSubjectTeacherMap: newSubSubjectTeachersMap,
    });

    const teacherProfiles =
      await this.teacherProfileRepo.getManyTeacherProfilesByCurrentSchoolYears(teacherIds, [
        classDoc.schoolYear._id,
      ]);

    const promise: Promise<unknown>[] = [];

    teacherProfiles.forEach(teacherProfile => {
      const subSubjectTypeIdToBeAssigned = assignedTeachersAndSubSubjects.find(
        mapping => mapping.teacher._id === teacherProfile.teacher,
      )?.subSubjectType._id;
      if (!subSubjectTypeIdToBeAssigned)
        throw new InternalError("notFound.subSubjectTypeIdToBeAssigned");

      const teacherClasses = uniq(teacherProfile.classes.concat(classDoc._id));

      promise.push(
        this.sessionRepo.assignTeacherToWaitingSessionOfSubSubjectType(
          classDoc._id,
          subSubjectTypeIdToBeAssigned,
          teacherProfile.teacher,
        ),
        this.weeklySessionRepo.assignTeacherToWeeklySessionsOfSubSubjectTypeByClass(
          classDoc._id,
          teacherProfile.teacher,
          subSubjectTypeIdToBeAssigned,
        ),
        this.teacherProfileRepo.updateOneById(teacherProfile._id, {
          classes: teacherClasses,
        }),
      );
    });

    await Promise.all(promise);
  }
}
