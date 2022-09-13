import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrencies from '../services/api';
import { fetchCurrency, expensesAction } from '../redux/actions';

const inittialState = {
  value: '',
  description: '',
  moeda: 'USD',
  payMethod: 'Dinheiro',
  category: 'Alimentação',
  id: 0,
};

class WalletForm extends Component {
  constructor() {
    super();
    this.state = inittialState;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  // Função que joga os estados da aplicação para o estado global e em seguida limpa os inputs
  addExpense = async () => {
    const { value, description, moeda, payMethod, category, id } = this.state;
    const { dispatch, expenses } = this.props;
    const currencies = await fetchCurrencies();
    delete currencies.USDT;
    const expenseKeys = {
      id,
      value,
      description,
      currency: moeda,
      method: payMethod,
      tag: category,
      exchangeRates: currencies,
    };
    const allExpenses = [...expenses, expenseKeys];
    dispatch(expensesAction(allExpenses));
    this.setState({
      value: '',
      description: '',
      id: id + 1,
    });
  };

  render() {
    const { value, description, moeda, payMethod, category } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              id="value-input"
              onChange={ this.handleChange }
              placeholder="0"
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              id="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              data-testid="currency-input"
              name="moeda"
              value={ moeda }
              id="currency-input"
              onChange={ this.handleChange }
            >
              {Object.values(currencies).map((currency) => (
                <option key={ currency } value={ currency }>{currency}</option>
              ))}
            </select>
          </label>
          <label htmlFor="paymentMethod">
            Forma de pagamento:
            <select
              data-testid="method-input"
              id="paymentMethod"
              name="payMethod"
              value={ payMethod }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria:
            <select
              data-testid="tag-input"
              name="category"
              value={ category }
              id="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.addExpense }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.shape.isRequired,
  expenses: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
