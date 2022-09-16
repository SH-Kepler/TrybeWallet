import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userAction } from '../redux/actions';
import icon from '../styles/images/icon-trybewallet.png';
import trybe from '../styles/images/Trybe.png';
import wallet from '../styles/images/Wallet.png';

const inittialState = {
  isDisabled: true,
  email: '',
  password: '',
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = inittialState;
  }

  enableButton = () => {
    const { email, password } = this.state;
    const firstCheckEmail = email.includes('@');
    const secondCheckEmail = email.includes('.com');
    const checkedEmail = firstCheckEmail && secondCheckEmail;
    const minLength = 6;
    const checkedPassword = password.length >= minLength;
    const check = checkedEmail && checkedPassword;
    return !check;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }), () => this.setState({ isDisabled: this.enableButton() }));
  };

  completedLogin = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(userAction(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled, email, password } = this.state;
    return (
      <div className="form-login">
        <form>
          <div className="teste">
            <img src={ icon } alt="icon trybewallet" />
            <div className="title">
              <img src={ trybe } alt="trybe" />
              <img src={ wallet } alt="wallet" />
            </div>
          </div>
          <div className="inputs-login">
            <fieldset>
              <input
                type="email"
                name="email"
                id="input-email"
                value={ email }
                data-testid="email-input"
                onChange={ this.handleChange }
                placeholder="E-mail"
              />
            </fieldset>
            <br />
            <fieldset>
              <input
                type="password"
                name="password"
                id="input-password"
                value={ password }
                data-testid="password-input"
                onChange={ this.handleChange }
                placeholder="Senha"
              />
            </fieldset>
            <br />
            <button
              className="btn-login"
              type="button"
              disabled={ isDisabled }
              onClick={ this.completedLogin }
            >
              Entrar

            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
