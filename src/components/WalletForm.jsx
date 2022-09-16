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
      <form>
        <div className="inputs-wallet-form">
          <label
            className="margin-form"
            htmlFor="description-input"
          >
            Descrição da despesa
            {' '}
            <input
              className="description"
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              id="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label
            className="margin-form"
            htmlFor="tag-input"
          >
            Categoria da despesa
            {' '}
            <select
              className="tag"
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
          <label
            className="number2-wrapper"
            htmlFor="value-input"
          >
            Valor
            {' '}
            <input
              className="value"
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              id="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="paymentMethod">
            Método de pagamento
            {' '}
            <select
              className="pay-method"
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
          <label htmlFor="currency-input">
            Moeda
            {' '}
            <select
              className="moeda"
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
        </div>
        <div className="btn-form-wallet">
          <button
            type="button"
            data-testid="add-btn"
            onClick={ this.addExpense }
          >
            Adicionar despesa
          </button>
        </div>
      </form>
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
