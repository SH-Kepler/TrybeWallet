import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name=""
              id="value-input"
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name=""
              id="description-input"
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              data-testid="currency-input"
              name=""
              id="currency-input"
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
              name="paymentMethod"
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
              name="tag-input"
              id="tag-input"
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
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
