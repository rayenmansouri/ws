import { XMLBuilder } from "fast-xml-parser";
import fs from "fs/promises";
import path from "path";
import { SmartCalendarConfigDTO } from "../../feature/smartCalendar/dtos/SmartCalendarConfig.dto";
import logger from "../../core/Logger";

export class FetFileGenerator {
  private static readonly builder = new XMLBuilder();

  static async createFile(config: SmartCalendarConfigDTO): Promise<void> {
    const xmlContent = this.generateXMLContent(config);
    await this.saveToFile(config.id, xmlContent);
  }

  private static generateXMLContent(config: SmartCalendarConfigDTO): string {
    const { activities, activitiesMapping } = this.generateActivitiesAndMapping(config);

    const sections: FetSections = {
      days: this.generateDaysList(config),
      hours: this.generateHoursList(config),
      subjects: this.generateSubjectList(config.subjects),
      activityTags: this.generateActivityTagsList(config.activityTags),
      teachers: this.generateTeachersList(config.teachers),
      students: this.generateStudentsList(config.studentSets),
      activities: this.generateActivitiesList(activities),
      classrooms: this.generateClassroomsList(config.classrooms),
      timeConstraints: this.generateTimeConstraints(config, activitiesMapping),
      spaceConstraints: this.generateSpaceConstraints(config, activitiesMapping),
    };

    return this.buildFinalContent(sections);
  }

  private static async saveToFile(id: string, content: string): Promise<void> {
    const directory = path.resolve(process.cwd(), "fetFiles");

    try {
      await fs.mkdir(directory, { recursive: true });
      await fs.writeFile(path.join(directory, `${id}.fet`), content);
    } catch (error) {
      logger.error(error);
      throw new Error(`Failed to save FET file`);
    }
  }

  private static generateDaysList(config: SmartCalendarConfigDTO): string {
    const days = config.globalSchoolConfig.studyDays;

    return this.builder.build({
      Days_List: {
        Number_of_Days: days.length,
        Day: days.map(day => ({ Name: day })),
      },
    }) as string;
  }

  private static generateHoursList(config: SmartCalendarConfigDTO): string {
    const slots = config.globalSchoolConfig.studySlots;

    return this.builder.build({
      Hours_List: {
        Number_of_Hours: slots.length,
        Hour: slots.map(slot => ({ Name: slot })),
      },
    }) as string;
  }

  private static generateSubjectList(subjects: SmartCalendarConfigDTO["subjects"]): string {
    return this.builder.build({
      Subjects_List: {
        Subject: subjects.map(subject => ({
          Name: subject.name,
          Comments: "",
        })),
      },
    }) as string;
  }

  private static generateActivityTagsList(
    activityTags: SmartCalendarConfigDTO["activityTags"],
  ): string {
    return this.builder.build({
      Activity_Tags_List: {
        Activity_Tag: activityTags.map(tag => ({
          Name: tag.name,
          Printable: true,
          Comments: "",
        })),
      },
    }) as string;
  }

  private static generateTeachersList(teachers: SmartCalendarConfigDTO["teachers"]): string {
    return this.builder.build({
      Teachers_List: {
        Teacher: teachers.flatMap(teacher => [
          { Name: `${teacher.name}_WEEKA` },
          { Name: `${teacher.name}_WEEKB` },
        ]),
      },
    }) as string;
  }

  private static generateStudentsList(studentSets: SmartCalendarConfigDTO["studentSets"]): string {
    const studentSetsArray = studentSets.map(studentSet => ({
      Name: studentSet.name,
      Subgroup: [
        { Name: `${studentSet.name}_GROUP1_WEEKA` },
        { Name: `${studentSet.name}_GROUP1_WEEKB` },
        { Name: `${studentSet.name}_GROUP2_WEEKA` },
        { Name: `${studentSet.name}_GROUP2_WEEKB` },
      ],
    }));

    return this.builder.build({
      Students_List: {
        Year: {
          Name: "Default Year",
          Group: studentSetsArray,
        },
      },
    }) as string;
  }

