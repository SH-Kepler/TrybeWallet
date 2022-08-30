// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idtoEdit: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'WALLET': return { ...state, ...action.act };
  default: return state;
  }
}

export default wallet;
