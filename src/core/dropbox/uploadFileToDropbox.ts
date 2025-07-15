import axios from 'axios';
import { refreshTokensDropbox } from './refreshTokensDropbox';
import { dropboxBaseUri } from '../../config';

export const uploadFileToDropbox = async (fileBuffer: Buffer, path: string) => {
  const accessToken = await refreshTokensDropbox();
  await axios.post(`${dropboxBaseUri}/2/files/upload`, fileBuffer, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': JSON.stringify({
        path,
        mode: 'add',
        autorename: false,
        mute: false,
      }),
    },
  });
  return;
};