  private static generateActivitiesAndMapping(config: SmartCalendarConfigDTO): {
    activities: FetActivity[];
    activitiesMapping: ActivityMappings;
  } {
    const activities: FetActivity[] = [];
    let currentActivityId = 0;

    // Initialize activity mappings
    const activitiesPerTopic: Record<string, Record<string, number[]>> = {};
    const activitiesPerGroup: Record<string, Record<number, number[][]>> = {};
    const activitiesPerWeek: Record<string, { A: number[]; B: number[] }> = {};

    // Initialize mappings for each student set
    config.studentSets.forEach(studentSet => {
      const studentSetId = studentSet.name;

      activitiesPerTopic[studentSetId] = {};
      activitiesPerGroup[studentSetId] = {};
      activitiesPerWeek[studentSetId] = { A: [], B: [] };
    });

    // Generate activities
    config.activities.forEach(activity => {
      const studentSetId = activity.studentSets;
      const subjectId = activity.topicId;
      const duration = activity.durationInSlots;
      const teacherId = activity.teacher;

      // Initialize subject arrays if needed
      if (!Object.prototype.hasOwnProperty.call(activitiesPerTopic[studentSetId], subjectId)) {
        activitiesPerTopic[studentSetId][subjectId] = [];
      }

      // Initialize duration arrays if needed
      if (!Object.prototype.hasOwnProperty.call(activitiesPerGroup[studentSetId], duration)) {
        activitiesPerGroup[studentSetId][duration] = [];
      }

      // Regular activity (not per group, not per week)
      if (!activity.isPerGroup && !activity.week) {
        const comment: CommentOfActivity = {
          teacher: activity.teacher,
          week: activity.week,
          duration: activity.durationInSlots,
          class: activity.studentSets,
          group: null,
          topicId: activity.topicId,
          topicType: activity.topicType,
        };
        activities.push({
          Teacher: [`${teacherId}_WEEKA`, `${teacherId}_WEEKB`],
          Subject: subjectId,
          Activity_Tag: activity.activityTags,
          Students: studentSetId,
          Duration: activity.durationInSlots,
          Id: currentActivityId,
          Active: true,
          Activity_Group_Id: 0,
          Comments: JSON.stringify(comment),
        });

        activitiesPerTopic[studentSetId][subjectId].push(currentActivityId);
        currentActivityId++;
      }

      // Activity per week but not per group
      if (!activity.isPerGroup && activity.week) {
        const comment: CommentOfActivity = {
          teacher: activity.teacher,
          week: activity.week,
          duration: activity.durationInSlots,
          class: activity.studentSets,
          group: null,
          topicId: activity.topicId,
          topicType: activity.topicType,
        };
        activities.push({
          Teacher: `${teacherId}_WEEK${activity.week}`,
          Subject: subjectId,
          Activity_Tag: activity.activityTags,
          Students: [
            `${studentSetId}_GROUP1_WEEK${activity.week}`,
            `${studentSetId}_GROUP2_WEEK${activity.week}`,
          ],
          Duration: activity.durationInSlots,
          Id: currentActivityId,
          Active: true,
          Activity_Group_Id: 0,
          Comments: JSON.stringify(comment),
        });

        activitiesPerWeek[studentSetId].A.push(currentActivityId);
        currentActivityId++;
      }

      // Activity per group but not per week
      if (activity.isPerGroup && !activity.week) {
        const groupActivities: number[] = [];

        // Group 1
        const comment1: CommentOfActivity = {
          teacher: activity.teacher,
          week: activity.week,
          duration: activity.durationInSlots,
          class: activity.studentSets,
          group: "1",
          topicId: activity.topicId,
          topicType: activity.topicType,
        };
        activities.push({
          Teacher: [`${teacherId}_WEEKA`, `${teacherId}_WEEKB`],
          Subject: subjectId,
          Activity_Tag: activity.activityTags,
          Students: [`${studentSetId}_GROUP1_WEEKA`, `${studentSetId}_GROUP1_WEEKB`],
          Duration: activity.durationInSlots,
          Id: currentActivityId,
          Active: true,
          Activity_Group_Id: 0,
          Comments: JSON.stringify(comment1),
        });

        groupActivities.push(currentActivityId);
        currentActivityId++;

        // Group 2
        const comment2: CommentOfActivity = {
          teacher: activity.teacher,
          week: activity.week,
          duration: activity.durationInSlots,
          class: activity.studentSets,
          group: "2",
          topicId: activity.topicId,
          topicType: activity.topicType,
        };
        activities.push({
          Teacher: [`${teacherId}_WEEKA`, `${teacherId}_WEEKB`],
          Subject: subjectId,
          Activity_Tag: activity.activityTags,
          Students: [`${studentSetId}_GROUP2_WEEKA`, `${studentSetId}_GROUP2_WEEKB`],
          Duration: activity.durationInSlots,
          Id: currentActivityId,
          Active: true,
          Activity_Group_Id: 0,
          Comments: JSON.stringify(comment2),
        });

        groupActivities.push(currentActivityId);
        currentActivityId++;

        activitiesPerGroup[studentSetId][duration].push(groupActivities);
      }

      // Activity per group and per week
      if (activity.isPerGroup && activity.week) {
        const groupActivities: number[] = [];

        // Group 1
        const comment1: CommentOfActivity = {
          teacher: activity.teacher,
          week: activity.week,
          duration: activity.durationInSlots,
          class: activity.studentSets,
          group: "1",
          topicId: activity.topicId,
          topicType: activity.topicType,
        };
        activities.push({
          Teacher: `${teacherId}_WEEK${activity.week}`,
          Subject: subjectId,
          Activity_Tag: activity.activityTags,
          Students: `${studentSetId}_GROUP1_WEEK${activity.week}`,
          Duration: activity.durationInSlots,
          Id: currentActivityId,
          Active: true,
          Activity_Group_Id: 0,
          Comments: JSON.stringify(comment1),
        });

        groupActivities.push(currentActivityId);
        currentActivityId++;

        // Group 2
        const comment2: CommentOfActivity = {
          teacher: activity.teacher,
          week: activity.week,
          duration: activity.durationInSlots,
          class: activity.studentSets,
          group: "2",
          topicId: activity.topicId,
          topicType: activity.topicType,
        };
        activities.push({
          Teacher: `${teacherId}_WEEK${activity.week}`,
          Subject: subjectId,
          Activity_Tag: activity.activityTags,
          Students: `${studentSetId}_GROUP2_WEEK${activity.week}`,
          Duration: activity.durationInSlots,
          Id: currentActivityId,
          Active: true,
          Activity_Group_Id: 0,
          Comments: JSON.stringify(comment2),
        });

        groupActivities.push(currentActivityId);
        currentActivityId++;

        activitiesPerGroup[studentSetId][duration].push(groupActivities);
      }
    });

    return {
      activities,
      activitiesMapping: {
        perTopic: activitiesPerTopic,
        perGroup: activitiesPerGroup,
        perWeek: activitiesPerWeek,
      },
    };
  }

