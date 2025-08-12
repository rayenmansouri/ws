"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ACTION_ENUM: () => ACTION_ENUM,
  ALERT_STATUS_ENUM: () => ALERT_STATUS_ENUM,
  ALERT_TYPE_ENUM: () => ALERT_TYPE_ENUM,
  AddMessageRoute: () => AddMessageRoute,
  AddReactToMessageRoute: () => AddReactToMessageRoute,
  AssignStudentToClassByAdminRoute: () => AssignStudentToClassByAdminRoute,
  CATEGORIES_ENUM: () => CATEGORIES_ENUM,
  CHAPTER_ATTACHMENT_FILE_TYPE_ENUM: () => CHAPTER_ATTACHMENT_FILE_TYPE_ENUM,
  CHAPTER_ATTACHMENT_STATUS_ENUM: () => CHAPTER_ATTACHMENT_STATUS_ENUM,
  CompleteScheduleGenerationByPublicRoute: () => CompleteScheduleGenerationByPublicRoute,
  DeleteSessionTypeByAdminRoute: () => DeleteSessionTypeByAdminRoute,
  EDUCATION_DEPARTMENT_ENUM: () => EDUCATION_DEPARTMENT_ENUM,
  ESTABLISHMENT_TITLE_ENUM: () => ESTABLISHMENT_TITLE_ENUM,
  EXAM_GRADE_SYSTEM_ENUM: () => EXAM_GRADE_SYSTEM_ENUM,
  FEATURE_FLAGS_ENUM: () => FEATURE_FLAGS_ENUM,
  GRADE_REPORT_THEM_ENUM: () => GRADE_REPORT_THEM_ENUM,
  GetChildAttendanceStatsRoute: () => GetChildAttendanceStatsRoute,
  GetMessageReactionsRoute: () => GetMessageReactionsRoute,
  HOMEWORK_STATUS_ENUM: () => HOMEWORK_STATUS_ENUM,
  IB_ANNUAL_GRADE_LEVELS_ENUM: () => IB_ANNUAL_GRADE_LEVELS_ENUM,
  INSTANCE_TYPE_ENUM: () => INSTANCE_TYPE_ENUM,
  INTERACTION_TYPE_ENUM: () => INTERACTION_TYPE_ENUM,
  MarkScheduleAsErroredByPublicRoute: () => MarkScheduleAsErroredByPublicRoute,
  NOTIFICATION_TYPES_ENUM: () => NOTIFICATION_TYPES_ENUM,
  PROMOTION_STATUS_ENUM: () => PROMOTION_STATUS_ENUM,
  REACTION_TYPE_ENUM: () => REACTION_TYPE_ENUM,
  REGISTRATION_STEP_ENUM: () => REGISTRATION_STEP_ENUM,
  RESOURCES_ENUM: () => RESOURCES_ENUM,
  SMART_CALENDAR_SCHEDULE_STATUS_ENUM: () => SMART_CALENDAR_SCHEDULE_STATUS_ENUM,
  TEMPLATE_ENUM: () => TEMPLATE_ENUM,
  TRANSACTION_ADJUSTMENT_TYPE_ENUM: () => TRANSACTION_ADJUSTMENT_TYPE_ENUM,
  addAdminByAdminRoute: () => addAdminByAdminRoute,
  addAlertByAdminRoute: () => addAlertByAdminRoute,
  addBarCodeConfigByAdminRoute: () => addBarCodeConfigByAdminRoute,
  addChapterAttachmentRoute: () => addChapterAttachmentRoute,
  addChapterRoute: () => addChapterRoute,
  addClassByAdminRoute: () => addClassByAdminRoute,
  addClassTypeActivityByAdminRoute: () => addClassTypeActivityByAdminRoute,
  addClassTypeByAdminRoute: () => addClassTypeByAdminRoute,
  addClassroomByAdminRoute: () => addClassroomByAdminRoute,
  addCommentToPostRoute: () => addCommentToPostRoute,
  addDiplomaByAdminRoute: () => addDiplomaByAdminRoute,
  addExamTypeByAdminRoute: () => addExamTypeByAdminRoute,
  addExpenseByAdminRoute: () => addExpenseByAdminRoute,
  addFieldToClassTypeByAdminRoute: () => addFieldToClassTypeByAdminRoute,
  addGradeReportTemplateByAdminRoute: () => addGradeReportTemplateByAdminRoute,
  addGroupByAdminRoute: () => addGroupByAdminRoute,
  addGroupTypeByAdminRoute: () => addGroupTypeByAdminRoute,
  addHolidayByAdminRoute: () => addHolidayByAdminRoute,
  addInvoiceForStudentByAdminRoute: () => addInvoiceForStudentByAdminRoute,
  addIssueRoute: () => addIssueRoute,
  addLevelByAdminRoute: () => addLevelByAdminRoute,
  addMasterByMasterRoute: () => addMasterByMasterRoute,
  addObservationReasonByAdminRoute: () => addObservationReasonByAdminRoute,
  addObservationRoute: () => addObservationRoute,
  addParentByAdminRoute: () => addParentByAdminRoute,
  addParticipantToGroupRoute: () => addParticipantToGroupRoute,
  addPaymentTemplateByAdminRoute: () => addPaymentTemplateByAdminRoute,
  addPostRoute: () => addPostRoute,
  addReplyToCommentRoute: () => addReplyToCommentRoute,
  addRoleByMasterRoute: () => addRoleByMasterRoute,
  addSchoolByMasterRoute: () => addSchoolByMasterRoute,
  addSectionByAdminRoute: () => addSectionByAdminRoute,
  addServiceByAdminRoute: () => addServiceByAdminRoute,
  addSessionForClassByAdminRoute: () => addSessionForClassByAdminRoute,
  addSessionForGroupByAdminRoute: () => addSessionForGroupByAdminRoute,
  addSessionTypeByAdminRoute: () => addSessionTypeByAdminRoute,
  addSignatureByAdminRoute: () => addSignatureByAdminRoute,
  addStudentByAdminRoute: () => addStudentByAdminRoute,
  addSubLevelByAdminRoute: () => addSubLevelByAdminRoute,
  addSubSubjectToClassTypeByAdminRoute: () => addSubSubjectToClassTypeByAdminRoute,
  addSubSubjectTypeByAdminRoute: () => addSubSubjectTypeByAdminRoute,
  addSubjectToClassTypeByAdminRoute: () => addSubjectToClassTypeByAdminRoute,
  addSubjectTypeByAdminRoute: () => addSubjectTypeByAdminRoute,
  addSupplierByAdminRoute: () => addSupplierByAdminRoute,
  addTeacherByAdminRoute: () => addTeacherByAdminRoute,
  addTeacherPaymentConfigurationByAdminRoute: () => addTeacherPaymentConfigurationByAdminRoute,
  addTeacherPaymentTransactionByAdminRoute: () => addTeacherPaymentTransactionByAdminRoute,
  addTermByAdminRoute: () => addTermByAdminRoute,
  addTransactionByAdminRoute: () => addTransactionByAdminRoute,
  addTutorialByMasterRoute: () => addTutorialByMasterRoute,
  addWeeklySessionForClassByAdminRoute: () => addWeeklySessionForClassByAdminRoute,
  addWeeklySessionForGroupByAdminRoute: () => addWeeklySessionForGroupByAdminRoute,
  applySmartCalendarScheduleByAdminRoute: () => applySmartCalendarScheduleByAdminRoute,
  applyWeeklyScheduleForClassByAdminRoute: () => applyWeeklyScheduleForClassByAdminRoute,
  applyWeeklyScheduleForGroupByAdminRoute: () => applyWeeklyScheduleForGroupByAdminRoute,
  archiveAdminByAdminRoute: () => archiveAdminByAdminRoute,
  archiveParentByAdminRoute: () => archiveParentByAdminRoute,
  archiveStudentByAdminRoute: () => archiveStudentByAdminRoute,
  archiveTeacherByAdminRoute: () => archiveTeacherByAdminRoute,
  assignStudentToGroupByAdminRoute: () => assignStudentToGroupByAdminRoute,
  assignTeacherToIssueByAdminRoute: () => assignTeacherToIssueByAdminRoute,
  assignTeacherToSubSubjectInClassByAdminRoute: () => assignTeacherToSubSubjectInClassByAdminRoute,
  assignTeacherToSubjectInClassByAdminRoute: () => assignTeacherToSubjectInClassByAdminRoute,
  cancelSessionByAdminRoute: () => cancelSessionByAdminRoute,
  cancelSmartCalendarScheduleByAdminRoute: () => cancelSmartCalendarScheduleByAdminRoute,
  checkGroupRoute: () => checkGroupRoute,
  closeSessionRoute: () => closeSessionRoute,
  completeTermByAdminRoute: () => completeTermByAdminRoute,
  confirmAttendanceRoute: () => confirmAttendanceRoute,
  deleteAlertByAdminRoute: () => deleteAlertByAdminRoute,
  deleteBarCodeConfigByAdminRoute: () => deleteBarCodeConfigByAdminRoute,
  deleteChapterAttachmentRoute: () => deleteChapterAttachmentRoute,
  deleteChapterRoute: () => deleteChapterRoute,
  deleteClassByAdminRoute: () => deleteClassByAdminRoute,
  deleteClassTypeActivityByAdminRoute: () => deleteClassTypeActivityByAdminRoute,
  deleteClassTypeByAdminRoute: () => deleteClassTypeByAdminRoute,
  deleteClassroomByAdminRoute: () => deleteClassroomByAdminRoute,
  deleteDiplomaByAdminRoute: () => deleteDiplomaByAdminRoute,
  deleteExamTypeByAdminRoute: () => deleteExamTypeByAdminRoute,
  deleteExpenseByAdminRoute: () => deleteExpenseByAdminRoute,
  deleteFieldFromClassTypeByAdminRoute: () => deleteFieldFromClassTypeByAdminRoute,
  deleteGradeReportTemplateByAdminRoute: () => deleteGradeReportTemplateByAdminRoute,
  deleteGroupByAdminRoute: () => deleteGroupByAdminRoute,
  deleteGroupTypeByAdminRoute: () => deleteGroupTypeByAdminRoute,
  deleteHolidayByAdminRoute: () => deleteHolidayByAdminRoute,
  deleteInvoiceByAdminRoute: () => deleteInvoiceByAdminRoute,
  deleteLevelByAdminRoute: () => deleteLevelByAdminRoute,
  deleteMasterByMasterRoute: () => deleteMasterByMasterRoute,
  deleteMessageRoute: () => deleteMessageRoute,
  deleteObservationByAdminRoute: () => deleteObservationByAdminRoute,
  deleteObservationReasonByAdminRoute: () => deleteObservationReasonByAdminRoute,
  deleteParticipantFromGroupRoute: () => deleteParticipantFromGroupRoute,
  deletePaymentTemplateByAdminRoute: () => deletePaymentTemplateByAdminRoute,
  deletePostRoute: () => deletePostRoute,
  deletePreRegistrationByAdminRoute: () => deletePreRegistrationByAdminRoute,
  deleteRoleByMasterRoute: () => deleteRoleByMasterRoute,
  deleteSectionByAdminRoute: () => deleteSectionByAdminRoute,
  deleteServiceByAdminRoute: () => deleteServiceByAdminRoute,
  deleteSessionByAdminRoute: () => deleteSessionByAdminRoute,
  deleteSignatureByAdminRoute: () => deleteSignatureByAdminRoute,
  deleteSmartCalendarScheduleByAdminRoute: () => deleteSmartCalendarScheduleByAdminRoute,
  deleteSubLevelByAdminRoute: () => deleteSubLevelByAdminRoute,
  deleteSubSubjectFromClassTypeByAdminRoute: () => deleteSubSubjectFromClassTypeByAdminRoute,
  deleteSubSubjectTypeByAdminRoute: () => deleteSubSubjectTypeByAdminRoute,
  deleteSubjectFromClassTypeByAdminRoute: () => deleteSubjectFromClassTypeByAdminRoute,
  deleteSubjectTypeByAdminRoute: () => deleteSubjectTypeByAdminRoute,
  deleteSuppliersByAdminRoute: () => deleteSuppliersByAdminRoute,
  deleteTeacherPaymentTransactionByAdminRoute: () => deleteTeacherPaymentTransactionByAdminRoute,
  deleteTermByAdminRoute: () => deleteTermByAdminRoute,
  deleteTransactionsByAdminRoute: () => deleteTransactionsByAdminRoute,
  deleteTutorialByMasterRoute: () => deleteTutorialByMasterRoute,
  deleteWeeklySessionByAdminRoute: () => deleteWeeklySessionByAdminRoute,
  forgetPasswordRoute: () => forgetPasswordRoute,
  forwardIssueByAdminRoute: () => forwardIssueByAdminRoute,
  generateScheduleByAdminRoute: () => generateScheduleByAdminRoute,
  getActivitiesOfClassTypeByAdminRoute: () => getActivitiesOfClassTypeByAdminRoute,
  getAdminByNewIdByAdminRoute: () => getAdminByNewIdByAdminRoute,
  getAlertDetailsByAdminRoute: () => getAlertDetailsByAdminRoute,
  getAlertStatisticsByAdminRoute: () => getAlertStatisticsByAdminRoute,
  getAllCambridgeAnnualGradeReportsByAdminRoute: () => getAllCambridgeAnnualGradeReportsByAdminRoute,
  getAllCambridgeGradeReportsOfClassByAdminRoute: () => getAllCambridgeGradeReportsOfClassByAdminRoute,
  getAllIBGradeReportsOfClassByAdminRoute: () => getAllIBGradeReportsOfClassByAdminRoute,
  getAllPrimaryAnnualGradeReportOfClassByAdminRoute: () => getAllPrimaryAnnualGradeReportOfClassByAdminRoute,
  getAllPrimaryGradeReportsOfClassByAdminRoute: () => getAllPrimaryGradeReportsOfClassByAdminRoute,
  getAllSecondaryGradeReportsOfClassByAdminRoute: () => getAllSecondaryGradeReportsOfClassByAdminRoute,
  getAnnualAveragesOfClassByAdminRoute: () => getAnnualAveragesOfClassByAdminRoute,
  getAppVersionByMasterRoute: () => getAppVersionByMasterRoute,
  getAppVersionByPublicRoute: () => getAppVersionByPublicRoute,
  getAvailableClassroomByAdminRoute: () => getAvailableClassroomByAdminRoute,
  getAvailableClassroomInWeeklySessionByAdminRoute: () => getAvailableClassroomInWeeklySessionByAdminRoute,
  getCambridgeAnnualAveragesOfClassByAdminRoute: () => getCambridgeAnnualAveragesOfClassByAdminRoute,
  getCambridgeAveragesOfClassByAdminRoute: () => getCambridgeAveragesOfClassByAdminRoute,
  getCambridgeBlankExamPageByAdminRoute: () => getCambridgeBlankExamPageByAdminRoute,
  getCambridgeChildGradeReportPDFRoute: () => getCambridgeChildGradeReportPDFRoute,
  getCambridgeChildGradeReportRoute: () => getCambridgeChildGradeReportRoute,
  getCambridgeSubjectsOfClassByAdminRoute: () => getCambridgeSubjectsOfClassByAdminRoute,
  getCambridgeSubjectsOfClassByTeacherRoute: () => getCambridgeSubjectsOfClassByTeacherRoute,
  getChaptersByTopicRoute: () => getChaptersByTopicRoute,
  getChildInvoicesByParentRoute: () => getChildInvoicesByParentRoute,
  getChildrenOfParentsByParentRoute: () => getChildrenOfParentsByParentRoute,
  getClassDashboardByAdminRoute: () => getClassDashboardByAdminRoute,
  getClassDiplomasByAdminRoute: () => getClassDiplomasByAdminRoute,
  getClassListByAdminRoute: () => getClassListByAdminRoute,
  getClassListByTeacherRoute: () => getClassListByTeacherRoute,
  getClassOverviewRoute: () => getClassOverviewRoute,
  getClassTypeByAdminRoute: () => getClassTypeByAdminRoute,
  getCurrentUserByAdminRoute: () => getCurrentUserByAdminRoute,
  getCurrentUserByMasterRoute: () => getCurrentUserByMasterRoute,
  getCurrentUserByStudentRoute: () => getCurrentUserByStudentRoute,
  getCurrentUserByTeacherRoute: () => getCurrentUserByTeacherRoute,
  getCurrentUserRoute: () => getCurrentUserRoute,
  getDashboardByAdminRoute: () => getDashboardByAdminRoute,
  getDashboardByParentRoute: () => getDashboardByParentRoute,
  getDashboardByStudentRoute: () => getDashboardByStudentRoute,
  getDashboardByTeacherRoute: () => getDashboardByTeacherRoute,
  getDraftWeeklyScheduleByAdminRoute: () => getDraftWeeklyScheduleByAdminRoute,
  getEntityScheduleByAdminRoute: () => getEntityScheduleByAdminRoute,
  getFieldsOfClassByAdminRoute: () => getFieldsOfClassByAdminRoute,
  getFieldsOfClassByTeacherRoute: () => getFieldsOfClassByTeacherRoute,
  getFieldsOfClassTypeByAdminRoute: () => getFieldsOfClassTypeByAdminRoute,
  getFinanceDashboardByAdminRoute: () => getFinanceDashboardByAdminRoute,
  getGradesOfCambridgeGroupByAdminRoute: () => getGradesOfCambridgeGroupByAdminRoute,
  getGradesOfCambridgeGroupByTeacherRoute: () => getGradesOfCambridgeGroupByTeacherRoute,
  getGradesOfCambridgeSubjectByAdminRoute: () => getGradesOfCambridgeSubjectByAdminRoute,
  getGradesOfCambridgeSubjectByTeacherRoute: () => getGradesOfCambridgeSubjectByTeacherRoute,
  getGradesOfFieldByAdminRoute: () => getGradesOfFieldByAdminRoute,
  getGradesOfFieldByTeacherRoute: () => getGradesOfFieldByTeacherRoute,
  getGradesOfIBGroupRoute: () => getGradesOfIBGroupRoute,
  getGradesOfIBSubjectRoute: () => getGradesOfIBSubjectRoute,
  getGradesOfSecondaryGroupByAdminRoute: () => getGradesOfSecondaryGroupByAdminRoute,
  getGradesOfSecondaryGroupByTeacherRoute: () => getGradesOfSecondaryGroupByTeacherRoute,
  getGradesOfSecondarySubjectByAdminRoute: () => getGradesOfSecondarySubjectByAdminRoute,
  getGradesOfSecondarySubjectByTeacherRoute: () => getGradesOfSecondarySubjectByTeacherRoute,
  getGroupListByAdminRoute: () => getGroupListByAdminRoute,
  getGroupOverviewRoute: () => getGroupOverviewRoute,
  getGroupTypesOfChaptersRoute: () => getGroupTypesOfChaptersRoute,
  getGroupsOfClassByAdminRoute: () => getGroupsOfClassByAdminRoute,
  getIBAdminObservationsByAdminRoute: () => getIBAdminObservationsByAdminRoute,
  getIBAnnualAveragesOfClassByAdminRoute: () => getIBAnnualAveragesOfClassByAdminRoute,
  getIBAveragesOfClassByAdminRoute: () => getIBAveragesOfClassByAdminRoute,
  getIBBlankExamPageByAdminRoute: () => getIBBlankExamPageByAdminRoute,
  getIBChildGradeReportPDFRoute: () => getIBChildGradeReportPDFRoute,
  getIBStudentGradeReportByAdminRoute: () => getIBStudentGradeReportByAdminRoute,
  getIBSubjectsOfClassRoute: () => getIBSubjectsOfClassRoute,
  getInvoiceDetailsByAdminRoute: () => getInvoiceDetailsByAdminRoute,
  getInvoiceDetailsRoute: () => getInvoiceDetailsRoute,
  getInvoicePdfDataByAdminRoute: () => getInvoicePdfDataByAdminRoute,
  getLevelDegreesCoverageByAdminRoute: () => getLevelDegreesCoverageByAdminRoute,
  getLevelsOverviewByAdminRoute: () => getLevelsOverviewByAdminRoute,
  getMessageTargetUsersRoute: () => getMessageTargetUsersRoute,
  getNotPromotedStudentsByAdminRoute: () => getNotPromotedStudentsByAdminRoute,
  getOneCommentRoute: () => getOneCommentRoute,
  getOneConversationMessagesRoute: () => getOneConversationMessagesRoute,
  getOneConversationRoute: () => getOneConversationRoute,
  getOneHomeworkRoute: () => getOneHomeworkRoute,
  getOneIssueRoute: () => getOneIssueRoute,
  getOneObservationRoute: () => getOneObservationRoute,
  getOnePostRoute: () => getOnePostRoute,
  getOnePreRegistrationByPublicRoute: () => getOnePreRegistrationByPublicRoute,
  getOneRoleByMasterRoute: () => getOneRoleByMasterRoute,
  getParentByNewIdByAdminRoute: () => getParentByNewIdByAdminRoute,
  getPaymentTemplateByAdminRoute: () => getPaymentTemplateByAdminRoute,
  getPrimaryAnnualGradeReportOfStudentByAdminRoute: () => getPrimaryAnnualGradeReportOfStudentByAdminRoute,
  getPrimaryAveragesOfClassByAdminRoute: () => getPrimaryAveragesOfClassByAdminRoute,
  getPrimaryBlankExamPageByAdminRoute: () => getPrimaryBlankExamPageByAdminRoute,
  getPrimaryChildGradeReportPDFRoute: () => getPrimaryChildGradeReportPDFRoute,
  getPrimaryChildGradeReportRoute: () => getPrimaryChildGradeReportRoute,
  getPrimaryGradeReportStatsByAdminRoute: () => getPrimaryGradeReportStatsByAdminRoute,
  getReactionsOfCommentRoute: () => getReactionsOfCommentRoute,
  getReactionsOfPostRoute: () => getReactionsOfPostRoute,
  getScheduleRoute: () => getScheduleRoute,
  getSchoolAvailableTimeConstraintsByAdminRoute: () => getSchoolAvailableTimeConstraintsByAdminRoute,
  getSchoolConfigByPublicRoute: () => getSchoolConfigByPublicRoute,
  getSchoolDetailsByAdminRoute: () => getSchoolDetailsByAdminRoute,
  getSchoolLogoByPublicRoute: () => getSchoolLogoByPublicRoute,
  getSchoolPreRegistrationByPublicRoute: () => getSchoolPreRegistrationByPublicRoute,
  getSchoolSignatureByPublicRoute: () => getSchoolSignatureByPublicRoute,
  getSearchInvoiceByAdminRoute: () => getSearchInvoiceByAdminRoute,
  getSecondaryAveragesOfClassByAdminRoute: () => getSecondaryAveragesOfClassByAdminRoute,
  getSecondaryBlankExamPageByAdminRoute: () => getSecondaryBlankExamPageByAdminRoute,
  getSecondaryChildGradeReportPDFRoute: () => getSecondaryChildGradeReportPDFRoute,
  getSecondaryChildGradeReportRoute: () => getSecondaryChildGradeReportRoute,
  getSecondaryGradeReportStatsByAdminRoute: () => getSecondaryGradeReportStatsByAdminRoute,
  getSecondarySubjectsOfClassByAdminRoute: () => getSecondarySubjectsOfClassByAdminRoute,
  getSecondarySubjectsOfClassByTeacherRoute: () => getSecondarySubjectsOfClassByTeacherRoute,
  getSessionDetailsRoute: () => getSessionDetailsRoute,
  getSmartSchedulePDFByAdminRoute: () => getSmartSchedulePDFByAdminRoute,
  getStudentAttendanceCertificateByAdminRoute: () => getStudentAttendanceCertificateByAdminRoute,
  getStudentCambridgeAnnualGradeReportByAdminRoute: () => getStudentCambridgeAnnualGradeReportByAdminRoute,
  getStudentDiplomaByAdminRoute: () => getStudentDiplomaByAdminRoute,
  getStudentGradeReportCambridgeByAdminRoute: () => getStudentGradeReportCambridgeByAdminRoute,
  getStudentGradeReportPrimaryByAdminRoute: () => getStudentGradeReportPrimaryByAdminRoute,
  getStudentGradeReportSecondaryByAdminRoute: () => getStudentGradeReportSecondaryByAdminRoute,
  getStudentInvoicesByAdminRoute: () => getStudentInvoicesByAdminRoute,
  getStudentPaymentConfigurationByAdminRoute: () => getStudentPaymentConfigurationByAdminRoute,
  getStudentProfileByAdminRoute: () => getStudentProfileByAdminRoute,
  getStudentProfileRoute: () => getStudentProfileRoute,
  getStudentTopicsChaptersRoute: () => getStudentTopicsChaptersRoute,
  getStudentsCodeBarePdfByAdminRoute: () => getStudentsCodeBarePdfByAdminRoute,
  getStudentsOfClassRoute: () => getStudentsOfClassRoute,
  getStudentsOfGroupByAdminRoute: () => getStudentsOfGroupByAdminRoute,
  getSubjectsOfClassByAdminRoute: () => getSubjectsOfClassByAdminRoute,
  getSubjectsOfClassTypesByAdminRoute: () => getSubjectsOfClassTypesByAdminRoute,
  getTeacherClassAndGroupsByAdminRoute: () => getTeacherClassAndGroupsByAdminRoute,
  getTeacherClassAndGroupsRoute: () => getTeacherClassAndGroupsRoute,
  getTeacherPaymentConfigurationByAdminRoute: () => getTeacherPaymentConfigurationByAdminRoute,
  getTeacherPaymentDashboardByAdminRoute: () => getTeacherPaymentDashboardByAdminRoute,
  getTeacherProfileByAdminRoute: () => getTeacherProfileByAdminRoute,
  getTeacherProfileRoute: () => getTeacherProfileRoute,
  getTeachersOfStudentRoute: () => getTeachersOfStudentRoute,
  getTopicOfGroupByAdminRoute: () => getTopicOfGroupByAdminRoute,
  getTopicsOfChaptersByClassTypeRoute: () => getTopicsOfChaptersByClassTypeRoute,
  getTutorialsByAdminRoute: () => getTutorialsByAdminRoute,
  getUsersOfPostForMentionRoute: () => getUsersOfPostForMentionRoute,
  getWeeklyScheduleRoute: () => getWeeklyScheduleRoute,
  hideTermByAdminRoute: () => hideTermByAdminRoute,
  importStudentsByAdminRoute: () => importStudentsByAdminRoute,
  incompleteTermByAdminRoute: () => incompleteTermByAdminRoute,
  listAdminsByAdminRoute: () => listAdminsByAdminRoute,
  listAlertsByAdminRoute: () => listAlertsByAdminRoute,
  listBankChecksByAdminRoute: () => listBankChecksByAdminRoute,
  listBankTransfersByAdminRoute: () => listBankTransfersByAdminRoute,
  listBarCodeConfigByAdminRoute: () => listBarCodeConfigByAdminRoute,
  listChapterAttachmentsRoute: () => listChapterAttachmentsRoute,
  listChapterDocumentsRoute: () => listChapterDocumentsRoute,
  listChapterVideoRoute: () => listChapterVideoRoute,
  listClassTypesByAdminRoute: () => listClassTypesByAdminRoute,
  listClassTypesByPublicRoute: () => listClassTypesByPublicRoute,
  listClassTypesByTeacherRoute: () => listClassTypesByTeacherRoute,
  listClassesByAdminRoute: () => listClassesByAdminRoute,
  listClassesRoute: () => listClassesRoute,
  listClassroomsByAdminRoute: () => listClassroomsByAdminRoute,
  listCommentsOfPostRoute: () => listCommentsOfPostRoute,
  listConversationAttachmentsRoute: () => listConversationAttachmentsRoute,
  listConversationLinksRoute: () => listConversationLinksRoute,
  listConversationMessagesRoute: () => listConversationMessagesRoute,
  listConversationMultimediaRoute: () => listConversationMultimediaRoute,
  listConversationParticipantsRoute: () => listConversationParticipantsRoute,
  listConversationsRoute: () => listConversationsRoute,
  listDiplomasByAdminRoute: () => listDiplomasByAdminRoute,
  listExamTypesByAdminRoute: () => listExamTypesByAdminRoute,
  listExpensesByAdminRoute: () => listExpensesByAdminRoute,
  listGradeReportTemplatesByAdminRoute: () => listGradeReportTemplatesByAdminRoute,
  listGroupTypesByAdminRoute: () => listGroupTypesByAdminRoute,
  listGroupsByAdminRoute: () => listGroupsByAdminRoute,
  listGroupsRoute: () => listGroupsRoute,
  listHolidayByAdminRoute: () => listHolidayByAdminRoute,
  listHomeworksByAdminRoute: () => listHomeworksByAdminRoute,
  listHomeworksByParentRoute: () => listHomeworksByParentRoute,
  listHomeworksByStudentRoute: () => listHomeworksByStudentRoute,
  listHomeworksByTeacherRoute: () => listHomeworksByTeacherRoute,
  listInteractionsOfIssueRoute: () => listInteractionsOfIssueRoute,
  listInvoicesByAdminRoute: () => listInvoicesByAdminRoute,
  listIssueReasonsRoute: () => listIssueReasonsRoute,
  listIssuesByAdminRoute: () => listIssuesByAdminRoute,
  listIssuesOfParentRoute: () => listIssuesOfParentRoute,
  listIssuesOfTeacherRoute: () => listIssuesOfTeacherRoute,
  listLevelsByAdminRoute: () => listLevelsByAdminRoute,
  listLevelsByPublicRoute: () => listLevelsByPublicRoute,
  listMastersByMasterRoute: () => listMastersByMasterRoute,
  listNextClassTypesByAdminRoute: () => listNextClassTypesByAdminRoute,
  listNotificationsRoute: () => listNotificationsRoute,
  listObservationReasonsRoute: () => listObservationReasonsRoute,
  listObservationsByAdminRoute: () => listObservationsByAdminRoute,
  listObservationsByParentRoute: () => listObservationsByParentRoute,
  listObservationsByStudentRoute: () => listObservationsByStudentRoute,
  listObservationsByTeacherRoute: () => listObservationsByTeacherRoute,
  listParentsByAdminRoute: () => listParentsByAdminRoute,
  listPaymentTemplatesByAdminRoute: () => listPaymentTemplatesByAdminRoute,
  listPostsRoute: () => listPostsRoute,
  listPreRegistrationByAdminRoute: () => listPreRegistrationByAdminRoute,
  listRepliesOfCommentRoute: () => listRepliesOfCommentRoute,
  listRolesByAdminRoute: () => listRolesByAdminRoute,
  listRolesByMasterRoute: () => listRolesByMasterRoute,
  listSchoolYearByAdminRoute: () => listSchoolYearByAdminRoute,
  listSchoolsByMasterRoute: () => listSchoolsByMasterRoute,
  listSectionsByAdminRoute: () => listSectionsByAdminRoute,
  listServicesByAdminRoute: () => listServicesByAdminRoute,
  listSessionTypeByAdminRoute: () => listSessionTypeByAdminRoute,
  listSignaturesByAdminRoute: () => listSignaturesByAdminRoute,
  listSmartCalendarScheduleByAdminRoute: () => listSmartCalendarScheduleByAdminRoute,
  listSmsSoldHistoriesByMasterRoute: () => listSmsSoldHistoriesByMasterRoute,
  listStudentsByAdminRoute: () => listStudentsByAdminRoute,
  listSubLevelsByAdminRoute: () => listSubLevelsByAdminRoute,
  listSubSubjectTypesByAdminRoute: () => listSubSubjectTypesByAdminRoute,
  listSubjectTypesByAdminRoute: () => listSubjectTypesByAdminRoute,
  listSuppliersByAdminRoute: () => listSuppliersByAdminRoute,
  listTargetUsersForGroupConversationAssignmentRoute: () => listTargetUsersForGroupConversationAssignmentRoute,
  listTeacherSessionsByAdminRoute: () => listTeacherSessionsByAdminRoute,
  listTeachersByAdminRoute: () => listTeachersByAdminRoute,
  listTermByAdminRoute: () => listTermByAdminRoute,
  listTransactionsByAdminRoute: () => listTransactionsByAdminRoute,
  listTutorialsByMasterRoute: () => listTutorialsByMasterRoute,
  listUnenrolledStudentsByAdminRoute: () => listUnenrolledStudentsByAdminRoute,
  listUnenrolledStudentsForGroupByAdminRoute: () => listUnenrolledStudentsForGroupByAdminRoute,
  listUsersForAlertByAdminRoute: () => listUsersForAlertByAdminRoute,
  loginByMasterRoute: () => loginByMasterRoute,
  loginByStudentRoute: () => loginByStudentRoute,
  loginRoute: () => loginRoute,
  logoutRoute: () => logoutRoute,
  mergeInvoicesByAdminRoute: () => mergeInvoicesByAdminRoute,
  payInvoiceByAdminRoute: () => payInvoiceByAdminRoute,
  payTeacherByAdminRoute: () => payTeacherByAdminRoute,
  publishTermByAdminRoute: () => publishTermByAdminRoute,
  reactToCommentRoute: () => reactToCommentRoute,
  reactToPostRoute: () => reactToPostRoute,
  registerStudentByAdminRoute: () => registerStudentByAdminRoute,
  reorderExamTypeByAdminRoute: () => reorderExamTypeByAdminRoute,
  reorderFieldsOfClassTypesByAdminRoute: () => reorderFieldsOfClassTypesByAdminRoute,
  reorderLevelsByAdminRoute: () => reorderLevelsByAdminRoute,
  reorderSubLevelsByAdminRoute: () => reorderSubLevelsByAdminRoute,
  reorderSubSubjectsOfClassTypesByAdminRoute: () => reorderSubSubjectsOfClassTypesByAdminRoute,
  reorderSubjectsOfClassTypesByAdminRoute: () => reorderSubjectsOfClassTypesByAdminRoute,
  resendInvitationByAdminRoute: () => resendInvitationByAdminRoute,
  resetPasswordRoute: () => resetPasswordRoute,
  resetUserPasswordByAdminRoute: () => resetUserPasswordByAdminRoute,
  sendReplyRoute: () => sendReplyRoute,
  startConversationRules: () => startConversationRules,
  startSessionRoute: () => startSessionRoute,
  switchLevelsToNextSchoolYearByAdminRoute: () => switchLevelsToNextSchoolYearByAdminRoute,
  switchShoolByMasterRoute: () => switchShoolByMasterRoute,
  switchStudentsClassByAdminRoute: () => switchStudentsClassByAdminRoute,
  switchToUserByAdminRoute: () => switchToUserByAdminRoute,
  togglePinStatusOfPostRoute: () => togglePinStatusOfPostRoute,
  toggleUserActivationByAdminRoute: () => toggleUserActivationByAdminRoute,
  unArchiveAdminByAdminRoute: () => unArchiveAdminByAdminRoute,
  unArchiveParentByAdminRoute: () => unArchiveParentByAdminRoute,
  unArchiveStudentByAdminRoute: () => unArchiveStudentByAdminRoute,
  unArchiveTeacherByAdminRoute: () => unArchiveTeacherByAdminRoute,
  unAssignStudentFromClassByAdminRoute: () => unAssignStudentFromClassByAdminRoute,
  unAssignTeacherFromSubSubjectByAdminRoute: () => unAssignTeacherFromSubSubjectByAdminRoute,
  unAssignTeacherFromSubjectByAdminRoute: () => unAssignTeacherFromSubjectByAdminRoute,
  unPayTeacherByAdminRoute: () => unPayTeacherByAdminRoute,
  unassignStudentFromGroupByAdminRoute: () => unassignStudentFromGroupByAdminRoute,
  unassignTeacherFromIssueByAdminRoute: () => unassignTeacherFromIssueByAdminRoute,
  unmergeInvoiceByAdminRoute: () => unmergeInvoiceByAdminRoute,
  unpayInvoiceByAdminRoute: () => unpayInvoiceByAdminRoute,
  unpaySplitByAdminRoute: () => unpaySplitByAdminRoute,
  updateAdminByAdminRoute: () => updateAdminByAdminRoute,
  updateAdminObservationsByAdminRoute: () => updateAdminObservationsByAdminRoute,
  updateAlertByAdminRoute: () => updateAlertByAdminRoute,
  updateAppVersionByMasterRoute: () => updateAppVersionByMasterRoute,
  updateBankCheckByAdminRoute: () => updateBankCheckByAdminRoute,
  updateBankTransferByAdminRoute: () => updateBankTransferByAdminRoute,
  updateBarCodeConfigByAdminRoute: () => updateBarCodeConfigByAdminRoute,
  updateCambridgeGradesOfGroupRoute: () => updateCambridgeGradesOfGroupRoute,
  updateCambridgeGradesRoute: () => updateCambridgeGradesRoute,
  updateChapterAttachmentRoute: () => updateChapterAttachmentRoute,
  updateChapterRoute: () => updateChapterRoute,
  updateClassByAdminRoute: () => updateClassByAdminRoute,
  updateClassConstraintsByAdminRoute: () => updateClassConstraintsByAdminRoute,
  updateClassTypeActivityByAdminRoute: () => updateClassTypeActivityByAdminRoute,
  updateClassTypeByAdminRoute: () => updateClassTypeByAdminRoute,
  updateClassroomByAdminRoute: () => updateClassroomByAdminRoute,
  updateConversationNameRoute: () => updateConversationNameRoute,
  updateConversationSeenStatuesRoute: () => updateConversationSeenStatuesRoute,
  updateCurrentUserPasswordRoute: () => updateCurrentUserPasswordRoute,
  updateDiplomaByAdminRoute: () => updateDiplomaByAdminRoute,
  updateExamTypeByAdminRoute: () => updateExamTypeByAdminRoute,
  updateExpenseByAdminRoute: () => updateExpenseByAdminRoute,
  updateFieldOfClassTypeByAdminRoute: () => updateFieldOfClassTypeByAdminRoute,
  updateFlagsByMasterRoute: () => updateFlagsByMasterRoute,
  updateGradeReportTemplateByAdminRoute: () => updateGradeReportTemplateByAdminRoute,
  updateGroupByAdminRoute: () => updateGroupByAdminRoute,
  updateGroupTypeByAdminRoute: () => updateGroupTypeByAdminRoute,
  updateHolidayByAdminRoute: () => updateHolidayByAdminRoute,
  updateIBGradesOfClassRoute: () => updateIBGradesOfClassRoute,
  updateIBGradesOfGroupRoute: () => updateIBGradesOfGroupRoute,
  updateInvoiceByAdminRoute: () => updateInvoiceByAdminRoute,
  updateInvoiceRemindersByAdminRoute: () => updateInvoiceRemindersByAdminRoute,
  updateIssueStatusByAdminRoute: () => updateIssueStatusByAdminRoute,
  updateLevelByAdminRoute: () => updateLevelByAdminRoute,
  updateMasterByMasterRoute: () => updateMasterByMasterRoute,
  updateNotAvailableTimesByAdminRoute: () => updateNotAvailableTimesByAdminRoute,
  updateObservationReasonByAdminRoute: () => updateObservationReasonByAdminRoute,
  updateObservationRoute: () => updateObservationRoute,
  updateParentByAdminRoute: () => updateParentByAdminRoute,
  updatePaymentTemplateByAdminRoute: () => updatePaymentTemplateByAdminRoute,
  updatePostRoute: () => updatePostRoute,
  updatePreRegistrationByAdminRoute: () => updatePreRegistrationByAdminRoute,
  updatePreRegistrationByPublicRoute: () => updatePreRegistrationByPublicRoute,
  updatePrimaryGradesRoute: () => updatePrimaryGradesRoute,
  updateRoleByMasterRoute: () => updateRoleByMasterRoute,
  updateSchoolByAdminRoute: () => updateSchoolByAdminRoute,
  updateSchoolByMasterRoute: () => updateSchoolByMasterRoute,
  updateSchoolYearByAdminRoute: () => updateSchoolYearByAdminRoute,
  updateSecondaryGradesOfGroupRoute: () => updateSecondaryGradesOfGroupRoute,
  updateSecondaryGradesRoute: () => updateSecondaryGradesRoute,
  updateSectionByAdminRoute: () => updateSectionByAdminRoute,
  updateServiceByAdminRoute: () => updateServiceByAdminRoute,
  updateSessionDetailsRoute: () => updateSessionDetailsRoute,
  updateSessionForClassByAdminRoute: () => updateSessionForClassByAdminRoute,
  updateSessionForGroupByAdminRoute: () => updateSessionForGroupByAdminRoute,
  updateSessionStatusByAdminRoute: () => updateSessionStatusByAdminRoute,
  updateSessionTypeByAdminRoute: () => updateSessionTypeByAdminRoute,
  updateSignatureByAdminRoute: () => updateSignatureByAdminRoute,
  updateSmartCalendarScheduleByAdminRoute: () => updateSmartCalendarScheduleByAdminRoute,
  updateSmsSoldByMasterRoute: () => updateSmsSoldByMasterRoute,
  updateStudentByAdminRoute: () => updateStudentByAdminRoute,
  updateStudentGroupByAdminRoute: () => updateStudentGroupByAdminRoute,
  updateStudentPaymentConfigurationByAdminRoute: () => updateStudentPaymentConfigurationByAdminRoute,
  updateStudentPromotionStatusByAdminRoute: () => updateStudentPromotionStatusByAdminRoute,
  updateSubLevelByAdminRoute: () => updateSubLevelByAdminRoute,
  updateSubSubjectOfClassTypeByAdminRoute: () => updateSubSubjectOfClassTypeByAdminRoute,
  updateSubSubjectTypeByAdminRoute: () => updateSubSubjectTypeByAdminRoute,
  updateSubjectOfClassTypeByAdminRoute: () => updateSubjectOfClassTypeByAdminRoute,
  updateSubjectTypeByAdminRoute: () => updateSubjectTypeByAdminRoute,
  updateSupplierByAdminRoute: () => updateSupplierByAdminRoute,
  updateTeacherByAdminRoute: () => updateTeacherByAdminRoute,
  updateTeacherConstraintsByAdminRoute: () => updateTeacherConstraintsByAdminRoute,
  updateTeacherPaymentConfigurationByAdminRoute: () => updateTeacherPaymentConfigurationByAdminRoute,
  updateTermByAdminRoute: () => updateTermByAdminRoute,
  updateTransactionsByAdminRoute: () => updateTransactionsByAdminRoute,
  updateTutorialByMasterRoute: () => updateTutorialByMasterRoute,
  updateWeeklySessionForClassByAdminRoute: () => updateWeeklySessionForClassByAdminRoute,
  updateWeeklySessionForGroupByAdminRoute: () => updateWeeklySessionForGroupByAdminRoute,
  uploadAvatarRoute: () => uploadAvatarRoute,
  verifyCodeRoute: () => verifyCodeRoute
});
module.exports = __toCommonJS(src_exports);

