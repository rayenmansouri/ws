import { Populate } from "../../../core/populateTypes";
import { ClassroomMetaData } from "../domains/classroom.entity";
import { ClassroomDTO } from "../dtos/Classroom.dto";

export class ClassroomMapper {
  static toDTO(
    classroom: Populate<ClassroomMetaData, "sessionTypes" | "subjectTypes">,
  ): ClassroomDTO {
    return {
      _id: classroom._id,
      newId: classroom.newId,
      name: classroom.name,
      allowAllSubjects: classroom.allowAllSubjects,
      allowAllSessionTypes: classroom.allowAllSessionTypes,
      subjectTypes: classroom.subjectTypes.map(subjectType => ({
        _id: subjectType._id,
        newId: subjectType.newId,
        name: subjectType.name,
      })),
      sessionTypes: classroom.sessionTypes.map(sessionType => ({
        _id: sessionType._id,
        newId: sessionType.newId,
        name: sessionType.name,
      })),
    };
  }
}
