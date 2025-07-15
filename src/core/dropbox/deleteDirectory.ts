import axios, { AxiosError } from 'axios';
import { refreshTokensDropbox } from './refreshTokensDropbox';
import { dropboxShareUri } from '../../config';
import logger from '../Logger';

export const deleteDirectory = async (folderPath: string) => {
  try {
    const accessToken = await refreshTokensDropbox();
    await axios.post(
      `${dropboxShareUri}/2/files/delete_v2`,
      { path: folderPath },
      { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.data.error_summary === 'path_lookup/not_found/.'
    ) {
      logger.error('Path Not found in External Storage');
      return;
    }
  }
};
