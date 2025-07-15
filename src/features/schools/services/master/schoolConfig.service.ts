import { Connection, Types } from "mongoose";
import { pathToFileURL } from "url";
import { fromZodError } from "zod-validation-error";
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { crudRepo } from "../../../../database/repositories/crud.repo";
import {
  IClassType,
  ISubjectOfClassType,
  ISubSubjectOfClassType,
  TActivityOfClassType,
} from "../../../../database/schema/pedagogy/class/classType.schema";
import { IExamType } from "../../../../database/schema/pedagogy/Performance/examType.schema";
import { ISessionType } from "../../../../database/schema/pedagogy/session/sessionType.schema";
import { ILevel } from "../../../../database/schema/pedagogy/structure/level.schema";
import { ISchoolYear } from "../../../../database/schema/pedagogy/structure/schoolYear.schema";
import { ISection } from "../../../../database/schema/pedagogy/structure/section.schema";
import { ISubLevel } from "../../../../database/schema/pedagogy/structure/subLevel.schema";
import { ITerm } from "../../../../database/schema/pedagogy/structure/term.schema";
import { ISubjectType } from "../../../../database/schema/pedagogy/subject/subjectType.schema";
import {
  TSchoolConfig,
  schoolConfigValidation,
} from "../../validations/master/schoolConfig.validation";
import { readFile } from "fs/promises";
import { ISubSubjectType } from "../../../../database/schema/pedagogy/subject/subSubjectType.schema";
import { BaseEntity, ID } from "../../../../types/BaseEntity";
import { GroupType } from "../../../../feature/groupManagement/domains/groupType.entity";

export const getSchoolConfig = async (configName: string): Promise<TSchoolConfig> => {
  try {
    const filePath = pathToFileURL(`templates/${configName}.json`);
    const fileContent = await readFile(filePath, { encoding: "utf8" });
    const schoolConfig = JSON.parse(fileContent);
    return schoolConfig;
  } catch (_) {
    throw new BadRequestError("school.configNotFound");
  }
};

export const validateSchoolConfig = (schoolConfig: TSchoolConfig): void => {
  const result = schoolConfigValidation.safeParse(schoolConfig);

  if (!result.success) {
    const errorMessage = fromZodError(result.error, {
      maxIssuesInMessage: 3,
      includePath: false,
    })
      .message.replace(/"([^"]*)"/g, "$1")
      .replace("Validation error: ", "")
      .trimEnd()
      .trimRight();
    throw new BadRequestError(errorMessage);
  }

  return;
};

export const applySchoolConfig = async (
  connection: Connection,
  schoolConfig: TSchoolConfig,
): Promise<void> => {
  const { terms, examTypes, subSubjectTypes, subjectTypes, sessionTypes } =
    await createSimpleEntities(connection, schoolConfig);

  const { levels } = await createSchoolYearsAndLevels(connection, schoolConfig, terms);

  const { sections, subLevels } = await createSubLevelsAndSections(
    connection,
    schoolConfig,
    levels,
  );

  await createClassTypes(connection, schoolConfig, {
    sections,
    subjectTypes,
    subSubjectTypes,
    sessionTypes,
    examTypes,
    subLevels,
  });

  await createGroupType(connection, schoolConfig, examTypes);
};

const createSimpleEntities = async (
  connection: Connection,
  schoolConfig: TSchoolConfig,
): Promise<{
  terms: ITerm[];
  subSubjectTypes: ISubSubjectType[];
  subjectTypes: ISubjectType[];
  examTypes: IExamType[];
  sessionTypes: ISessionType[];
}> => {
  const terms = await Promise.all(
    schoolConfig.terms.map(term => crudRepo(connection, "term").addOne(term)),
  );

  const subjectTypes = await Promise.all(
    schoolConfig.subjectTypes.map(subjectType =>
      crudRepo(connection, "subjectType").addOne(subjectType),
    ),
  );

  const subSubjectTypes = await Promise.all(
    schoolConfig.subSubjectTypes.map(subSubjectType =>
      crudRepo(connection, "subSubjectType").addOne(subSubjectType),
    ),
  );

  const examTypes = await Promise.all(
    schoolConfig.examTypes.map(examType => crudRepo(connection, "examType").addOne(examType)),
  );

  const sessionTypes = await Promise.all(
    schoolConfig.sessionTypes.map(sessionType =>
      crudRepo(connection, "sessionType").addOne(sessionType),
    ),
  );

  await Promise.all(
    schoolConfig.observationReasons.map(observationReason =>
      crudRepo(connection, "observationReason").addOne(observationReason),
    ),
  );

  await Promise.all(
    schoolConfig.classrooms.map(classroom => crudRepo(connection, "classroom").addOne(classroom)),
  );

  return { terms, subSubjectTypes, subjectTypes, examTypes, sessionTypes };
};

const createSchoolYearsAndLevels = async (
  connection: Connection,
  schoolConfig: TSchoolConfig,
  terms: ITerm[],
): Promise<{ levels: ILevel[] }> => {
  const schoolYears = await Promise.all(
    schoolConfig.schoolYears.map(schoolYear => {
      const payload: Partial<ISchoolYear> = { ...schoolYear, terms, level: undefined };

      return crudRepo(connection, "schoolYear").addOne(payload);
    }),
  );

  const levels = await Promise.all(
    schoolConfig.levels.map(level => {
      const payload: Partial<ILevel> = {
        ...level,
        currentSchoolYear: undefined,
      };

      payload.currentSchoolYear = schoolYears[level.currentSchoolYearNumber];

      return crudRepo(connection, "level").addOne(payload);
    }),
  );

  await Promise.all(
    schoolYears.map((schoolYear, i) => {
      const schoolYearPayload = schoolConfig.schoolYears[i];
      return crudRepo(connection, "schoolYear").updateOne(
        { _id: String(schoolYear._id) },
        {
          level: levels[schoolYearPayload.levelNumber]._id,
        },
      );
    }),
  );

  return { levels };
};

