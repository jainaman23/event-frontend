// This function works only on server side.
import { errorMessage } from '@services/notification';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { v4 as uuidv4 } from 'uuid';

const makeLogRequestWith = (BASE_TYPE) => {
  let requestId = '';

  const getBaseURL = (BASE_TYPE) => {
    if (BASE_TYPE === undefined) {
      return process.env.NEXT_PUBLIC_API_BASE_URL;
    }
  };

  const axiosInstance = axios.create({
    baseURL: getBaseURL(BASE_TYPE),
  });

  axiosRetry(axiosInstance, {
    retries: 0,
    retryDelay: (retryCount) => {
      return retryCount * 500; // time interval between retries
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    const X_REQUEST_ID = uuidv4();
    requestId = X_REQUEST_ID;

    if (config && config.headers) {
      if (!config.headers.Authorization) {
        if (String(config.headers.Authorization).match('undefined')) {
          delete config.headers.Authorization;
        }
      }
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }
      config.headers['x-request-id'] = X_REQUEST_ID;
    }

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return error;
    },
  );

  return async (config) => {
    const configuration = {
      method: config.method || 'get',
      url: `api/v1/${config.url}`,
      data: config.data,
      headers: config.headers ? config.headers : {},
      params: config.params,
      timeout: config.timeout ? config.timeout : 100000,
      cancelToken: config.cancelToken,
    };
    return await axiosInstance(configuration)
      .then((result) => {
        if (result && result.status >= 200 && result.status < 300) {
          return result.data;
        }
        throw result;
      })
      .catch((err) => {
        const code = err.response?.status || 500;
        const baseConfig = {
          url: config.url,
          'x-request-id': requestId,
        };

        return {
          code,
          data: err.response?.data || { message: 'Something went wrong' },
        };
      });
  };
};

export default makeLogRequestWith();
