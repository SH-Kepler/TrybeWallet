import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import renderWithRouter from './renderWith';

describe('Testando o componente Login', () => {
  test('possui um input para do tipo email e um input do tipo password', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });
  test('Testando validação do botão de login', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByText('Entrar');
    expect(button).toBeDisabled();
    userEvent.type(inputEmail, 'asd@ghi.com');
    expect(button).toBeDisabled();
    userEvent.type(inputPassword, '12345678');
    expect(button.disabled).toBeFalsy();
    userEvent.click(button);
  });
});
