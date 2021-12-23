import axios from 'axios';
import i18next from 'i18next';
import { NetworkError, PrestError } from 'shared/api/error';

export const api = axios.create();
// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // config.headers.ContentType = 'application/json';
    // config.headers.Authorization = 'Basic cm9vdDphZG1pbg=='; // root / admin
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.data.header) {
        throw new PrestError(error.response.status, error.response.data.header.resultMessage);
      } else {
        throw new PrestError(error.response.status, error.response.statusText);
      }
    } else {
      throw new NetworkError(503, i18next.t('messages:connection-refused'));
    }
  }
);
