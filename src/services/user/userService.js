/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import { isStagingEnv } from '../../infra/env/isStagingEnv';
import { HttpClient } from '../../infra/http/HttpClient';
import { authService } from '../auth/authService';

const BASE_URL = isStagingEnv
  ? // Back-end de Dev
    'https://instalura-api-git-master-omariosouto.vercel.app'
  : // Back-end de Prod
    'https://instalura-api-omariosouto.vercel.app';

export const userService = {
  // Aqui poderiamos bater numa API GraphQL e retornar
  // todos os dados, ou pegar os dados e estruturar
  async getProfilePage(context) {
    try {
      const url = `${BASE_URL}/api/users/posts`;
      const token = await authService(context).getToken();

      const response = await HttpClient(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        posts: response.data,
      };
    } catch (error) {
      throw new Error('Não foi possível trazer os posts');
    }
  },
};