  private static generateActivitiesList(activities: FetActivity[]): string {
    return this.builder.build({
      Activities_List: {
        Activity: activities,
      },
    }) as string;
  }

  private static generateClassroomsList(classrooms: SmartCalendarConfigDTO["classrooms"]): string {
    return this.builder.build({
      Rooms_List: {
        Room: classrooms.map(classroom => ({
          Name: classroom.name,
          Building: "",
          Comments: "",
        })),
      },
    }) as string;
  }

  private static generateTimeConstraints(
    config: SmartCalendarConfigDTO,
    activitiesMapping: ActivityMappings,
  ): string {
    const sections = [
      this.builder.build({
        ConstraintBasicCompulsoryTime: {
          Weight_Percentage: 100,
          Active: true,
          Comments: "",
        },
      }),

      this.generateBreakTimes(config),

      this.generateMinDaysBetweenActivities(activitiesMapping.perTopic),

      this.generateActivitiesWithSameStartingTime(
        activitiesMapping.perGroup,
        activitiesMapping.perWeek,
      ),

      this.generateTeacherConstraints(config.teachers),

      this.generateStudentSetConstraints(config.studentSets),

      this.generatePreferredStartingTimes(config.subjects, config.globalSchoolConfig.studyDays),
    ];

    return `<Time_Constraints_List>\n${sections.join("\n")}\n</Time_Constraints_List>`;
  }

