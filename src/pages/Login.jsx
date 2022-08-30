import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userAction } from '../redux/actions';

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
      <div>
        <div>Login</div>
        <form>
          <label htmlFor="input-email">
            Email:
            <input
              type="email"
              name="email"
              id="input-email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-password">
            Senha:
            <input
              type="password"
              name="password"
              id="input-password"
              value={ password }
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.completedLogin }
          >
            Entrar

          </button>
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
