import { ID } from "../../../types/BaseEntity";
import { SubjectOfClassTypeDTO } from "../../classTypes/dtos/classType.dto";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { UserMapper } from "../../users/mappers/User.mapper";
import { SubjectOfClassDto } from "../dto/SubjectOfClass.dto";

export class SubjectOfClassMapper {
  static toSubjectOfClassDto(
    subjectOfClassType: SubjectOfClassTypeDTO,
    topicTeacherMap: Record<ID, ID | null>,
    teachers: Teacher[],
  ): SubjectOfClassDto {
    const teacherId = topicTeacherMap[subjectOfClassType.subjectType._id];
    const teacher = teachers.find(teacher => teacher._id === teacherId);
    return {
      subjectType: subjectOfClassType.subjectType,
      coefficient: subjectOfClassType.coefficient,
      hasSubSubjects: subjectOfClassType.hasSubSubjects,
      teacher: teacher ? UserMapper.toUserProfileDTO(teacher) : null,
      subSubjects: subjectOfClassType.subSubjects.map(subSubject => {
        const subTeacherId = topicTeacherMap[subSubject.subSubjectType._id];
        const subTeacher = teachers.find(teacher => teacher._id === subTeacherId);
        return {
          subSubjectType: subSubject.subSubjectType,
          coefficient: subSubject.coefficient,
          teacher: subTeacher ? UserMapper.toUserProfileDTO(subTeacher) : null,
        };
      }),
    };
  }
}
