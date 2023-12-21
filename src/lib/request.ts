import axios, { AxiosRequestConfig } from 'axios';

import { getItem } from '@/lib/localStorage';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const instance = () => {
  const instance = axios.create({
    baseURL,
  });
  const jwt = getItem('auth');

  instance.interceptors.request.use(async (request: AxiosRequestConfig) => {
    if (jwt && request?.headers) {
      request.headers.Authorization = `Bearer ${jwt}`;
    }
    return request;
  });
  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return instance;
};

const validateStatus = (status: number) => {
  return [400, 201, 200].includes(status);
};

export async function postApi(apiPath: string, payload: unknown) {
  const res = await instance().post(apiPath, payload, {
    validateStatus,
  });
  return res.data;
}

export async function getApi(apiPath: string) {
  return instance().get(apiPath);
}

export async function putApi(apiPath: string, payload: unknown) {
  return instance().put(apiPath, payload, {
    validateStatus,
  });
}

export async function removeApi(apiPath: string) {
  return instance().delete(apiPath);
}
