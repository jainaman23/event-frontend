import { errorMessage, sendNotification } from '@services/notification';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../../services';
const { getAccessToken, logout } = AuthService;

const makeRequestWith = (BASE_TYPE) => {
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
      return retryCount * 500; //time interval between retries
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    const X_REQUEST_ID = uuidv4();
    if (config && config.headers) {
      if (!config.headers.Authorization) {
        const token = getAccessToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
        }
      } else {
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
      if (error && error.response && error.response?.status === 401) {
        errorMessage('Session Expired');
        logout();
      }
      return error;
    },
  );

  return async (config) => {
    const loader = config.loader ?? true;
    if (loader) {
      document.dispatchEvent(new CustomEvent('siteLoader', { detail: { status: true } }));
    }
    const configuration = {
      method: config.method || 'get',
      url: config.url,
      data: config.data,
      headers: config.headers ? config.headers : {},
      params: config.params,
      timeout: config.timeout ? config.timeout : 100000,
      cancelToken: config.cancelToken,
      onUploadProgress: config.onUploadProgress,
      onDownloadProgress: config.onDownloadProgress,
    };

    return await axiosInstance(configuration)
      .then((response) => {
        const { status, data: resData } = response;
        document.dispatchEvent(new CustomEvent('siteLoader', { detail: { status: false } }));
        if (status >= 200 && status < 300) {
          const { data, message, pagination = null } = resData;
          if (message) sendNotification({ message, type: 'success' });

          return { ...data, pagination };
        }

        throw response;
      })
      .catch((err) => {
        document.dispatchEvent(new CustomEvent('siteLoader', { detail: { status: false } }));
        errorMessage(err?.response?.data?.error?.message ?? err.message ?? 'Something went wrong');
      });
  };
};

export default makeRequestWith();