  private static generateBreakTimes(config: SmartCalendarConfigDTO): string {
    const notAvailableSlots = config.globalSchoolConfig.notAvailableSlots;

    return this.builder.build({
      ConstraintBreakTimes: {
        Weight_Percentage: 100,
        Number_of_Break_Times: notAvailableSlots.length,
        Break_Time: notAvailableSlots.map(slot => ({
          Day: slot.day,
          Hour: slot.slot,
        })),
        Active: true,
        Comments: "",
      },
    }) as string;
  }

  private static generateMinDaysBetweenActivities(
    activitiesPerTopic: Record<string, Record<string, number[]>>,
  ): string {
    const constraints: FetConstraint[] = [];

    Object.values(activitiesPerTopic).forEach(classActivities => {
      Object.values(classActivities).forEach(activityIds => {
        if (activityIds.length > 1) {
          constraints.push({
            Weight_Percentage: 100,
            Consecutive_If_Same_Day: false,
            Number_of_Activities: activityIds.length,
            Activity_Id: activityIds,
            MinDays: 1,
            Active: true,
            Comments: "",
          });
        }
      });
    });

    return this.builder.build({
      ConstraintMinDaysBetweenActivities: constraints,
    }) as string;
  }

  private static generateActivitiesWithSameStartingTime(
    activitiesPerGroup: Record<string, Record<number, number[][]>>,
    activitiesPerWeek: Record<string, { A: number[]; B: number[] }>,
  ): string {
    const constraints: FetConstraint[] = [];

    // Group activities with same starting time
    Object.values(activitiesPerGroup).forEach(groupActivities => {
      Object.values(groupActivities).forEach(durationActivities => {
        durationActivities.forEach(activityGroups => {
          if (activityGroups.length === 4) {
            constraints.push(
              {
                Weight_Percentage: 100,
                Number_of_Activities: 2,
                Activity_Id: [activityGroups[0], activityGroups[3]],
                Active: true,
                Comments: "",
              },
              {
                Weight_Percentage: 100,
                Number_of_Activities: 2,
                Activity_Id: [activityGroups[1], activityGroups[2]],
                Active: true,
                Comments: "",
              },
            );
          } else if (activityGroups.length === 2) {
            constraints.push({
              Weight_Percentage: 100,
              Number_of_Activities: 2,
              Activity_Id: activityGroups,
              Active: true,
              Comments: "",
            });
          }
        });
      });
    });

    // Week activities with same starting time
    Object.values(activitiesPerWeek).forEach(weekActivities => {
      const minCount = Math.min(weekActivities.A.length, weekActivities.B.length);

      for (let i = 0; i < minCount; i++) {
        constraints.push({
          Weight_Percentage: 100,
          Number_of_Activities: 2,
          Activity_Id: [weekActivities.A[i], weekActivities.B[i]],
          Active: true,
          Comments: "",
        });
      }
    });

    return this.builder.build({
      ConstraintActivitiesSameStartingTime: constraints,
    }) as string;
  }

  private static generateTeacherConstraints(teachers: SmartCalendarConfigDTO["teachers"]): string {
    const notAvailableConstraints = teachers
      .filter(teacher => teacher.notAvailableSlots.length > 0)
      .flatMap(teacher => {
        const notAvailableTimes = teacher.notAvailableSlots.map(slot => ({
          Day: slot.day,
          Hour: slot.slot,
        }));

        return [
          {
            Weight_Percentage: 100,
            Teacher: `${teacher.name}_WEEKA`,
            Number_of_Not_Available_Times: notAvailableTimes.length,
            Not_Available_Time: notAvailableTimes,
            Active: true,
            Comments: "",
          },
          {
            Weight_Percentage: 100,
            Teacher: `${teacher.name}_WEEKB`,
            Number_of_Not_Available_Times: notAvailableTimes.length,
            Not_Available_Time: notAvailableTimes,
            Active: true,
            Comments: "",
          },
        ];
      });

    // Max gaps per day
    const maxGapsConstraints = teachers
      .filter(teacher => teacher.maxGapsPerDay !== null)
      .flatMap(teacher => [
        {
          Weight_Percentage: 100,
          Teacher_Name: `${teacher.name}_WEEKA`,
          Max_Gaps: teacher.maxGapsPerDay,
          Active: true,
          Comments: "",
        },
        {
          Weight_Percentage: 100,
          Teacher_Name: `${teacher.name}_WEEKB`,
          Max_Gaps: teacher.maxGapsPerDay,
          Active: true,
          Comments: "",
        },
      ]);

    // Combine all teacher constraints
    return [
      this.builder.build({
        ConstraintTeacherNotAvailableTimes: notAvailableConstraints,
      }),
      this.builder.build({
        ConstraintTeacherMaxGapsPerDay: maxGapsConstraints,
      }),
    ].join("\n");
  }

