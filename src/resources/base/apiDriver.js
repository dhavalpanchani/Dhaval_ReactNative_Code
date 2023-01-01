import axios from 'axios';
import { authHeader } from '../../helpers/auth';
import { configureAxiosParams } from '../../helpers/configureAxios';
import { consoleLog } from '../../styles/mixins';

// Format axios nested params correctly
configureAxiosParams(axios);

export const callApi = async (url, options = {}) => {
  const headers = await authHeader();
  consoleLog('API URL ', url);
  consoleLog('API Parameters ', options);
  let response = await axios.request({
    url,
    headers: {
      ...headers,
      ...{ 'Cache-Control': 'no-cache, no-store, must-revalidate' },
    },
    ...options,
  });
  consoleLog('API Response ', response.data);
  return response;
};
