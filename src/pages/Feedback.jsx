import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const average = 3;
    const { assertions, score } = this.props;

    return (
      <section>
        <Header score={ score } />

        <h1>Tela de Feedback</h1>

        <h3 data-testid="feedback-text">
          { assertions < average ? 'Could be better...' : ' Well Done!' }
        </h3>

        <h3 data-testid="feedback-total-score">{score}</h3>
        <h3 data-testid="feedback-total-question">{assertions}</h3>

        <Link to="/">
          <button data-testid="btn-play-again" type="button">Play Again</button>
        </Link>

        <Link to="/ranking">
          <button data-testid="btn-ranking" type="button">Ranking</button>
        </Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Feedback);

Feedback.propTypes = {
  assertions: PropType.number.isRequired,
  score: PropType.number.isRequired,
};
