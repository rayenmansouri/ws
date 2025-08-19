import { z } from "zod";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";

// Query validation schema
export const listStudentQuerySchema = z.object({
  search: z.string().optional(),
  page: z.number().optional().transform(val => val ?? 1),
  limit: z.number().optional().transform(val => val ?? 10),
  type: z.enum(["PARTICIPANT", "ADMIN", "COACH"]).optional(),
  status: z.enum(["active", "inactive"]).optional(),
});

// Student response type
export const StudentResponseSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string().optional(),
  type: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type StudentResponse = z.infer<typeof StudentResponseSchema>;

// Route configuration type
export type ListStudentRouteConfig = {
  query: z.infer<typeof listStudentQuerySchema>;
  params: never;
  body: never;
  files: never;
};

// Response type
export type ListStudentResponse = ResponseWithPagination<StudentResponse>;
