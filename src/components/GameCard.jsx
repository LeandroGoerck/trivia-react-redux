import React, { Component } from 'react';

class GameCard extends Component {
  render() {
    const { data } = this.props;
    const {
      category,
      correct_answer,
      difficulry,
      question,
      type,
      incorrect_answers,
    } = data;

    // Consegui fazer esse codigo com ajuda desse site
    // https://stackoverflow.com/questions/52497270/how-do-i-randomly-shuffle-an-array-containing-strings-of-names

    const buttonArray = [
      <button key="0" data-testid="correct-answer" type="button">
        {correct_answer}
      </button>,
      <button key="1" data-testid="wrong-answer-0" type="button">
        {incorrect_answers[0]}
      </button>,
      <button key="2" data-testid="wrong-answer-1" type="button">
        {incorrect_answers[1]}
      </button>,
      <button key="3" data-testid="wrong-answer-2" type="button">
        {incorrect_answers[2]}
      </button>,
    ];

    return (
      <div>
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{question}</h2>
        <div data-testid="answer-options">
          {type === 'multiple'
            ? buttonArray.sort(() => 0.5 - Math.random())
            : [buttonArray[0], buttonArray[1]]}
        </div>
      </div>
    );
  }
}

export default GameCard;
