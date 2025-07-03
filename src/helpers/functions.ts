import { IAttendance } from "../feature/sessionManagement/domain/session.entity";
import mongoose, { ObjectId } from "mongoose";
import { IClass } from "./../database/schema/pedagogy/class/class.schema";
import { ITerm } from "./../database/schema/pedagogy/structure/term.schema";
import { DAY_TO_MILLISECOND } from "./constants";
import { isIdsEqual } from "./functionsUtils";

export const getWeekOfDate = (firstSunday: Date, currentDate: Date) => {
  const differenceInDays = Math.floor(
    (currentDate.getTime() - firstSunday.getTime()) / DAY_TO_MILLISECOND,
  );

  const restOfDivision = differenceInDays % 14;

  if (restOfDivision < 6) return "A";
  else return "B";
};

export const deleteSpaces = (inputString: string): string => {
  return inputString.replace(/\s/g, "");
};

export const categorizeStudentsByAttendance = (
  attendance: IAttendance,
): {
  attendance_late: string[];
  attendance_absent: string[];
  attendance_expelled: string[];
} => {
  const attendance_late: string[] = [];
  const attendance_absent: string[] = [];
  const attendance_expelled: string[] = [];

  for (const studentId in attendance) {
    if (attendance.hasOwnProperty(studentId)) {
      const status = attendance[studentId];

      switch (status) {
        case "late":
          attendance_late.push(studentId);
          break;
        case "absent":
          attendance_absent.push(studentId);
          break;
        case "expelled":
          attendance_expelled.push(studentId);
          break;
        default:
          break;
      }
    }
  }

  return {
    attendance_late,
    attendance_absent,
    attendance_expelled,
  };
};

export const stringToObjectId = (id: string) => {
  return new mongoose.Types.ObjectId(id) as unknown as mongoose.Schema.Types.ObjectId;
};
export const removeDuplicateStringInArray = (array: (ObjectId | string | null)[]): string[] => {
  const auxArray: string[] = [];
  for (const item of array) {
    if (item) auxArray.push(item.toString());
  }
  const uniqueSet = new Set(auxArray);

  return Array.from(uniqueSet);
};
export const getCurrentTermOfClass = (
  gradeBookReportsOfClass: IClass["gradeReports"],
  sortedTerms: ITerm[],
): ITerm => {
  const lastTermGenerated = gradeBookReportsOfClass[gradeBookReportsOfClass.length - 1] as
    | { term: ObjectId }
    | undefined;

  if (!lastTermGenerated) {
    return sortedTerms[0];
  }
  const lastTermIndex = sortedTerms.findIndex(term => isIdsEqual(term._id, lastTermGenerated.term));

  const currentTerm = sortedTerms[lastTermIndex + 1] as ITerm | undefined;

  if (!currentTerm) {
    return sortedTerms[sortedTerms.length - 1];
  }
  return currentTerm;
};
