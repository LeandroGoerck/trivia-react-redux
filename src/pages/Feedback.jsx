import React from 'react';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  render() {
    return (
      <section>
        <h1>Tela de Feedback</h1>
        <span data-testid="feedback-text">Meus parabens!</span>

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

export default Feedback;
