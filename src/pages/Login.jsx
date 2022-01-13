import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken } from '../store/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = { email: '', name: '' };
  }

  enableButton = () => {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) return false;
    return true;
  };

  inputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { history, tokenDispatch } = this.props;
    tokenDispatch();
    history.push('/Game');
  }

  render() {
    const { email, name } = this.state;

    return (
      <form>
        <input
          data-testid="input-player-name"
          name="name"
          onChange={ this.inputChange }
          placeholder="Seu Nome"
          type="text"
          value={ name }
        />

        <input
          data-testid="input-gravatar-email"
          name="email"
          onChange={ this.inputChange }
          placeholder="Seu E-Mail"
          type="text"
          value={ email }
        />

        <button
          data-testid="btn-play"
          disabled={ this.enableButton() }
          type="button"
          onClick={ this.handleClick }
        >
          Play
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  tokenDispatch: () => dispatch(fetchToken()),
});

Login.propTypes = {
  history: PropTypes.string.isRequired,
  tokenDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
