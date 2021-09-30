/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { loginService, LOGIN_COOKIE_APP_TOKEN } from '../login/loginService';
import { HttpClient } from '../../infra/http/HttpClient';
import { isStagingEnv } from '../../infra/env/isStagingEnv';

const BASE_URL = isStagingEnv
  ? // Back-end de Dev
    'https://instalura-api-git-master-omariosouto.vercel.app'
  : // Back-end de Prod
    'https://instalura-api-omariosouto.vercel.app';

export function authService(context) {
  const cookies = parseCookies(context);
  const token = cookies[LOGIN_COOKIE_APP_TOKEN];

  return {
    async getToken() {
      return token;
    },
    async hasActiveSession() {
      return HttpClient(`${BASE_URL}/api/auth`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(({ data }) => {
          if (data.authenticated) return true;

          loginService.logout(context);
          return false;
        })
        .catch(() => {
          loginService.logout(context);
          return false;
        });
    },
    async getSession() {
      const session = jwt.decode(token);

      return session.user;
    },
  };
}
