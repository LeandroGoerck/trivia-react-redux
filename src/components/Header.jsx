import React from 'react';
import md5 from 'crypto-js/md5';
import PropType from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    const img = md5(gravatarEmail).toString();

    return (
      <header>
        <img
          alt="player avatar"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${img}` }
        />
        <h4 data-testid="header-player-name">{ `Jogador: ${name}` }</h4>
        <h4 data-testid="header-score">{score}</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  gravatarEmail: PropType.string.isRequired,
  name: PropType.string.isRequired,
  score: PropType.number.isRequired,
};