  private static generateStudentSetConstraints(
    studentSets: SmartCalendarConfigDTO["studentSets"],
  ): string {
    const notAvailableConstraints = studentSets
      .filter(studentSet => studentSet.notAvailableSlots.length > 0)
      .map(studentSet => {
        const notAvailableTimes = studentSet.notAvailableSlots.map(slot => ({
          Day: slot.day,
          Hour: slot.slot,
        }));

        return {
          Weight_Percentage: 100,
          Students: studentSet.name,
          Number_of_Not_Available_Times: notAvailableTimes.length,
          Not_Available_Time: notAvailableTimes,
          Active: true,
          Comments: "",
        };
      });

    // Max gaps per day
    const maxGapsConstraints = studentSets
      .filter(studentSet => studentSet.maxGapsPerDay !== null)
      .map(studentSet => ({
        Weight_Percentage: 100,
        Max_Gaps: studentSet.maxGapsPerDay,
        Students: studentSet.name,
        Active: true,
        Comments: "",
      }));

    const maxHoursConstraints = studentSets
      .filter(studentSet => studentSet.maxDurationPerDay !== null)
      .map(studentSet => ({
        Weight_Percentage: 100,
        Maximum_Hours_Daily: studentSet.maxDurationPerDay,
        Students: studentSet.name,
        Active: true,
        Comments: "",
      }));

    // Combine all student set constraints
    return [
      this.builder.build({
        ConstraintStudentsSetNotAvailableTimes: notAvailableConstraints,
      }),
      this.builder.build({
        ConstraintStudentsSetMaxGapsPerWeek: maxGapsConstraints,
      }),
      this.builder.build({
        ConstraintStudentsSetMaxHoursDaily: maxHoursConstraints,
      }),
    ].join("\n");
  }

  private static generatePreferredStartingTimes(
    subjects: SmartCalendarConfigDTO["subjects"],
    studyDays: SmartCalendarConfigDTO["globalSchoolConfig"]["studyDays"],
  ): string {
    const constraints = subjects
      .filter(subject => subject.preferredStartingSlots.length > 0)
      .map(subject => {
        const preferredTimes = subject.preferredStartingSlots.flatMap(slot => {
          return studyDays.map(day => ({
            Preferred_Starting_Day: day,
            Preferred_Starting_Hour: slot,
          }));
        });

        return {
          Weight_Percentage: 95,
          Teacher_Name: "",
          Students_Name: "",
          Subject_Name: subject.name,
          Activity_Tag_Name: "",
          Duration: "",
          Number_of_Preferred_Starting_Times: preferredTimes.length,
          Preferred_Starting_Time: preferredTimes,
          Active: true,
          Comments: "",
        };
      });

    return this.builder.build({
      ConstraintActivitiesPreferredStartingTimes: constraints,
    }) as string;
  }

  private static generateSpaceConstraints(
    config: SmartCalendarConfigDTO,
    activitiesMapping: ActivityMappings,
  ): string {
    const sections = [
      this.builder.build({
        ConstraintBasicCompulsorySpace: {
          Weight_Percentage: 100,
          Active: true,
          Comments: "",
        },
      }),

      this.generateActivityTagPreferredRooms(config.classrooms),

      this.generatePreferredClassroomsForStudentSets(
        config.studentSets,
        activitiesMapping.perTopic,
      ),

      this.generateTeachersPreferredClassrooms(config.teachers),
    ];

    return `<Space_Constraints_List>\n${sections.join("\n")}\n</Space_Constraints_List>`;
  }

