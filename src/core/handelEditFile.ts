import { uniqueId } from "lodash";
import { ObjectId } from "mongoose";
import { environment } from "../config";
import { entityInterfaces } from "../database/entityInterfaces";
import { isIncludeArrayIds } from "../helpers/functionsUtils";
import { batchUploadService, deleteManyFile } from "../helpers/upload";
import { File } from "../types/app-request";
import { getCurrentTimeOfSchool } from "./getCurrentTimeOfSchool";
import { schoolDocStore } from "./subdomainStore";
import { NotFoundError } from "./ApplicationErrors";
import iconv from "iconv-lite";
import { IFile } from "../feature/sessionManagement/domain/session.entity";
import path from "path";

export const handelEditFile = async (
  tenantId: string,
  currentFiles: IFile[],
  entity: keyof entityInterfaces,
  entityId: ObjectId,
  deleteFiles?: string[],
  newFiles?: File[],
): Promise<IFile[]> => {
  if (deleteFiles) {
    await deleteManyFile(deleteFiles);
  }

  let uploadFile: {
    public_id: string;
    url: string;
  }[] = [];
  if (newFiles && newFiles.length) {
    const buffers = newFiles.map(file => file.buffer);

    const paths = newFiles.map(file =>
      generatePath(tenantId, entity, entityId, file.originalname, file.mimetype),
    );

    uploadFile = await batchUploadService(buffers, paths);
  }

  const filesAfterDelete = currentFiles.filter(
    file => !isIncludeArrayIds(deleteFiles || [], file.public_id),
  );

  const filesToBeAdded: IFile[] = uploadFile.map((file, i) => ({
    ...file,
    date: getCurrentTimeOfSchool(tenantId),
    name: iconv.decode(Buffer.from(newFiles![i]?.originalname, "latin1"), "utf8"),
    size: newFiles![i]?.buffer.byteLength,
    mimeType: path.extname(newFiles![i].originalname).replace(".", ""),
  }));

  return [...filesAfterDelete, ...filesToBeAdded];
};

const generatePath = (
  tenantId: string,
  entity: keyof entityInterfaces,
  entityId: ObjectId,
  originalFileName: string,
  fileMimetype: string,
) => {
  const school = schoolDocStore[tenantId];

  if (!school) throw new NotFoundError("School not found");

  const fileExtension = fileMimetype.split("/").pop();
  const randomName = `${originalFileName}-${uniqueId(Date.now().toString())}`;

  return `/${environment}/${school.subdomain}/${entity}/${entityId}/${randomName}.${fileExtension}`;
};