const createSubLevelsAndSections = async (
  connection: Connection,
  schoolConfig: TSchoolConfig,
  levels: ILevel[],
): Promise<{ sections: ISection[]; subLevels: ISubLevel[] }> => {
  const subLevels = await Promise.all(
    schoolConfig.subLevels.map(subLevel => {
      const payload: Partial<ISubLevel> = {
        ...subLevel,
      };

      payload.level = levels[subLevel.levelNumber];

      return crudRepo(connection, "subLevel").addOne(payload);
    }),
  );

  const sections = await Promise.all(
    schoolConfig.sections.map(section => {
      const payload: Partial<ISection> = {
        ...section,
        subLevels: [],
      };

      section.subLevelNumbers.forEach(subLevelNumber => {
        payload.subLevels?.push(subLevels[subLevelNumber]._id);
      });

      return crudRepo(connection, "section").addOne(payload);
    }),
  );

  return { sections, subLevels };
};

const createClassTypes = async (
  connection: Connection,
  schoolConfig: TSchoolConfig,
  entities: {
    subjectTypes: ISubjectType[];
    subSubjectTypes: ISubSubjectType[];
    examTypes: IExamType[];
    sections: ISection[];
    subLevels: ISubLevel[];
    sessionTypes: ISessionType[];
  },
): Promise<void> => {
  const { subSubjectTypes, subjectTypes, examTypes, sections, subLevels, sessionTypes } = entities;

  const classTypes = await Promise.all(
    schoolConfig.classTypes.map(classType => {
      const classTypePayload: Partial<IClassType> = {
        ...classType,
        subjects: [],
        fields: [],
        activities: [],
      };

      classType.subjects.forEach(subject => {
        const subjectPayload: Partial<ISubjectOfClassType> = {
          ...subject,
          subSubjects: [],
          exams: [],
        };

        subjectPayload.subjectType = subjectTypes[subject.subjectTypeNumber]._id;

        subject.exams.forEach(exam => {
          subjectPayload.exams?.push({ ...exam, examType: examTypes[exam.examTypeNumber]._id });
        });

        subject.subSubjects?.forEach(subSubject => {
          const subSubjectPayload: Partial<ISubSubjectOfClassType> = {
            ...subSubject,
            exams: [],
          };

          subSubjectPayload.subSubjectType = subSubjectTypes[subSubject.subSubjectTypeNumber]._id;

          subSubject.exams.forEach(exam => {
            subSubjectPayload.exams?.push({
              ...exam,
              examType: examTypes[exam.examTypeNumber]._id,
            });
          });

          subjectPayload.subSubjects?.push(subSubjectPayload as ISubSubjectOfClassType);
        });

        classTypePayload.subjects?.push(subjectPayload as ISubjectOfClassType);
      });

      classType.fields.forEach(field => {
        classTypePayload.fields?.push({
          _id: new Types.ObjectId(),
          name: field.name,
          coefficient: field.coefficient,
          subjects: field.subjectTypeNumbers.map(
            subjectTypeNumber => subjectTypes[subjectTypeNumber]._id,
          ),
        });
      });

      classType.activities.forEach(activity => {
        const payload: Partial<TActivityOfClassType> = { ...activity };

        payload.sessionTypeId = sessionTypes[activity.sessionTypeNumber]._id;

        if (activity.subjectTypeNumber !== undefined)
          payload.subjectTypeId = subjectTypes[activity.subjectTypeNumber]._id;

        if (activity.subSubjectTypeNumber !== undefined) {
          payload.subSubjectTypeId = subSubjectTypes[activity.subSubjectTypeNumber]._id;
        }

        classTypePayload.activities?.push(payload as TActivityOfClassType);
      });

      classTypePayload.section =
        classType.sectionNumber !== undefined ? sections[classType.sectionNumber]._id : undefined;
      classTypePayload.subLevel =
        classType.subLevelNumber !== undefined
          ? subLevels[classType.subLevelNumber]._id
          : undefined;

      return crudRepo(connection, "classType").addOne(classTypePayload);
    }),
  );

  await Promise.all(
    classTypes.map((classType, i) => {
      const classTypePayload = schoolConfig.classTypes[i];

      const nextClassTypes = classTypePayload.nextClassTypeNumbers?.map(
        nextClassTypeNumber => classTypes[nextClassTypeNumber]._id,
      );
      return crudRepo(connection, "classType").updateOne(
        { _id: String(classType._id) },
        { nextClassTypes },
      );
    }),
  );
};

export const createGroupType = async (
  connection: Connection,
  schoolConfig: TSchoolConfig,
  examTypes: IExamType[],
): Promise<void> => {
  await Promise.all(
    schoolConfig.groupTypes.map(groupType => {
      if (groupType.exams.length > 0 && groupType.coefficient === undefined) {
        throw new BadRequestError("groupType.coefficientRequired");
      }

      if (groupType.coefficient != undefined && groupType.exams.length === 0) {
        throw new BadRequestError("groupType.examsRequired");
      }

      const payload: Omit<GroupType, keyof BaseEntity> = {
        ...groupType,
        exams: [],
        coefficient: groupType.coefficient ?? null,
      };

      payload.exams = groupType.exams.map(exam => {
        return {
          examType: String(examTypes[exam.examTypeNumber]._id) as ID,
          coefficient: exam.coefficient,
        };
      });

      return crudRepo(connection, "groupType").addOne(payload);
    }),
  );
};
