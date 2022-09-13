import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
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
              const currencyConvert = exchange * value;
              return (
                <tr key={ e.ask }>
                  <td>{ e.description }</td>
                  <td>{ e.tag }</td>
                  <td>{ e.method }</td>
                  <td>{ value.toFixed(2) }</td>
                  <td>{currencies[e.currency].name}</td>
                  <td>{ exchange.toFixed(2) }</td>
                  <td>{ currencyConvert.toFixed(2) }</td>
                  <td>{ e.currency }</td>
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
  walletExpenses: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Table);
