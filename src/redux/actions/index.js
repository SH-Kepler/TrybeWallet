import fetchCurrencies from '../../services/api';

// Coloque aqui suas actions
export function userAction(username) {
  return {
    type: 'USER',
    username,
  };
}

export function walletAction(currencies) {
  return {
    type: 'GET_CURRENCY',
    currencies,
  };
}

export function fetchCurrency() {
  return async (dispatch) => {
    const apiCurrency = await fetchCurrencies();
    const currencies = Object
      .keys(apiCurrency).filter((currency) => currency !== 'USDT');
    dispatch(walletAction(currencies));
  };
}
