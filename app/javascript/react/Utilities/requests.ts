import axios from 'axios';
import storage from 'localforage'

axios.interceptors.request.use(async (config) => {
  const authTokenData = await storage.getItem('token') as { access_token: string };

  config.headers.Authorization = authTokenData ? `Bearer ${authTokenData.access_token}` : null;

  return config;
}, (error) => Promise.reject(error));

const handleResponse = ({ data }) => data

export const get = (url: string, params) => axios.get(url, { params }).then(handleResponse)

export const post = (url: string, payload) => axios.post(url, payload).then(handleResponse)

export const put = (url: string, payload) => axios.put(url, payload).then(handleResponse)

export const del = (url: string, data?: any) => axios.delete(url, { data }).then(handleResponse)
