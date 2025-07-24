import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { Class } from "../domain/class.entity";
import { ClassRepo } from "../domain/Class.repo";
import { AssignTeachersToSubjectsInClassUseCase } from "./AssignTeacherToSubjectInClass.usecase";
import { AssignTeacherToSubSubjectInClassUseCase } from "./AssignTeacherToSubSubjectInClass.usecase";
import { AssignStudentToClassUseCase } from "./AssignStudentToClass.usecase";
import { ClassGroupRepo } from "../domain/classGroup.repo";
import { ClassMapper } from "../mappers/Classes.mapper";
import { ClassDTO } from "../dto/Classes.dto";

type teacherId = ID;
type subjectTypeId = ID;

type AddClassUseCasePrams = {
  classTypeNewId: string;
  name: string;
  studentIds: ID[];
  subjectTeacherRecords: Record<subjectTypeId, teacherId>;
  subSubjectTeacherRecords: Record<subjectTypeId, teacherId>;
};

@injectable()
export class AddClassUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ClassGroupRepo") private classGroupRepo: ClassGroupRepo,
    @inject("AssignTeachersToSubjectsInClassUseCase")
    private assignTeachersToSubjectsInClassUseCase: AssignTeachersToSubjectsInClassUseCase,
    @inject("AssignTeacherToSubSubjectInClassUseCase")
    private assignTeacherToSubSubjectInClassUseCase: AssignTeacherToSubSubjectInClassUseCase,
    @inject("AssignStudentToClassUseCase")
    private assignStudentToClassUseCase: AssignStudentToClassUseCase,
  ) {}

  async execute(data: AddClassUseCasePrams): Promise<ClassDTO> {
    const { classTypeNewId } = data;

    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
      { populate: ["subLevel"] },
    );

    const currentSchoolYearId = classType.subLevel.level.currentSchoolYear._id;

    await this.classRepo.ensureNameIsUniqueInSchoolYear(data.name, currentSchoolYearId);

    const payload: Omit<Class, keyof BaseEntity> = {
      name: data.name,
      classType: classType._id,
      schoolYear: currentSchoolYearId,
      students: [],
      subjectTeacherMap: {},
      subSubjectTeacherMap: {},
      classGroups: [],
      notAvailableTimes: [],
      maxHoursPerDay: null,
      maxGapsPerDay: null,
      maxContinuousHours: null,
      preferredClassroom: null,
    };

    const classDoc = await this.classRepo.addOne(payload);

    const group1 = await this.classGroupRepo.addOne({
      name: "Group 1",
      class: classDoc._id,
      students: [],
    });

    const group2 = await this.classGroupRepo.addOne({
      name: "Group 2",
      class: classDoc._id,
      students: [],
    });

    await this.classRepo.updateOneById(classDoc._id, { classGroups: [group1._id, group2._id] });

    await this.assignTeachersToSubjectsInClassUseCase.execute({
      classNewId: classDoc.newId,
      teacherSubjectMappings: Object.entries(data.subjectTeacherRecords).map(
        ([subjectTypeId, teacherId]) => ({
          subjectTypeId: subjectTypeId as ID,
          teacherId,
        }),
      ),
    });

    await this.assignTeacherToSubSubjectInClassUseCase.execute({
      classNewId: classDoc.newId,
      teacherSubSubjectMappings: Object.entries(data.subSubjectTeacherRecords).map(
        ([subSubjectTypeId, teacherId]) => ({
          subSubjectTypeId: subSubjectTypeId as ID,
          teacherId,
        }),
      ),
    });

    await this.assignStudentToClassUseCase.execute({
      classNewId: classDoc.newId,
      studentIds: data.studentIds,
    });

    return ClassMapper.toClassDto(classDoc);
  }
}
