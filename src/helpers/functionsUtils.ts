import axios from "axios";
import mongoose, { ObjectId } from "mongoose";
import logger from "../core/Logger";
import { Student } from "../feature/students/domain/student.entity";
import { schoolDocStore } from "./../core/subdomainStore";

export const sortStudentByFullName = (students: Student[]): Student[] => {
  return students.sort((a, b) => {
    if (a.fullName < b.fullName) {
      return -1;
    }
    if (a.fullName > b.fullName) {
      return 1;
    }
    return 0;
  });
};

// Removed unused function: generateUnpaidInvoiceSmsText

// Removed unused function: sendPhoneMessage and related SMS constants

export const objectIdArrayToString = (arr: ObjectId[] | string[]): string[] => {
  return arr.map(id => String(id));
};

// Removed unused function: isIncludeArrayIds

// Removed unused function: areAllElementsIncluded

export const objectIdsToStrings = (values: ObjectId[]): string[] =>
  values.map(value => String(value));
// Removed duplicate function: stringToObjectId (exists in other files)

// Removed unused function: isIdsEqual
