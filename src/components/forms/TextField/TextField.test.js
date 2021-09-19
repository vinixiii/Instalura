/*
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '../../../infra/test/testUtils';

import TextField from '.';

describe('<TextField />', () => {
  test('render component', () => {
    render(
      <TextField
        placeholder="This is a placeholder"
        value="Elaine"
        onChange={() => {}}
        name="name"
      />,
    );

    // É como se fosse um console.log do browser
    screen.debug();
    // Captura o elemento HTML
    const textField = screen.getByPlaceholderText(/this is a placeholder/i);
    console.log(textField);

    expect(textField).toMatchSnapshot();
  });
});
