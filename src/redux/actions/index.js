import fetchCurrencies from '../../services/api';

// Coloque aqui suas actions
export function userAction(username) {
  return {
    type: 'USER',
    username,
  };
}

export const fetchCurrency = () => async (dispatch) => {
  const allCurrencies = await fetchCurrencies();
  const curren = Object.keys(allCurrencies);
  dispatch({
    type: 'GET_CURRENCY',
    currencies: curren.filter((e) => e !== curren[1]),
    expenses: [],
    editor: false,
    idToEdit: 0,
    exchangeRates: allCurrencies,
  });
};

export function expensesAction(payload) {
  return {
    type: 'SAVE_EXPENSES',
    expenses: [...payload],
  };
}
