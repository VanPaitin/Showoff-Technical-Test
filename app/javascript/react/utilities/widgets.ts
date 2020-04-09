import { get, post, put, del } from './requests';

const SHOWOFF_API_DOMAIN = process.env.SHOWOFF_API_DOMAIN;

export const fetchWidgets = (params = {}) => get('/widgets/visible', params);

export const fetchUserWidgets = (id, params = {}) => get(`/users/${id}/widgets`, params);

export const createWidget = data => post(`${SHOWOFF_API_DOMAIN}/api/v1/widgets`, data);

export const updateWidget = ({ id, data }) => put(`${SHOWOFF_API_DOMAIN}/api/v1/widgets/${id}`, data);

export const deleteWidget = id => del(`${SHOWOFF_API_DOMAIN}/api/v1/widgets/${id}`);
