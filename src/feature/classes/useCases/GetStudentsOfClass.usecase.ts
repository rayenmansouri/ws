import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../domain/Class.repo";
import { ClassService } from "../domain/Class.service";
import { StudentInClassDto } from "../dto/StudentInClass.dto";
import { ClassMapper } from "../mappers/Classes.mapper";

@injectable()
export class GetStudentsOfClassUseCase {
  constructor(@inject("ClassRepo") private classRepo: ClassRepo) {}

  async execute(classNewId: string): Promise<StudentInClassDto[]> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students", "classGroups", "classType"],
    });

    const students = classDoc.students;

    const classGroups = classDoc.classGroups;

    const studentsWithClassGroup = ClassService.getEachStudentThereGroup(students, classGroups);

    const studentsInClass = studentsWithClassGroup.map(({ student, group }) =>
      ClassMapper.toStudentInClassDto(student, group),
    );
    return studentsInClass;
  }
}
