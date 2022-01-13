import React from 'react';

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
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
