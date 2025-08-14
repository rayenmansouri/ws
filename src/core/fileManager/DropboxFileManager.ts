import axios, { AxiosError } from "axios";
import { injectable } from "inversify";
import {
  dropboxAppKey,
  dropboxAppSecret,
  dropboxBaseUri,
  dropboxRefreshToken,
  dropboxShareUri,
} from "../../config";
import { ENVIRONMENT_ENUM } from "../../helpers/constants";
import { InternalError } from "../ApplicationErrors";
import { FileManager, FileUploadPayload, FileDetails } from "./FileManager";
import logger from "../Logger";

@injectable()
export class DropboxFileManager extends FileManager {
  async baseDeleteFiles(filePath: string[]): Promise<void> {
    if (process.env.NODE_ENV === ENVIRONMENT_ENUM.TEST) return;
    const accessToken = await this.getAccessToken();

    const entries = filePath.map(publicId => ({ path: publicId }));

    await axios.post(
      `${dropboxShareUri}/2/files/delete_batch`,
      { entries },
      { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } },
    );
  }
  protected async baseUploadFile(
    filePayload: FileUploadPayload,
    filePath: string,
  ): Promise<string> {
    const accessToken = await this.getAccessToken();

    await axios.post<{ path_lower: string; id: string; path_display: string }>(
      `${dropboxBaseUri}/2/files/upload`,
      filePayload.buffer,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/octet-stream",
          "Dropbox-API-Arg": JSON.stringify({
            path: filePath,
            mode: "add",
            autorename: true,
            mute: false,
          }),
        },
      },
    );

    const link: string = (
      await axios.post<{ url: string }>(
        `${dropboxShareUri}/2/sharing/create_shared_link_with_settings`,
        {
          path: filePath,
          settings: {
            requested_visibility: "public",
            allow_download: true,
            audience: "public",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      )
    ).data.url;

    return link.replace("dl=0", "raw=1").replace("www.dropbox.com", "dl.dropboxusercontent.com");
  }

  private async getAccessToken(): Promise<string> {
    const accessToken = Buffer.from(`${dropboxAppKey}:${dropboxAppSecret}`).toString("base64");
    const response = await axios.post<{ access_token: string }>(
      `${dropboxShareUri}/oauth2/token?grant_type=refresh_token&refresh_token=${dropboxRefreshToken}`,
      null,
      {
        headers: {
          Authorization: `Basic ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    return response.data.access_token;
  }

  public async baseBatchUploadFiles(
    files: FileUploadPayload[],
    paths: string[],
  ): Promise<FileDetails[]> {
    try {
      const accessToken = await this.getAccessToken();

      const sessionIds = await this.startingBatchUpload(accessToken, files.length);

      const appendFilesPromises = sessionIds.map((sessionId, i) =>
        this.addFileToSession(accessToken, files[i].buffer, sessionId),
      );
      await Promise.all(appendFilesPromises);

      const entries = sessionIds.map((sessionId, i) => {
        const offset = files[i].buffer.byteOffset;
        const commit = {
          autorename: true,
          mode: "add",
          mute: false,
          path: paths[i],
          strict_conflict: false,
        };
        const cursor = { offset, session_id: sessionId };

        return { commit, cursor };
      });

      const finishedBatchEntries = await this.commitBatchUpload(accessToken, entries);

      const sharedLinksPromises = finishedBatchEntries.map(entry =>
        this.getDropboxShareableLink(accessToken, entry.path_lower),
      );
      const shareableLinks = await Promise.all(sharedLinksPromises);

      return shareableLinks.map((sharedLink, i) => ({
        name: files[i].name,
        link: sharedLink
          .replace("dl=0", "raw=1")
          .replace("www.dropbox.com", "dl.dropboxusercontent.com"),
        path: finishedBatchEntries[i].id,
        uploadedAt: new Date(),
        size: files[i].buffer.byteLength,
        mimeType: files[i].mimetype,
      }));
    } catch (error) {
      logger.error("Dropbox file manager error:", (error as AxiosError).response?.data);
      throw new InternalError("Something went wrong with external service");
    }
  }

  private async startingBatchUpload(accessToken: string, sessionNumber: number): Promise<string[]> {
    const startBatch = await axios.post<{ session_ids: string[] }>(
      `${dropboxShareUri}/2/files/upload_session/start_batch`,
      { num_sessions: sessionNumber, session_type: "concurrent" },
      { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } },
    );

    return startBatch.data.session_ids;
  }

  private async addFileToSession(
    accessToken: string,
    buffer: Buffer,
    sessionId: string,
  ): Promise<void> {
    await axios.post(`${dropboxBaseUri}/2/files/upload_session/append_v2`, buffer, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/octet-stream",
        "Dropbox-API-Arg": JSON.stringify({
          close: true,
          cursor: { offset: 0, session_id: sessionId },
        }),
      },
    });
  }

  private async commitBatchUpload(
    accessToken: string,
    entries: {
      commit: { autorename: boolean; mode: string; mute: boolean; path: string; strict_conflict: boolean }; // prettier-ignore
      cursor: { offset: number; session_id: string };
    }[],
  ): Promise<{ path_lower: string; id: string }[]> {
    const batchEntries = await axios.post<{ entries: { path_lower: string; id: string }[] }>(
      `${dropboxShareUri}/2/files/upload_session/finish_batch_v2`,
      { entries },
      { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } },
    );

    return batchEntries.data.entries;
  }

  private async getDropboxShareableLink(accessToken: string, path: string): Promise<string> {
    const response = await axios.post<{ url: string }>(
      `${dropboxShareUri}/2/sharing/create_shared_link_with_settings`,
      {
        path,
        settings: {
          requested_visibility: "public",
          allow_download: true,
          audience: "public",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.url;
  }
}
