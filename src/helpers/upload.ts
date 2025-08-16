import axios, { AxiosError, AxiosResponse } from "axios";
import iconv from "iconv-lite";
import { dropboxBaseUri, dropboxShareUri } from "../config";
import { InternalError } from "../core/ApplicationErrors";
import Logger from "../core/Logger";
import { organizationDocStore } from "./../core/subdomainStore";
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
  const organizationSubdomain = organizationDocStore[tenantId].subdomain;
  const originalname = StringUtils.removeArabicLetters(file.originalname);
  const extension = originalname.split(".").pop();
  const randomSuffix = `${new Date().getTime()}${Math.random() * 10000}`;
  const lastDotIndex = originalname.lastIndexOf(".");
  const newNameWithExtension = `${originalname.slice(
    0,
    lastDotIndex,
  )}_${randomSuffix}.${extension}`;

  const path = deleteSpaces(`/${env}/${organizationSubdomain}/${folderName}/${newNameWithExtension}`);

  return path;
};
//https://www.dropboxforum.com/t5/Dropbox-API-Support-Feedback/How-to-upload-multiple-files-using-JavaScript-SDK/td-p/346967
export const uploadManyFiles = async (
  files: { originalname: string; buffer: Buffer }[],
  tenantId: string,
  folderName = "folder",
): Promise<{ public_id: any; url: string; fileName: string }[]> => {
  const accessToken = await refreshTokensDropbox();
  //const uploadedFiles = [];

  const uploadedFilesPromise: Promise<AxiosResponse<any, any>>[] = files.map(fileObj => {
    const path = generateUniquePath(fileObj, tenantId, folderName);

    const res = axios.post(`${dropboxBaseUri}/2/files/upload`, fileObj?.buffer, {
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
    return res;
  });
  const uploadedFiles = await Promise.all(uploadedFilesPromise);
  const uploadFilePathPromise = uploadedFiles.map(fileObj =>
    getDropboxShareableLink(accessToken, fileObj.data.path_lower),
  );
  const uploadFilePaths = await Promise.all(uploadFilePathPromise);

  return uploadedFiles.map((obj, i) => {
    return {
      public_id: obj.data.id,
      url: uploadFilePaths[i] + "&raw=1",
      fileName: iconv.decode(Buffer.from(files[i].originalname!, "latin1"), "utf8"),
    };
  });
};

export const deleteManyFile = async (publicIds: string[]) => {
  if (process.env.NODE_ENV !== ENVIRONMENT_ENUM.TEST) {
    const accessToken = await refreshTokensDropbox();

    const entries = publicIds.map(publicId => ({ path: publicId }));
    await axios.post(
      `${dropboxShareUri}/2/files/delete_batch`,
      { entries },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
  }
};

export const batchUploadService = async (
  pdfBuffers: Buffer[],
  paths: string[],
): Promise<{ public_id: string; url: string }[]> => {
  try {
    const accessToken = await refreshTokensDropbox();

    const session_ids = await startingBatchUpload(accessToken, pdfBuffers.length);

    const appendFilesPromise = session_ids.map((session_id, i) =>
      addFileToSession(accessToken, pdfBuffers[i], session_id),
    );
    await Promise.all(appendFilesPromise);

    const entries = session_ids.map((session_id, i) => {
      const offset = pdfBuffers[i].byteOffset;
      const commit = {
        autorename: true,
        mode: "add",
        mute: false,
        path: paths[i],
        strict_conflict: false,
      };
      const cursor = { offset, session_id };

      return { commit, cursor };
    });

    const finishBatchEntries = await commitBatchUpload(accessToken, entries);

    const sharedLinksPromise = finishBatchEntries.map(entry =>
      getDropboxShareableLink(accessToken, entry.path_lower),
    );
    const shareableLink = await Promise.all(sharedLinksPromise);

    return shareableLink.map((sharedLink, i) => ({
      public_id: finishBatchEntries[i].id,
      url: sharedLink
        .replace("dl=0", "raw=1")
        .replace("www.dropbox.com", "dl.dropboxusercontent.com"),
    }));
  } catch (error) {
    Logger.error((error as AxiosError).response?.data);
    throw new InternalError("Something went wrong with external service");
  }
};

const startingBatchUpload = async (accessToken: string, sessionNumber: number) => {
  const startBatch = await axios.post<{ session_ids: string[] }>(
    `${dropboxShareUri}/2/files/upload_session/start_batch`,
    { num_sessions: sessionNumber, session_type: "concurrent" },
    { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } },
  );

  return startBatch.data.session_ids;
};

const addFileToSession = (accessToken: string, buffer: Buffer, session_id: string) => {
  return axios.post(`${dropboxBaseUri}/2/files/upload_session/append_v2`, buffer, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/octet-stream",
      "Dropbox-API-Arg": JSON.stringify({ close: true, cursor: { offset: 0, session_id } }),
    },
  });
};

const commitBatchUpload = async (
  accessToken: string,
  entries: {
    commit: { autorename: boolean; mode: string; mute: boolean; path: string; strict_conflict: boolean }; //prettier-ignore
    cursor: { offset: number; session_id: string };
  }[],
) => {
  const batchEntries = await axios.post<{ entries: { path_lower: string; id: string }[] }>(
    `${dropboxShareUri}/2/files/upload_session/finish_batch_v2`,
    { entries },
    { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } },
  );

  return batchEntries.data.entries;
};
