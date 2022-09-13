import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
          <span data-testid="email-field">{ email }</span>
          <span data-testid="total-field">{ this.totalExpense() }</span>
          <span data-testid="header-currency-field">BRL</span>
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
