import { AlertDetails } from "./../dto/alert.dto";
import { Populate } from "./../../../core/populateTypes";
import { UserMapper } from "./../../users/mappers/User.mapper";
import { AlertMetaData } from "./../domain/alert.entity";
import { ID } from "../../../types/BaseEntity";
import { AlertDto } from "../dto/alert.dto";
import { END_USER_ENUM, TEndUserEnum } from "./../../../constants/globalEnums";
import { Admin } from "./../../admins/domain/admin.entity";
import { Parent } from "./../../parents/domain/parent.entity";
import { Student } from "./../../students/domain/student.entity";
import { Teacher } from "./../../teachers/domain/teacher.entity";
import { BadRequestError } from "../../../core/ApplicationErrors";

export type AlertUser = { _id: ID; phoneNumber: string | null };

export class AlertMapper {
  static toAlertDto(alert: Populate<AlertMetaData, "createdBy">): AlertDto {
    return {
      _id: alert._id,
      newId: alert.newId,
      content: alert.content,
      totalAlertSent: alert.users.length,
      status: alert.status,
      createdBy: UserMapper.toUserProfileDTO(alert.createdBy),
      sentAt: alert.sentAt || null,
      createdAt: alert.createdAt,
    };
  }
  static toAlertUsersByType(users: {
    students: Student[];
    parents: Parent[];
    teachers: Teacher[];
    admins: Admin[];
  }): { userId: ID; userType: TEndUserEnum }[] {
    return [
      ...users.students.map(student => ({
        userId: student._id,
        userType: END_USER_ENUM.STUDENT,
      })),
      ...users.parents.map(parent => ({
        userId: parent._id,
        userType: END_USER_ENUM.PARENT,
      })),
      ...users.teachers.map(teacher => ({
        userId: teacher._id,
        userType: END_USER_ENUM.TEACHER,
      })),
      ...users.admins.map(admin => ({
        userId: admin._id,
        userType: END_USER_ENUM.ADMIN,
      })),
    ];
  }

  static toAlertUser(
    users: {
      students: Student[];
      parents: Parent[];
      teachers: Teacher[];
      admins: Admin[];
    },
    isSmsAlert: boolean,
  ): {
    students: AlertUser[];
    parents: AlertUser[];
    teachers: AlertUser[];
    admins: AlertUser[];
  } {
    return {
      students: users.students.map(({ _id, phoneNumber }) => {
        if (!phoneNumber && isSmsAlert) throw new BadRequestError("alert.userWithoutPhoneNumber");

        return {
          _id,
          phoneNumber: phoneNumber,
        };
      }),
      parents: users.parents.map(({ _id, phoneNumber }) => {
        if (!phoneNumber && isSmsAlert) throw new BadRequestError("alert.userWithoutPhoneNumber");

        return {
          _id,
          phoneNumber: phoneNumber,
        };
      }),
      teachers: users.teachers.map(({ _id, phoneNumber }) => {
        if (!phoneNumber && isSmsAlert) throw new BadRequestError("alert.userWithoutPhoneNumber");

        return {
          _id,
          phoneNumber: phoneNumber,
        };
      }),
      admins: users.admins.map(({ _id, phoneNumber }) => {
        if (!phoneNumber && isSmsAlert) throw new BadRequestError("alert.userWithoutPhoneNumber");

        return {
          _id,
          phoneNumber: phoneNumber,
        };
      }),
    };
  }

  static toAlertDetails(
    alert: Populate<AlertMetaData, "users.userId" | "createdBy">,
  ): AlertDetails {
    return {
      _id: alert._id,
      newId: alert.newId,
      sentAt: alert.sentAt,
      createdAt: alert.createdAt,
      status: alert.status,
      types: alert.types,
      content: alert.content,
      createdBy: UserMapper.toUserProfileDTO(alert.createdBy),
      users: alert.users.map(user => UserMapper.toUserProfileDTO(user.userId)),
    };
  }
}
