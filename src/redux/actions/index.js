import fetchCurrencies from '../../services/api';

// Coloque aqui suas actions
export function userAction(payload) {
  return {
    type: 'USER',
    payload,
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

export function deleteExpenseAction(payload) {
  return {
    type: 'DELETE_EXPENSE',
    payload,
  };
}
