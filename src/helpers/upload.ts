import axios, { AxiosError, AxiosResponse } from "axios";
import iconv from "iconv-lite";
import { dropboxBaseUri, dropboxShareUri } from "../config";
import { InternalError } from "../core/ApplicationErrors";
import Logger from "../core/Logger";
import { schoolDocStore } from "./../core/subdomainStore";
import { ENVIRONMENT_ENUM } from "./constants";
import { getDropboxShareableLink, refreshTokensDropbox } from "./dropbox";
import { deleteSpaces } from "./functions";
import { StringUtils } from "./StringUtils";

const env = process.env.NODE_ENV;

export const uploadOneFileService = async (
  fileBuffer: Buffer,
  path: string,
): Promise<{ public_id: string; url: string }> => {
  const accessToken = await refreshTokensDropbox();
  const res = await axios.post(`${dropboxBaseUri}/2/files/upload`, fileBuffer, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/octet-stream",
      "Dropbox-API-Arg": JSON.stringify({
        path,
        mode: "add",
        autorename: true,
        mute: false,
      }),
    },
  });
  const sharedLink = await getDropboxShareableLink(accessToken, res.data.path_lower);

  return {
    public_id: res.data.id,
    url: sharedLink
      ?.replace("dl=0", "raw=1")
      .replace("www.dropbox.com", "dl.dropboxusercontent.com"),
  };
};

export const generateUniquePath = (
  file: { originalname: string },
  tenantId: string,
  folderName: string,
): string => {
  const schoolSubdomain = schoolDocStore[tenantId].subdomain;
  const originalname = StringUtils.removeArabicLetters(file.originalname);
  const extension = originalname.split(".").pop();
  const randomSuffix = `${new Date().getTime()}${Math.random() * 10000}`;
  const lastDotIndex = originalname.lastIndexOf(".");
  const newNameWithExtension = `${originalname.slice(
    0,
    lastDotIndex,
  )}_${randomSuffix}.${extension}`;

  const path = deleteSpaces(`/${env}/${schoolSubdomain}/${folderName}/${newNameWithExtension}`);

  return path;
};
// Removed unused function: uploadManyFiles

// Removed unused function: deleteManyFile

// Removed unused batch upload functions: batchUploadService, startingBatchUpload, addFileToSession, commitBatchUpload
