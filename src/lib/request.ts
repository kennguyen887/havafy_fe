import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const defaultOptions = {
  baseURL,
};

const instance = axios.create(defaultOptions);

const jwt = window.localStorage.getItem('auth');

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

const validateStatus = (status: number) => {
  return [400, 201, 200].includes(status);
};

export async function post(apiPath: string, payload: unknown) {
  const res = await instance.post(apiPath, payload, {
    validateStatus,
  });
  return res.data;
}

export async function get(apiPath: string) {
  return instance.get(apiPath);
}
