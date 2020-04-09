import storage from 'localforage';

import { post } from './requests'

const SHOWOFF_API_DOMAIN = process.env.SHOWOFF_API_DOMAIN

const generateSession = (url, data) =>
  post(url, data).then(({ user, token }) =>
    storage.setItem('user', user)
      .then(() => {
        storage.setItem('token', token)
      }).then(() => Promise.resolve())
  )

export const login = data => generateSession('/sessions', data)

export const signUp = data => generateSession('/users', data)

export const logout = () =>
  storage.getItem('token').then(({ access_token }) => {
    if (access_token) {
      return post(`${SHOWOFF_API_DOMAIN}/oauth/revoke`, { token: access_token })
        .then(() => storage.removeItem('token'))
        .then(() => storage.removeItem('user'))
    }
  })

export const changePassword = data =>
  post(`${SHOWOFF_API_DOMAIN}/api/v1/users/me/password`, data)
    .then(({ data: { token } }) =>
      storage.setItem('token', token)).then(() => Promise.resolve())

export const resetPassword = data => post('/users/reset_password', data)

// export const checkEmail = email => {

// }
