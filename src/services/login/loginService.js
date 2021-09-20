/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable arrow-body-style */
/* eslint-disable comma-dangle */
import { setCookie, destroyCookie } from 'nookies';
import { isStagingEnv } from '../../infra/env/isStagingEnv';

async function HttpClient(url, { headers, body, ...options }) {
  return fetch(url, {
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...options,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Falha ao tentar pegar os dados do servidor');
  });
}

const BASE_URL = isStagingEnv
  ? // Back-end de Dev
    'https://instalura-api-git-master-omariosouto.vercel.app'
  : // Back-end de Prod
    'https://instalura-api-omariosouto.vercel.app';

export const loginService = {
  async login(
    { username, password },
    setCookieModule = setCookie,
    HttpClientModule = HttpClient
  ) {
    // É preciso retornar o resultado do fetch para que seja possível
    // continuar a cadeia de promises no .then lá na página de login
    return HttpClientModule(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        // Esse é o nosso DTO
        username, // 'vinixiii',
        password, // 'senhasegura',
      },
    }).then((convertedResponse) => {
      // console.log(data);
      // Salvar o token
      const { token } = convertedResponse.data;

      const hasToken = Boolean(token);
      if (!hasToken) {
        throw new Error('Failed to login');
      }

      const DAY_IN_SECONDS = 86400;

      setCookieModule(null, 'APP_TOKEN', token, {
        // O cookie poder ser acessado a partir da página raiz da aplicação
        path: '/',
        // Tempo que o cookie fica armazenado
        maxAge: DAY_IN_SECONDS * 7,
      });

      return token;
    });
  },
  async logout(destroyCookieModule = destroyCookie) {
    destroyCookieModule(null, 'APP_TOKEN');
  },
};