  private static generateActivityTagPreferredRooms(
    classrooms: SmartCalendarConfigDTO["classrooms"],
  ): string {
    const roomsByTag: Record<string, string[]> = {};

    classrooms.forEach(classroom => {
      classroom.allowedActivityTags.forEach(tag => {
        if (!Object.prototype.hasOwnProperty.call(roomsByTag, tag)) {
          roomsByTag[tag] = [];
        }
        roomsByTag[tag].push(classroom.name);
      });
    });

    // Create constraints
    const constraints = Object.entries(roomsByTag)
      .filter(([_, rooms]) => rooms.length > 0)
      .map(([tag, rooms]) => ({
        Weight_Percentage: 100,
        Activity_Tag: tag,
        Number_of_Preferred_Rooms: rooms.length,
        Preferred_Room: rooms,
        Active: true,
        Comments: "",
      }));

    return this.builder.build({
      ConstraintActivityTagPreferredRooms: constraints,
    }) as string;
  }

  private static generatePreferredClassroomsForStudentSets(
    studentSets: SmartCalendarConfigDTO["studentSets"],
    activitiesPerTopic: Record<string, Record<string, number[]>>,
  ): string {
    const constraints: FetConstraint[] = [];

    studentSets
      .filter(studentSet => studentSet.preferredClassroom)
      .forEach(studentSet => {
        const studentSetId = studentSet.name;

        // Check if there's a record for this student set
        if (Object.prototype.hasOwnProperty.call(activitiesPerTopic, studentSetId)) {
          const activityIds = Object.values(activitiesPerTopic[studentSetId]).flat();

          activityIds.forEach(activityId => {
            constraints.push({
              Weight_Percentage: 90,
              Activity_Id: activityId,
              Room: studentSet.preferredClassroom,
              Permanently_Locked: true,
              Active: true,
              Comments: "",
            });
          });
        }
      });

    return this.builder.build({
      ConstraintActivityPreferredRoom: constraints,
    }) as string;
  }

  private static generateTeachersPreferredClassrooms(
    teachers: SmartCalendarConfigDTO["teachers"],
  ): string {
    const constraints = teachers
      .filter(teacher => teacher.preferredClassroom)
      .flatMap(teacher => [
        {
          Weight_Percentage: 90,
          Teacher: `${teacher.name}_WEEKA`,
          Room: teacher.preferredClassroom,
          Active: true,
          Comments: "",
        },
        {
          Weight_Percentage: 90,
          Teacher: `${teacher.name}_WEEKB`,
          Room: teacher.preferredClassroom,
          Active: true,
          Comments: "",
        },
      ]);

    return this.builder.build({
      ConstraintTeacherHomeRoom: constraints,
    }) as string;
  }

  private static buildFinalContent(sections: FetSections): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<fet version="6.9.5">
  <Mode>Official</Mode>
  
  ${sections.days}
  
  ${sections.hours}
  
  ${sections.subjects}
  
  ${sections.activityTags}
  
  ${sections.teachers}
  
  ${sections.students}
  
  ${sections.activities}
  
  ${sections.classrooms}
  
  ${sections.timeConstraints}
  
  ${sections.spaceConstraints}
</fet>`;
  }
}

type FetConstraint = {
  Weight_Percentage: number;
  Active: boolean;
  Comments: string;
  [key: string]: unknown;
};

type ActivityMappings = {
  perTopic: Record<string, Record<string, number[]>>;
  perGroup: Record<string, Record<number, number[][]>>;
  perWeek: Record<string, { A: number[]; B: number[] }>;
};

type FetSections = {
  days: string;
  hours: string;
  subjects: string;
  activityTags: string;
  teachers: string;
  students: string;
  activities: string;
  classrooms: string;
  timeConstraints: string;
  spaceConstraints: string;
};

export type CommentOfActivity = {
  topicType: string;
  topicId: string;
  duration: number;
  week: "A" | "B" | null;
  group: "1" | "2" | null;
  teacher: string;
  class: string;
};

type FetActivity = {
  Teacher: string | string[];
  Subject: string;
  Activity_Tag: string;
  Students: string | string[];
  Duration: number;
  Id: number;
  Active: boolean;
  Activity_Group_Id: number;
  Comments: string;
};
