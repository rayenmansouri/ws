import { BadRequestError } from "../../../core/ApplicationErrors";
import { ID } from "../../../types/BaseEntity";
import { Class } from "./class.entity";
import { ClassRules } from "./Class.rules";

describe("Class type rules", () => {
  describe("ensureClassTypeMatchLevel", () => {
    it("Should throw error when the teacher not in class", () => {
      const id = "id1" as ID;
      const id2 = "id2" as ID;
      const classDoc: Pick<Class, "subjectTeacherMap" | "subSubjectTeacherMap"> = {
        subjectTeacherMap: { [id]: "id1" as ID },
        subSubjectTeacherMap: { [id2]: "id2" as ID },
      };
      const teacherId = "id3" as ID;

      try {
        ClassRules.verifyTeacherInClass(teacherId, classDoc);
        fail("It should throw");
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });
  });
});
