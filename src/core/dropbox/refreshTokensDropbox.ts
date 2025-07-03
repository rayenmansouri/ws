import axios from "axios";
import {
  dropboxAppKey,
  dropboxAppSecret,
  dropboxRefreshToken,
} from "../../config";

export const refreshTokensDropbox = async function () {
  const accessToken = Buffer.from(
    `${dropboxAppKey}:${dropboxAppSecret}`
  ).toString("base64");
  const response = await axios.post(
    `${process.env.DROPBOX_SHARE_LINK_BASE}/oauth2/token?grant_type=refresh_token&refresh_token=${dropboxRefreshToken}`,
    null,
    {
      headers: {
        Authorization: `Basic ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
};
