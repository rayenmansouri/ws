export type TranslationObject = {
  chapterAttachment: {
    videoAndOtherFiles: string;
  };
  global: {
    internalError: string;
    variableUsedBeforeInit: string;
    listSuccessfullyRetrieved: string;
    largePayload: string;
    permissionDenied: string;
    unsupportedFile: string;
    invalidJSON: string;
    success: string;
    accessDenied: string;
    badRequest: string;
    fileIsRequired: string;
  };
  validation: {
    parentEmailOrPhoneNumberRequired: string;
    newPasswordMustNoBeTheSameAsOldPassword: string;
    invalidPassword: string;
  };
  authentication: {
    invalidCredentials: string;
    cannotResetYourOwnPassword: string;
    resetUserPasswordWithSuccess: string;
  };
  classGroup: {
    notBelongToThisClass: string;
  };
  chapter: {
    classTypeOrTopicWithGroupTypeRequired: string;
  };
  notFound: {
    chapter: string;
    chapterAttachment: string;
    tutorial: string;
    classGroup: string;
    weeklySession: string;
    preRegistration: string;
    group: string;
    teacherProfile: string;
    topicType: string;
    teacher: string;
    student: string;
    user: string;
    level: string;
    classType: string;
    class: string;
    nextClassType: string;
    parent: string;
    homework: string;
    issue: string;
    notification: string;
    subjectType: string;
    groupType: string;
    school: string;
    term: string;
    service: string;
    expense: string;
    supplier: string;
    transaction: string;
    diploma: string;
    post: string;
    comment: string;
    admin: string;
    conversation: string;
    message: string;
    session: string;
    observation: string;
    subLevel: string;
    section: string;
    subject: string;
    subSubjectType: string;
    field: string;
    examType: string;
    observationReason: string;
    holiday: string;
    master: string;
    barCode: string;
    osAppVersion: string;
    sessionType: string;
    classroom: string;
    schoolYear: string;
    invoice: string;
    alert: string;
    bankTransfer: string;
    gradeReportTemplate: string;
    teacherPaymentConfiguration: string;
    bankCheck: string;
    activity: string;
    paymentHistory: string;
    schedule: string;
    paymentTemplate: string;
    issueReason: string;
    signature: string;
  };
  alreadyUsed: {
    examType: string;
    name: string;
    email: string;
    phoneNumber: string;
    nationalCardId: string;
    uniqueId: string;
    averageRange: string;
    fieldName: string;
    subdomain: string;
    range: string;
    subjectType: string;
    term: string;
    sessionType: string;
    classroom: string;
  };
  alreadyExist: {
    schoolYear: string;
  };
  holiday: {
    createdSuccessfully: string;
    updatedSuccessfully: string;
    deletedSuccessfully: string;
  };
  studentRules: {
    notBelongToThisClass: string;
    studentAlreadyAssignedToParent: string;
    parentAlreadyAssignedToStudent: string;
    studentNotAssignedToParent: string;
    parentNotAssignedToStudent: string;
    importWithSuccess: string;
    studentNotAssignedToClass: string;
    studentNotAssignedToGroup: string;
  };
  classType: {
    subjectTypeNotIncluded: string;
    updateSuccessfully: string;
    createdSuccessfully: string;
    subjectsReorderedSuccessfully: string;
    subSubjectsReorderedSuccessfully: string;
    fieldReorderedSuccessfully: string;
    subjectTypeAlreadyUsed: string;
    subjectToClassTypeAddedSuccessfully: string;
    subjectTypeNotFound: string;
    subjectTypeDoesNotHaveSubSubjects: string;
    subSubjectTypeAlreadyUsed: string;
    fieldAddedSuccessfully: string;
    linkedWithSomeClasses: string;
    linkedWithSomeStudents: string;
    linkedWithSomePreRegistrations: string;
    linkedWithSomeNextClassTypes: string;
    linkedWithSomeSection: string;
    subSubjectDeletedSuccessfully: string;
  };
  groupType: {
    coefficientRequired: string;
    examsRequired: string;
  };
  observationReason: {
    updatedSuccessfully: string;
    deletedSuccessfully: string;
    addedSuccessfully: string;
    IsUsed: string;
  };
  classTypeRules: {
    classTypeAndLevelAreNotValid: string;
  };
  student: {
    classTypeDoesNotMatch: string;
    alreadyInClass: string;
    addedSuccessfully: string;
    updatedSuccessfully: string;
    notAssignedToClass: string;
    noAverage: string;
    noDiploma: string;
    alreadyArchived: string;
    alreadyUnArchived: string;
    cannotArchiveStudentAssignedToClass: string;
    cannotArchiveStudentAssignedToGroups: string;
    cannotChangeLevelWhenAssignedToClass: string;
    cannotChangeClassTypeWhenAssignedToClass: string;
  };
  parent: {
    addedSuccessfully: string;
    alreadyArchived: string;
    alreadyUnArchived: string;
    cannotArchiveLastParentOfStudent: string;
    updatedSuccessfully: string;
  };
  teacher: {
    cannotTeacherThisGroupType: string;
    cannotTeacherThisSubjectType: string;
    cannotTeachInThisLevel: string;
    teacherAlreadyAssigned: string;
    addedSuccessfully: string;
    cannotSeeThisClassLevels: string;
    sessionDoesNotBelongsToThisTeacher: string;
    alreadyArchived: string;
    alreadyUnArchived: string;
    cannotArchiveTeacherAssignedToClass: string;
    cannotArchiveTeacherAssignedToGroup: string;
    notAssignedToClass: string;
    updatedSuccessfully: string;
    cannotRemoveLevelWithClasses: string;
    alreadyPaid: string;
    notPaid: string;
    salary: string;
    notAssignedToSubject: string;
  };
  admin: {
    addedSuccessfully: string;
    updatedSuccessfully: string;
    alreadyArchived: string;
    alreadyUnArchived: string;
    CannotArchiveYourself: string;
  };
  class: {
    teacherAlreadyAssigned: string;
    noTeacherAssigned: string;
    classReturnedSuccessfully: string;
    updateSuccessfully: string;
    deletedSuccessfully: string;
    alreadyGenerated: string;
    hasNoStudent: string;
    withoutNextClassType: string;
    maxStudentReached: string;
  };
  classRules: {
    teacherIsNotInClass: string;
    classHasTeacher: string;
    classHasStudent: string;
  };
  roleManagement: {
    roleNotFound: string;
    permissionNotValid: string;
    createdSuccessfully: string;
    updatedSuccessfully: string;
    deletedSuccessfully: string;
  };
  supplier: {
    addedSuccessfully: string;
    updatedSuccessfully: string;
    deletedSuccessfully: string;
  };
  groupTypeRules: {
    coefficientAndExamNotValid: string;
    groupTypeUsedInGroup: string;
  };
  groupRules: {
    groupIncludeInGradeBookCannotHaveMultipleLevels: string;
    studentNotInGroup: string;
    groupHasStudent: string;
    groupsAndLevelsAreNotValid: string;
    teacherIsNotInGroup: string;
    studentAlreadyInGroup: string;
    studentAndLevelMismatch: string;
    studentClassTypeNotMatch: string;
  };
  transaction: {
    haveSupplier: string;
  };
  services: {
    isUsed: string;
    doesNotHaveAmount: string;
    maxDefaultServicesReached: string;
  };
  diploma: {
    addedSuccessfully: string;
    updateSuccessfully: string;
    diplomaNameNotFound: string;
  };
  issue: {
    accessDenied: string;
    newStatusMustBeDifferentThanOldStatus: string;
    alreadyResolved: string;
    noTeacherAssigned: string;
    alreadyForwarded: string;
    attachmentOrTextRequired: string;
    youCannotSendReply: string;
  };
  conversations: {
    groupConversationNameUpdateOnlyAllowed: string;
    duplicateParticipants: string;
    cannotRemoveAllParticipants: string;
    alreadyParticipating: string;
    groupNameRequired: string;
    groupAlreadyExists: string;
    groupConversationMinimumTwoParticipants: string;
    cannotRemoveTheLastAdmin: string;
    conversationMustBeGroup: string;
    youAreNotAdminInsideThisGroup: string;
    replyToMessageDoesNotBelongToThisConversation: string;
  };
  messages: {
    eitherContentOrAttachmentMustBeProvided: string;
    conversationAlreadyExist: string;
    youAreNotAllowedToStartConversation: string;
    youAreNotPartOfThisConversation: string;
    youCannotStartConversationByYourSelf: string;
  };
  term: {
    invalid: string;
    notCompleted: string;
    isCompleted: string;
    cannotBeCompleted: string;
    previousTermNotCompleted: string;
    alreadyPublished: string;
    notPublished: string;
    annual: string;
    previousTermsNeedToBeUncompleted: string;
  };
  invalid: {
    teacher: string;
    newRank: string;
    classType: string;
    subjectType: string;
    subSubjectType: string;
    subLevels: string;
    class: string;
    examGrade: string;
    session: string;
    group: string;
    weeklySession: string;
    code: string;
  };
  weeklySession: {
    cannotBeUpdated: string;
    updateSuccessfully: string;
  };
  subject: {
    stillTaught: string;
    hasSubSubjects: string;
    cannotHaveExams: string;
    updatedSuccessfully: string;
  };
  grade: {
    coefficientMustBePositive: string;
    invalidMark: string;
    markMustBeNullIfDispensed: string;
    notFound: string;
  };
  section: {
    createdSuccessfully: string;
    updatedSuccessfully: string;
    deletedSuccessfully: string;
  };
  level: {
    createdSuccessfully: string;
    updatedSuccessfully: string;
    deletedSuccessfully: string;
    hasMultipleSchoolYear: string;
    hasSubLevels: string;
    hasInvoices: string;
    hasTeacher: string;
    hasTeacherPaymentHistory: string;
    hasStudents: string;
    hasTransactions: string;
    hasPreRegistrations: string;
    hasClassTypes: string;
    cannotSwitchToNextSchoolYear: string;
    unsupportedExamGradeSystem: string;
  };
  subLevel: {
    createdSuccessfully: string;
    updatedSuccessfully: string;
    deletedSuccessfully: string;
    hasGroup: string;
    hasSections: string;
    hasClassType: string;
  };
  session: {
    present: string;
    absent: string;
    expelled: string;
    late: string;
    groupNotAvailable: string;
    classGroupNotAvailable: string;
    deletedSuccessfully: string;
    sessionTimePassedForConfirmationAttendance: string;
    cannotUpdateInThePast: string;
    startTimeMustBeBeforeEndTime: string;
    sessionAlreadyClosed: string;
    sessionMustBeInProgress: string;
    sessionIsAlreadyPaid: string;
    enableToTerminateSessionBeforeItEnd: string;
    teacherHasAlreadyStartedSession: string;
    youCanOnlyStartThisSessionAfterTheMinimumSessionLaunchTime: string;
    sessionCannotBeLaunched: string;
    sessionMustBelongToAClassOrAGroupOrClassGroup: string;
    sessionStatusCannotBeUpdateItToPending: string;
    canceledSessionCanOnlyBeUpdatedToPending: string;
    youCanOnlyCloseThisSessionBeforeEndTime: string;
    cannotChangeStatusFromCompletedToPending: string;
    onlyPendingCanceledSessionCanBeDeleted: string;
    teacherOfThisSessionAlreadyPaid: string;
    sessionCannotBeInThePass: string;
    teacherNotAvailable: string;
    classroomNotAvailable: string;
    classNotAvailable: string;
  };
  subjectType: {
    addedSuccessfully: string;
    updatedSuccessfully: string;
    deletedSuccessfully: string;
    isUsed: string;
    isTaughtByTeacher: string;
  };
  subSubjectType: {
    addedSuccessfully: string;
    updatedSuccessfully: string;
    deletedSuccessfully: string;
  };
  master: {
    addedSuccessfully: string;
    updatedSuccessfully: string;
    deletedSuccessfully: string;
  };
  school: {
    addedSuccessfully: string;
    configNotFound: string;
    updatedSuccessfully: string;
  };
  schoolYear: {
    hasEnded: string;
  };
  invoice: {
    paymentSplitIndexOutOfRange: string;
    invalidPaymentMethodForSplitPayment: string;
    invoiceAlreadyPaid: string;
    cannotDeleteAllSplitWithExistingPaidSplits: string;
    cannotBePrinted: string;
    splitAlreadyPaid: string;
    cannotPayInvoiceThatIsMergedIntoAnotherInvoice: string;
    transactionReferenceAlreadyExists: string;
    salaryCannotBeNegative: string;
    cannotBeMerged: string;
    cannotBeUnMerged: string;
    cannotBeUnPaid: string;
    cannotBeUpdated: string;
    splitsAmountNotValid: string;
    splitsCountNotValid: string;
  };
  missing: {
    avatar: string;
    birthDate: string;
  };
  user: {
    avatarUploadedSuccessfully: string;
  };
  alert: {
    invalidAlertConfiguration: string;
    cannotDeleteSentAlert: string;
    cannotUpdateSentAlert: string;
    userAlreadyExists: string;
    notEnoughSmsSold: string;
    cannotMinusThisSmsAmount: string;
    userWithoutPhoneNumber: string;
  };
  gradeReportTemplate: {
    addedSuccessfully: string;
    updatedSuccessfully: string;
    deletedSuccessfully: string;
    cannotDeleteDefaultTemplate: string;
    cannotDeleteBuiltInTemplate: string;
  };
  bankCheck: {
    checkNumberAlreadyUsed: string;
    updateSuccessfully: string;
  };
  expenses: {
    addedSuccessfully: string;
    updatedSuccessfully: string;
    deletedSuccessfully: string;
  };
  preRegistration: {
    registerStudentSuccess: string;
    missingInformation: string;
    deletePreRegistrationSuccess: string;
    preRegistrationDeletionPolicy: string;
  };
  smartCalendar: {
    activityAddedSuccessfully: string;
    activityUpdatedSuccessfully: string;
    activityDeletedSuccessfully: string;
    scheduleStartedSuccessfully: string;
    scheduleAlreadyInProgress: string;
    scheduleUpdatedSuccessfully: string;
    scheduleDeletedSuccessfully: string;
    scheduleInProgressCannotBeDeleted: string;
    scheduleAppliedSuccessfully: string;
    scheduleCancelledSuccessfully: string;
    activityWithoutTeacher: string;
  };
  attendanceStatues: {
    present: string;
    late: string;
    absent: string;
    expelled: string;
  };
  urgencies: {
    high: string;
    low: string;
    medium: string;
  };
  signatures: {
    addedSuccessfully: string;
    deletedSuccessfully: string;
  };
  post: {
    addedSuccessfully: string;
    updatedSuccessfully: string;
    commentsNotAllowed: string;
    commentAddedSuccessfully: string;
    maximumPinnedPostsReached: string;
    deletedSuccessfully: string;
  };
};

export type TranslationPaths = ExtractAllPaths<TranslationObject>;

type ExtractAllPaths<T extends Record<string, unknown>> = keyof {
  [K in keyof T as T[K] extends string
    ? K
    : T[K] extends Record<string, unknown>
    ? `${K & string}.${ExtractAllPaths<T[K]> & string}`
    : never]: string;
};
