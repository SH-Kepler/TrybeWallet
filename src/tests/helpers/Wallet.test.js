import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import renderWithRouterAndRedux from './renderWith';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const mockEmail = 'asd@ghi.com';

describe('Testando o componente Wallet', () => {
  test('entrando na rota carteira', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const button = screen.getByText('Entrar');
    userEvent.type(inputEmail, mockEmail);
    userEvent.type(inputPassword, '12345678');
    userEvent.click(button);
    await waitFor(() => expect(history.location.pathname).toBe('/carteira'));
  });
  test('testando o Header', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const button = screen.getByText('Entrar');
    userEvent.type(inputEmail, mockEmail);
    userEvent.type(inputPassword, '12345678');
    userEvent.click(button);
    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
    const totalExchanges = screen.getByTestId('total-field');
    expect(totalExchanges).toBeInTheDocument();
    const currencyField = screen.getByTestId('header-currency-field');
    expect(currencyField).toBeInTheDocument();
  });
  test('testando a aplicação em si', async () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const button = screen.getByText('Entrar');
    userEvent.type(inputEmail, mockEmail);
    userEvent.type(inputPassword, '12345678');
    userEvent.click(button);
    const inputValor = screen.getByTestId('value-input');
    userEvent.type(inputValor, '25');
    const inputDescrição = screen.getByTestId('description-input');
    userEvent.type(inputDescrição, 'id 0');
    const addBtn = screen.getByTestId('add-btn');
    userEvent.click(addBtn);
  });
  it('testa as funções da tabela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const buttonAdd = screen.getByTestId('add-btn');
    userEvent.click(buttonAdd);
    await waitFor(async () => {
      const buttonDelete = screen.getByTestId('delete-btn');
      userEvent.click(buttonDelete);
      expect(buttonDelete).not.toBeInTheDocument();
    });
  });
});
