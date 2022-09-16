/* eslint-disable no-irregular-whitespace */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import icon from '../styles/images/icon-trybewallet.png';
import trybe from '../styles/images/Trybe.png';
import wallet from '../styles/images/Wallet.png';
import vector from '../styles/images/Vector.png';
import user from '../styles/images/User.png';

class Header extends Component {
  totalExpense = () => {
    const { despesaTotal } = this.props;
    let total = 0;
    despesaTotal.forEach((e) => {
      const currency = [e.currency];
      const actualCurr = e.exchangeRates[currency];
      total += Number(e.value) * actualCurr.ask;
    });
    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <div className="icon-theme">
            <img src={ icon } alt="icon trybewallet" />
            <div>
              <img src={ trybe } alt="trybe" />
              <img src={ wallet } alt="wallet" />
            </div>
          </div>
          <span
            className="total-field"
            data-testid="total-field"
          >
            <img src={ vector } alt="vector" />
            <strong>Total de despesas: </strong>
            { this.totalExpense() }
            {' '}
            BRL
          </span>
          <span
            className="email-field"
            data-testid="email-field"
          >
            <img src={ user } alt="user" />
            { email }
          </span>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  despesaTotal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  despesaTotal: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
