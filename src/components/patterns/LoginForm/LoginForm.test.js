/*
 * @jest-environment jsdom
 */

/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
import React from 'react';
import user from '@testing-library/user-event';
import { render, act, screen, waitFor } from '../../../infra/test/testUtils';

import { LoginForm } from '.';

// const onSubmit = jest.fn();
// onSubmit.mockImplementation(event => {
//   event.preventDefault();
// });

// Mocka a função onSubmit
const onSubmit = jest.fn((e) => e.preventDefault());

describe('<LoginForm />', () => {
  describe('when form fields are valid', () => {
    test('submit form', async () => {
      // Renderiza o componente
      await act(async () => render(<LoginForm onSubmit={onSubmit} />));

      // No início o botão deve estar desabilitado
      expect(screen.getByRole('button')).toBeDisabled();

      // Não vai bater na API então os dados podem ser qualquer um
      // Captura o inputUsername
      const inputUsername = screen.getByPlaceholderText('Usuário');
      // Preenche com um valor
      user.type(inputUsername, 'someusername');
      // Espera ter o valor digitado
      await waitFor(() => expect(inputUsername).toHaveValue('someusername'));

      // Captura o inputPassword
      const inputPassword = screen.getByPlaceholderText('Senha');
      // Preenche com um valor
      user.type(inputPassword, 'somepassword');
      // Espera ter o valor digitado
      await waitFor(() => expect(inputPassword).toHaveValue('somepassword'));

      // Espera que o botão esteja habilitado
      expect(screen.getByRole('button')).not.toBeDisabled();

      // Clica no botão
      user.click(screen.getByRole('button'));

      // Espera que a função onSubmit seja chamada 1 vez
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('when form fields are invalid', () => {
    // Entender o código que foi escrito por outra pessoa:
    test('display the respective error', async () => {
      render(<LoginForm onSubmit={onSubmit} />);

      const inputUsuario = screen.getByPlaceholderText('Usuário');
      inputUsuario.focus();
      inputUsuario.blur();

      await waitFor(() => screen.getByRole('alert'));

      expect(screen.getByRole('alert')).toHaveTextContent(
        'Preencha ao menos 3 caracteres'
      );
    });
  });
});
