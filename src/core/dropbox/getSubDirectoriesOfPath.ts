import axios from "axios";
import { dropboxShareUri } from "../../config";
import { refreshTokensDropbox } from "./refreshTokensDropbox";

export const getSubDirectoriesOfPath = async (path: string) => {
  const accessToken = await refreshTokensDropbox();
  const res = await axios.post(
    `${dropboxShareUri}/2/files/list_folder`,
    {
      include_deleted: false,
      include_has_explicit_shared_members: false,
      include_media_info: false,
      include_mounted_folders: true,
      include_non_downloadable_files: true,
      path,
      recursive: false,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const entries: { ".tag": string; name: string; id: string }[] =
    res.data.entries;

  const subDirectories = entries
    .filter((entry) => entry[".tag"] === "folder")
    .map((entry) => entry.name);

  return subDirectories;
};
