import { BadRequestError } from "../../../core/ApplicationErrors";
import { Parent } from "../../parents/domain/parent.entity";
import { Student } from "./student.entity";
import { StudentService } from "./Student.service";

describe("Student service", () => {
  describe("ensureStudentIsNotAssignedToParent", () => {
    it("Should throw error when the student is assigned to the parent", () => {
      const student = { _id: "id1" } as Student;
      const parent = { students: ["id2", "id1"] } as Parent;

      try {
        StudentService.ensureStudentIsNotAssignedToParent(student, parent);
        fail("It should throw");
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });

    it("Should not throw error when the student is not assigned to the parent", () => {
      const student = { _id: "id3" } as Student;
      const parent = { students: ["id1", "id2"] } as Parent;

      expect(() => {
        StudentService.ensureStudentIsNotAssignedToParent(student, parent);
      }).not.toThrow();
    });
  });
});
