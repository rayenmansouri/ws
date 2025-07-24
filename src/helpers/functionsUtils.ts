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

export const generateUnpaidInvoiceSmsText = (
  invoiceNumber: string,
  invoiceAmount: number,
  invoiceDueDate: Date,
  schoolCurrency: string,
) => {
  const dueDateString = invoiceDueDate.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return `La facture #${invoiceNumber} d'un montant de ${invoiceAmount}${schoolCurrency}, à régler avant ${dueDateString}.`;
};

const sms_key: string | undefined = process.env.SMS_KEY;
const sms_prefix: string | undefined = process.env.SMS_PREFIX;
const sms_sender: string | undefined = process.env.SMS_SENDER;
const sms_function: string | undefined = process.env.SMS_FCT;
const sms_url: string | undefined = process.env.SMS_URI;

const SMS_MESSAGE_LIMIT = 160;

export const sendPhoneMessage = async (message: string, receiver: string, tenantId: string) => {
  try {
    if (schoolDocStore[tenantId].enableSms) {
      if (message.length > SMS_MESSAGE_LIMIT) {
        logger.warn(`SMS message is long : ${message} `);
      }
      const response = await axios.get(`${sms_url}`, {
        params: {
          fct: sms_function,
          key: sms_key,
          mobile: sms_prefix + receiver,
          sms: message,
          sender: sms_sender,
        },
      });
      return response;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`error message: ${error.message} case message: ${error.cause}`);
    } else {
      logger.error(`unexpected error: ${error}`);
    }
  }
};

export const objectIdArrayToString = (arr: ObjectId[] | string[]): string[] => {
  return arr.map(id => String(id));
};

export const isIncludeArrayIds = (arr: ObjectId[] | string[], id: ObjectId | string): boolean => {
  return objectIdArrayToString(arr).includes(String(id));
};

export function areAllElementsIncluded(referenceArray: string[], arrayToCheck: string[]): boolean {
  return arrayToCheck.every(element => referenceArray.includes(element));
}

export const objectIdsToStrings = (values: ObjectId[]): string[] =>
  values.map(value => String(value));
export const stringToObjectId = (id: string): ObjectId => {
  return new mongoose.Types.ObjectId(id) as unknown as mongoose.Schema.Types.ObjectId;
};

export const isIdsEqual = (
  id1: ObjectId | string | undefined | null,
  id2: ObjectId | string | undefined | null,
): boolean => {
  return id1?.toString() === id2?.toString();
};
