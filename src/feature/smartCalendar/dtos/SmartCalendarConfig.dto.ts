export type SmartCalendarConfigDTO = {
  id: string;
  schoolSubdomain: string;
  globalSchoolConfig: {
    studyDays: string[];
    studySlots: number[];
    notAvailableSlots: NotAvailableDetails[];
    numberOfSlotsInOneHour: number;
  };
  subjects: {
    name: string;
    preferredStartingSlots: string[];
  }[];
  activityTags: { name: string }[];
  teachers: {
    name: string;
    notAvailableSlots: NotAvailableDetails[];
    preferredClassroom: string | null;
    maxGapsPerDay: number | null;
  }[];
  classrooms: {
    name: string;
    allowedSubjects: string[];
    allowedActivityTags: string[];
  }[];
  studentSets: {
    name: string;
    preferredClassroom: string | null;
    notAvailableSlots: NotAvailableDetails[];
    maxGapsPerDay: number | null;
    maxDurationPerDay: number | null;
  }[];
  activities: {
    topicType: string;
    topicId: string;
    durationInSlots: number;
    activityTags: string;
    teacher: string;
    studentSets: string;
    isPerGroup: boolean;
    week: "A" | "B" | null;
  }[];
};

type NotAvailableDetails = {
  day: string;
  slot: number;
};
