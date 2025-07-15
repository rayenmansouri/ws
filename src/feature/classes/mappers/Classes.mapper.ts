import { Student } from "../../students/domain/student.entity";
import { Class } from "../domain/class.entity";
import { ClassGroup } from "../domain/classGroup.entity";
import { ClassDTO } from "../dto/Classes.dto";
import { StudentInClassDto } from "../dto/StudentInClass.dto";

export class ClassMapper {
  static toClassDto(data: Pick<Class, "name" | "newId" | "_id" | "classType">): ClassDTO {
    return { name: data.name, newId: data.newId, _id: data._id, classType: data.classType };
  }

  static toStudentInClassDto(
    student: Pick<Student, "_id" | "newId" | "fullName" | "gender" | "avatar" | "email">,
    group: Pick<ClassGroup, "_id" | "newId" | "name">,
  ): StudentInClassDto {
    return {
      _id: student._id,
      newId: student.newId,
      fullName: student.fullName,
      group: ClassMapper.toGroupDto(group),
      avatar: student.avatar.link,
      gender: student.gender,
      email: student.email || null,
    };
  }

  static toGroupDto(data: Pick<ClassGroup, "_id" | "newId" | "name">) {
    return {
      _id: data._id,
      newId: data.newId,
      name: data.name,
    };
  }
}
