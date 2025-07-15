import { injectable } from "inversify/lib/inversify";
import { FileManager, FileUploadPayload } from "../../../core/fileManager/FileManager";
import { inject } from "../../../core/container/TypedContainer";
import { StudentRepo } from "../../students/domain/Student.repo";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { ObservationReasonRepo } from "../../observationsReason/domains/ObservationReason.repo";
import { ObservationRepo } from "../domain/Observation.repo";

type UpdateObservationParams = Partial<{
  observationReasonNewId: string;
  note: string;
  deletedFiles: string[];
  studentNewIds: string[];
  files: FileUploadPayload[];
}> & { observationNewId: string };

@injectable()
export class UpdateObservationUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("FileManager") private fileManager: FileManager,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("ObservationReasonRepo") private observationReasonRepo: ObservationReasonRepo,
    @inject("ObservationRepo") private observationRepo: ObservationRepo,
  ) {}

  async execute(params: UpdateObservationParams): Promise<void> {
    const { observationNewId, observationReasonNewId, note, deletedFiles, studentNewIds, files } =
      params;

    const observation = await this.observationRepo.findOneByNewIdOrThrow(
      observationNewId,
      "notFound.observation",
    );

    const observationReason = observationReasonNewId
      ? await this.observationReasonRepo.findOneByNewIdOrThrow(
          observationReasonNewId,
          "notFound.observationReason",
        )
      : null;

    const students = studentNewIds
      ? await this.studentRepo.findManyByNewIdsOrThrow(studentNewIds, "notFound.student")
      : null;

    const newFiles = await this.fileManager.handelEditFile({
      currentFiles: observation.files,
      filePath: "observation",
      filesPathToBeDeleted: deletedFiles,
      newFiles: files,
    });

    await this.observationRepo.updateOneById(observation._id, {
      observationReason: observationReason || undefined,
      note,
      files: newFiles,
      students: students?.map(student => student._id),
    });
    return;
  }
}
