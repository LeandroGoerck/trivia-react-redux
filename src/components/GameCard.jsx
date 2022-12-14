import React from 'react';
import PropType from 'prop-types';

class GameCard extends React.Component {
  componentDidMount() {
    const { shuffleArray } = this.props;
    shuffleArray();
  }

  render() {
    const {
      answerOptions,
      correctAnswers,
      incorrectsAnswers,
      isAnswered,
      questionData,
      selectAnswer,
    } = this.props;

    return (
      <section>
        <h1 data-testid="question-category">{ questionData.category }</h1>
        <h2 data-testid="question-text">{ questionData.question }</h2>
        <div data-testid="answer-options">
          {
            answerOptions.map((answer, index) => {
              if (questionData.incorrect_answers.includes(answer)) {
                return (
                  <button
                    data-testid={ `wrong-answer-${index}` }
                    disabled={ isAnswered }
                    key={ index }
                    onClick={ selectAnswer }
                    style={ { border: incorrectsAnswers } }
                    type="button"
                    value={ answer }
                  >
                    { answer }
                  </button>
                );
              }

              return (
                <button
                  data-testid="correct-answer"
                  disabled={ isAnswered }
                  key={ index }
                  onClick={ selectAnswer }
                  style={ { border: correctAnswers } }
                  type="button"
                  value={ answer }
                >
                  { answer }
                </button>
              );
            })
          }
        </div>
      </section>
    );
  }
}

export default GameCard;

GameCard.propTypes = {
  answerOptions: PropType.arrayOf(Object).isRequired,
  correctAnswers: PropType.string.isRequired,
  incorrectsAnswers: PropType.string.isRequired,
  isAnswered: PropType.bool.isRequired,
  questionData: PropType.shape().isRequired,
  selectAnswer: PropType.func.isRequired,
  shuffleArray: PropType.func.isRequired,
};
