import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenseAction } from '../redux/actions';

class Table extends Component {
  deleteExchange = (id) => {
    const { walletExpenses, dispatch } = this.props;
    const deleted = walletExpenses.filter((expense) => expense.id !== id);
    dispatch(deleteExpenseAction(deleted));
  };

  render() {
    const { walletExpenses } = this.props;
    return (
      <div>
        <table>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
          <tbody>
            { walletExpenses.map((e) => {
              const currencies = e.exchangeRates;
              const value = Number(e.value);
              const exchange = Number(currencies[e.currency].ask);
              return (
                <tr key={ e.id }>
                  <td>{ e.description }</td>
                  <td>{ e.tag }</td>
                  <td>{ e.method }</td>
                  <td>{ value.toFixed(2) }</td>
                  <td>{currencies[e.currency].name}</td>
                  <td>{ exchange.toFixed(2) }</td>
                  <td>{ exchange * value.toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteExchange(e.id) }
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  walletExpenses: wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  walletExpenses: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Table);
