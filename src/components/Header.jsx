import React from 'react';
import md5 from 'crypto-js/md5';
import PropType from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, name, score } = this.props;
    const img = md5(email).toString();

    return (
      <header>
        <img
          alt="player avatar"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${img}` }
        />
        <h4 data-testid="header-player-name">{ `Jogador: ${name}` }</h4>
        <h4 data-testid="header-score">{`Score: ${score}`}</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
});

Header.propTypes = {
  email: PropType.string.isRequired,
  name: PropType.string.isRequired,
  score: PropType.number.isRequired,
};

export default connect(mapStateToProps)(Header);
