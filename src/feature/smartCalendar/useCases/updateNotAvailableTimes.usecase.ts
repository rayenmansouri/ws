import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { SchoolRepo } from "../../schools/domain/School.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ID } from "../../../types/BaseEntity";

type entitiesThatHoldNotAvailableTimeConstraint = "teacher" | "class" | "school";
interface DailyAvailabilitySlot {
  day: number;
  hours: number[];
  isAvailable: boolean;
}
@injectable()
export class UpdateNotAvailableTimesUseCase {
  constructor(
    @inject("TeacherRepo") private readonly teacherRepo: TeacherRepo,
    @inject("ClassRepo") private readonly classRepo: ClassRepo,
    @inject("SchoolRepo") private readonly schoolRepo: SchoolRepo,
  ) {}

  async execute(
    newId: string | null,
    entityName: entitiesThatHoldNotAvailableTimeConstraint,
    updates: DailyAvailabilitySlot[],
    tenantId: ID,
  ): Promise<void> {
    if (entityName === "class" && !newId) throw new BadRequestError("newId is required");
    if (entityName === "teacher" && !newId) throw new BadRequestError("newId is required");

    if (entityName === "class") {
      const classDoc = await this.classRepo.findOneByNewIdOrThrow(newId!, "notFound.class");
      const updatedAvailability = this.updateAvailabilityTime(classDoc.notAvailableTimes, updates);

      await this.classRepo.updateOneById(classDoc._id, {
        notAvailableTimes: updatedAvailability,
      });
      return;
    }

    if (entityName === "school") {
      const school = await this.schoolRepo.findOneByIdOrThrow(tenantId, "notFound.school");
      const updatedAvailability = this.updateAvailabilityTime(school.notAvailableTimes, updates);

      await this.schoolRepo.updateOneById(school._id, {
        notAvailableTimes: updatedAvailability,
      });
      return;
    }

    if (entityName === "teacher") {
      const teacher = await this.teacherRepo.findOneByNewIdOrThrow(newId!, "notFound.teacher");
      const updatedAvailability = this.updateAvailabilityTime(teacher.notAvailableTimes, updates);

      await this.teacherRepo.updateOneById(teacher._id, {
        notAvailableTimes: updatedAvailability,
      });
      return;
    }
  }

  private updateAvailabilityTime(
    existingAvailabilityTime: { day: number; hours: number[] }[],
    notAvailableTimes: DailyAvailabilitySlot[],
  ): { day: number; hours: number[] }[] {
    const updatedConstraints = [...existingAvailabilityTime];

    if (notAvailableTimes.length > 0) {
      for (const constraint of notAvailableTimes) {
        const existingDayConstraintIndex = updatedConstraints.findIndex(
          c => c.day === constraint.day,
        );
        if (constraint.isAvailable) {
          if (existingDayConstraintIndex !== -1) {
            const existingHours = updatedConstraints[existingDayConstraintIndex].hours;
            const hoursToKeep = existingHours.filter(hour => !constraint.hours.includes(hour));

            if (hoursToKeep.length > 0) {
              updatedConstraints[existingDayConstraintIndex].hours = hoursToKeep;
            } else {
              updatedConstraints.splice(existingDayConstraintIndex, 1);
            }
          } else {
            updatedConstraints.push({
              day: constraint.day,
              hours: constraint.hours,
            });
          }
        } else {
          if (existingDayConstraintIndex !== -1) {
            const existingHours = new Set(updatedConstraints[existingDayConstraintIndex].hours);
            constraint.hours.forEach(hour => existingHours.add(hour));
            updatedConstraints[existingDayConstraintIndex].hours = Array.from(existingHours);
          } else {
            updatedConstraints.push({
              day: constraint.day,
              hours: constraint.hours,
            });
          }
        }
      }
    }

    return updatedConstraints;
  }
}