// ../src/constants/ActionsResource.ts
var ACTION_ENUM = {
  VIEW: "VIEW",
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
  ASSIGN: "ASSIGN",
  UNASSIGN: "UNASSIGN",
  EXPORT: "EXPORT",
  PAY: "PAY",
  UNPAY: "UNPAY",
  SWITCH: "SWITCH",
  ARCHIVE: "ARCHIVE",
  UNARCHIVE: "UNARCHIVE"
};
var RESOURCES_ENUM = {
  TUTORIAL: "TUTORIAL",
  STUDENT: "STUDENT",
  TEACHER: "TEACHER",
  PARENT: "PARENT",
  ADMIN: "ADMIN",
  ROLE: "ROLE",
  CLASSROOM: "CLASSROOM",
  CLASS: "CLASS",
  CLASS_TYPE: "CLASS_TYPE",
  EXAM_TYPE: "EXAM_TYPE",
  HOMEWORK: "HOMEWORK",
  OBSERVATION_REASON: "OBSERVATION_REASON",
  SESSION: "SESSION",
  SESSION_TYPE: "SESSION_TYPE",
  HOLIDAY: "HOLIDAY",
  LEVEL: "LEVEL",
  SECTION: "SECTION",
  SUB_LEVEL: "SUB_LEVEL",
  TERM: "TERM",
  SUBJECT: "SUBJECT",
  GROUP: "GROUP",
  GROUP_TYPE: "GROUP_TYPE",
  SUB_SUBJECT: "SUB_SUBJECT",
  PASSWORD: "PASSWORD",
  SERVICE: "SERVICE",
  BANK_CHECK: "BANK_CHECK",
  BANK_TRANSFER: "BANK_TRANSFER",
  PAYMENT_CONFIGURATION: "PAYMENT_CONFIGURATION",
  PAYMENT_TEMPLATE: "PAYMENT_TEMPLATE",
  INVOICE: "INVOICE",
  TRANSACTION: "TRANSACTION",
  FINANCE_DASHBOARD: "FINANCE_DASHBOARD",
  EXPENSE: "EXPENSE",
  TEACHER_PAYMENT_CONFIGURATION: "TEACHER_PAYMENT_CONFIGURATION",
  SCHEDULE: "SCHEDULE",
  TEACHER_PAYMENT: "TEACHER_PAYMENT",
  EXAM_GRADE: "EXAM_GRADE",
  OBSERVATION: "OBSERVATION",
  PRE_REGISTRATION: "PRE_REGISTRATION",
  SCHOOL_YEAR: "SCHOOL_YEAR",
  ISSUE: "ISSUE",
  SMART_CALENDAR: "SMART_CALENDAR",
  ANNOUNCEMENT: "ANNOUNCEMENT",
  SUPPLIER: "SUPPLIER",
  DIPLOMA: "DIPLOMA",
  NOTIFICATION: "NOTIFICATION",
  MASTER: "MASTER",
  SCHOOL: "SCHOOL",
  FLAGS: "FLAGS",
  APP_VERSION: "APP_VERSION",
  ALERT: "ALERT",
  SMS_HISTORY: "SMS_HISTORY",
  LMS: "LMS",
  SIGNATURE: "SIGNATURE"
};

