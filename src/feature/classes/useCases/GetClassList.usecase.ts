import { injectable } from "inversify";
import { InternalError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { SchoolYearRepo } from "../../schoolYears/domain/SchoolYear.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { UserMapper } from "../../users/mappers/User.mapper";
import { ClassRepo } from "../domain/Class.repo";
import { ClassService } from "../domain/Class.service";
import { GetClassListResponseDto } from "./../../../api/classManagement/web/admin/getClassList/getClassList.types";
import { Populate } from "./../../../core/populateTypes";
import { ID } from "./../../../types/BaseEntity";
import { SchoolYearMetaData } from "./../../schoolYears/domain/schoolYear.entity";
import { SchoolYearDto } from "./../../schoolYears/dtos/schoolYear.dto";
import { SchoolYearMapper } from "./../../schoolYears/mappers/schoolYear.mapper";

type GetClassListPrams = {
  subLevelNewId: string;
  classTypeNewId?: string;
  schoolYearId?: ID;
};

@injectable()
export class GetClassListUseCase {
  constructor(
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
  ) {}

  async execute(params: GetClassListPrams): Promise<GetClassListResponseDto> {
    const { subLevelNewId, classTypeNewId, schoolYearId } = params;

    const subLevel = await this.subLevelRepo.findOneByNewIdOrThrow(
      subLevelNewId,
      "notFound.subLevel",
    );

    const schoolYears: Populate<SchoolYearMetaData, "level">[] =
      await this.schoolYearRepo.findManyByLevel(subLevel.level._id);

    let selectedSchoolYear: SchoolYearDto = SchoolYearMapper.toSchoolYearDto(
      schoolYears.find(schoolYear => schoolYear._id === subLevel.level.currentSchoolYear._id)!,
    );

    if (schoolYearId) {
      const schoolYear: Populate<SchoolYearMetaData, "level"> =
        await this.schoolYearRepo.findOneByIdOrThrow(schoolYearId, "notFound.schoolYear", {
          populate: ["level"],
        });

      selectedSchoolYear = SchoolYearMapper.toSchoolYearDto(schoolYear);
    }

    const classTypes = await this.classTypeRepo.findManyBySublevels([subLevel._id]);

    const selectedClassType =
      classTypes.find(classType => classType.newId === classTypeNewId) || classTypes.at(0);

    if (!selectedClassType) {
      return {
        classList: [],
        hasSection: false,
        level: null,
        selectedClassType: null,
        classTypes: null,
        schoolYears: schoolYears.map(schoolYear => SchoolYearMapper.toSchoolYearDto(schoolYear)),
        selectedSchoolYear: selectedSchoolYear,
      };
    }

    const classes = await this.classRepo.findManyByClassTypeInSchoolYear(
      selectedClassType._id,
      schoolYearId ?? subLevel.level.currentSchoolYear._id,
    );

    const MAX_TEACHERS_TO_DISPLAY = 4;
    const MAX_STUDENTS_TO_DISPLAY = 4;

    const teacherIds = ClassService.getDistinctTeacherIdsFromDifferentClass(
      classes,
      MAX_TEACHERS_TO_DISPLAY,
    );
    const studentIds = ClassService.getDistinctStudentIdsFromDifferentClass(
      classes,
      MAX_STUDENTS_TO_DISPLAY,
    );

    const teachers = await this.teacherRepo.findManyByIds(teacherIds);

    const students = await this.studentRepo.findManyByIds(studentIds);

    const classList = classes.map(classDoc => {
      const studentDtos = classDoc.students.slice(0, MAX_STUDENTS_TO_DISPLAY).map(studentId => {
        const student = students.find(student => student._id === studentId);
        if (!student) throw new InternalError("notFound.student");
        return UserMapper.toUserProfileDTO(student);
      });
      const topicTeacherIds = { ...classDoc.subjectTeacherMap, ...classDoc.subSubjectTeacherMap };
      const teacherIds = Object.values(topicTeacherIds)
        .filter(teacher => teacher !== null)
        .slice(0, MAX_TEACHERS_TO_DISPLAY);
      const teacherDtos = teacherIds.map(teacherId => {
        const teacher = teachers.find(teacher => teacher._id === teacherId);
        if (!teacher) throw new InternalError("notFound.teacher");
        return UserMapper.toUserProfileDTO(teacher);
      });

      return {
        ...EntityMapper.toEntityDto(classDoc),
        students: studentDtos,
        teachers: teacherDtos,
      };
    });

    return {
      classList,
      hasSection: classTypes.length > 1,
      level: EntityMapper.toEntityDto(subLevel.level),
      selectedClassType: EntityMapper.toEntityDto(selectedClassType),
      classTypes: classTypes.map(classType => EntityMapper.toEntityDto(classType)),
      schoolYears: schoolYears.map(schoolYear => SchoolYearMapper.toSchoolYearDto(schoolYear)),
      selectedSchoolYear: selectedSchoolYear,
    };
  }
}
