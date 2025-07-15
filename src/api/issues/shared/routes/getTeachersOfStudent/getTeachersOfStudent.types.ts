import { UserProfileDTO } from "./../../../../../feature/users/dtos/userProfile.dto";
import { GetTeachersOfStudentValidation } from "./getTeachersOfStudent.validation";

export type GetTeachersOfStudentRouteConfig = GetTeachersOfStudentValidation & { files: never };
export type GetTeachersOfStudentResponse = { topicName: string; teacher: UserProfileDTO }[];
