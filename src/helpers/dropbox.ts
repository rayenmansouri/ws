import axios from 'axios';
import { dropboxAppKey, dropboxAppSecret, dropboxRefreshToken, dropboxShareUri } from '../config';

export const refreshTokensDropbox = async function () {
  const accessToken = Buffer.from(`${dropboxAppKey}:${dropboxAppSecret}`).toString('base64');
  const response = await axios.post(
    `${dropboxShareUri}/oauth2/token?grant_type=refresh_token&refresh_token=${dropboxRefreshToken}`,
    null,
    {
      headers: {
        Authorization: `Basic ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  return response.data.access_token;
};

// !!!! DON'T DELETE THIS COMMENTED FUNCTION !!!!

// async function getRefreshToken() {
//     try {
//       const authHeader = `Basic ${Buffer.from(`${DROPBOX_APP_KEY}:${DROPBOX_APP_SECRET}`).toString('base64')}`;

//       const data = new URLSearchParams();
//       data.append('code', 'VT8PFjl1_1sAAAAAAAAAWueo6feoK6sErgs6Bw8jemQ');
//       data.append('grant_type', 'authorization_code');

//       const response = await axios.post('https://api.dropboxapi.com/oauth2/token', data, {
//         headers: {
//           'Authorization': authHeader,
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
// getRefreshToken()
export const getDropboxShareableLink = async (
  accessToken: string,
  filePath: string,
): Promise<string> => {
  const response = await axios.post(
    `${dropboxShareUri}/2/sharing/create_shared_link_with_settings`,
    {
      path: filePath,
      settings: {
        requested_visibility: 'public',
        allow_download: true,
        audience: 'public',
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
  const shareableLink = response.data.url;
  return shareableLink;
};