// ../src/feature/alertManagement/constants/alertStatus.constant.ts
var ALERT_STATUS_ENUM = {
  DRAFT: "draft",
  SENT: "sent",
  SCHEDULED: "scheduled"
};

// ../src/feature/alertManagement/constants/alertType.constant.ts
var ALERT_TYPE_ENUM = {
  sms: "sms",
  notification: "notification"
};

// ../src/feature/diploma/diploma.entity.ts
var TEMPLATE_ENUM = {
  GREEN: "green",
  GOLD: "gold",
  BLUE: "blue",
  RED: "red",
  PURPLE: "purple"
};

// ../src/feature/preRegistration/domains/preRegistration.entity.ts
var REGISTRATION_STEP_ENUM = {
  PARENT_INFORMATION: "parentInformation",
  STUDENT_INFORMATION: "studentInformation",
  ENROLLMENT_DETAILS: "enrollmentDetails",
  FILES: "files",
  OTHER_INFORMATION: "otherInformation"
};

// ../src/feature/smartCalendar/domain/smartCalendarSchedule.entity.ts
var SMART_CALENDAR_SCHEDULE_STATUS_ENUM = {
  COMPLETED: "COMPLETED",
  IN_PROGRESS: "IN_PROGRESS",
  CANCELLED: "CANCELLED",
  ERROR: "ERROR"
};

// ../src/features/homework/constants/shared/addHomework.constants.ts
var HOMEWORK_STATUS_ENUM = {
  TODO: "to do",
  DONE: "done"
};

// ../src/features/notification/constants/constants.ts
var NOTIFICATION_TYPES_ENUM = {
  OBSERVATIONS: "observations",
  STUDENT_HOMEWORK: "student_homework",
  PARENT_HOMEWORK: "parent_homework",
  SCHEDULE: "schedule",
  ATTENDANCE: "attendance",
  PAYMENT: "payment",
  SESSION_NOTES: "session_notes",
  ALERT: "alert",
  ATTENDANCE_ABSENT: "attendance_absent",
  ATTENDANCE_LATE: "attendance_late",
  ATTENDANCE_EXPELLED: "attendance_expelled",
  TEACHER_SESSION_CANCELED: "teacher_session_canceled",
  PARENT_SESSION_CANCELED: "parent_session_canceled",
  STUDENT_SESSION_CANCELED: "student_session_canceled",
  NEW_POST_ADDED: "new_post_added",
  NEW_POST_REACTION: "new_post_reaction",
  NEW_COMMENT_ON_POST: "new_comment_on_post",
  NEW_COMMENT_REACTION: "new_comment_reaction",
  NEW_COMMENT_REPLY: "new_comment_reply",
  MENTION_IN_COMMENT: "mention_in_comment",
  NEW_MESSAGE_RECEIVED: "new_message_received",
  NEW_REACTION_ON_MESSAGE: "new_reaction_on_message",
  FULL_INVOICE_PAYMENT_SUCCESS: "full_invoice_payment_success",
  INVOICE_SPLIT_PAYMENT_SUCCESS: "invoice_split_payment_success"
};

// ../src/feature/announcements/domain/post.entity.ts
var CATEGORIES_ENUM = {
  general: "general",
  academic: "academic",
  activity: "activity",
  administration: "administration",
  alert: "alert"
};

// ../src/feature/announcements/domain/reaction.entity.ts
var REACTION_TYPE_ENUM = {
  LIKE: "like",
  care: "care",
  LOVE: "love",
  LAUGH: "laugh",
  ANGRY: "angry",
  SAD: "sad",
  SURPRISED: "surprised"
};

// ../src/feature/examGrade/domain/tunisian/ExamGrade.entity.ts
var DISPENSED_STATUS = "-";
var PROMOTION_STATUS_ENUM = {
  PROMOTED: "PROMOTED",
  NOT_PROMOTED: "NOT_PROMOTED",
  EXCEPTIONALLY_PROMOTED: "EXCEPTIONALLY_PROMOTED"
};

// ../src/feature/levels/domains/level.entity.ts
var EXAM_GRADE_SYSTEM_ENUM = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
  AUTOMATIC_PROMOTION: "AUTOMATIC_PROMOTION"
};
var ESTABLISHMENT_TITLE_ENUM = {
  PRIVATE_PRIMARY: "PRIVATE_PRIMARY",
  PRIVATE_SECONDARY: "PRIVATE_SECONDARY",
  PRIVATE_MIDDLE: "PRIVATE_MIDDLE"
};

// ../src/constants/globalEnums.ts
var import_lodash = require("lodash");
var END_USER_ENUM = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
  PARENT: "parent",
  MASTER: "master"
};
var END_USER_WITHOUT_MASTER_ENUM = (0, import_lodash.omit)(END_USER_ENUM, "MASTER");

// ../src/feature/messages/constants/conversation.constant.ts
var startConversationRules = {
  [END_USER_ENUM.MASTER]: [],
  [END_USER_ENUM.ADMIN]: [
    END_USER_ENUM.ADMIN,
    END_USER_ENUM.TEACHER,
    END_USER_ENUM.PARENT,
    END_USER_ENUM.STUDENT
  ],
  [END_USER_ENUM.TEACHER]: [END_USER_ENUM.ADMIN],
  [END_USER_ENUM.STUDENT]: [],
  [END_USER_ENUM.PARENT]: []
};

// ../src/feature/schools/domain/school.entity.ts
var EDUCATION_DEPARTMENT_ENUM = {
  ARIANA: "\u0623\u0631\u064A\u0627\u0646\u0629",
  BEJA: "\u0628\u0627\u062C\u0629",
  BEN_AROUS: "\u0628\u0646 \u0639\u0631\u0648\u0633",
  BIZERTE: "\u0628\u0646\u0632\u0631\u062A",
  GABES: "\u0642\u0627\u0628\u0633",
  GAFSA: "\u0642\u0641\u0635\u0629",
  JENDOUBA: "\u062C\u0646\u062F\u0648\u0628\u0629",
  KAIROUAN: "\u0627\u0644\u0642\u064A\u0631\u0648\u0627\u0646",
  KASSERINE: "\u0627\u0644\u0642\u0635\u0631\u064A\u0646",
  KEBILI: "\u0642\u0628\u0644\u064A",
  KEF: "\u0627\u0644\u0643\u0627\u0641",
  MAHDIA: "\u0627\u0644\u0645\u0647\u062F\u064A\u0629",
  MANOUBA: "\u0645\u0646\u0648\u0628\u0629",
  MEDENINE: "\u0645\u062F\u0646\u064A\u0646",
  MONASTIR: "\u0627\u0644\u0645\u0646\u0633\u062A\u064A\u0631",
  NABEUL: "\u0646\u0627\u0628\u0644",
  SFAX: "\u0635\u0641\u0627\u0642\u0633",
  SIDI_BOUZID: "\u0633\u064A\u062F\u064A \u0628\u0648\u0632\u064A\u062F",
  SILIANA: "\u0633\u0644\u064A\u0627\u0646\u0629",
  SOUSSE: "\u0633\u0648\u0633\u0629",
  TATAOUINE: "\u062A\u0637\u0627\u0648\u064A\u0646",
  TOZEUR: "\u062A\u0648\u0632\u0631",
  TUNIS: "\u062A\u0648\u0646\u0633",
  ZAGHOUAN: "\u0632\u063A\u0648\u0627\u0646"
};
var INSTANCE_TYPE_ENUM = {
  TUNISIAN: "TUNISIAN",
  CAMBRIDGE: "CAMBRIDGE",
  IB: "IB"
};
var GRADE_REPORT_THEM_ENUM = {
  YELLOW: "yellow",
  BLUE: "blue"
};

// ../src/feature/schools/constants/featureFlags.ts
var FEATURE_FLAGS_ENUM = {
  MESSAGES: "messages",
  ANNOUNCEMENTS: "announcements",
  SMART_CALENDAR: "smartCalendar",
  TUTORIALS: "tutorials",
  DARK_MODE: "darkMode",
  LMS: "lms"
};

// ../src/feature/teacherPayment/domain/teacherPaymentConfiguration.entity.ts
var TRANSACTION_ADJUSTMENT_TYPE_ENUM = {
  PENALTY: "penalty",
  BONUS: "bonus"
};

// src/autoExport/admins/web/admin/addAdmin.ts
var addAdminByAdminRoute = {
  path: "/admin",
  method: "POST",
  paramsKey: []
};

// src/autoExport/admins/web/admin/getAdminByNewId.ts
var getAdminByNewIdByAdminRoute = {
  path: "/admins/:adminNewId",
  method: "GET",
  paramsKey: ["adminNewId"]
};

// src/autoExport/admins/web/admin/listAdmins.ts
var listAdminsByAdminRoute = {
  path: "/admins",
  method: "GET",
  paramsKey: []
};

// src/autoExport/admins/web/admin/updateAdmin.ts
var updateAdminByAdminRoute = {
  path: "/admins/:adminNewId",
  method: "PATCH",
  paramsKey: ["adminNewId"]
};

// src/autoExport/alertManagement/web/admin/addAlert.ts
var addAlertByAdminRoute = {
  path: "/alerts",
  method: "POST",
  paramsKey: []
};

// src/autoExport/alertManagement/web/admin/deleteAlert.ts
var deleteAlertByAdminRoute = {
  path: "/alerts/:alertNewId",
  method: "DELETE",
  paramsKey: ["alertNewId"]
};

// src/autoExport/alertManagement/web/admin/getAlertDetails.ts
var getAlertDetailsByAdminRoute = {
  path: "/alerts/:alertNewId/details",
  method: "GET",
  paramsKey: ["alertNewId"]
};

// src/autoExport/alertManagement/web/admin/getAlertStatistics.ts
var getAlertStatisticsByAdminRoute = {
  path: "/alerts/statistics",
  method: "GET",
  paramsKey: []
};

// src/autoExport/alertManagement/web/admin/listAlerts.ts
var listAlertsByAdminRoute = {
  path: "/alerts",
  method: "GET",
  paramsKey: []
};

// src/autoExport/alertManagement/web/admin/listUsersForAlert.ts
var listUsersForAlertByAdminRoute = {
  path: "/alerts/list-users",
  method: "GET",
  paramsKey: []
};

// src/autoExport/alertManagement/web/admin/updateAlert.ts
var updateAlertByAdminRoute = {
  path: "/alerts/:alertNewId",
  method: "PATCH",
  paramsKey: ["alertNewId"]
};

// src/autoExport/announcements/shared/addCommentToPost.ts
var addCommentToPostRoute = {
  path: "/posts/:postNewId/comments",
  method: "POST",
  paramsKey: ["postNewId"]
};

// src/autoExport/announcements/shared/addPost.ts
var addPostRoute = {
  path: "/post",
  method: "POST",
  paramsKey: []
};

// src/autoExport/announcements/shared/addReplyToComment.ts
var addReplyToCommentRoute = {
  path: "/comments/:commentNewId/reply",
  method: "POST",
  paramsKey: ["commentNewId"]
};

// src/autoExport/announcements/shared/deletePost.ts
var deletePostRoute = {
  path: "/posts/:postNewId",
  method: "DELETE",
  paramsKey: ["postNewId"]
};

// src/autoExport/announcements/shared/getOneComment.ts
var getOneCommentRoute = {
  path: "/comments/:commentNewId",
  method: "GET",
  paramsKey: ["commentNewId"]
};

// src/autoExport/announcements/shared/getOnePost.ts
var getOnePostRoute = {
  path: "/posts/:postNewId",
  method: "GET",
  paramsKey: ["postNewId"]
};

// src/autoExport/announcements/shared/getReactionsOfComment.ts
var getReactionsOfCommentRoute = {
  path: "/comments/:commentNewId/reactions",
  method: "GET",
  paramsKey: ["commentNewId"]
};

// src/autoExport/announcements/shared/getReactionsOfPost.ts
var getReactionsOfPostRoute = {
  path: "/posts/:postNewId/reactions",
  method: "GET",
  paramsKey: ["postNewId"]
};

// src/autoExport/announcements/shared/getUsersOfPostForMention.ts
var getUsersOfPostForMentionRoute = {
  path: "/users",
  method: "GET",
  paramsKey: []
};

// src/autoExport/announcements/shared/listCommentsOfPost.ts
var listCommentsOfPostRoute = {
  path: "/posts/:postNewId/comments",
  method: "GET",
  paramsKey: ["postNewId"]
};

// src/autoExport/announcements/shared/listPosts.ts
var listPostsRoute = {
  path: "/posts",
  method: "GET",
  paramsKey: []
};

// src/autoExport/announcements/shared/listRepliesOfComment.ts
var listRepliesOfCommentRoute = {
  path: "/comments/:commentNewId/replies",
  method: "GET",
  paramsKey: ["commentNewId"]
};

// src/autoExport/announcements/shared/reactToComment.ts
var reactToCommentRoute = {
  path: "/comments/:commentNewId/react",
  method: "PUT",
  paramsKey: ["commentNewId"]
};

// src/autoExport/announcements/shared/reactToPost.ts
var reactToPostRoute = {
  path: "/posts/:postNewId/reactions",
  method: "PUT",
  paramsKey: ["postNewId"]
};

// src/autoExport/announcements/shared/togglePinStatusOfPost.ts
var togglePinStatusOfPostRoute = {
  path: "/posts/:postNewId/pin-status",
  method: "PATCH",
  paramsKey: ["postNewId"]
};

// src/autoExport/announcements/shared/updatePost.ts
var updatePostRoute = {
  path: "/posts/:postNewId",
  method: "PATCH",
  paramsKey: ["postNewId"]
};

// src/autoExport/archive/web/admin/archiveAdmin.ts
var archiveAdminByAdminRoute = {
  path: "/admins/:adminNewId/archive",
  method: "PUT",
  paramsKey: ["adminNewId"]
};

// src/autoExport/archive/web/admin/archiveParent.ts
var archiveParentByAdminRoute = {
  path: "/parents/:parentNewId/archive",
  method: "PUT",
  paramsKey: ["parentNewId"]
};

// src/autoExport/archive/web/admin/archiveStudent.ts
var archiveStudentByAdminRoute = {
  path: "/students/:studentNewId/archive",
  method: "PUT",
  paramsKey: ["studentNewId"]
};

// src/autoExport/archive/web/admin/archiveTeacher.ts
var archiveTeacherByAdminRoute = {
  path: "/teachers/:teacherNewId/archive",
  method: "PUT",
  paramsKey: ["teacherNewId"]
};

// src/autoExport/archive/web/admin/unArchiveAdmin.ts
var unArchiveAdminByAdminRoute = {
  path: "/admins/:adminNewId/unarchive",
  method: "PUT",
  paramsKey: ["adminNewId"]
};

// src/autoExport/archive/web/admin/unArchiveParent.ts
var unArchiveParentByAdminRoute = {
  path: "/parents/:parentNewId/unarchive",
  method: "PUT",
  paramsKey: ["parentNewId"]
};

// src/autoExport/archive/web/admin/unArchiveStudent.ts
var unArchiveStudentByAdminRoute = {
  path: "/students/:studentNewId/unarchive",
  method: "PUT",
  paramsKey: ["studentNewId"]
};

// src/autoExport/archive/web/admin/unArchiveTeacher.ts
var unArchiveTeacherByAdminRoute = {
  path: "/teachers/:teacherNewId/unarchive",
  method: "PUT",
  paramsKey: ["teacherNewId"]
};

// src/autoExport/authentication/shared/forgetPassword.ts
var forgetPasswordRoute = {
  path: "/forget-password",
  method: "POST",
  paramsKey: []
};

// src/autoExport/authentication/shared/getCurrentUser.ts
var getCurrentUserRoute = {
  path: "/me",
  method: "GET",
  paramsKey: []
};

// src/autoExport/authentication/shared/login.ts
var loginRoute = {
  path: "/login",
  method: "POST",
  paramsKey: []
};

// src/autoExport/authentication/shared/loginByStudent.ts
var loginByStudentRoute = {
  path: "/login",
  method: "POST",
  paramsKey: []
};

// src/autoExport/authentication/shared/logout.ts
var logoutRoute = {
  path: "/logout",
  method: "PATCH",
  paramsKey: []
};

// src/autoExport/authentication/shared/resetPassword.ts
var resetPasswordRoute = {
  path: "/reset-password",
  method: "POST",
  paramsKey: []
};

// src/autoExport/authentication/shared/updateCurrentUserPassword.ts
var updateCurrentUserPasswordRoute = {
  path: "/password",
  method: "PATCH",
  paramsKey: []
};

// src/autoExport/authentication/shared/verifyCode.ts
var verifyCodeRoute = {
  path: "/verify-code",
  method: "POST",
  paramsKey: []
};

// src/autoExport/authentication/web/admin/getCurrentUser.ts
var getCurrentUserByAdminRoute = {
  path: "/me",
  method: "GET",
  paramsKey: []
};

// src/autoExport/authentication/web/admin/resendInvitation.ts
var resendInvitationByAdminRoute = {
  path: "/users/resend-invitation",
  method: "POST",
  paramsKey: []
};

// src/autoExport/authentication/web/admin/resetUserPassword.ts
var resetUserPasswordByAdminRoute = {
  path: "/users/password",
  method: "PATCH",
  paramsKey: []
};

// src/autoExport/authentication/web/admin/switchToUser.ts
var switchToUserByAdminRoute = {
  path: "/switch-to-user",
  method: "POST",
  paramsKey: []
};

// src/autoExport/authentication/web/master/getCurrentUser.ts
var getCurrentUserByMasterRoute = {
  path: "/me",
  method: "GET",
  paramsKey: []
};

// src/autoExport/authentication/web/master/login.ts
var loginByMasterRoute = {
  path: "/login",
  method: "POST",
  paramsKey: []
};

// src/autoExport/authentication/web/student/getCurrentUser.ts
var getCurrentUserByStudentRoute = {
  path: "/me",
  method: "GET",
  paramsKey: []
};

// src/autoExport/authentication/web/teacher/getCurrentUser.ts
var getCurrentUserByTeacherRoute = {
  path: "/me",
  method: "GET",
  paramsKey: []
};

// src/autoExport/authorization/web/admin/listRoles.ts
var listRolesByAdminRoute = {
  path: "/roles",
  method: "GET",
  paramsKey: []
};

// src/autoExport/authorization/web/master/addRole.ts
var addRoleByMasterRoute = {
  path: "/roles",
  method: "POST",
  paramsKey: []
};

// src/autoExport/authorization/web/master/deleteRole.ts
var deleteRoleByMasterRoute = {
  path: "/roles/:roleNewId",
  method: "DELETE",
  paramsKey: ["roleNewId"]
};

// src/autoExport/authorization/web/master/getOneRole.ts
var getOneRoleByMasterRoute = {
  path: "/roles/:roleNewId",
  method: "GET",
  paramsKey: ["roleNewId"]
};

// src/autoExport/authorization/web/master/listRoles.ts
var listRolesByMasterRoute = {
  path: "/roles",
  method: "GET",
  paramsKey: []
};

// src/autoExport/authorization/web/master/updateRole.ts
var updateRoleByMasterRoute = {
  path: "/roles/:roleNewId",
  method: "PATCH",
  paramsKey: ["roleNewId"]
};

// src/autoExport/barCodeConfig/web/admin/addBarCodeConfig.ts
var addBarCodeConfigByAdminRoute = {
  path: "/bar-code",
  method: "POST",
  paramsKey: []
};

// src/autoExport/barCodeConfig/web/admin/deleteBarCodeConfig.ts
var deleteBarCodeConfigByAdminRoute = {
  path: "/bar-code/:barCodeNewId",
  method: "DELETE",
  paramsKey: ["barCodeNewId"]
};

// src/autoExport/barCodeConfig/web/admin/listBarCodeConfig.ts
var listBarCodeConfigByAdminRoute = {
  path: "/bar-code",
  method: "GET",
  paramsKey: []
};

// src/autoExport/barCodeConfig/web/admin/updateBarCodeConfig.ts
var updateBarCodeConfigByAdminRoute = {
  path: "/bar-code/:barCodeNewId",
  method: "PATCH",
  paramsKey: ["barCodeNewId"]
};

