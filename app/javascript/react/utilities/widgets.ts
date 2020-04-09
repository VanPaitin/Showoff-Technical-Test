import { get } from './requests'

export const fetchWidgets = (params = {}) => get('/widgets/visible', params)

export const fetchUserWidgets = (id, params = {}) => get(`/users/${id}/widgets`, params)
