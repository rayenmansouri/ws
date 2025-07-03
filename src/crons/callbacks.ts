import { IPost } from "./../database/schema/announcement/post.schema";
import { Connection } from "mongoose";
import schedule from "node-schedule";
import { getCurrentTimeOfSchool } from "../core/getCurrentTimeOfSchool";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { crudRepo } from "../database/repositories/crud.repo";
import { IStudent } from "../database/schema/users/student.schema";
import { NOTIFICATION_TYPES_ENUM } from "../features/notification/constants/constants";
import { DAY_TO_MILLISECOND } from "../helpers/constants";
import { sendEmailService } from "../helpers/email";
import { removeDuplicateStringInArray } from "../helpers/functions";
import { generateUnpaidInvoiceSmsText, sendPhoneMessage } from "../helpers/functionsUtils";
import { END_USER_ENUM } from "./../constants/globalEnums";
import { RouteContext } from "./../core/Routes/createRoutes.d";
import { sendNotificationToParentsOfStudent } from "./../features/notification/services/helpers.service";
import { AudienceStrategyFactory } from "./../features/schoolAnnouncement/audienceStrategies/AudienceStrategiesFactory";
import { policyDetails } from "./../features/schoolAnnouncement/audienceStrategies/types";
import { mergeArrayMaps } from "./../features/schoolAnnouncement/helpers/mergeMaps";
import { AddPostService } from "./../features/schoolAnnouncement/services/admin/addPost.service";
import {
  DateWithTime,
  TAddPostRouteConfig,
  UserIdsByTypeMap,
} from "./../features/schoolAnnouncement/types/admin/addPost.types";
import { isIncludeArrayIds } from "./../helpers/functionsUtils";
import { container } from "../core/container/container";
import { ID } from "../types/BaseEntity";

export const handleOverdueInvoices = async (
  connection: Connection,
  schoolId: string,
): Promise<void> => {
  await crudRepo(connection, "invoice").updateMany(
    {
      dueDate: { $lte: getCurrentTimeOfSchool(schoolId) },
      status: "unpaid",
    },
    { status: "overdue" },
  );
  return;
};

export const invoiceReminderCron = async (numberOfDaysBeforeDueDate: number): Promise<void> => {
  const schoolRepo = container.get("SchoolRepo");
  const allSchools = await schoolRepo.findAll();

  for (const school of allSchools) {
    const connection = await getTenantCon(school.subdomain);
    const currentTimeOfSchool = getCurrentTimeOfSchool(school._id);

    const invoicesThatDueAfterThreeDays = await crudRepo(connection, "invoice").findMany({
      dueDate: {
        $lte: new Date(
          currentTimeOfSchool.getTime() + numberOfDaysBeforeDueDate * DAY_TO_MILLISECOND,
        ),
      },
      status: "unpaid",
      remindedByEmailAt: { $exists: false },
      remindedByPhoneAt: { $exists: false },
    });

    if (invoicesThatDueAfterThreeDays.length === 0) return;

    const updateInvoicePromises = [];
    for (const invoice of invoicesThatDueAfterThreeDays) {
      const fieldsToUpdate: {
        remindedByEmailAt?: Date;
        remindedByPhoneAt?: Date;
      } = {};

      if (invoice.phoneNumber) {
        const smsText = generateUnpaidInvoiceSmsText(
          invoice.newId,
          invoice.amount,
          invoice.dueDate,
          school.currency,
        );
        await sendPhoneMessage(smsText, invoice.phoneNumber, school._id);
        fieldsToUpdate.remindedByPhoneAt = getCurrentTimeOfSchool(school._id);
      }

      // if (invoice.email) {
      //   await sendEmailService(
      //     {
      //       email: invoice.email,
      //       subject: "Rappel",
      //       message: `La facture n°${invoice.newId} est due pour paiement le${invoice.dueDate}`,
      //       template: generateInvoiceReminderEmail({
      //         invoiceAmount: invoice.amount,
      //         invoiceDueDate: invoice.dueDate,
      //         invoiceNumber: invoice.newId,
      //         schoolCurrency: school.currency,
      //         schoolAddress: school.address || "-",
      //         schoolEmail: school.email || "-",
      //         schoolPhone: school.phoneNumber || "-",
      //         schoolSubdomain: school.subdomain,
      //       }),
      //     },
      //     school._id,
      //   );
      //   fieldsToUpdate.remindedByEmailAt = getCurrentTimeOfSchool(school._id);
      // }

      updateInvoicePromises.push(
        crudRepo(connection, "invoice").updateOne({ _id: invoice._id }, fieldsToUpdate),
      );
    }
    const studentsIds = invoicesThatDueAfterThreeDays.flatMap(invoice =>
      invoice.students.map(student => student.student.toString()),
    );

    const students = (await crudRepo(connection, "student").findMany(
      { _id: { $in: studentsIds }, isArchived: false },
      { select: { newId: "0" } },
    )) as Pick<IStudent, "newId" | "_id">[];

    const sendNotificationToParentsOfStudentsPromise: Promise<void>[] =
      invoicesThatDueAfterThreeDays.map(invoice => {
        const student = students.find(student =>
          isIncludeArrayIds(
            invoice.students.map(student => student.student),
            student._id,
          ),
        )!;

        return sendNotificationToParentsOfStudent(
          connection,
          student._id.toString(),
          {
            topic: NOTIFICATION_TYPES_ENUM.PAYMENT,
            details: { invoiceNewId: invoice.newId, studentNewId: student.newId },
          },
          {
            $schoolName: school.name,
            $monthNumber: (invoicesThatDueAfterThreeDays[0].dates[0].getMonth() + 1).toString(),
            $numberOfDays: numberOfDaysBeforeDueDate.toString(),
          },
          school._id,
        );
      });

    await Promise.all([...updateInvoicePromises, ...sendNotificationToParentsOfStudentsPromise]);
  }
};

