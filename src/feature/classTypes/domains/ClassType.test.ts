import { BadRequestError } from "../../../core/ApplicationErrors";
import { ClassTypeService } from "./ClassType.service";

describe("Class Type service", () => {
  describe("check subject included in grade Book", () => {
    it("should return true if subject has exams", () => {
      const subject = {
        subSubjects: [],
        exams: [{}],
      };

      const result = ClassTypeService.checkSubjectIncludedInGradeBook(subject);

      expect(result).toBe(true);
    });

    it("should return false if subject has no subSubjects and not exams", () => {
      const subject = {
        subSubjects: [],
        exams: [],
      };

      const result = ClassTypeService.checkSubjectIncludedInGradeBook(subject);

      expect(result).toBe(false);
    });

    it("should return true if subject has subSubjects and at least one subSubject included in gradeBook", () => {
      const subject = {
        subSubjects: [{ exams: [{}] }],
        exams: [],
      };

      const result = ClassTypeService.checkSubjectIncludedInGradeBook(subject);

      expect(result).toBe(true);
    });

    it("should return false if subject has subSubjects and no subSubject included in gradeBook", () => {
      const subject = {
        subSubjects: [{ exams: [] }],
        exams: [],
      };

      const result = ClassTypeService.checkSubjectIncludedInGradeBook(subject);

      expect(result).toBe(false);
    });
  });

  describe("reorderArray", () => {
    it("should reorder elements in the array", () => {
      const array = [1, 2, 3, 4, 5];
      const result = ClassTypeService.reorderArray(array, 1, 3);
      expect(result).toEqual([1, 3, 4, 2, 5]);
    });

    it("should throw BadRequestError for negative indices", () => {
      const array = [1, 2, 3, 4, 5];
      expect(() => {
        ClassTypeService.reorderArray(array, -1, 3);
      }).toThrow(BadRequestError);
    });

    it("should throw BadRequestError for indices out of bounds", () => {
      const array = [1, 2, 3, 4, 5];
      expect(() => {
        ClassTypeService.reorderArray(array, 1, 5);
      }).toThrow(BadRequestError);
    });

    it("should not mutate the original array", () => {
      const array = [1, 2, 3, 4, 5];
      const result = ClassTypeService.reorderArray(array, 1, 3);
      expect(array).toEqual([1, 2, 3, 4, 5]);
      expect(result).not.toBe(array);
    });
  });
});
