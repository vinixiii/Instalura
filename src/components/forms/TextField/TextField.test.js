/*
 * @jest-environment jsdom
 */

/* eslint-disable comma-dangle */
import React from 'react';
import user from '@testing-library/user-event';
import { render, screen } from '../../../infra/test/testUtils';

import TextField from '.';

describe('<TextField />', () => {
  test('render component', () => {
    // Renderiza o componente
    render(
      <TextField
        placeholder="name"
        value="Elaine"
        onChange={() => {}}
        name="name"
      />
    );

    // É como se fosse um console.log do browser
    // screen.debug();

    // Captura o elemento HTML
    const textField = screen.getByPlaceholderText(/name/i);

    // Espera que o css/props do componente se mantenha os mesmos
    expect(textField).toMatchSnapshot();
  });

  describe('when field is valid', () => {
    describe('and user is typing', () => {
      // Precisamos saber se o valor do input mudou
      // Conseguimos saber isso pela função onChange
      test('the value must be updated', () => {
        const onChangeMock = jest.fn();
        // Renderiza o componente
        render(
          <TextField
            placeholder="name"
            value=""
            onChange={onChangeMock}
            name="name"
          />
        );

        const inputName = screen.getByPlaceholderText(/name/i);
        user.type(inputName, 'Vinícius');

        expect(onChangeMock).toHaveBeenCalledTimes(8);
      });
    });
  });

  describe('when field is invalid', () => {
    test('displays the respective error message', () => {
      // Renderiza o componente
      render(
        <TextField
          placeholder="Email"
          value="vinixiii@email.com"
          onChange={() => {}}
          name="email"
          isTouched
          error="O campo Email é obrigatório!"
        />
      );

      // O componente deve ter um elemento a mais (span de texto)
      // Pega o elemento input
      const inputEmail = screen.getByPlaceholderText(/email/i);
      // Pega o elemento span (mensagem de erro)
      const textAlert = screen.getByRole('alert');
      // Espera que o valor do input seja 'vinixiii@email.com'
      expect(inputEmail).toHaveValue('vinixiii@email.com');
      // Espero que o valor dele seja 'O campo Email é obrigatório!'
      expect(textAlert).toHaveTextContent('O campo Email é obrigatório!');

      // Espera que o css/props do componente se mantenha os mesmos
      expect(inputEmail).toMatchSnapshot();
    });
  });
});
