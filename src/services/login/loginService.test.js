/* eslint-disable comma-dangle */
import { loginService } from './loginService';

const token = 'fake-token';

async function HttpClientModule() {
  return {
    data: {
      token,
    },
  };
}

async function HttpClientModuleError() {
  return {
    data: {},
    error: {
      message: 'Failed to login',
    },
  };
}

const setCookieModule = jest.fn();

describe('loginService', () => {
  describe('login()', () => {
    describe('when user try to login', () => {
      describe('and succeed', () => {
        test('store token', async () => {
          const loginServiceResponse = await loginService.login(
            {
              username: 'someusername',
              password: 'somepassword',
            },
            setCookieModule,
            HttpClientModule
          );

          // Espera que salva o token nos cookies
          expect(setCookieModule).toHaveBeenCalledWith(
            null,
            'APP_TOKEN',
            token,
            {
              // O cookie poder ser acessado a partir da página raiz da aplicação
              path: '/',
              // Tempo que o cookie fica armazenado
              maxAge: 604800,
            }
          );

          // Espera que o retorno do loginService seja o token
          expect(loginServiceResponse).toEqual(token);
        });
      });

      describe('and fail', () => {
        test('throw error', async () => {
          await expect(
            loginService.login(
              {
                username: 'someusername',
                password: 'somepassword',
              },
              setCookieModule,
              HttpClientModuleError
            )
          ).rejects.toThrow('Failed to login');
        });
      });
    });
  });

  describe('logout', () => {
    describe('when user try to logout and succeed', () => {
      test('remove token', async () => {
        const destroyCookie = jest.fn();
        await loginService.logout(destroyCookie);

        // Espera que a função seja chamada com esses parâmetros
        expect(destroyCookie).toHaveBeenCalledWith(null, 'APP_TOKEN');
      });
    });
  });
});