export const handleScheduledPosts = async (connection: Connection, schoolId: ID): Promise<void> => {
  const session = await connection.startSession();

  //@ts-ignore
  const routeContext: RouteContext<TAddPostRouteConfig, true> = {
    connection,
    session,
    tenantId: schoolId,
  };

  const allScheduledPosts = await crudRepo(connection, "post").findMany({
    isScheduled: true,
    isPublished: false,
  });

  const currentTime = getCurrentTimeOfSchool(schoolId).getTime();

  const dueForPublishing = allScheduledPosts.filter(post => {
    return post.scheduledAt!.getTime() <= currentTime;
  });

  const futureScheduledPosts = allScheduledPosts.filter(
    post => post.scheduledAt!.getTime() > currentTime,
  );

  const dueForPublishingPostIds = dueForPublishing.map(post => post._id);

  await crudRepo(connection, "post").updateMany(
    { _id: { $in: dueForPublishingPostIds } },
    {
      isPublished: true,
      publishedAt: getCurrentTimeOfSchool(schoolId),
    },
  );

  const addPostService = new AddPostService(routeContext);
  await session.withTransaction(async () => {
    const updatePostsPromises: Promise<IPost>[] = [];

    for (const post of futureScheduledPosts) {
      if (!post.scheduledAt) throw new Error("ScheduleAt should be truthy");

      const dateInfo: DateWithTime = {
        year: post.scheduledAt.getFullYear(),
        month: post.scheduledAt.getMonth(),
        day: post.scheduledAt.getDate(),
        hour: post.scheduledAt.getHours() - 1,
        minute: post.scheduledAt.getMinutes(),
      };

      let policyDetails: policyDetails;

      if (post.levels && post.levels.length > 0) {
        policyDetails = {
          policy: "custom",
          levels: post.levels.map(levelId => String(levelId)),
          classes: post.classes?.map(classId => String(classId)) || undefined,
          groups: post.groups?.map(groupId => String(groupId)) || undefined,
        };
      } else {
        policyDetails = {
          policy: "all",
          levels: null,
          classes: null,
          groups: null,
        };
      }
      const usersIdsByTypes: UserIdsByTypeMap[] = [];
      for (const audience of post.audiences) {
        const strategy = AudienceStrategyFactory.getStrategy(audience.type, policyDetails);
        const userIdsByType = await strategy.getUsersIds(connection);
        const newAdminIds = removeDuplicateStringInArray([
          ...(userIdsByType.get(END_USER_ENUM.ADMIN) || []),
        ]);

        userIdsByType.set(END_USER_ENUM.ADMIN, newAdminIds);
        usersIdsByTypes.push(userIdsByType);
      }

      const publishRuleTime = addPostService.createRecurrenceRule(dateInfo);

      schedule.scheduleJob(publishRuleTime, async () => {
        updatePostsPromises.push(
          crudRepo(connection, "post").updateOne(
            { _id: post._id },
            {
              isPublished: true,
              publishedAt: getCurrentTimeOfSchool(schoolId),
            },
          ),
        );
        addPostService.notifyAudience(mergeArrayMaps(usersIdsByTypes), post.newId);
      });
    }
    await Promise.all(updatePostsPromises);
  });
};
