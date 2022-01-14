import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, email } = this.props;
    const img = md5(email).toString();
    return (
      <>
        <img
          src={ `https://www.gravatar.com/avatar/${img}` }
          alt="player"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">
          Jogador:
          {name}
        </p>

        <p data-testid="header-score">
          Score: 0
        </p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.playerLoginReducer.name,
  email: state.playerLoginReducer.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
