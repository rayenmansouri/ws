import { ID } from "../../../../types/BaseEntity";
import { DISPENSED_STATUS } from "../tunisian/ExamGrade.entity";
import { CambridgeGrade } from "./CambridgeGrade.valueobject";

describe("CambridgeGrade", () => {
  describe("create", () => {
    it("should throw error if the grade coefficient is negative", () => {
      expect(() => CambridgeGrade.create(-1, 10)).toThrowError();
      expect(() => CambridgeGrade.create(0, 10)).toThrowError();
    });

    it("should throw error if the grade mark is not between 0 and max grade", () => {
      expect(() => CambridgeGrade.create(1, CambridgeGrade.MAX_MARK + 1)).toThrowError();
      expect(() => CambridgeGrade.create(1, -1)).toThrowError();
    });

    it("should create a grade", () => {
      const grade = CambridgeGrade.create(1, 75);
      expect(grade.coefficient).toBe(1);
      expect(grade.mark).toBe(75);
      expect(grade.isDispensed).toBe(false);
    });
  });

  describe("calculateAverage", () => {
    it("should calculate the average of the grades", () => {
      const grades = [CambridgeGrade.create(1, 10), CambridgeGrade.create(1, 20)];
      const average = CambridgeGrade.calculateAverage(grades);
      expect(average.mark).toBe(15);
    });

    it("should return rounded value", () => {
      const grades = [
        CambridgeGrade.create(1, 4),
        CambridgeGrade.create(1, 3),
        CambridgeGrade.create(1, 3),
      ];
      const average = CambridgeGrade.calculateAverage(grades);
      expect(average.mark).toBe(3);

      const grades2 = [
        CambridgeGrade.create(1, 4),
        CambridgeGrade.create(1, 3),
        CambridgeGrade.create(1, 3.78),
      ];
      const average2 = CambridgeGrade.calculateAverage(grades2);
      expect(average2.mark).toBe(4);
    });

    it("Should not include grades with null mark", () => {
      const grades = [
        CambridgeGrade.create(1, 10),
        CambridgeGrade.create(1, null),
        CambridgeGrade.create(1, 20),
      ];
      const average = CambridgeGrade.calculateAverage(grades);
      expect(average.mark).toBe(15);
    });

    it("should calculate the average of the grades with coefficients", () => {
      const grades = [CambridgeGrade.create(1, 10), CambridgeGrade.create(2, 20)];
      const average = CambridgeGrade.calculateAverage(grades);
      expect(average.mark).toBe(17);
    });

    it("should return grade with null mark if no grade is provided", () => {
      const grades: CambridgeGrade[] = [];
      const average = CambridgeGrade.calculateAverage(grades);
      expect(average.mark).toBe(null);
    });

    it("should return grade with null mark if all grades are null", () => {
      const grades = [CambridgeGrade.create(1, null), CambridgeGrade.create(1, null)];
      const average = CambridgeGrade.calculateAverage(grades);
      expect(average.mark).toBe(null);
    });

    it("should return grade with dispensed mark if all grades are dispensed", () => {
      const grades = [
        CambridgeGrade.create(1, DISPENSED_STATUS),
        CambridgeGrade.create(1, DISPENSED_STATUS),
      ];
      const average = CambridgeGrade.calculateAverage(grades);
      expect(average.mark).toBe(null);
      expect(average.isDispensed).toBe(true);
    });
  });

  describe("calculateRank", () => {
    it("should calculate the rank of the grade", () => {
      const grades = [
        { id: "studentId1" as ID, grade: CambridgeGrade.create(1, 10) },
        { id: "studentId2" as ID, grade: CambridgeGrade.create(1, 20) },
        { id: "studentId3" as ID, grade: CambridgeGrade.create(1, 15) },
      ];

      expect(CambridgeGrade.calculateRank(grades, "studentId1" as ID)).toBe(3);
      expect(CambridgeGrade.calculateRank(grades, "studentId2" as ID)).toBe(1);
      expect(CambridgeGrade.calculateRank(grades, "studentId3" as ID)).toBe(2);
    });
  });

  describe("getLetterGrade", () => {
    it("should return the letter grade", () => {
      expect(CambridgeGrade.create(1, 10).getLetterGrade()).toBe("F");
      expect(CambridgeGrade.create(1, 45).getLetterGrade()).toBe("E");
      expect(CambridgeGrade.create(1, 55).getLetterGrade()).toBe("D");
      expect(CambridgeGrade.create(1, 65).getLetterGrade()).toBe("C");
      expect(CambridgeGrade.create(1, 75).getLetterGrade()).toBe("B");
      expect(CambridgeGrade.create(1, 85).getLetterGrade()).toBe("A");
      expect(CambridgeGrade.create(1, 100).getLetterGrade()).toBe("A");
    });

    it("should return null if the mark is null", () => {
      const grade = CambridgeGrade.create(1, null);
      expect(grade.getLetterGrade()).toBeNull();
    });
  });

  describe("format", () => {
    it("should return the formatted grade", () => {
      const grade = CambridgeGrade.create(1, 10);
      expect(grade.format()).toBe("10");
    });

    it("should return - if the grade is dispensed", () => {
      const grade = CambridgeGrade.create(1, DISPENSED_STATUS);
      expect(grade.format()).toBe(DISPENSED_STATUS);
    });

    it("should return null if the grade is null", () => {
      const grade = CambridgeGrade.create(1, null);
      expect(grade.format()).toBeNull();
    });
  });
});
