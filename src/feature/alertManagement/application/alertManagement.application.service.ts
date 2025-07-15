import { injectable } from "inversify";
import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { AdminRepo } from "../../admins/domain/Admin.repo";
import { ParentRepo } from "../../parents/domain/Parent.repo";
import { SchoolRepo } from "../../schools/domain/School.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { AlertRepo } from "../domain/Alert.repo";
import { END_USER_ENUM, TEndUserEnum } from "./../../../constants/globalEnums";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { sendNotificationToUsersService } from "./../../../features/notification/services/sendNotificationToUsers.service";
import { ID } from "./../../../types/BaseEntity";
import { Admin } from "./../../admins/domain/admin.entity";
import { Parent } from "./../../parents/domain/parent.entity";
import { Student } from "./../../students/domain/student.entity";
import { Teacher } from "./../../teachers/domain/teacher.entity";
import { AlertUser } from "./../mappers/alert.mapper";
import { SmsManager } from "../../smsManager/domain/SmsManager";
import { AlertSms } from "../../smsManager/sms/AlertSms";

@injectable()
export class AlertManagementApplicationService {
  constructor(
    @inject("Connection") private readonly connection: Connection,
    @inject("ParentRepo") private readonly parentRepo: ParentRepo,
    @inject("StudentRepo") private readonly studentRepo: StudentRepo,
    @inject("TeacherRepo") private readonly teacherRepo: TeacherRepo,
    @inject("AdminRepo") private readonly adminRepo: AdminRepo,
    @inject("AlertRepo") private readonly alertRepo: AlertRepo,
    @inject("SchoolRepo") private readonly schoolRepo: SchoolRepo,
    @inject("SmsManager") private readonly smsManager: SmsManager,
  ) {}

  async sendAlert(
    users: {
      students: AlertUser[];
      parents: AlertUser[];
      teachers: AlertUser[];
      admins: AlertUser[];
    },
    alertTypes: { sms: boolean; notification: boolean },
    alertId: ID,
    content: string,
    tenantId: string,
    session: ClientSession,
  ): Promise<void> {
    const { students, parents, teachers, admins } = users;
    await this.alertRepo.updateOneById(alertId, {
      status: "sent",
      sentAt: getCurrentTimeOfSchool(tenantId),
    });

    if (alertTypes.notification) {
      if (admins.length) {
        const ids = admins.map(a => a._id);
        await sendNotificationToUsersService(
          this.connection,
          ids,
          "admin",
          { body: content, title: "" },
          tenantId,
          session,
          content,
        );
      }

      if (parents.length) {
        const ids = parents.map(p => p._id);
        await sendNotificationToUsersService(
          this.connection,
          ids,
          "parent",
          { body: content, title: "" },
          tenantId,
          session,
          content,
        );
      }

      if (students.length) {
        const ids = students.map(s => s._id);
        await sendNotificationToUsersService(
          this.connection,
          ids,
          "student",
          { body: content, title: "" },
          tenantId,
          session,
          content,
        );
      }

      if (teachers.length) {
        const ids = teachers.map(t => t._id);
        await sendNotificationToUsersService(
          this.connection,
          ids,
          "teacher",
          { body: content, title: "" },
          tenantId,
          session,
          content,
        );
      }
    }

    if (alertTypes.sms) {
      const allUsers = [...students, ...parents, ...teachers, ...admins];
      const phoneNumbers = allUsers.map(u => u.phoneNumber).filter(Boolean);
      await this.schoolRepo.decrementSmsSold(tenantId as ID, phoneNumbers.length);

      for (const phoneNumber of phoneNumbers) {
        if (phoneNumber) void this.smsManager.sendSms(new AlertSms(content), phoneNumber);
      }
    }
  }

  categorizeUsers(users: { userType: TEndUserEnum; userId: ID }[]): {
    parents: ID[];
    admins: ID[];
    teachers: ID[];
    students: ID[];
  } {
    const categorized = {
      parents: [] as ID[],
      admins: [] as ID[],
      teachers: [] as ID[],
      students: [] as ID[],
    };

    for (const user of users) {
      switch (user.userType) {
        case END_USER_ENUM.PARENT:
          categorized.parents.push(user.userId);
          break;
        case END_USER_ENUM.ADMIN:
          categorized.admins.push(user.userId);
          break;
        case END_USER_ENUM.TEACHER:
          categorized.teachers.push(user.userId);
          break;
        case END_USER_ENUM.STUDENT:
          categorized.students.push(user.userId);
          break;
      }
    }

    return categorized;
  }

  async findAllUsersOrThrow(categorizedUsers: {
    parents: ID[];
    admins: ID[];
    teachers: ID[];
    students: ID[];
  }): Promise<{ students: Student[]; teachers: Teacher[]; admins: Admin[]; parents: Parent[] }> {
    const studentsPromise = this.studentRepo.findManyByIdsOrThrow(
      categorizedUsers.students,
      "notFound.student",
    );
    const parentsPromise = this.parentRepo.findManyByIdsOrThrow(
      categorizedUsers.parents,
      "notFound.parent",
    );
    const adminsPromise = this.adminRepo.findManyByIdsOrThrow(
      categorizedUsers.admins,
      "notFound.admin",
    );
    const teachersPromise = this.teacherRepo.findManyByIdsOrThrow(
      categorizedUsers.teachers,
      "notFound.teacher",
    );

    const [students, parents, admins, teachers] = await Promise.all([
      studentsPromise,
      parentsPromise,
      adminsPromise,
      teachersPromise,
    ]);

    return { students, parents, admins, teachers };
  }
}
