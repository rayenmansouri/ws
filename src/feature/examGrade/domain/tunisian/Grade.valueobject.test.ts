import { ID } from "../../../../types/BaseEntity";
import { DISPENSED_STATUS } from "./ExamGrade.entity";
import { Grade } from "./Grade.valueobject";

describe("Grade", () => {
  describe("create", () => {
    it("should throw error if the grade coefficient is negative", () => {
      expect(() => Grade.create(-1, 10)).toThrowError();
      expect(() => Grade.create(0, 10)).toThrowError();
    });

    it("should throw error if the grade mark is not between 0 and max grade", () => {
      expect(() => Grade.create(1, Grade.MAX_MARK + 1)).toThrowError();
      expect(() => Grade.create(1, -1)).toThrowError();
    });

    it("should create a grade", () => {
      const grade = Grade.create(1, 10);
      expect(grade.coefficient).toBe(1);
      expect(grade.mark).toBe(10);
      expect(grade.isDispensed).toBe(false);
    });
  });

  describe("calculateAverage", () => {
    it("should calculate the average of the grades", () => {
      const grades = [Grade.create(1, 10), Grade.create(1, 20)];
      const average = Grade.calculateAverage(grades);
      expect(average.mark).toBe(15);
    });

    it("should return only 2 digits after the decimal point", () => {
      const grades = [Grade.create(1, 4), Grade.create(1, 3), Grade.create(1, 3)];
      const average = Grade.calculateAverage(grades);
      expect(average.mark).toBe(3.33);

      const grades2 = [Grade.create(1, 4), Grade.create(1, 3), Grade.create(1, 3.78)];
      const average2 = Grade.calculateAverage(grades2);
      expect(average2.mark).toBe(3.59);
    });

    it("Should not include grades with null mark", () => {
      const grades = [Grade.create(1, 10), Grade.create(1, null), Grade.create(1, 20)];
      const average = Grade.calculateAverage(grades);
      expect(average.mark).toBe(15);
    });

    it("should calculate the average of the grades with coefficients", () => {
      const grades = [Grade.create(1, 10), Grade.create(2, 20)];
      const average = Grade.calculateAverage(grades);
      expect(average.mark).toBe(16.66);
    });

    it("should return grade with null mark if no grade is provided", () => {
      const grades: Grade[] = [];
      const average = Grade.calculateAverage(grades);
      expect(average.mark).toBe(null);
    });

    it("should return grade with null mark if all grades are null", () => {
      const grades = [Grade.create(1, null), Grade.create(1, null)];
      const average = Grade.calculateAverage(grades);
      expect(average.mark).toBe(null);
    });

    it("should return grade with dispensed mark if all grades are dispensed", () => {
      const grades = [Grade.create(1, DISPENSED_STATUS), Grade.create(1, DISPENSED_STATUS)];
      const average = Grade.calculateAverage(grades);
      expect(average.mark).toBe(null);
      expect(average.isDispensed).toBe(true);
    });
  });

  describe("calculateRank", () => {
    it("should calculate the rank of the grade", () => {
      const grades = [
        { id: "studentId1" as ID, grade: Grade.create(1, 10) },
        { id: "studentId2" as ID, grade: Grade.create(1, 20) },
        { id: "studentId3" as ID, grade: Grade.create(1, 15) },
      ];

      expect(Grade.calculateRank(grades, "studentId1" as ID)).toBe(3);
      expect(Grade.calculateRank(grades, "studentId2" as ID)).toBe(1);
      expect(Grade.calculateRank(grades, "studentId3" as ID)).toBe(2);
    });
  });

  describe("format", () => {
    it("should return the formatted grade", () => {
      const grade = Grade.create(1, 10);
      expect(grade.format()).toBe("10");
    });

    it("should return - if the grade is dispensed", () => {
      const grade = Grade.create(1, DISPENSED_STATUS);
      expect(grade.format()).toBe(DISPENSED_STATUS);
    });

    it("should return null if the grade is null", () => {
      const grade = Grade.create(1, null);
      expect(grade.format()).toBeNull();
    });
  });
});