// src/autoExport/classGroup/web/admin/getGroupsOfClass.ts
var getGroupsOfClassByAdminRoute = {
  path: "/classes/:classNewId/groups",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/classManagement/shared/getClassOverview.ts
var getClassOverviewRoute = {
  path: "/classes/:classNewId/overview",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/classManagement/shared/getStudentsOfClass.ts
var getStudentsOfClassRoute = {
  path: "/class/:classNewId/student-list",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/classManagement/shared/getTeacherClassAndGroups.ts
var getTeacherClassAndGroupsRoute = {
  path: "/classes",
  method: "GET",
  paramsKey: []
};

// src/autoExport/classManagement/shared/listClasses.ts
var listClassesRoute = {
  path: "/list/classes",
  method: "GET",
  paramsKey: []
};

// src/autoExport/classManagement/web/admin/AssignStudentToClass.ts
var AssignStudentToClassByAdminRoute = {
  path: "/class/:classNewId/assign-students",
  method: "POST",
  paramsKey: ["classNewId"]
};

// src/autoExport/classManagement/web/admin/addClass.ts
var addClassByAdminRoute = {
  path: "/class",
  method: "POST",
  paramsKey: []
};

// src/autoExport/classManagement/web/admin/assignTeacherToSubSubjectInClass.ts
var assignTeacherToSubSubjectInClassByAdminRoute = {
  path: "/class/:classNewId/subject/assign-teacher",
  method: "PATCH",
  paramsKey: ["classNewId"]
};

// src/autoExport/classManagement/web/admin/assignTeacherToSubjectInClass.ts
var assignTeacherToSubjectInClassByAdminRoute = {
  path: "/classes/:classNewId/subject/assign-teacher",
  method: "PATCH",
  paramsKey: ["classNewId"]
};

// src/autoExport/classManagement/web/admin/deleteClass.ts
var deleteClassByAdminRoute = {
  path: "/classes/:classNewId",
  method: "DELETE",
  paramsKey: ["classNewId"]
};

// src/autoExport/classManagement/web/admin/getClassDashboard.ts
var getClassDashboardByAdminRoute = {
  path: "/class/:classNewId/dashboard",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/classManagement/web/admin/getClassList.ts
var getClassListByAdminRoute = {
  path: "/sub-level/:subLevelNewId/class-list",
  method: "GET",
  paramsKey: ["subLevelNewId"]
};

// src/autoExport/classManagement/web/admin/getStudentsCodeBarePdf.ts
var getStudentsCodeBarePdfByAdminRoute = {
  path: "/classes/:classNewId/students-code-bare-pdf",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/classManagement/web/admin/getSubjectsOfClass.ts
var getSubjectsOfClassByAdminRoute = {
  path: "/class/:classNewId/subjects",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/classManagement/web/admin/getTeacherClassAndGroups.ts
var getTeacherClassAndGroupsByAdminRoute = {
  path: "/teachers/:teacherNewId/classes",
  method: "GET",
  paramsKey: ["teacherNewId"]
};

// src/autoExport/classManagement/web/admin/listClasses.ts
var listClassesByAdminRoute = {
  path: "/classes",
  method: "GET",
  paramsKey: []
};

// src/autoExport/classManagement/web/admin/unAssignStudentFromClass.ts
var unAssignStudentFromClassByAdminRoute = {
  path: "/class/:classNewId/unassign-students",
  method: "PATCH",
  paramsKey: ["classNewId"]
};

// src/autoExport/classManagement/web/admin/unAssignTeacherFromSubSubject.ts
var unAssignTeacherFromSubSubjectByAdminRoute = {
  path: "/classes/:classNewId/sub-subjects/:subSubjectTypeId/unassign-teacher",
  method: "PATCH",
  paramsKey: ["classNewId", "subSubjectTypeId"]
};

// src/autoExport/classManagement/web/admin/unAssignTeacherFromSubject.ts
var unAssignTeacherFromSubjectByAdminRoute = {
  path: "/classes/:classNewId/subjects/:subjectTypeId/unassign-teacher",
  method: "PATCH",
  paramsKey: ["classNewId", "subjectTypeId"]
};

// src/autoExport/classManagement/web/admin/updateClass.ts
var updateClassByAdminRoute = {
  path: "/classes/:classNewId",
  method: "PATCH",
  paramsKey: ["classNewId"]
};

// src/autoExport/classManagement/web/admin/updateStudentGroup.ts
var updateStudentGroupByAdminRoute = {
  path: "/class/:classNewId/student/:studentNewId/group",
  method: "PUT",
  paramsKey: ["classNewId", "studentNewId"]
};

// src/autoExport/classManagement/web/teacher/getClassList.ts
var getClassListByTeacherRoute = {
  path: "/classes/list",
  method: "GET",
  paramsKey: []
};

// src/autoExport/classTypes/web/admin/addClassType.ts
var addClassTypeByAdminRoute = {
  path: "/class-types",
  method: "POST",
  paramsKey: []
};

// src/autoExport/classTypes/web/admin/addFieldToClassType.ts
var addFieldToClassTypeByAdminRoute = {
  path: "/classType/:classTypeNewId/fields",
  method: "POST",
  paramsKey: ["classTypeNewId"]
};

// src/autoExport/classTypes/web/admin/addSubSubjectToClassType.ts
var addSubSubjectToClassTypeByAdminRoute = {
  path: "/classTypes/:classTypeNewId/subjects/:subjectTypeNewId/subSubjects",
  method: "POST",
  paramsKey: ["classTypeNewId", "subjectTypeNewId"]
};

// src/autoExport/classTypes/web/admin/addSubjectToClassType.ts
var addSubjectToClassTypeByAdminRoute = {
  path: "/classTypes/:classTypeNewId/subjects",
  method: "POST",
  paramsKey: ["classTypeNewId"]
};

// src/autoExport/classTypes/web/admin/deleteClassType.ts
var deleteClassTypeByAdminRoute = {
  path: "/classTypes/:classTypeNewId",
  method: "DELETE",
  paramsKey: ["classTypeNewId"]
};

// src/autoExport/classTypes/web/admin/deleteFieldFromClassType.ts
var deleteFieldFromClassTypeByAdminRoute = {
  path: "/class-types/:classTypeNewId/fields/:fieldIndex",
  method: "DELETE",
  paramsKey: ["classTypeNewId", "fieldIndex"]
};

// src/autoExport/classTypes/web/admin/deleteSubSubjectFromClassType.ts
var deleteSubSubjectFromClassTypeByAdminRoute = {
  path: "/classType/:classTypeNewId/subSubjects/:subSubjectNewId",
  method: "DELETE",
  paramsKey: ["classTypeNewId", "subSubjectNewId"]
};

// src/autoExport/classTypes/web/admin/deleteSubjectFromClassType.ts
var deleteSubjectFromClassTypeByAdminRoute = {
  path: "/class-types/:classTypeNewId/subjects/:subjectTypeNewId",
  method: "DELETE",
  paramsKey: ["classTypeNewId", "subjectTypeNewId"]
};

// src/autoExport/classTypes/web/admin/getClassType.ts
var getClassTypeByAdminRoute = {
  path: "/class-types/:classTypeNewId",
  method: "GET",
  paramsKey: ["classTypeNewId"]
};

// src/autoExport/classTypes/web/admin/getFieldsOfClassType.ts
var getFieldsOfClassTypeByAdminRoute = {
  path: "/classTypes/:classTypeNewId/fields",
  method: "POST",
  paramsKey: ["classTypeNewId"]
};

// src/autoExport/classTypes/web/admin/getSubjectsOfClassTypes.ts
var getSubjectsOfClassTypesByAdminRoute = {
  path: "/classTypes/:classTypeNewId/subjects",
  method: "GET",
  paramsKey: ["classTypeNewId"]
};

// src/autoExport/classTypes/web/admin/listClassTypes.ts
var listClassTypesByAdminRoute = {
  path: "/class-types",
  method: "GET",
  paramsKey: []
};

// src/autoExport/classTypes/web/admin/listNextClassTypes.ts
var listNextClassTypesByAdminRoute = {
  path: "/next-classTypes",
  method: "GET",
  paramsKey: []
};

// src/autoExport/classTypes/web/admin/reorderFieldsOfClassTypes.ts
var reorderFieldsOfClassTypesByAdminRoute = {
  path: "/classTypes/:classTypeNewId/fields/reorder",
  method: "POST",
  paramsKey: ["classTypeNewId"]
};

// src/autoExport/classTypes/web/admin/reorderSubSubjectsOfClassTypes.ts
var reorderSubSubjectsOfClassTypesByAdminRoute = {
  path: "/classTypes/:classTypeNewId/subjects/:subjectTypeNewId/reorder",
  method: "PATCH",
  paramsKey: ["classTypeNewId", "subjectTypeNewId"]
};

// src/autoExport/classTypes/web/admin/reorderSubjectsOfClassTypes.ts
var reorderSubjectsOfClassTypesByAdminRoute = {
  path: "/classTypes/:classTypeNewId/subjects/reorder",
  method: "PATCH",
  paramsKey: ["classTypeNewId"]
};

// src/autoExport/classTypes/web/admin/updateClassType.ts
var updateClassTypeByAdminRoute = {
  path: "/classType/:classTypeNewId",
  method: "PATCH",
  paramsKey: ["classTypeNewId"]
};

// src/autoExport/classTypes/web/admin/updateFieldOfClassType.ts
var updateFieldOfClassTypeByAdminRoute = {
  path: "/class-types/:classTypeNewId/fields/:fieldRank",
  method: "PATCH",
  paramsKey: ["classTypeNewId", "fieldRank"]
};

// src/autoExport/classTypes/web/admin/updateSubSubjectOfClassType.ts
var updateSubSubjectOfClassTypeByAdminRoute = {
  path: "/class-types/:classTypeNewId/sub-subjects/:subSubjectNewId",
  method: "PATCH",
  paramsKey: ["classTypeNewId", "subSubjectNewId"]
};

// src/autoExport/classTypes/web/admin/updateSubjectOfClassType.ts
var updateSubjectOfClassTypeByAdminRoute = {
  path: "/class-types/:classTypeNewId/subject-types/:subjectTypeNewId",
  method: "PATCH",
  paramsKey: ["classTypeNewId", "subjectTypeNewId"]
};

// src/autoExport/classTypes/web/public/listClassTypes.ts
var listClassTypesByPublicRoute = {
  path: "/class-types",
  method: "GET",
  paramsKey: []
};

// src/autoExport/classTypes/web/teacher/listClassTypes.ts
var listClassTypesByTeacherRoute = {
  path: "/class-types",
  method: "GET",
  paramsKey: []
};

// src/autoExport/classrooms/web/admin/addClassroom.ts
var addClassroomByAdminRoute = {
  path: "/classrooms",
  method: "POST",
  paramsKey: []
};

// src/autoExport/classrooms/web/admin/deleteClassroom.ts
var deleteClassroomByAdminRoute = {
  path: "/classrooms/:classroomNewId",
  method: "DELETE",
  paramsKey: ["classroomNewId"]
};

// src/autoExport/classrooms/web/admin/getAvailableClassroom.ts
var getAvailableClassroomByAdminRoute = {
  path: "/classrooms/available",
  method: "GET",
  paramsKey: []
};

// src/autoExport/classrooms/web/admin/getAvailableClassroomInWeeklySession.ts
var getAvailableClassroomInWeeklySessionByAdminRoute = {
  path: "/weekly-sessions/classrooms/available",
  method: "GET",
  paramsKey: []
};

// src/autoExport/classrooms/web/admin/listClassrooms.ts
var listClassroomsByAdminRoute = {
  path: "/classrooms",
  method: "GET",
  paramsKey: []
};

// src/autoExport/classrooms/web/admin/updateClassroom.ts
var updateClassroomByAdminRoute = {
  path: "/classrooms/:classroomNewId",
  method: "PATCH",
  paramsKey: ["classroomNewId"]
};

// src/autoExport/dashboards/web/admin/getDashboard.ts
var getDashboardByAdminRoute = {
  path: "/dashboard",
  method: "GET",
  paramsKey: []
};

// src/autoExport/dashboards/web/parent/getDashboard.ts
var getDashboardByParentRoute = {
  path: "/dashboard",
  method: "GET",
  paramsKey: []
};

// src/autoExport/dashboards/web/student/getDashboard.ts
var getDashboardByStudentRoute = {
  path: "/dashboard",
  method: "GET",
  paramsKey: []
};

// src/autoExport/dashboards/web/teacher/getDashboard.ts
var getDashboardByTeacherRoute = {
  path: "/dashboard",
  method: "GET",
  paramsKey: []
};

// src/autoExport/diploma/web/admin/addDiploma.ts
var addDiplomaByAdminRoute = {
  path: "/diploma",
  method: "POST",
  paramsKey: []
};

// src/autoExport/diploma/web/admin/deleteDiploma.ts
var deleteDiplomaByAdminRoute = {
  path: "/diplomas",
  method: "DELETE",
  paramsKey: []
};

// src/autoExport/diploma/web/admin/getClassDiplomas.ts
var getClassDiplomasByAdminRoute = {
  path: "/classes/:classNewId/diplomas",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/diploma/web/admin/getStudentDiploma.ts
var getStudentDiplomaByAdminRoute = {
  path: "/students/:studentNewId/diplomas",
  method: "GET",
  paramsKey: ["studentNewId"]
};

// src/autoExport/diploma/web/admin/listDiplomas.ts
var listDiplomasByAdminRoute = {
  path: "/diplomas",
  method: "GET",
  paramsKey: []
};

// src/autoExport/diploma/web/admin/updateDiploma.ts
var updateDiplomaByAdminRoute = {
  path: "/diplomas/:diplomaNewId",
  method: "PATCH",
  paramsKey: ["diplomaNewId"]
};

// src/autoExport/examTypes/web/admin/addExamType.ts
var addExamTypeByAdminRoute = {
  path: "/exam-types",
  method: "POST",
  paramsKey: []
};

// src/autoExport/examTypes/web/admin/deleteExamType.ts
var deleteExamTypeByAdminRoute = {
  path: "/exam-types/:examTypeNewId",
  method: "DELETE",
  paramsKey: ["examTypeNewId"]
};

// src/autoExport/examTypes/web/admin/listExamTypes.ts
var listExamTypesByAdminRoute = {
  path: "/exam-types",
  method: "GET",
  paramsKey: []
};

// src/autoExport/examTypes/web/admin/reorderExamType.ts
var reorderExamTypeByAdminRoute = {
  path: "/exam-types/:examTypeNewId/reorder",
  method: "PATCH",
  paramsKey: ["examTypeNewId"]
};

// src/autoExport/examTypes/web/admin/updateExamType.ts
var updateExamTypeByAdminRoute = {
  path: "/examTypes/:examTypeNewId",
  method: "PATCH",
  paramsKey: ["examTypeNewId"]
};

// src/autoExport/exams/web/admin/completeTerm.ts
var completeTermByAdminRoute = {
  path: "/classes/:classNewId/terms/:termNewId/complete",
  method: "POST",
  paramsKey: ["classNewId", "termNewId"]
};

// src/autoExport/exams/web/admin/getAnnualAveragesOfClass.ts
var getAnnualAveragesOfClassByAdminRoute = {
  path: "/classes/:classNewId/annual-averages",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/exams/web/admin/getLevelDegreesCoverage.ts
var getLevelDegreesCoverageByAdminRoute = {
  path: "/levels/degrees-coverage",
  method: "GET",
  paramsKey: []
};

// src/autoExport/exams/web/admin/getNotPromotedStudents.ts
var getNotPromotedStudentsByAdminRoute = {
  path: "/levels/not-promoted-students",
  method: "GET",
  paramsKey: []
};

// src/autoExport/exams/web/admin/hideTerm.ts
var hideTermByAdminRoute = {
  path: "/classes/:classNewId/terms/:termId/hide",
  method: "POST",
  paramsKey: ["classNewId", "termId"]
};

// src/autoExport/exams/web/admin/incompleteTerm.ts
var incompleteTermByAdminRoute = {
  path: "/classes/:classNewId/terms/:termNewId/incomplete",
  method: "PATCH",
  paramsKey: ["classNewId", "termNewId"]
};

// src/autoExport/exams/web/admin/publishTerm.ts
var publishTermByAdminRoute = {
  path: "/classes/:classNewId/terms/:termId/publish",
  method: "POST",
  paramsKey: ["classNewId", "termId"]
};

// src/autoExport/exams/web/admin/switchLevelsToNextSchoolYear.ts
var switchLevelsToNextSchoolYearByAdminRoute = {
  path: "/levels/switch-next-school-year",
  method: "POST",
  paramsKey: []
};

// src/autoExport/exams/web/admin/updateAdminObservations.ts
var updateAdminObservationsByAdminRoute = {
  path: "/ib/classes/:classNewId/admin-observations",
  method: "PATCH",
  paramsKey: ["classNewId"]
};

// src/autoExport/exams/web/admin/updateStudentPromotionStatus.ts
var updateStudentPromotionStatusByAdminRoute = {
  path: "/students/:studentNewId/promotion-status",
  method: "PATCH",
  paramsKey: ["studentNewId"]
};

// src/autoExport/examsCambridge/shared/getCambridgeChildGradeReport.ts
var getCambridgeChildGradeReportRoute = {
  path: "/cambridge/children/:childNewId/grade-reports",
  method: "GET",
  paramsKey: ["childNewId"]
};

// src/autoExport/examsCambridge/shared/getCambridgeChildGradeReportPDF.ts
var getCambridgeChildGradeReportPDFRoute = {
  path: "/cambridge/children/:childNewId/grade-report-pdf",
  method: "GET",
  paramsKey: ["childNewId"]
};

// src/autoExport/examsCambridge/shared/updateCambridgeGrades.ts
var updateCambridgeGradesRoute = {
  path: "/cambridge/classes/:classNewId/subjects/:subjectNewId/grades",
  method: "PATCH",
  paramsKey: ["classNewId", "subjectNewId"]
};

// src/autoExport/examsCambridge/shared/updateCambridgeGradesOfGroup.ts
var updateCambridgeGradesOfGroupRoute = {
  path: "/cambridge/groups/:groupNewId/grades",
  method: "PATCH",
  paramsKey: ["groupNewId"]
};

// src/autoExport/examsCambridge/web/admin/getAllCambridgeAnnualGradeReports.ts
var getAllCambridgeAnnualGradeReportsByAdminRoute = {
  path: "/cambridge/classes/:classNewId/annual-grade-reports",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsCambridge/web/admin/getAllCambridgeGradeReportsOfClass.ts
var getAllCambridgeGradeReportsOfClassByAdminRoute = {
  path: "/cambridge/classes/:classNewId/grade-reports",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsCambridge/web/admin/getCambridgeAnnualAveragesOfClass.ts
var getCambridgeAnnualAveragesOfClassByAdminRoute = {
  path: "/cambridge/classes/:classNewId/annual-averages",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsCambridge/web/admin/getCambridgeAveragesOfClass.ts
var getCambridgeAveragesOfClassByAdminRoute = {
  path: "/cambridge/classes/:classNewId/averages",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsCambridge/web/admin/getCambridgeBlankExamPage.ts
var getCambridgeBlankExamPageByAdminRoute = {
  path: "/cambridge/classes/:classNewId/subjects/:subjectNewId/blank-exam-page",
  method: "GET",
  paramsKey: ["classNewId", "subjectNewId"]
};

// src/autoExport/examsCambridge/web/admin/getCambridgeSubjectsOfClass.ts
var getCambridgeSubjectsOfClassByAdminRoute = {
  path: "/cambridge/classes/:classNewId/subjects",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsCambridge/web/admin/getGradesOfCambridgeGroup.ts
var getGradesOfCambridgeGroupByAdminRoute = {
  path: "/cambridge/groups/:groupNewId/grades",
  method: "GET",
  paramsKey: ["groupNewId"]
};

// src/autoExport/examsCambridge/web/admin/getGradesOfCambridgeSubject.ts
var getGradesOfCambridgeSubjectByAdminRoute = {
  path: "/cambridge/classes/:classNewId/subjects/:subjectNewId/grades",
  method: "GET",
  paramsKey: ["classNewId", "subjectNewId"]
};

// src/autoExport/examsCambridge/web/admin/getStudentCambridgeAnnualGradeReport.ts
var getStudentCambridgeAnnualGradeReportByAdminRoute = {
  path: "/cambridge/classes/:classNewId/students/:studentNewId/annual-grade-report",
  method: "GET",
  paramsKey: ["classNewId", "studentNewId"]
};

// src/autoExport/examsCambridge/web/admin/getStudentGradeReportCambridge.ts
var getStudentGradeReportCambridgeByAdminRoute = {
  path: "/cambridge/students/:studentNewId/grade-reports",
  method: "GET",
  paramsKey: ["studentNewId"]
};

// src/autoExport/examsCambridge/web/teacher/getCambridgeSubjectsOfClass.ts
var getCambridgeSubjectsOfClassByTeacherRoute = {
  path: "/cambridge/classes/:classNewId/subjects",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsCambridge/web/teacher/getGradesOfCambridgeGroup.ts
var getGradesOfCambridgeGroupByTeacherRoute = {
  path: "/cambridge/groups/:groupNewId/grades",
  method: "GET",
  paramsKey: ["groupNewId"]
};

// src/autoExport/examsCambridge/web/teacher/getGradesOfCambridgeSubject.ts
var getGradesOfCambridgeSubjectByTeacherRoute = {
  path: "/cambridge/classes/:classNewId/subjects/:subjectNewId/grades",
  method: "GET",
  paramsKey: ["classNewId", "subjectNewId"]
};

// src/autoExport/examsIB/shared/getGradesOfIBGroup.ts
var getGradesOfIBGroupRoute = {
  path: "/ib/groups/:groupNewId/grades",
  method: "GET",
  paramsKey: ["groupNewId"]
};

// src/autoExport/examsIB/shared/getGradesOfIBSubject.ts
var getGradesOfIBSubjectRoute = {
  path: "/ib/classes/:classNewId/subjects/:subjectNewId/grades",
  method: "GET",
  paramsKey: ["classNewId", "subjectNewId"]
};

// src/autoExport/examsIB/shared/getIBChildGradeReportPDF.ts
var getIBChildGradeReportPDFRoute = {
  path: "/ib/children/:childNewId/grade-report-pdf",
  method: "GET",
  paramsKey: ["childNewId"]
};

// src/autoExport/examsIB/shared/getIBSubjectsOfClass.ts
var getIBSubjectsOfClassRoute = {
  path: "/ib/classes/:classNewId/subjects",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsIB/shared/updateIBGradesOfClass.ts
var updateIBGradesOfClassRoute = {
  path: "/ib/classes/:classNewId/subjects/:subjectNewId/grades",
  method: "PATCH",
  paramsKey: ["classNewId", "subjectNewId"]
};

// src/autoExport/examsIB/shared/updateIBGradesOfGroup.ts
var updateIBGradesOfGroupRoute = {
  path: "/ib/groups/:groupNewId/grades",
  method: "PATCH",
  paramsKey: ["groupNewId"]
};

// src/autoExport/examsIB/web/admin/getAllIBGradeReportsOfClass.ts
var getAllIBGradeReportsOfClassByAdminRoute = {
  path: "/ib/classes/:classNewId/grade-reports",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsIB/web/admin/getIBAdminObservations.ts
var getIBAdminObservationsByAdminRoute = {
  path: "/ib/classes/:classNewId/admin-observations",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsIB/web/admin/getIBAnnualAveragesOfClass.ts
var getIBAnnualAveragesOfClassByAdminRoute = {
  path: "/ib/classes/:classNewId/annual-averages",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsIB/web/admin/getIBAveragesOfClass.ts
var getIBAveragesOfClassByAdminRoute = {
  path: "/ib/classes/:classNewId/averages",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsIB/web/admin/getIBBlankExamPage.ts
var getIBBlankExamPageByAdminRoute = {
  path: "/ib/classes/:classNewId/subjects/:subjectNewId/blank-exam-page",
  method: "GET",
  paramsKey: ["classNewId", "subjectNewId"]
};

// src/autoExport/examsIB/web/admin/getIBStudentGradeReport.ts
var getIBStudentGradeReportByAdminRoute = {
  path: "/ib/students/:studentNewId/grade-reports",
  method: "GET",
  paramsKey: ["studentNewId"]
};

// src/autoExport/examsPrimary/shared/getPrimaryChildGradeReport.ts
var getPrimaryChildGradeReportRoute = {
  path: "/primary/children/:childNewId/grade-reports",
  method: "GET",
  paramsKey: ["childNewId"]
};

// src/autoExport/examsPrimary/shared/getPrimaryChildGradeReportPDF.ts
var getPrimaryChildGradeReportPDFRoute = {
  path: "/primary/children/:childNewId/grade-report-pdf",
  method: "GET",
  paramsKey: ["childNewId"]
};

// src/autoExport/examsPrimary/shared/updatePrimaryGrades.ts
var updatePrimaryGradesRoute = {
  path: "/primary/classes/:classNewId/fields/:fieldIndex/grades",
  method: "PATCH",
  paramsKey: ["classNewId", "fieldIndex"]
};

// src/autoExport/examsPrimary/web/admin/getAllPrimaryAnnualGradeReportOfClass.ts
var getAllPrimaryAnnualGradeReportOfClassByAdminRoute = {
  path: "/primary/classes/:classNewId/annual-grade-reports",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsPrimary/web/admin/getAllPrimaryGradeReportsOfClass.ts
var getAllPrimaryGradeReportsOfClassByAdminRoute = {
  path: "/primary/classes/:classNewId/grade-reports",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsPrimary/web/admin/getFieldsOfClass.ts
var getFieldsOfClassByAdminRoute = {
  path: "/primary/classes/:classNewId/fields",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsPrimary/web/admin/getGradesOfField.ts
var getGradesOfFieldByAdminRoute = {
  path: "/primary/classes/:classNewId/fields/:fieldIndex/grades",
  method: "GET",
  paramsKey: ["classNewId", "fieldIndex"]
};

// src/autoExport/examsPrimary/web/admin/getPrimaryAnnualGradeReportOfStudent.ts
var getPrimaryAnnualGradeReportOfStudentByAdminRoute = {
  path: "/primary/classes/:classNewId/students/:studentNewId/annual-grade-reports",
  method: "GET",
  paramsKey: ["classNewId", "studentNewId"]
};

// src/autoExport/examsPrimary/web/admin/getPrimaryAveragesOfClass.ts
var getPrimaryAveragesOfClassByAdminRoute = {
  path: "/primary/classes/:classNewId/averages",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsPrimary/web/admin/getPrimaryBlankExamPage.ts
var getPrimaryBlankExamPageByAdminRoute = {
  path: "/primary/classes/:classNewId/fields/:fieldIndex/blank-exam-page",
  method: "GET",
  paramsKey: ["classNewId", "fieldIndex"]
};

// src/autoExport/examsPrimary/web/admin/getPrimaryGradeReportStats.ts
var getPrimaryGradeReportStatsByAdminRoute = {
  path: "/primary/classes/:classNewId/grade-report-stats",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsPrimary/web/admin/getStudentGradeReportPrimary.ts
var getStudentGradeReportPrimaryByAdminRoute = {
  path: "/primary/students/:studentNewId/grade-reports",
  method: "GET",
  paramsKey: ["studentNewId"]
};

// src/autoExport/examsPrimary/web/teacher/getFieldsOfClass.ts
var getFieldsOfClassByTeacherRoute = {
  path: "/primary/classes/:classNewId/fields",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsPrimary/web/teacher/getGradesOfField.ts
var getGradesOfFieldByTeacherRoute = {
  path: "/primary/classes/:classNewId/fields/:fieldIndex/grades",
  method: "GET",
  paramsKey: ["classNewId", "fieldIndex"]
};

// src/autoExport/examsSecondary/shared/getSecondaryChildGradeReport.ts
var getSecondaryChildGradeReportRoute = {
  path: "/secondary/children/:childNewId/grade-reports",
  method: "GET",
  paramsKey: ["childNewId"]
};

// src/autoExport/examsSecondary/shared/getSecondaryChildGradeReportPDF.ts
var getSecondaryChildGradeReportPDFRoute = {
  path: "/secondary/children/:childNewId/grade-report-pdf",
  method: "GET",
  paramsKey: ["childNewId"]
};

// src/autoExport/examsSecondary/shared/updateSecondaryGrades.ts
var updateSecondaryGradesRoute = {
  path: "/secondary/classes/:classNewId/subjects/:subjectNewId/grades",
  method: "PATCH",
  paramsKey: ["classNewId", "subjectNewId"]
};

// src/autoExport/examsSecondary/shared/updateSecondaryGradesOfGroup.ts
var updateSecondaryGradesOfGroupRoute = {
  path: "/secondary/groups/:groupNewId/grades",
  method: "PATCH",
  paramsKey: ["groupNewId"]
};

// src/autoExport/examsSecondary/web/admin/getAllSecondaryGradeReportsOfClass.ts
var getAllSecondaryGradeReportsOfClassByAdminRoute = {
  path: "/secondary/classes/:classNewId/grade-reports",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsSecondary/web/admin/getGradesOfSecondaryGroup.ts
var getGradesOfSecondaryGroupByAdminRoute = {
  path: "/secondary/groups/:groupNewId/grades",
  method: "GET",
  paramsKey: ["groupNewId"]
};

// src/autoExport/examsSecondary/web/admin/getGradesOfSecondarySubject.ts
var getGradesOfSecondarySubjectByAdminRoute = {
  path: "/secondary/classes/:classNewId/subjects/:subjectNewId/grades",
  method: "GET",
  paramsKey: ["classNewId", "subjectNewId"]
};

// src/autoExport/examsSecondary/web/admin/getSecondaryAveragesOfClass.ts
var getSecondaryAveragesOfClassByAdminRoute = {
  path: "/secondary/classes/:classNewId/averages",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsSecondary/web/admin/getSecondaryBlankExamPage.ts
var getSecondaryBlankExamPageByAdminRoute = {
  path: "/secondary/classes/:classNewId/subjects/:subjectNewId/blank-exam-page",
  method: "GET",
  paramsKey: ["classNewId", "subjectNewId"]
};

// src/autoExport/examsSecondary/web/admin/getSecondaryGradeReportStats.ts
var getSecondaryGradeReportStatsByAdminRoute = {
  path: "/secondary/classes/:classNewId/grade-report-stats",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsSecondary/web/admin/getSecondarySubjectsOfClass.ts
var getSecondarySubjectsOfClassByAdminRoute = {
  path: "/secondary/classes/:classNewId/subjects",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/examsSecondary/web/admin/getStudentGradeReportSecondary.ts
var getStudentGradeReportSecondaryByAdminRoute = {
  path: "/secondary/students/:studentNewId/grade-reports",
  method: "GET",
  paramsKey: ["studentNewId"]
};

// src/autoExport/examsSecondary/web/teacher/getGradesOfSecondaryGroup.ts
var getGradesOfSecondaryGroupByTeacherRoute = {
  path: "/secondary/groups/:groupNewId/grades",
  method: "GET",
  paramsKey: ["groupNewId"]
};

// src/autoExport/examsSecondary/web/teacher/getGradesOfSecondarySubject.ts
var getGradesOfSecondarySubjectByTeacherRoute = {
  path: "/secondary/classes/:classNewId/subjects/:subjectNewId/grades",
  method: "GET",
  paramsKey: ["classNewId", "subjectNewId"]
};

// src/autoExport/examsSecondary/web/teacher/getSecondarySubjectsOfClass.ts
var getSecondarySubjectsOfClassByTeacherRoute = {
  path: "/secondary/classes/:classNewId/subjects",
  method: "GET",
  paramsKey: ["classNewId"]
};

// src/autoExport/expenses/web/admin/addExpense.ts
var addExpenseByAdminRoute = {
  path: "/expenses",
  method: "POST",
  paramsKey: []
};

// src/autoExport/expenses/web/admin/deleteExpense.ts
var deleteExpenseByAdminRoute = {
  path: "/expenses/:expenseNewId",
  method: "DELETE",
  paramsKey: ["expenseNewId"]
};

// src/autoExport/expenses/web/admin/listExpenses.ts
var listExpensesByAdminRoute = {
  path: "/expenses",
  method: "GET",
  paramsKey: []
};

// src/autoExport/expenses/web/admin/updateExpense.ts
var updateExpenseByAdminRoute = {
  path: "/expenses/:expenseNewId",
  method: "PATCH",
  paramsKey: ["expenseNewId"]
};

// src/autoExport/finance/web/admin/addService.ts
var addServiceByAdminRoute = {
  path: "/services",
  method: "POST",
  paramsKey: []
};

// src/autoExport/finance/web/admin/addTransaction.ts
var addTransactionByAdminRoute = {
  path: "/transaction",
  method: "POST",
  paramsKey: []
};

// src/autoExport/finance/web/admin/deleteService.ts
var deleteServiceByAdminRoute = {
  path: "/services",
  method: "DELETE",
  paramsKey: []
};

// src/autoExport/finance/web/admin/deleteTransactions.ts
var deleteTransactionsByAdminRoute = {
  path: "/finance/transactions",
  method: "DELETE",
  paramsKey: []
};

// src/autoExport/finance/web/admin/getFinanceDashboard.ts
var getFinanceDashboardByAdminRoute = {
  path: "/transaction/dashboard",
  method: "GET",
  paramsKey: []
};

// src/autoExport/finance/web/admin/updateService.ts
var updateServiceByAdminRoute = {
  path: "/services/:serviceId",
  method: "PATCH",
  paramsKey: ["serviceId"]
};

// src/autoExport/finance/web/admin/updateTransactions.ts
var updateTransactionsByAdminRoute = {
  path: "/finance/transactions/:transactionId",
  method: "PATCH",
  paramsKey: ["transactionId"]
};

// src/autoExport/gradeReportTemplate/web/admin/addGradeReportTemplate.ts
var addGradeReportTemplateByAdminRoute = {
  path: "/grade-report-templates",
  method: "POST",
  paramsKey: []
};

// src/autoExport/gradeReportTemplate/web/admin/deleteGradeReportTemplate.ts
var deleteGradeReportTemplateByAdminRoute = {
  path: "/grade-report-templates/:templateNewId",
  method: "DELETE",
  paramsKey: ["templateNewId"]
};

// src/autoExport/gradeReportTemplate/web/admin/listGradeReportTemplates.ts
var listGradeReportTemplatesByAdminRoute = {
  path: "/grade-report-templates",
  method: "GET",
  paramsKey: []
};

// src/autoExport/gradeReportTemplate/web/admin/updateGradeReportTemplate.ts
var updateGradeReportTemplateByAdminRoute = {
  path: "/grade-report-templates/:templateNewId",
  method: "PATCH",
  paramsKey: ["templateNewId"]
};

// src/autoExport/groupTypes/web/admin/addGroupType.ts
var addGroupTypeByAdminRoute = {
  path: "/group-types",
  method: "POST",
  paramsKey: []
};

// src/autoExport/groupTypes/web/admin/deleteGroupType.ts
var deleteGroupTypeByAdminRoute = {
  path: "/group-types/:groupTypeNewId",
  method: "DELETE",
  paramsKey: ["groupTypeNewId"]
};

// src/autoExport/groupTypes/web/admin/listGroupTypes.ts
var listGroupTypesByAdminRoute = {
  path: "/groups-types",
  method: "GET",
  paramsKey: []
};

// src/autoExport/groupTypes/web/admin/updateGroupType.ts
var updateGroupTypeByAdminRoute = {
  path: "/group-types/:groupTypeNewId",
  method: "PATCH",
  paramsKey: ["groupTypeNewId"]
};

// src/autoExport/groups/shared/checkGroup.ts
var checkGroupRoute = {
  path: "/groups/:groupNewId/isExist",
  method: "GET",
  paramsKey: ["groupNewId"]
};

// src/autoExport/groups/shared/getGroupOverview.ts
var getGroupOverviewRoute = {
  path: "/groups/:groupNewId/overview",
  method: "GET",
  paramsKey: ["groupNewId"]
};

// src/autoExport/groups/shared/listGroups.ts
var listGroupsRoute = {
  path: "/list/groups",
  method: "GET",
  paramsKey: []
};

// src/autoExport/groups/web/admin/addGroup.ts
var addGroupByAdminRoute = {
  path: "/groups",
  method: "POST",
  paramsKey: []
};

// src/autoExport/groups/web/admin/assignStudentToGroup.ts
var assignStudentToGroupByAdminRoute = {
  path: "/groups/:groupNewId/assign-students",
  method: "PATCH",
  paramsKey: ["groupNewId"]
};

// src/autoExport/groups/web/admin/deleteGroup.ts
var deleteGroupByAdminRoute = {
  path: "/groups/:groupNewId",
  method: "DELETE",
  paramsKey: ["groupNewId"]
};

// src/autoExport/groups/web/admin/getGroupList.ts
var getGroupListByAdminRoute = {
  path: "/groups/list",
  method: "GET",
  paramsKey: []
};

// src/autoExport/groups/web/admin/getStudentsOfGroup.ts
var getStudentsOfGroupByAdminRoute = {
  path: "/groups/:groupNewId/student-list",
  method: "GET",
  paramsKey: ["groupNewId"]
};

// src/autoExport/groups/web/admin/getTopicOfGroup.ts
var getTopicOfGroupByAdminRoute = {
  path: "/groups/:groupNewId/topics",
  method: "GET",
  paramsKey: ["groupNewId"]
};

// src/autoExport/groups/web/admin/listGroups.ts
var listGroupsByAdminRoute = {
  path: "/groups",
  method: "GET",
  paramsKey: []
};

// src/autoExport/groups/web/admin/listUnenrolledStudentsForGroup.ts
var listUnenrolledStudentsForGroupByAdminRoute = {
  path: "/groups/unenrolled-students",
  method: "GET",
  paramsKey: []
};

// src/autoExport/groups/web/admin/unassignStudentFromGroup.ts
var unassignStudentFromGroupByAdminRoute = {
  path: "/groups/:groupNewId/unassign-students",
  method: "PATCH",
  paramsKey: ["groupNewId"]
};

// src/autoExport/groups/web/admin/updateGroup.ts
var updateGroupByAdminRoute = {
  path: "/groups/:groupNewId",
  method: "PATCH",
  paramsKey: ["groupNewId"]
};

// src/autoExport/holidays/web/admin/addHoliday.ts
var addHolidayByAdminRoute = {
  path: "/holidays",
  method: "POST",
  paramsKey: []
};

// src/autoExport/holidays/web/admin/deleteHoliday.ts
var deleteHolidayByAdminRoute = {
  path: "/holidays/:holidayNewId",
  method: "DELETE",
  paramsKey: ["holidayNewId"]
};

// src/autoExport/holidays/web/admin/listHoliday.ts
var listHolidayByAdminRoute = {
  path: "/holidays",
  method: "GET",
  paramsKey: []
};

// src/autoExport/holidays/web/admin/updateHoliday.ts
var updateHolidayByAdminRoute = {
  path: "/holidays/:holidayNewId",
  method: "POST",
  paramsKey: ["holidayNewId"]
};

// src/autoExport/homeworks/shared/getOneHomework.ts
var getOneHomeworkRoute = {
  path: "/homeworks/:homeworkNewId",
  method: "GET",
  paramsKey: ["homeworkNewId"]
};

// src/autoExport/homeworks/shared/listHomeworksByParent.ts
var listHomeworksByParentRoute = {
  path: "/students/:studentNewId/homeworks",
  method: "GET",
  paramsKey: ["studentNewId"]
};

// src/autoExport/homeworks/shared/listHomeworksByStudent.ts
var listHomeworksByStudentRoute = {
  path: "/homeworks",
  method: "GET",
  paramsKey: []
};

// src/autoExport/homeworks/shared/listHomeworksByTeacher.ts
var listHomeworksByTeacherRoute = {
  path: "/homeworks",
  method: "GET",
  paramsKey: []
};

// src/autoExport/homeworks/web/admin/listHomeworks.ts
var listHomeworksByAdminRoute = {
  path: "/homeworks",
  method: "GET",
  paramsKey: []
};

// src/autoExport/invoices/shared/getInvoiceDetails.ts
var getInvoiceDetailsRoute = {
  path: "/invoices/:invoiceNewId",
  method: "GET",
  paramsKey: ["invoiceNewId"]
};

// src/autoExport/invoices/web/admin/addInvoiceForStudent.ts
var addInvoiceForStudentByAdminRoute = {
  path: "/invoices",
  method: "POST",
  paramsKey: []
};

// src/autoExport/invoices/web/admin/deleteInvoice.ts
var deleteInvoiceByAdminRoute = {
  path: "/invoices/:invoiceNewId",
  method: "DELETE",
  paramsKey: ["invoiceNewId"]
};

// src/autoExport/invoices/web/admin/getInvoiceDetails.ts
var getInvoiceDetailsByAdminRoute = {
  path: "/invoices/:invoiceNewId",
  method: "GET",
  paramsKey: ["invoiceNewId"]
};

// src/autoExport/invoices/web/admin/getInvoicePdfData.ts
var getInvoicePdfDataByAdminRoute = {
  path: "/invoices/:invoiceNewId/generate-payment-information",
  method: "GET",
  paramsKey: ["invoiceNewId"]
};

// src/autoExport/invoices/web/admin/getSearchInvoice.ts
var getSearchInvoiceByAdminRoute = {
  path: "/invoices/search/:searchTerm",
  method: "GET",
  paramsKey: ["searchTerm"]
};

// src/autoExport/invoices/web/admin/getStudentInvoices.ts
var getStudentInvoicesByAdminRoute = {
  path: "/parents/:parentNewId/invoices",
  method: "GET",
  paramsKey: ["parentNewId"]
};

// src/autoExport/invoices/web/admin/getStudentPaymentConfiguration.ts
var getStudentPaymentConfigurationByAdminRoute = {
  path: "/students/:studentNewId/payment-configuration",
  method: "GET",
  paramsKey: ["studentNewId"]
};

// src/autoExport/invoices/web/admin/listInvoices.ts
var listInvoicesByAdminRoute = {
  path: "/invoices",
  method: "GET",
  paramsKey: []
};

// src/autoExport/invoices/web/admin/mergeInvoices.ts
var mergeInvoicesByAdminRoute = {
  path: "/invoices/merge",
  method: "POST",
  paramsKey: []
};

// src/autoExport/invoices/web/admin/payInvoice.ts
var payInvoiceByAdminRoute = {
  path: "/invoices/:invoiceNewId/pay",
  method: "POST",
  paramsKey: ["invoiceNewId"]
};

// src/autoExport/invoices/web/admin/unmergeInvoice.ts
var unmergeInvoiceByAdminRoute = {
  path: "/invoices/:invoiceNewId/undo-merge",
  method: "POST",
  paramsKey: ["invoiceNewId"]
};

// src/autoExport/invoices/web/admin/unpayInvoice.ts
var unpayInvoiceByAdminRoute = {
  path: "/invoices/:invoiceNewId/unpay",
  method: "PATCH",
  paramsKey: ["invoiceNewId"]
};

// src/autoExport/invoices/web/admin/unpaySplit.ts
var unpaySplitByAdminRoute = {
  path: "/invoices/:invoiceNewId/unpay-split/:splitIndex",
  method: "PATCH",
  paramsKey: ["invoiceNewId", "splitIndex"]
};

// src/autoExport/invoices/web/admin/updateBankTransfer.ts
var updateBankTransferByAdminRoute = {
  path: "/bank-transfers/:bankTransferNewId",
  method: "PUT",
  paramsKey: ["bankTransferNewId"]
};

// src/autoExport/invoices/web/admin/updateInvoice.ts
var updateInvoiceByAdminRoute = {
  path: "/invoices/:invoiceNewId",
  method: "PUT",
  paramsKey: ["invoiceNewId"]
};

// src/autoExport/invoices/web/admin/updateInvoiceReminders.ts
var updateInvoiceRemindersByAdminRoute = {
  path: "/invoices/:invoiceNewId/reminders",
  method: "PUT",
  paramsKey: ["invoiceNewId"]
};

// src/autoExport/invoices/web/admin/updateStudentPaymentConfiguration.ts
var updateStudentPaymentConfigurationByAdminRoute = {
  path: "/students/:studentNewId/payment-configuration",
  method: "POST",
  paramsKey: ["studentNewId"]
};

// src/autoExport/invoices/web/parent/getChildInvoices.ts
var getChildInvoicesByParentRoute = {
  path: "/invoices",
  method: "GET",
  paramsKey: []
};

// src/autoExport/issues/shared/addIssue.ts
var addIssueRoute = {
  path: "/issues",
  method: "POST",
  paramsKey: []
};

// src/autoExport/issues/shared/getOneIssue.ts
var getOneIssueRoute = {
  path: "/issues/:issueNewId",
  method: "GET",
  paramsKey: ["issueNewId"]
};

// src/autoExport/issues/shared/getTeachersOfStudent.ts
var getTeachersOfStudentRoute = {
  path: "/students/:studentNewId/teachers",
  method: "GET",
  paramsKey: ["studentNewId"]
};

// src/autoExport/issues/shared/listInteractionsOfIssue.ts
var listInteractionsOfIssueRoute = {
  path: "/issues/:issueNewId/interactions",
  method: "GET",
  paramsKey: ["issueNewId"]
};

// src/autoExport/issues/shared/listIssueReasons.ts
var listIssueReasonsRoute = {
  path: "/issue-reasons",
  method: "GET",
  paramsKey: []
};

// src/autoExport/issues/shared/listIssuesOfParent.ts
var listIssuesOfParentRoute = {
  path: "/issues",
  method: "GET",
  paramsKey: []
};

// src/autoExport/issues/shared/listIssuesOfTeacher.ts
var listIssuesOfTeacherRoute = {
  path: "/issues",
  method: "GET",
  paramsKey: []
};

// src/autoExport/issues/shared/sendReply.ts
var sendReplyRoute = {
  path: "/issues/:issueNewId/replies",
  method: "POST",
  paramsKey: ["issueNewId"]
};

// src/autoExport/issues/web/admin/assignTeacherToIssue.ts
var assignTeacherToIssueByAdminRoute = {
  path: "/issues/:issueNewId/assign-teacher",
  method: "PATCH",
  paramsKey: ["issueNewId"]
};

// src/autoExport/issues/web/admin/forwardIssue.ts
var forwardIssueByAdminRoute = {
  path: "/issues/:issueNewId/forward",
  method: "PATCH",
  paramsKey: ["issueNewId"]
};

// src/autoExport/issues/web/admin/listIssues.ts
var listIssuesByAdminRoute = {
  path: "/issues",
  method: "GET",
  paramsKey: []
};

// src/autoExport/issues/web/admin/unassignTeacherFromIssue.ts
var unassignTeacherFromIssueByAdminRoute = {
  path: "/issues/:issueNewId/unassign-teacher",
  method: "PATCH",
  paramsKey: ["issueNewId"]
};

// src/autoExport/issues/web/admin/updateIssueStatus.ts
var updateIssueStatusByAdminRoute = {
  path: "/issues/:issueNewId/status",
  method: "PATCH",
  paramsKey: ["issueNewId"]
};

// src/autoExport/levelManagment/web/admin/addLevel.ts
var addLevelByAdminRoute = {
  path: "/levels",
  method: "POST",
  paramsKey: []
};

// src/autoExport/levelManagment/web/admin/updateLevel.ts
var updateLevelByAdminRoute = {
  path: "/levels/:levelNewId",
  method: "PATCH",
  paramsKey: ["levelNewId"]
};

// src/autoExport/levels/web/admin/deleteLevel.ts
var deleteLevelByAdminRoute = {
  path: "/levels/:levelNewId",
  method: "DELETE",
  paramsKey: ["levelNewId"]
};

// src/autoExport/levels/web/admin/getLevelsOverview.ts
var getLevelsOverviewByAdminRoute = {
  path: "/levels/overview",
  method: "GET",
  paramsKey: []
};

// src/autoExport/levels/web/admin/listLevels.ts
var listLevelsByAdminRoute = {
  path: "/levels",
  method: "GET",
  paramsKey: []
};

// src/autoExport/levels/web/admin/reorderLevels.ts
var reorderLevelsByAdminRoute = {
  path: "/levels/:levelNewId/reorder",
  method: "PATCH",
  paramsKey: ["levelNewId"]
};

// src/autoExport/levels/web/public/listLevels.ts
var listLevelsByPublicRoute = {
  path: "/levels",
  method: "GET",
  paramsKey: []
};

// src/autoExport/lms/shared/addChapter.ts
var addChapterRoute = {
  path: "/chapters",
  method: "POST",
  paramsKey: []
};

// src/autoExport/lms/shared/addChapterAttachment.ts
var addChapterAttachmentRoute = {
  path: "/chapters/attachments",
  method: "POST",
  paramsKey: []
};

// src/autoExport/lms/shared/deleteChapter.ts
var deleteChapterRoute = {
  path: "/chapters/:chapterNewId",
  method: "DELETE",
  paramsKey: ["chapterNewId"]
};

// src/autoExport/lms/shared/deleteChapterAttachment.ts
var deleteChapterAttachmentRoute = {
  path: "/chapters/attachments/:chapterAttachmentNewId",
  method: "DELETE",
  paramsKey: ["chapterAttachmentNewId"]
};

// src/autoExport/lms/shared/getChaptersByTopic.ts
var getChaptersByTopicRoute = {
  path: "/topics/chapters",
  method: "GET",
  paramsKey: []
};

// src/autoExport/lms/shared/getGroupTypesOfChapters.ts
var getGroupTypesOfChaptersRoute = {
  path: "/groupTypes/chapters",
  method: "GET",
  paramsKey: []
};

// src/autoExport/lms/shared/getStudentTopicsChapters.ts
var getStudentTopicsChaptersRoute = {
  path: "/chapters/topics",
  method: "GET",
  paramsKey: []
};

// src/autoExport/lms/shared/getTopicsOfChaptersByClassType.ts
var getTopicsOfChaptersByClassTypeRoute = {
  path: "/classTypes/:classTypeNewId/topics/chapters",
  method: "GET",
  paramsKey: ["classTypeNewId"]
};

// src/autoExport/lms/shared/listChapterAttachments.ts
var listChapterAttachmentsRoute = {
  path: "/chapters",
  method: "GET",
  paramsKey: []
};

// src/autoExport/lms/shared/listChapterDocuments.ts
var listChapterDocumentsRoute = {
  path: "/chapters/documents",
  method: "GET",
  paramsKey: []
};

// src/autoExport/lms/shared/listChapterVideo.ts
var listChapterVideoRoute = {
  path: "/chapters/videos",
  method: "GET",
  paramsKey: []
};

// src/autoExport/lms/shared/updateChapter.ts
var updateChapterRoute = {
  path: "/chapters/:chapterNewId",
  method: "PATCH",
  paramsKey: ["chapterNewId"]
};

// src/autoExport/lms/shared/updateChapterAttachment.ts
var updateChapterAttachmentRoute = {
  path: "/chapters/attachments/:chapterAttachmentNewId",
  method: "PATCH",
  paramsKey: ["chapterAttachmentNewId"]
};

// src/autoExport/masters/web/master/addMaster.ts
var addMasterByMasterRoute = {
  path: "/masters",
  method: "POST",
  paramsKey: []
};

// src/autoExport/masters/web/master/deleteMaster.ts
var deleteMasterByMasterRoute = {
  path: "/masters/:masterNewId",
  method: "DELETE",
  paramsKey: ["masterNewId"]
};

// src/autoExport/masters/web/master/getAppVersion.ts
var getAppVersionByMasterRoute = {
  path: "/app-versions",
  method: "GET",
  paramsKey: []
};

// src/autoExport/masters/web/master/listMasters.ts
var listMastersByMasterRoute = {
  path: "/masters",
  method: "GET",
  paramsKey: []
};

// src/autoExport/masters/web/master/updateAppVersion.ts
var updateAppVersionByMasterRoute = {
  path: "/app-versions",
  method: "PATCH",
  paramsKey: []
};

// src/autoExport/masters/web/master/updateMaster.ts
var updateMasterByMasterRoute = {
  path: "/masters/:masterNewId",
  method: "PATCH",
  paramsKey: ["masterNewId"]
};

// src/autoExport/masters/web/public/getAppVersion.ts
var getAppVersionByPublicRoute = {
  path: "/app-versions",
  method: "GET",
  paramsKey: []
};

// src/autoExport/messages/shared/AddMessage.ts
var AddMessageRoute = {
  path: "/messages",
  method: "POST",
  paramsKey: []
};

// src/autoExport/messages/shared/AddReactToMessage.ts
var AddReactToMessageRoute = {
  path: "/messages/:messageNewId/react",
  method: "PUT",
  paramsKey: ["messageNewId"]
};

// src/autoExport/messages/shared/GetMessageReactions.ts
var GetMessageReactionsRoute = {
  path: "/messages/:messageNewId/reactions",
  method: "GET",
  paramsKey: ["messageNewId"]
};

// src/autoExport/messages/shared/addParticipantToGroup.ts
var addParticipantToGroupRoute = {
  path: "/conversations/:conversationNewId/add-participant-members",
  method: "POST",
  paramsKey: ["conversationNewId"]
};

// src/autoExport/messages/shared/deleteMessage.ts
var deleteMessageRoute = {
  path: "/messages/:messageNewId",
  method: "DELETE",
  paramsKey: ["messageNewId"]
};

// src/autoExport/messages/shared/deleteParticipantFromGroup.ts
var deleteParticipantFromGroupRoute = {
  path: "/conversations/:conversationNewId/remove-participant-members",
  method: "PUT",
  paramsKey: ["conversationNewId"]
};

// src/autoExport/messages/shared/getMessageTargetUsers.ts
var getMessageTargetUsersRoute = {
  path: "/conversations/target-users",
  method: "GET",
  paramsKey: []
};

// src/autoExport/messages/shared/getOneConversation.ts
var getOneConversationRoute = {
  path: "/conversations/:conversationNewId",
  method: "GET",
  paramsKey: ["conversationNewId"]
};

// src/autoExport/messages/shared/getOneConversationMessages.ts
var getOneConversationMessagesRoute = {
  path: "/conversation",
  method: "POST",
  paramsKey: []
};

// src/autoExport/messages/shared/listConversationAttachments.ts
var listConversationAttachmentsRoute = {
  path: "/conversations/:conversationNewId/attachments",
  method: "GET",
  paramsKey: ["conversationNewId"]
};

// src/autoExport/messages/shared/listConversationLinks.ts
var listConversationLinksRoute = {
  path: "/conversations/:conversationNewId/links",
  method: "GET",
  paramsKey: ["conversationNewId"]
};

// src/autoExport/messages/shared/listConversationMessages.ts
var listConversationMessagesRoute = {
  path: "/conversations/:conversationNewId/messages",
  method: "GET",
  paramsKey: ["conversationNewId"]
};

// src/autoExport/messages/shared/listConversationMultimedia.ts
var listConversationMultimediaRoute = {
  path: "/conversations/:conversationNewId/multimedia",
  method: "GET",
  paramsKey: ["conversationNewId"]
};

// src/autoExport/messages/shared/listConversationParticipants.ts
var listConversationParticipantsRoute = {
  path: "/conversations/:conversationNewId/participants",
  method: "GET",
  paramsKey: ["conversationNewId"]
};

// src/autoExport/messages/shared/listConversations.ts
var listConversationsRoute = {
  path: "/conversations",
  method: "GET",
  paramsKey: []
};

// src/autoExport/messages/shared/listTargetUsersForGroupConversationAssignment.ts
var listTargetUsersForGroupConversationAssignmentRoute = {
  path: "/conversations/:conversationNewId/target-users",
  method: "GET",
  paramsKey: ["conversationNewId"]
};

// src/autoExport/messages/shared/updateConversationName.ts
var updateConversationNameRoute = {
  path: "/conversations/:conversationNewId/name",
  method: "PATCH",
  paramsKey: ["conversationNewId"]
};

// src/autoExport/messages/shared/updateConversationSeenStatues.ts
var updateConversationSeenStatuesRoute = {
  path: "/conversations/:conversationId/seen",
  method: "PATCH",
  paramsKey: ["conversationId"]
};

// src/autoExport/notifications/shared/listNotifications.ts
var listNotificationsRoute = {
  path: "/notifications",
  method: "GET",
  paramsKey: []
};

// src/autoExport/observationReason/shared/listObservationReasons.ts
var listObservationReasonsRoute = {
  path: "/observations-reasons",
  method: "GET",
  paramsKey: []
};

// src/autoExport/observationReason/web/admin/addObservationReason.ts
var addObservationReasonByAdminRoute = {
  path: "/observations-reasons",
  method: "POST",
  paramsKey: []
};

// src/autoExport/observationReason/web/admin/deleteObservationReason.ts
var deleteObservationReasonByAdminRoute = {
  path: "/observations-reason/:observationReasonNewId",
  method: "DELETE",
  paramsKey: ["observationReasonNewId"]
};

// src/autoExport/observationReason/web/admin/updateObservationReason.ts
var updateObservationReasonByAdminRoute = {
  path: "/observations-reasons/:observationReasonNewId",
  method: "PATCH",
  paramsKey: ["observationReasonNewId"]
};

// src/autoExport/observations/shared/addObservation.ts
var addObservationRoute = {
  path: "/observations",
  method: "POST",
  paramsKey: []
};

// src/autoExport/observations/shared/getOneObservation.ts
var getOneObservationRoute = {
  path: "/observations/:observationNewId",
  method: "GET",
  paramsKey: ["observationNewId"]
};

// src/autoExport/observations/shared/listObservationsByParent.ts
var listObservationsByParentRoute = {
  path: "/observations",
  method: "GET",
  paramsKey: []
};

// src/autoExport/observations/shared/listObservationsByStudent.ts
var listObservationsByStudentRoute = {
  path: "/observations",
  method: "GET",
  paramsKey: []
};

// src/autoExport/observations/shared/listObservationsByTeacher.ts
var listObservationsByTeacherRoute = {
  path: "/observations",
  method: "GET",
  paramsKey: []
};

// src/autoExport/observations/shared/updateObservation.ts
var updateObservationRoute = {
  path: "/observations/:observationNewId",
  method: "PATCH",
  paramsKey: ["observationNewId"]
};

// src/autoExport/observations/web/admin/deleteObservation.ts
var deleteObservationByAdminRoute = {
  path: "/observations/:observationNewId",
  method: "DELETE",
  paramsKey: ["observationNewId"]
};

// src/autoExport/observations/web/admin/listObservations.ts
var listObservationsByAdminRoute = {
  path: "/observations",
  method: "GET",
  paramsKey: []
};

// src/autoExport/parents/shared/GetChildAttendanceStats.ts
var GetChildAttendanceStatsRoute = {
  path: "/students/:studentNewId/attendance-stats",
  method: "GET",
  paramsKey: ["studentNewId"]
};

// src/autoExport/parents/web/admin/addParent.ts
var addParentByAdminRoute = {
  path: "/parent",
  method: "POST",
  paramsKey: []
};

// src/autoExport/parents/web/admin/getParentByNewId.ts
var getParentByNewIdByAdminRoute = {
  path: "/parents/:parentNewId",
  method: "GET",
  paramsKey: ["parentNewId"]
};

// src/autoExport/parents/web/admin/listParents.ts
var listParentsByAdminRoute = {
  path: "/parents",
  method: "GET",
  paramsKey: []
};

// src/autoExport/parents/web/admin/updateParent.ts
var updateParentByAdminRoute = {
  path: "/parents/:parentNewId",
  method: "PATCH",
  paramsKey: ["parentNewId"]
};

// src/autoExport/parents/web/parent/getChildrenOfParents.ts
var getChildrenOfParentsByParentRoute = {
  path: "/children",
  method: "GET",
  paramsKey: []
};

// src/autoExport/paymentTemplate/web/admin/addPaymentTemplate.ts
var addPaymentTemplateByAdminRoute = {
  path: "/payment-templates",
  method: "POST",
  paramsKey: []
};

// src/autoExport/paymentTemplate/web/admin/deletePaymentTemplate.ts
var deletePaymentTemplateByAdminRoute = {
  path: "/payment-templates",
  method: "DELETE",
  paramsKey: []
};

// src/autoExport/paymentTemplate/web/admin/getPaymentTemplate.ts
var getPaymentTemplateByAdminRoute = {
  path: "/payment-templates/:paymentTemplateId",
  method: "GET",
  paramsKey: ["paymentTemplateId"]
};

// src/autoExport/paymentTemplate/web/admin/updatePaymentTemplate.ts
var updatePaymentTemplateByAdminRoute = {
  path: "/payment-templates/:paymentTemplateId",
  method: "PATCH",
  paramsKey: ["paymentTemplateId"]
};

// src/autoExport/preRegistration/web/admin/deletePreRegistration.ts
var deletePreRegistrationByAdminRoute = {
  path: "/pre-registrations/:preRegistrationId",
  method: "DELETE",
  paramsKey: ["preRegistrationId"]
};

// src/autoExport/preRegistration/web/admin/listPreRegistration.ts
var listPreRegistrationByAdminRoute = {
  path: "/pre-registrations",
  method: "GET",
  paramsKey: []
};

// src/autoExport/preRegistration/web/admin/registerStudent.ts
var registerStudentByAdminRoute = {
  path: "/pre-registration/:preRegistrationId/register-student",
  method: "POST",
  paramsKey: ["preRegistrationId"]
};

// src/autoExport/preRegistration/web/admin/updatePreRegistration.ts
var updatePreRegistrationByAdminRoute = {
  path: "/pre-registration/:preRegistrationId",
  method: "PATCH",
  paramsKey: ["preRegistrationId"]
};

// src/autoExport/preRegistration/web/public/getOnePreRegistration.ts
var getOnePreRegistrationByPublicRoute = {
  path: "/pre-registrations/:preRegistrationId",
  method: "GET",
  paramsKey: ["preRegistrationId"]
};

// src/autoExport/preRegistration/web/public/getSchoolPreRegistration.ts
var getSchoolPreRegistrationByPublicRoute = {
  path: "/pre-registration-school",
  method: "GET",
  paramsKey: []
};

// src/autoExport/preRegistration/web/public/updatePreRegistration.ts
var updatePreRegistrationByPublicRoute = {
  path: "/pre-registration",
  method: "PATCH",
  paramsKey: []
};

// src/autoExport/schedule/shared/getSchedule.ts
var getScheduleRoute = {
  path: "/schedule",
  method: "GET",
  paramsKey: []
};

// src/autoExport/schedule/shared/getWeeklySchedule.ts
var getWeeklyScheduleRoute = {
  path: "/weekly-schedule",
  method: "GET",
  paramsKey: []
};

// src/autoExport/schedule/web/admin/applyWeeklyScheduleForClass.ts
var applyWeeklyScheduleForClassByAdminRoute = {
  path: "/class/apply-weekly-schedule",
  method: "POST",
  paramsKey: []
};

// src/autoExport/schedule/web/admin/applyWeeklyScheduleForGroup.ts
var applyWeeklyScheduleForGroupByAdminRoute = {
  path: "/group/apply-weekly-schedule",
  method: "POST",
  paramsKey: []
};

// src/autoExport/schedule/web/admin/deleteSession.ts
var deleteSessionByAdminRoute = {
  path: "/sessions/:sessionNewId",
  method: "DELETE",
  paramsKey: ["sessionNewId"]
};

// src/autoExport/schedule/web/admin/getDraftWeeklySchedule.ts
var getDraftWeeklyScheduleByAdminRoute = {
  path: "/draft-weekly-schedule",
  method: "GET",
  paramsKey: []
};

// src/autoExport/schedule/web/admin/getEntitySchedule.ts
var getEntityScheduleByAdminRoute = {
  path: "/schedule/entity",
  method: "GET",
  paramsKey: []
};

// src/autoExport/schoolYears/web/admin/listSchoolYear.ts
var listSchoolYearByAdminRoute = {
  path: "/school-years",
  method: "GET",
  paramsKey: []
};

// src/autoExport/schoolYears/web/admin/updateSchoolYear.ts
var updateSchoolYearByAdminRoute = {
  path: "/school-years/:schoolYearNewId",
  method: "PATCH",
  paramsKey: ["schoolYearNewId"]
};

// src/autoExport/schools/web/admin/getSchoolDetails.ts
var getSchoolDetailsByAdminRoute = {
  path: "/school-information",
  method: "GET",
  paramsKey: []
};

// src/autoExport/schools/web/admin/updateSchool.ts
var updateSchoolByAdminRoute = {
  path: "/school",
  method: "PATCH",
  paramsKey: []
};

// src/autoExport/schools/web/master/addSchool.ts
var addSchoolByMasterRoute = {
  path: "/schools",
  method: "POST",
  paramsKey: []
};

// src/autoExport/schools/web/master/listSchools.ts
var listSchoolsByMasterRoute = {
  path: "/schools",
  method: "GET",
  paramsKey: []
};

// src/autoExport/schools/web/master/listSmsSoldHistories.ts
var listSmsSoldHistoriesByMasterRoute = {
  path: "/tenants/:tenantId/sms-history",
  method: "GET",
  paramsKey: ["tenantId"]
};

// src/autoExport/schools/web/master/switchShool.ts
var switchShoolByMasterRoute = {
  path: "/schools/:schoolNewId/switch",
  method: "POST",
  paramsKey: ["schoolNewId"]
};

// src/autoExport/schools/web/master/updateFlags.ts
var updateFlagsByMasterRoute = {
  path: "/schools/:schoolNewId/flags",
  method: "PATCH",
  paramsKey: ["schoolNewId"]
};

// src/autoExport/schools/web/master/updateSchool.ts
var updateSchoolByMasterRoute = {
  path: "/schools/:schoolNewId",
  method: "PATCH",
  paramsKey: ["schoolNewId"]
};

// src/autoExport/schools/web/master/updateSmsSold.ts
var updateSmsSoldByMasterRoute = {
  path: "/schools/:schoolId/sms-sold",
  method: "PATCH",
  paramsKey: ["schoolId"]
};

// src/autoExport/schools/web/public/getSchoolConfig.ts
var getSchoolConfigByPublicRoute = {
  path: "/schools/:subdomain/config",
  method: "GET",
  paramsKey: ["subdomain"]
};

// src/autoExport/schools/web/public/getSchoolLogo.ts
var getSchoolLogoByPublicRoute = {
  path: "/schools/:schoolId/logo",
  method: "GET",
  paramsKey: ["schoolId"]
};

// src/autoExport/schools/web/public/getSchoolSignature.ts
var getSchoolSignatureByPublicRoute = {
  path: "/schools/:schoolId/signature",
  method: "GET",
  paramsKey: ["schoolId"]
};

// src/autoExport/sectionManagement/web/admin/addSection.ts
var addSectionByAdminRoute = {
  path: "/section",
  method: "POST",
  paramsKey: []
};

// src/autoExport/sectionManagement/web/admin/deleteSection.ts
var deleteSectionByAdminRoute = {
  path: "/sections/:sectionNewId",
  method: "DELETE",
  paramsKey: ["sectionNewId"]
};

// src/autoExport/sectionManagement/web/admin/listSections.ts
var listSectionsByAdminRoute = {
  path: "/sections",
  method: "GET",
  paramsKey: []
};

// src/autoExport/sectionManagement/web/admin/updateSection.ts
var updateSectionByAdminRoute = {
  path: "/sections/:sectionNewId",
  method: "PATCH",
  paramsKey: ["sectionNewId"]
};

// src/autoExport/services/web/admin/listServices.ts
var listServicesByAdminRoute = {
  path: "/services",
  method: "GET",
  paramsKey: []
};

// src/autoExport/sessionManagement/shared/closeSession.ts
var closeSessionRoute = {
  path: "/close-session/:sessionNewId",
  method: "PATCH",
  paramsKey: ["sessionNewId"]
};

// src/autoExport/sessionManagement/shared/confirmAttendance.ts
var confirmAttendanceRoute = {
  path: "/session/:sessionNewId/confirm-attendance",
  method: "POST",
  paramsKey: ["sessionNewId"]
};

// src/autoExport/sessionManagement/shared/getSessionDetails.ts
var getSessionDetailsRoute = {
  path: "/sessions/:sessionNewId",
  method: "GET",
  paramsKey: ["sessionNewId"]
};

// src/autoExport/sessionManagement/shared/startSession.ts
var startSessionRoute = {
  path: "/start-session/:sessionNewId",
  method: "PATCH",
  paramsKey: ["sessionNewId"]
};

// src/autoExport/sessionManagement/shared/updateSessionDetails.ts
var updateSessionDetailsRoute = {
  path: "/session/:sessionNewId/edit",
  method: "PUT",
  paramsKey: ["sessionNewId"]
};

// src/autoExport/sessionManagement/web/admin/addSessionForClass.ts
var addSessionForClassByAdminRoute = {
  path: "/sessions",
  method: "POST",
  paramsKey: []
};

// src/autoExport/sessionManagement/web/admin/addSessionForGroup.ts
var addSessionForGroupByAdminRoute = {
  path: "/groups/sessions",
  method: "POST",
  paramsKey: []
};

// src/autoExport/sessionManagement/web/admin/cancelSession.ts
var cancelSessionByAdminRoute = {
  path: "/session/:sessionNewId/cancel",
  method: "PUT",
  paramsKey: ["sessionNewId"]
};

// src/autoExport/sessionManagement/web/admin/updateSessionForClass.ts
var updateSessionForClassByAdminRoute = {
  path: "/session/:sessionNewId",
  method: "PATCH",
  paramsKey: ["sessionNewId"]
};

// src/autoExport/sessionManagement/web/admin/updateSessionForGroup.ts
var updateSessionForGroupByAdminRoute = {
  path: "/groups/sessions/:sessionNewId",
  method: "PATCH",
  paramsKey: ["sessionNewId"]
};

// src/autoExport/sessionManagement/web/admin/updateSessionStatus.ts
var updateSessionStatusByAdminRoute = {
  path: "/session/:sessionNewId/change-status",
  method: "PATCH",
  paramsKey: ["sessionNewId"]
};

// src/autoExport/sessionTypes/web/admin/DeleteSessionType.ts
var DeleteSessionTypeByAdminRoute = {
  path: "/session-types/:sessionTypeNewId",
  method: "DELETE",
  paramsKey: ["sessionTypeNewId"]
};

// src/autoExport/sessionTypes/web/admin/addSessionType.ts
var addSessionTypeByAdminRoute = {
  path: "/session-types",
  method: "POST",
  paramsKey: []
};

// src/autoExport/sessionTypes/web/admin/listSessionType.ts
var listSessionTypeByAdminRoute = {
  path: "/session-types",
  method: "GET",
  paramsKey: []
};

// src/autoExport/sessionTypes/web/admin/updateSessionType.ts
var updateSessionTypeByAdminRoute = {
  path: "/session-types/:sessionTypeNewId",
  method: "PATCH",
  paramsKey: ["sessionTypeNewId"]
};

// src/autoExport/signatures/web/admin/addSignature.ts
var addSignatureByAdminRoute = {
  path: "/signatures",
  method: "POST",
  paramsKey: []
};

// src/autoExport/signatures/web/admin/deleteSignature.ts
var deleteSignatureByAdminRoute = {
  path: "/signatures/:signatureNewId",
  method: "DELETE",
  paramsKey: ["signatureNewId"]
};

// src/autoExport/signatures/web/admin/listSignatures.ts
var listSignaturesByAdminRoute = {
  path: "/signatures",
  method: "GET",
  paramsKey: []
};

// src/autoExport/signatures/web/admin/updateSignature.ts
var updateSignatureByAdminRoute = {
  path: "/signatures/:signatureNewId",
  method: "PUT",
  paramsKey: ["signatureNewId"]
};

// src/autoExport/smartCalendar/internal/public/CompleteScheduleGeneration.ts
var CompleteScheduleGenerationByPublicRoute = {
  path: "/schedules/:scheduleId/complete",
  method: "POST",
  paramsKey: ["scheduleId"]
};

// src/autoExport/smartCalendar/internal/public/MarkScheduleAsErrored.ts
var MarkScheduleAsErroredByPublicRoute = {
  path: "/schedules/:scheduleId/mark-as-errored",
  method: "POST",
  paramsKey: ["scheduleId"]
};

// src/autoExport/smartCalendar/web/admin/addClassTypeActivity.ts
var addClassTypeActivityByAdminRoute = {
  path: "/class-types/:classTypeNewId/activities",
  method: "POST",
  paramsKey: ["classTypeNewId"]
};

// src/autoExport/smartCalendar/web/admin/applySmartCalendarSchedule.ts
var applySmartCalendarScheduleByAdminRoute = {
  path: "/smart-calendar-schedules/:smartCalendarScheduleNewId/apply",
  method: "POST",
  paramsKey: ["smartCalendarScheduleNewId"]
};

// src/autoExport/smartCalendar/web/admin/cancelSmartCalendarSchedule.ts
var cancelSmartCalendarScheduleByAdminRoute = {
  path: "/smart-calendar-schedules/:smartCalendarScheduleNewId/cancel",
  method: "POST",
  paramsKey: ["smartCalendarScheduleNewId"]
};

// src/autoExport/smartCalendar/web/admin/deleteClassTypeActivity.ts
var deleteClassTypeActivityByAdminRoute = {
  path: "/class-types/:classTypeNewId/activities/:activityIndex",
  method: "DELETE",
  paramsKey: ["classTypeNewId", "activityIndex"]
};

// src/autoExport/smartCalendar/web/admin/deleteSmartCalendarSchedule.ts
var deleteSmartCalendarScheduleByAdminRoute = {
  path: "/smart-calendar-schedules/:smartCalendarScheduleNewId",
  method: "DELETE",
  paramsKey: ["smartCalendarScheduleNewId"]
};

// src/autoExport/smartCalendar/web/admin/generateSchedule.ts
var generateScheduleByAdminRoute = {
  path: "/smart-calendar-schedules/generate",
  method: "POST",
  paramsKey: []
};

// src/autoExport/smartCalendar/web/admin/getActivitiesOfClassType.ts
var getActivitiesOfClassTypeByAdminRoute = {
  path: "/class-types/:classTypeNewId/activities",
  method: "GET",
  paramsKey: ["classTypeNewId"]
};

// src/autoExport/smartCalendar/web/admin/getSchoolAvailableTimeConstraints.ts
var getSchoolAvailableTimeConstraintsByAdminRoute = {
  path: "/school/available-time-constraints",
  method: "GET",
  paramsKey: []
};

// src/autoExport/smartCalendar/web/admin/getSmartSchedulePDF.ts
var getSmartSchedulePDFByAdminRoute = {
  path: "/smart-calendar-schedules/:scheduleNewId/pdf",
  method: "GET",
  paramsKey: ["scheduleNewId"]
};

// src/autoExport/smartCalendar/web/admin/listSmartCalendarSchedule.ts
var listSmartCalendarScheduleByAdminRoute = {
  path: "/smart-calendar-schedules",
  method: "GET",
  paramsKey: []
};

// src/autoExport/smartCalendar/web/admin/updateClassConstraints.ts
var updateClassConstraintsByAdminRoute = {
  path: "/classes/:classNewId/constraints",
  method: "PATCH",
  paramsKey: ["classNewId"]
};

// src/autoExport/smartCalendar/web/admin/updateClassTypeActivity.ts
var updateClassTypeActivityByAdminRoute = {
  path: "/class-types/:classTypeNewId/activities/:activityIndex",
  method: "PATCH",
  paramsKey: ["classTypeNewId", "activityIndex"]
};

// src/autoExport/smartCalendar/web/admin/updateNotAvailableTimes.ts
var updateNotAvailableTimesByAdminRoute = {
  path: "/constraints/available-times",
  method: "PATCH",
  paramsKey: []
};

// src/autoExport/smartCalendar/web/admin/updateSmartCalendarSchedule.ts
var updateSmartCalendarScheduleByAdminRoute = {
  path: "/smart-calendar-schedules/:smartCalendarScheduleNewId",
  method: "PATCH",
  paramsKey: ["smartCalendarScheduleNewId"]
};

// src/autoExport/smartCalendar/web/admin/updateTeacherConstraints.ts
var updateTeacherConstraintsByAdminRoute = {
  path: "/teachers/:teacherNewId/constraints",
  method: "PATCH",
  paramsKey: ["teacherNewId"]
};

// src/autoExport/studentPayments/web/admin/listBankChecks.ts
var listBankChecksByAdminRoute = {
  path: "/bank-checks",
  method: "GET",
  paramsKey: []
};

// src/autoExport/studentPayments/web/admin/listBankTransfers.ts
var listBankTransfersByAdminRoute = {
  path: "/bank-transfers",
  method: "GET",
  paramsKey: []
};

// src/autoExport/studentPayments/web/admin/listPaymentTemplates.ts
var listPaymentTemplatesByAdminRoute = {
  path: "/payment-templates",
  method: "GET",
  paramsKey: []
};

// src/autoExport/studentPayments/web/admin/updateBankCheck.ts
var updateBankCheckByAdminRoute = {
  path: "/bank-checks/:bankCheckNewId",
  method: "PATCH",
  paramsKey: ["bankCheckNewId"]
};

// src/autoExport/students/shared/getStudentProfile.ts
var getStudentProfileRoute = {
  path: "/profile",
  method: "GET",
  paramsKey: []
};

// src/autoExport/students/web/admin/addStudent.ts
var addStudentByAdminRoute = {
  path: "/student",
  method: "POST",
  paramsKey: []
};

// src/autoExport/students/web/admin/getStudentAttendanceCertificate.ts
var getStudentAttendanceCertificateByAdminRoute = {
  path: "/students/:studentNewId/attendance-certificate",
  method: "GET",
  paramsKey: ["studentNewId"]
};

// src/autoExport/students/web/admin/getStudentProfile.ts
var getStudentProfileByAdminRoute = {
  path: "/students/:studentNewId/profile",
  method: "GET",
  paramsKey: ["studentNewId"]
};

// src/autoExport/students/web/admin/importStudents.ts
var importStudentsByAdminRoute = {
  path: "/students/import",
  method: "POST",
  paramsKey: []
};

// src/autoExport/students/web/admin/listStudents.ts
var listStudentsByAdminRoute = {
  path: "/students",
  method: "GET",
  paramsKey: []
};

// src/autoExport/students/web/admin/listUnenrolledStudents.ts
var listUnenrolledStudentsByAdminRoute = {
  path: "/unenrolled-students",
  method: "GET",
  paramsKey: []
};

// src/autoExport/students/web/admin/switchStudentsClass.ts
var switchStudentsClassByAdminRoute = {
  path: "/switch-students-class",
  method: "PATCH",
  paramsKey: []
};

// src/autoExport/students/web/admin/toggleUserActivation.ts
var toggleUserActivationByAdminRoute = {
  path: "/users/activation",
  method: "PATCH",
  paramsKey: []
};

// src/autoExport/students/web/admin/updateStudent.ts
var updateStudentByAdminRoute = {
  path: "/students/:studentNewId",
  method: "PATCH",
  paramsKey: ["studentNewId"]
};

// src/autoExport/subLevels/web/admin/addSubLevel.ts
var addSubLevelByAdminRoute = {
  path: "/subLevel",
  method: "POST",
  paramsKey: []
};

// src/autoExport/subLevels/web/admin/deleteSubLevel.ts
var deleteSubLevelByAdminRoute = {
  path: "/subLevels/:subLevelNewId",
  method: "DELETE",
  paramsKey: ["subLevelNewId"]
};

// src/autoExport/subLevels/web/admin/listSubLevels.ts
var listSubLevelsByAdminRoute = {
  path: "/sub-levels",
  method: "GET",
  paramsKey: []
};

// src/autoExport/subLevels/web/admin/reorderSubLevels.ts
var reorderSubLevelsByAdminRoute = {
  path: "/sub-levels/:subLevelNewId/reorder",
  method: "PATCH",
  paramsKey: ["subLevelNewId"]
};

// src/autoExport/subLevels/web/admin/updateSubLevel.ts
var updateSubLevelByAdminRoute = {
  path: "/subLevels/:subLevelNewId",
  method: "PATCH",
  paramsKey: ["subLevelNewId"]
};

// src/autoExport/subSubjectTypes/web/admin/addSubSubjectType.ts
var addSubSubjectTypeByAdminRoute = {
  path: "/sub-subject-types",
  method: "POST",
  paramsKey: []
};

// src/autoExport/subSubjectTypes/web/admin/deleteSubSubjectType.ts
var deleteSubSubjectTypeByAdminRoute = {
  path: "/sub-subject-type/:subSubjectTypeNewId",
  method: "DELETE",
  paramsKey: ["subSubjectTypeNewId"]
};

// src/autoExport/subSubjectTypes/web/admin/listSubSubjectTypes.ts
var listSubSubjectTypesByAdminRoute = {
  path: "/sub-subject-types",
  method: "GET",
  paramsKey: []
};

// src/autoExport/subSubjectTypes/web/admin/updateSubSubjectType.ts
var updateSubSubjectTypeByAdminRoute = {
  path: "/sub-subject-types/:subSubjectTypeNewId",
  method: "PATCH",
  paramsKey: ["subSubjectTypeNewId"]
};

// src/autoExport/subjectTypes/web/admin/addSubjectType.ts
var addSubjectTypeByAdminRoute = {
  path: "/subject-types",
  method: "POST",
  paramsKey: []
};

// src/autoExport/subjectTypes/web/admin/deleteSubjectType.ts
var deleteSubjectTypeByAdminRoute = {
  path: "/subject-types/:subjectTypeNewId",
  method: "DELETE",
  paramsKey: ["subjectTypeNewId"]
};

// src/autoExport/subjectTypes/web/admin/listSubjectTypes.ts
var listSubjectTypesByAdminRoute = {
  path: "/subject-types",
  method: "GET",
  paramsKey: []
};

// src/autoExport/subjectTypes/web/admin/updateSubjectType.ts
var updateSubjectTypeByAdminRoute = {
  path: "/subject-types/:subjectTypeNewId",
  method: "PATCH",
  paramsKey: ["subjectTypeNewId"]
};

// src/autoExport/supplier/web/admin/addSupplier.ts
var addSupplierByAdminRoute = {
  path: "/supplier",
  method: "POST",
  paramsKey: []
};

// src/autoExport/supplier/web/admin/deleteSuppliers.ts
var deleteSuppliersByAdminRoute = {
  path: "/suppliers",
  method: "DELETE",
  paramsKey: []
};

// src/autoExport/supplier/web/admin/listSuppliers.ts
var listSuppliersByAdminRoute = {
  path: "/suppliers",
  method: "GET",
  paramsKey: []
};

// src/autoExport/supplier/web/admin/updateSupplier.ts
var updateSupplierByAdminRoute = {
  path: "/suppliers/:supplierNewId",
  method: "PATCH",
  paramsKey: ["supplierNewId"]
};

// src/autoExport/teacherPayment/web/admin/addTeacherPaymentConfiguration.ts
var addTeacherPaymentConfigurationByAdminRoute = {
  path: "/teachers/:teacherNewId/payment-configuration",
  method: "POST",
  paramsKey: ["teacherNewId"]
};

// src/autoExport/teacherPayment/web/admin/addTeacherPaymentTransaction.ts
var addTeacherPaymentTransactionByAdminRoute = {
  path: "/teachers/:teacherNewId/payment/transaction",
  method: "POST",
  paramsKey: ["teacherNewId"]
};

// src/autoExport/teacherPayment/web/admin/deleteTeacherPaymentTransaction.ts
var deleteTeacherPaymentTransactionByAdminRoute = {
  path: "/teacher/payment/transaction/:teacherPaymentId",
  method: "DELETE",
  paramsKey: ["teacherPaymentId"]
};

// src/autoExport/teacherPayment/web/admin/getTeacherPaymentConfiguration.ts
var getTeacherPaymentConfigurationByAdminRoute = {
  path: "/teachers/:teacherNewId/payment-configuration/details",
  method: "GET",
  paramsKey: ["teacherNewId"]
};

// src/autoExport/teacherPayment/web/admin/getTeacherPaymentDashboard.ts
var getTeacherPaymentDashboardByAdminRoute = {
  path: "/teachers/:teacherNewId/payment/dashboard",
  method: "GET",
  paramsKey: ["teacherNewId"]
};

// src/autoExport/teacherPayment/web/admin/listTeacherSessions.ts
var listTeacherSessionsByAdminRoute = {
  path: "/teachers/:teacherNewId/payment/sessions",
  method: "GET",
  paramsKey: ["teacherNewId"]
};

// src/autoExport/teacherPayment/web/admin/payTeacher.ts
var payTeacherByAdminRoute = {
  path: "/teachers/:teacherNewId/pay",
  method: "POST",
  paramsKey: ["teacherNewId"]
};

// src/autoExport/teacherPayment/web/admin/unPayTeacher.ts
var unPayTeacherByAdminRoute = {
  path: "/teachers/:teacherNewId/undo-pay",
  method: "PUT",
  paramsKey: ["teacherNewId"]
};

// src/autoExport/teacherPayment/web/admin/updateTeacherPaymentConfiguration.ts
var updateTeacherPaymentConfigurationByAdminRoute = {
  path: "/teacher/:teacherNewId/payment-configuration",
  method: "PATCH",
  paramsKey: ["teacherNewId"]
};

// src/autoExport/teachers/shared/getTeacherProfile.ts
var getTeacherProfileRoute = {
  path: "/profile",
  method: "GET",
  paramsKey: []
};

// src/autoExport/teachers/web/admin/addTeacher.ts
var addTeacherByAdminRoute = {
  path: "/teacher",
  method: "POST",
  paramsKey: []
};

// src/autoExport/teachers/web/admin/getTeacherProfile.ts
var getTeacherProfileByAdminRoute = {
  path: "/teachers/:teacherNewId/profile",
  method: "GET",
  paramsKey: ["teacherNewId"]
};

// src/autoExport/teachers/web/admin/listTeachers.ts
var listTeachersByAdminRoute = {
  path: "/teachers",
  method: "GET",
  paramsKey: []
};

// src/autoExport/teachers/web/admin/updateTeacher.ts
var updateTeacherByAdminRoute = {
  path: "/teachers/:teacherNewId",
  method: "PATCH",
  paramsKey: ["teacherNewId"]
};

// src/autoExport/terms/web/admin/addTerm.ts
var addTermByAdminRoute = {
  path: "/terms",
  method: "POST",
  paramsKey: []
};

// src/autoExport/terms/web/admin/deleteTerm.ts
var deleteTermByAdminRoute = {
  path: "/terms/:termNewId",
  method: "DELETE",
  paramsKey: ["termNewId"]
};

// src/autoExport/terms/web/admin/listTerm.ts
var listTermByAdminRoute = {
  path: "/terms",
  method: "GET",
  paramsKey: []
};

// src/autoExport/terms/web/admin/updateTerm.ts
var updateTermByAdminRoute = {
  path: "/terms/:termNewId",
  method: "PATCH",
  paramsKey: ["termNewId"]
};

// src/autoExport/transactions/web/admin/listTransactions.ts
var listTransactionsByAdminRoute = {
  path: "/transactions",
  method: "GET",
  paramsKey: []
};

// src/autoExport/tutorial/web/admin/getTutorials.ts
var getTutorialsByAdminRoute = {
  path: "/tutorials",
  method: "GET",
  paramsKey: []
};

// src/autoExport/tutorial/web/master/addTutorial.ts
var addTutorialByMasterRoute = {
  path: "/tutorial",
  method: "POST",
  paramsKey: []
};

// src/autoExport/tutorial/web/master/deleteTutorial.ts
var deleteTutorialByMasterRoute = {
  path: "/tutorials/:tutorialNewId",
  method: "DELETE",
  paramsKey: ["tutorialNewId"]
};

// src/autoExport/tutorial/web/master/listTutorials.ts
var listTutorialsByMasterRoute = {
  path: "/tutorials",
  method: "GET",
  paramsKey: []
};

// src/autoExport/tutorial/web/master/updateTutorial.ts
var updateTutorialByMasterRoute = {
  path: "/tutorials/:tutorialNewId",
  method: "PATCH",
  paramsKey: ["tutorialNewId"]
};

// src/autoExport/users/shared/uploadAvatar.ts
var uploadAvatarRoute = {
  path: "/avatar",
  method: "PATCH",
  paramsKey: []
};

// src/autoExport/weeklySessions/web/admin/addWeeklySessionForClass.ts
var addWeeklySessionForClassByAdminRoute = {
  path: "/class/weekly-sessions",
  method: "POST",
  paramsKey: []
};

// src/autoExport/weeklySessions/web/admin/addWeeklySessionForGroup.ts
var addWeeklySessionForGroupByAdminRoute = {
  path: "/groups/weekly-sessions",
  method: "POST",
  paramsKey: []
};

// src/autoExport/weeklySessions/web/admin/deleteWeeklySession.ts
var deleteWeeklySessionByAdminRoute = {
  path: "/weekly-session/:weeklySessionNewId",
  method: "DELETE",
  paramsKey: ["weeklySessionNewId"]
};

// src/autoExport/weeklySessions/web/admin/updateWeeklySessionForClass.ts
var updateWeeklySessionForClassByAdminRoute = {
  path: "/class/weekly-sessions/:weeklySessionNewId",
  method: "PATCH",
  paramsKey: ["weeklySessionNewId"]
};

// src/autoExport/weeklySessions/web/admin/updateWeeklySessionForGroup.ts
var updateWeeklySessionForGroupByAdminRoute = {
  path: "/groups/weekly-sessions/:weeklySessionNewId",
  method: "PATCH",
  paramsKey: ["weeklySessionNewId"]
};

// ../src/core/ApplicationErrors.ts
var APPLICATION_ERROR_TYPE_ENUM = {
  AUTH_FAILURE: "AUTH_FAILURE",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  BAD_REQUEST: "BAD_REQUEST",
  PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
  NOT_FOUND: "NOT_FOUND",
  FORBIDDEN: "FORBIDDEN"
};
var ApplicationError = class extends Error {
  constructor(type, key, data) {
    super();
    this.type = type;
    this.key = key;
    this.data = data;
  }
};
var BadRequestError = class extends ApplicationError {
  constructor(key, data) {
    super(APPLICATION_ERROR_TYPE_ENUM.BAD_REQUEST, key, data);
  }
};

// ../src/feature/examGrade/domain/ib/IBSubjectAverage.valueobject.ts
var _IBSubjectAverage = class _IBSubjectAverage {
  constructor(mark, isDispensed) {
    this.mark = mark;
    this.isDispensed = isDispensed;
  }
  static create(grades) {
    if (grades.some((grade) => grade.isDispensed))
      return new _IBSubjectAverage(null, true);
    if (grades.some((grade) => grade.mark === null))
      return new _IBSubjectAverage(null, false);
    const total = grades.reduce((acc, grade) => acc + grade.mark, 0);
    let ranges = this.rangesForFourExams;
    if (grades.length === 3)
      ranges = this.rangesForThreeExams;
    for (const [average, range] of Object.entries(ranges)) {
      if (total >= range.min && total <= range.max)
        return new _IBSubjectAverage(+average, false);
    }
    throw new BadRequestError("grade.invalidMark");
  }
  format() {
    if (this.isDispensed)
      return DISPENSED_STATUS;
    if (this.mark === null)
      return null;
    return this.mark.toString();
  }
};
_IBSubjectAverage.MAX_MARK = 7;
_IBSubjectAverage.rangesForFourExams = {
  0: { min: 0, max: 0 },
  1: { min: 1, max: 5 },
  2: { min: 6, max: 9 },
  3: { min: 10, max: 14 },
  4: { min: 15, max: 18 },
  5: { min: 19, max: 23 },
  6: { min: 24, max: 27 },
  7: { min: 28, max: 32 }
};
_IBSubjectAverage.rangesForThreeExams = {
  0: { min: 0, max: 0 },
  1: { min: 1, max: 3 },
  2: { min: 4, max: 6 },
  3: { min: 7, max: 10 },
  4: { min: 11, max: 13 },
  5: { min: 14, max: 17 },
  6: { min: 18, max: 20 },
  7: { min: 21, max: 24 }
};
var IBSubjectAverage = _IBSubjectAverage;

// ../src/feature/examGrade/domain/ib/IBClassAverage.valueobject.ts
var IB_ANNUAL_GRADE_LEVELS_ENUM = {
  N0: "N0",
  N1: "N1",
  N2: "N2",
  N3: "N3"
};

// ../src/feature/lms/domain/chapterAttachment.entity.ts
var CHAPTER_ATTACHMENT_STATUS_ENUM = {
  USED: "used",
  UNUSED: "unused"
};
var CHAPTER_ATTACHMENT_FILE_TYPE_ENUM = {
  VIDEO: "video",
  DOCUMENT: "document"
};

// ../src/feature/issues/dtos/interaction.dto.ts
var INTERACTION_TYPE_ENUM = {
  ACTION: "action",
  REPLY: "reply"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ACTION_ENUM,
  ALERT_STATUS_ENUM,
  ALERT_TYPE_ENUM,
  AddMessageRoute,
  AddReactToMessageRoute,
  AssignStudentToClassByAdminRoute,
  CATEGORIES_ENUM,
  CHAPTER_ATTACHMENT_FILE_TYPE_ENUM,
  CHAPTER_ATTACHMENT_STATUS_ENUM,
  CompleteScheduleGenerationByPublicRoute,
  DeleteSessionTypeByAdminRoute,
  EDUCATION_DEPARTMENT_ENUM,
  ESTABLISHMENT_TITLE_ENUM,
  EXAM_GRADE_SYSTEM_ENUM,
  FEATURE_FLAGS_ENUM,
  GRADE_REPORT_THEM_ENUM,
  GetChildAttendanceStatsRoute,
  GetMessageReactionsRoute,
  HOMEWORK_STATUS_ENUM,
  IB_ANNUAL_GRADE_LEVELS_ENUM,
  INSTANCE_TYPE_ENUM,
  INTERACTION_TYPE_ENUM,
  MarkScheduleAsErroredByPublicRoute,
  NOTIFICATION_TYPES_ENUM,
  PROMOTION_STATUS_ENUM,
  REACTION_TYPE_ENUM,
  REGISTRATION_STEP_ENUM,
  RESOURCES_ENUM,
  SMART_CALENDAR_SCHEDULE_STATUS_ENUM,
  TEMPLATE_ENUM,
  TRANSACTION_ADJUSTMENT_TYPE_ENUM,
  addAdminByAdminRoute,
  addAlertByAdminRoute,
  addBarCodeConfigByAdminRoute,
  addChapterAttachmentRoute,
  addChapterRoute,
  addClassByAdminRoute,
  addClassTypeActivityByAdminRoute,
  addClassTypeByAdminRoute,
  addClassroomByAdminRoute,
  addCommentToPostRoute,
  addDiplomaByAdminRoute,
  addExamTypeByAdminRoute,
  addExpenseByAdminRoute,
  addFieldToClassTypeByAdminRoute,
  addGradeReportTemplateByAdminRoute,
  addGroupByAdminRoute,
  addGroupTypeByAdminRoute,
  addHolidayByAdminRoute,
  addInvoiceForStudentByAdminRoute,
  addIssueRoute,
  addLevelByAdminRoute,
  addMasterByMasterRoute,
  addObservationReasonByAdminRoute,
  addObservationRoute,
  addParentByAdminRoute,
  addParticipantToGroupRoute,
  addPaymentTemplateByAdminRoute,
  addPostRoute,
  addReplyToCommentRoute,
  addRoleByMasterRoute,
  addSchoolByMasterRoute,
  addSectionByAdminRoute,
  addServiceByAdminRoute,
  addSessionForClassByAdminRoute,
  addSessionForGroupByAdminRoute,
  addSessionTypeByAdminRoute,
  addSignatureByAdminRoute,
  addStudentByAdminRoute,
  addSubLevelByAdminRoute,
  addSubSubjectToClassTypeByAdminRoute,
  addSubSubjectTypeByAdminRoute,
  addSubjectToClassTypeByAdminRoute,
  addSubjectTypeByAdminRoute,
  addSupplierByAdminRoute,
  addTeacherByAdminRoute,
  addTeacherPaymentConfigurationByAdminRoute,
  addTeacherPaymentTransactionByAdminRoute,
  addTermByAdminRoute,
  addTransactionByAdminRoute,
  addTutorialByMasterRoute,
  addWeeklySessionForClassByAdminRoute,
  addWeeklySessionForGroupByAdminRoute,
  applySmartCalendarScheduleByAdminRoute,
  applyWeeklyScheduleForClassByAdminRoute,
  applyWeeklyScheduleForGroupByAdminRoute,
  archiveAdminByAdminRoute,
  archiveParentByAdminRoute,
  archiveStudentByAdminRoute,
  archiveTeacherByAdminRoute,
  assignStudentToGroupByAdminRoute,
  assignTeacherToIssueByAdminRoute,
  assignTeacherToSubSubjectInClassByAdminRoute,
  assignTeacherToSubjectInClassByAdminRoute,
  cancelSessionByAdminRoute,
  cancelSmartCalendarScheduleByAdminRoute,
  checkGroupRoute,
  closeSessionRoute,
  completeTermByAdminRoute,
  confirmAttendanceRoute,
  deleteAlertByAdminRoute,
  deleteBarCodeConfigByAdminRoute,
  deleteChapterAttachmentRoute,
  deleteChapterRoute,
  deleteClassByAdminRoute,
  deleteClassTypeActivityByAdminRoute,
  deleteClassTypeByAdminRoute,
  deleteClassroomByAdminRoute,
  deleteDiplomaByAdminRoute,
  deleteExamTypeByAdminRoute,
  deleteExpenseByAdminRoute,
  deleteFieldFromClassTypeByAdminRoute,
  deleteGradeReportTemplateByAdminRoute,
  deleteGroupByAdminRoute,
  deleteGroupTypeByAdminRoute,
  deleteHolidayByAdminRoute,
  deleteInvoiceByAdminRoute,
  deleteLevelByAdminRoute,
  deleteMasterByMasterRoute,
  deleteMessageRoute,
  deleteObservationByAdminRoute,
  deleteObservationReasonByAdminRoute,
  deleteParticipantFromGroupRoute,
  deletePaymentTemplateByAdminRoute,
  deletePostRoute,
  deletePreRegistrationByAdminRoute,
  deleteRoleByMasterRoute,
  deleteSectionByAdminRoute,
  deleteServiceByAdminRoute,
  deleteSessionByAdminRoute,
  deleteSignatureByAdminRoute,
  deleteSmartCalendarScheduleByAdminRoute,
  deleteSubLevelByAdminRoute,
  deleteSubSubjectFromClassTypeByAdminRoute,
  deleteSubSubjectTypeByAdminRoute,
  deleteSubjectFromClassTypeByAdminRoute,
  deleteSubjectTypeByAdminRoute,
  deleteSuppliersByAdminRoute,
  deleteTeacherPaymentTransactionByAdminRoute,
  deleteTermByAdminRoute,
  deleteTransactionsByAdminRoute,
  deleteTutorialByMasterRoute,
  deleteWeeklySessionByAdminRoute,
  forgetPasswordRoute,
  forwardIssueByAdminRoute,
  generateScheduleByAdminRoute,
  getActivitiesOfClassTypeByAdminRoute,
  getAdminByNewIdByAdminRoute,
  getAlertDetailsByAdminRoute,
  getAlertStatisticsByAdminRoute,
  getAllCambridgeAnnualGradeReportsByAdminRoute,
  getAllCambridgeGradeReportsOfClassByAdminRoute,
  getAllIBGradeReportsOfClassByAdminRoute,
  getAllPrimaryAnnualGradeReportOfClassByAdminRoute,
  getAllPrimaryGradeReportsOfClassByAdminRoute,
  getAllSecondaryGradeReportsOfClassByAdminRoute,
  getAnnualAveragesOfClassByAdminRoute,
  getAppVersionByMasterRoute,
  getAppVersionByPublicRoute,
  getAvailableClassroomByAdminRoute,
  getAvailableClassroomInWeeklySessionByAdminRoute,
  getCambridgeAnnualAveragesOfClassByAdminRoute,
  getCambridgeAveragesOfClassByAdminRoute,
  getCambridgeBlankExamPageByAdminRoute,
  getCambridgeChildGradeReportPDFRoute,
  getCambridgeChildGradeReportRoute,
  getCambridgeSubjectsOfClassByAdminRoute,
  getCambridgeSubjectsOfClassByTeacherRoute,
  getChaptersByTopicRoute,
  getChildInvoicesByParentRoute,
  getChildrenOfParentsByParentRoute,
  getClassDashboardByAdminRoute,
  getClassDiplomasByAdminRoute,
  getClassListByAdminRoute,
  getClassListByTeacherRoute,
  getClassOverviewRoute,
  getClassTypeByAdminRoute,
  getCurrentUserByAdminRoute,
  getCurrentUserByMasterRoute,
  getCurrentUserByStudentRoute,
  getCurrentUserByTeacherRoute,
  getCurrentUserRoute,
  getDashboardByAdminRoute,
  getDashboardByParentRoute,
  getDashboardByStudentRoute,
  getDashboardByTeacherRoute,
  getDraftWeeklyScheduleByAdminRoute,
  getEntityScheduleByAdminRoute,
  getFieldsOfClassByAdminRoute,
  getFieldsOfClassByTeacherRoute,
  getFieldsOfClassTypeByAdminRoute,
  getFinanceDashboardByAdminRoute,
  getGradesOfCambridgeGroupByAdminRoute,
  getGradesOfCambridgeGroupByTeacherRoute,
  getGradesOfCambridgeSubjectByAdminRoute,
  getGradesOfCambridgeSubjectByTeacherRoute,
  getGradesOfFieldByAdminRoute,
  getGradesOfFieldByTeacherRoute,
  getGradesOfIBGroupRoute,
  getGradesOfIBSubjectRoute,
  getGradesOfSecondaryGroupByAdminRoute,
  getGradesOfSecondaryGroupByTeacherRoute,
  getGradesOfSecondarySubjectByAdminRoute,
  getGradesOfSecondarySubjectByTeacherRoute,
  getGroupListByAdminRoute,
  getGroupOverviewRoute,
  getGroupTypesOfChaptersRoute,
  getGroupsOfClassByAdminRoute,
  getIBAdminObservationsByAdminRoute,
  getIBAnnualAveragesOfClassByAdminRoute,
  getIBAveragesOfClassByAdminRoute,
  getIBBlankExamPageByAdminRoute,
  getIBChildGradeReportPDFRoute,
  getIBStudentGradeReportByAdminRoute,
  getIBSubjectsOfClassRoute,
  getInvoiceDetailsByAdminRoute,
  getInvoiceDetailsRoute,
  getInvoicePdfDataByAdminRoute,
  getLevelDegreesCoverageByAdminRoute,
  getLevelsOverviewByAdminRoute,
  getMessageTargetUsersRoute,
  getNotPromotedStudentsByAdminRoute,
  getOneCommentRoute,
  getOneConversationMessagesRoute,
  getOneConversationRoute,
  getOneHomeworkRoute,
  getOneIssueRoute,
  getOneObservationRoute,
  getOnePostRoute,
  getOnePreRegistrationByPublicRoute,
  getOneRoleByMasterRoute,
  getParentByNewIdByAdminRoute,
  getPaymentTemplateByAdminRoute,
  getPrimaryAnnualGradeReportOfStudentByAdminRoute,
  getPrimaryAveragesOfClassByAdminRoute,
  getPrimaryBlankExamPageByAdminRoute,
  getPrimaryChildGradeReportPDFRoute,
  getPrimaryChildGradeReportRoute,
  getPrimaryGradeReportStatsByAdminRoute,
  getReactionsOfCommentRoute,
  getReactionsOfPostRoute,
  getScheduleRoute,
  getSchoolAvailableTimeConstraintsByAdminRoute,
  getSchoolConfigByPublicRoute,
  getSchoolDetailsByAdminRoute,
  getSchoolLogoByPublicRoute,
  getSchoolPreRegistrationByPublicRoute,
  getSchoolSignatureByPublicRoute,
  getSearchInvoiceByAdminRoute,
  getSecondaryAveragesOfClassByAdminRoute,
  getSecondaryBlankExamPageByAdminRoute,
  getSecondaryChildGradeReportPDFRoute,
  getSecondaryChildGradeReportRoute,
  getSecondaryGradeReportStatsByAdminRoute,
  getSecondarySubjectsOfClassByAdminRoute,
  getSecondarySubjectsOfClassByTeacherRoute,
  getSessionDetailsRoute,
  getSmartSchedulePDFByAdminRoute,
  getStudentAttendanceCertificateByAdminRoute,
  getStudentCambridgeAnnualGradeReportByAdminRoute,
  getStudentDiplomaByAdminRoute,
  getStudentGradeReportCambridgeByAdminRoute,
  getStudentGradeReportPrimaryByAdminRoute,
  getStudentGradeReportSecondaryByAdminRoute,
  getStudentInvoicesByAdminRoute,
  getStudentPaymentConfigurationByAdminRoute,
  getStudentProfileByAdminRoute,
  getStudentProfileRoute,
  getStudentTopicsChaptersRoute,
  getStudentsCodeBarePdfByAdminRoute,
  getStudentsOfClassRoute,
  getStudentsOfGroupByAdminRoute,
  getSubjectsOfClassByAdminRoute,
  getSubjectsOfClassTypesByAdminRoute,
  getTeacherClassAndGroupsByAdminRoute,
  getTeacherClassAndGroupsRoute,
  getTeacherPaymentConfigurationByAdminRoute,
  getTeacherPaymentDashboardByAdminRoute,
  getTeacherProfileByAdminRoute,
  getTeacherProfileRoute,
  getTeachersOfStudentRoute,
  getTopicOfGroupByAdminRoute,
  getTopicsOfChaptersByClassTypeRoute,
  getTutorialsByAdminRoute,
  getUsersOfPostForMentionRoute,
  getWeeklyScheduleRoute,
  hideTermByAdminRoute,
  importStudentsByAdminRoute,
  incompleteTermByAdminRoute,
  listAdminsByAdminRoute,
  listAlertsByAdminRoute,
  listBankChecksByAdminRoute,
  listBankTransfersByAdminRoute,
  listBarCodeConfigByAdminRoute,
  listChapterAttachmentsRoute,
  listChapterDocumentsRoute,
  listChapterVideoRoute,
  listClassTypesByAdminRoute,
  listClassTypesByPublicRoute,
  listClassTypesByTeacherRoute,
  listClassesByAdminRoute,
  listClassesRoute,
  listClassroomsByAdminRoute,
  listCommentsOfPostRoute,
  listConversationAttachmentsRoute,
  listConversationLinksRoute,
  listConversationMessagesRoute,
  listConversationMultimediaRoute,
  listConversationParticipantsRoute,
  listConversationsRoute,
  listDiplomasByAdminRoute,
  listExamTypesByAdminRoute,
  listExpensesByAdminRoute,
  listGradeReportTemplatesByAdminRoute,
  listGroupTypesByAdminRoute,
  listGroupsByAdminRoute,
  listGroupsRoute,
  listHolidayByAdminRoute,
  listHomeworksByAdminRoute,
  listHomeworksByParentRoute,
  listHomeworksByStudentRoute,
  listHomeworksByTeacherRoute,
  listInteractionsOfIssueRoute,
  listInvoicesByAdminRoute,
  listIssueReasonsRoute,
  listIssuesByAdminRoute,
  listIssuesOfParentRoute,
  listIssuesOfTeacherRoute,
  listLevelsByAdminRoute,
  listLevelsByPublicRoute,
  listMastersByMasterRoute,
  listNextClassTypesByAdminRoute,
  listNotificationsRoute,
  listObservationReasonsRoute,
  listObservationsByAdminRoute,
  listObservationsByParentRoute,
  listObservationsByStudentRoute,
  listObservationsByTeacherRoute,
  listParentsByAdminRoute,
  listPaymentTemplatesByAdminRoute,
  listPostsRoute,
  listPreRegistrationByAdminRoute,
  listRepliesOfCommentRoute,
  listRolesByAdminRoute,
  listRolesByMasterRoute,
  listSchoolYearByAdminRoute,
  listSchoolsByMasterRoute,
  listSectionsByAdminRoute,
  listServicesByAdminRoute,
  listSessionTypeByAdminRoute,
  listSignaturesByAdminRoute,
  listSmartCalendarScheduleByAdminRoute,
  listSmsSoldHistoriesByMasterRoute,
  listStudentsByAdminRoute,
  listSubLevelsByAdminRoute,
  listSubSubjectTypesByAdminRoute,
  listSubjectTypesByAdminRoute,
  listSuppliersByAdminRoute,
  listTargetUsersForGroupConversationAssignmentRoute,
  listTeacherSessionsByAdminRoute,
  listTeachersByAdminRoute,
  listTermByAdminRoute,
  listTransactionsByAdminRoute,
  listTutorialsByMasterRoute,
  listUnenrolledStudentsByAdminRoute,
  listUnenrolledStudentsForGroupByAdminRoute,
  listUsersForAlertByAdminRoute,
  loginByMasterRoute,
  loginByStudentRoute,
  loginRoute,
  logoutRoute,
  mergeInvoicesByAdminRoute,
  payInvoiceByAdminRoute,
  payTeacherByAdminRoute,
  publishTermByAdminRoute,
  reactToCommentRoute,
  reactToPostRoute,
  registerStudentByAdminRoute,
  reorderExamTypeByAdminRoute,
  reorderFieldsOfClassTypesByAdminRoute,
  reorderLevelsByAdminRoute,
  reorderSubLevelsByAdminRoute,
  reorderSubSubjectsOfClassTypesByAdminRoute,
  reorderSubjectsOfClassTypesByAdminRoute,
  resendInvitationByAdminRoute,
  resetPasswordRoute,
  resetUserPasswordByAdminRoute,
  sendReplyRoute,
  startConversationRules,
  startSessionRoute,
  switchLevelsToNextSchoolYearByAdminRoute,
  switchShoolByMasterRoute,
  switchStudentsClassByAdminRoute,
  switchToUserByAdminRoute,
  togglePinStatusOfPostRoute,
  toggleUserActivationByAdminRoute,
  unArchiveAdminByAdminRoute,
  unArchiveParentByAdminRoute,
  unArchiveStudentByAdminRoute,
  unArchiveTeacherByAdminRoute,
  unAssignStudentFromClassByAdminRoute,
  unAssignTeacherFromSubSubjectByAdminRoute,
  unAssignTeacherFromSubjectByAdminRoute,
  unPayTeacherByAdminRoute,
  unassignStudentFromGroupByAdminRoute,
  unassignTeacherFromIssueByAdminRoute,
  unmergeInvoiceByAdminRoute,
  unpayInvoiceByAdminRoute,
  unpaySplitByAdminRoute,
  updateAdminByAdminRoute,
  updateAdminObservationsByAdminRoute,
  updateAlertByAdminRoute,
  updateAppVersionByMasterRoute,
  updateBankCheckByAdminRoute,
  updateBankTransferByAdminRoute,
  updateBarCodeConfigByAdminRoute,
  updateCambridgeGradesOfGroupRoute,
  updateCambridgeGradesRoute,
  updateChapterAttachmentRoute,
  updateChapterRoute,
  updateClassByAdminRoute,
  updateClassConstraintsByAdminRoute,
  updateClassTypeActivityByAdminRoute,
  updateClassTypeByAdminRoute,
  updateClassroomByAdminRoute,
  updateConversationNameRoute,
  updateConversationSeenStatuesRoute,
  updateCurrentUserPasswordRoute,
  updateDiplomaByAdminRoute,
  updateExamTypeByAdminRoute,
  updateExpenseByAdminRoute,
  updateFieldOfClassTypeByAdminRoute,
  updateFlagsByMasterRoute,
  updateGradeReportTemplateByAdminRoute,
  updateGroupByAdminRoute,
  updateGroupTypeByAdminRoute,
  updateHolidayByAdminRoute,
  updateIBGradesOfClassRoute,
  updateIBGradesOfGroupRoute,
  updateInvoiceByAdminRoute,
  updateInvoiceRemindersByAdminRoute,
  updateIssueStatusByAdminRoute,
  updateLevelByAdminRoute,
  updateMasterByMasterRoute,
  updateNotAvailableTimesByAdminRoute,
  updateObservationReasonByAdminRoute,
  updateObservationRoute,
  updateParentByAdminRoute,
  updatePaymentTemplateByAdminRoute,
  updatePostRoute,
  updatePreRegistrationByAdminRoute,
  updatePreRegistrationByPublicRoute,
  updatePrimaryGradesRoute,
  updateRoleByMasterRoute,
  updateSchoolByAdminRoute,
  updateSchoolByMasterRoute,
  updateSchoolYearByAdminRoute,
  updateSecondaryGradesOfGroupRoute,
  updateSecondaryGradesRoute,
  updateSectionByAdminRoute,
  updateServiceByAdminRoute,
  updateSessionDetailsRoute,
  updateSessionForClassByAdminRoute,
  updateSessionForGroupByAdminRoute,
  updateSessionStatusByAdminRoute,
  updateSessionTypeByAdminRoute,
  updateSignatureByAdminRoute,
  updateSmartCalendarScheduleByAdminRoute,
  updateSmsSoldByMasterRoute,
  updateStudentByAdminRoute,
  updateStudentGroupByAdminRoute,
  updateStudentPaymentConfigurationByAdminRoute,
  updateStudentPromotionStatusByAdminRoute,
  updateSubLevelByAdminRoute,
  updateSubSubjectOfClassTypeByAdminRoute,
  updateSubSubjectTypeByAdminRoute,
  updateSubjectOfClassTypeByAdminRoute,
  updateSubjectTypeByAdminRoute,
  updateSupplierByAdminRoute,
  updateTeacherByAdminRoute,
  updateTeacherConstraintsByAdminRoute,
  updateTeacherPaymentConfigurationByAdminRoute,
  updateTermByAdminRoute,
  updateTransactionsByAdminRoute,
  updateTutorialByMasterRoute,
  updateWeeklySessionForClassByAdminRoute,
  updateWeeklySessionForGroupByAdminRoute,
  uploadAvatarRoute,
  verifyCodeRoute
});
