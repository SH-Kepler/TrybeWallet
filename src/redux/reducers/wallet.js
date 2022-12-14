// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idtoEdit: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_CURRENCY':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'SAVE_EXPENSES':
    return {
      ...state,
      expenses: action.expenses,
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: [...action.payload],
    };
  default:
    return state;
  }
}

export default wallet;
