import React, { Component } from 'react';

class GameCard extends Component {
  constructor() {
    super();
    this.state = { buttonArray: [] };
  }

  componentDidMount() {
    this.shuffleArray();
  }

  shuffleArray = () => {
    const { data, answerClick } = this.props;
    const {
      category,
      correct_answer,
      difficulty,
      question,
      type,
      incorrect_answers,
    } = data;

    const buttonArray = [
      <button
        key="0"
        data-testid="correct-answer"
        type="button"
        onClick={ answerClick }
        value={ correct_answer }
      >
        {correct_answer}
      </button>,
      <button
        key="1"
        data-testid="wrong-answer-0"
        type="button"
        onClick={ answerClick }
        value={ incorrect_answers[0] }
      >
        {incorrect_answers[0]}
      </button>,
      <button
        key="2"
        data-testid="wrong-answer-1"
        type="button"
        onClick={ answerClick }
        value={ incorrect_answers[1] }
      >
        {incorrect_answers[1]}
      </button>,
      <button
        key="3"
        data-testid="wrong-answer-2"
        type="button"
        onClick={ answerClick }
        value={ incorrect_answers[2] }
      >
        {incorrect_answers[2]}
      </button>,
    ];

    const RANDOM_NUMBER = 0.5;
    // Consegui fazer esse codigo com ajuda desse site
    // https://stackoverflow.com/questions/52497270/how-do-i-randomly-shuffle-an-array-containing-strings-of-names
    if (type === 'multiple') {
      buttonArray.sort(() => RANDOM_NUMBER - Math.random());
    } else {
      this.setState({ buttonArray: [buttonArray[0], buttonArray[1]] });
    }

    this.setState({ buttonArray });
  };

  render() {
    const { data, answerClick } = this.props;
    const {
      category,
      correct_answer,
      difficulty,
      question,
      type,
      incorrect_answers,
    } = data;
    const { buttonArray } = this.state;

    return (
      <div>
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{question}</h2>
        <div data-testid="answer-options">
          { buttonArray }
        </div>
      </div>
    );
  }
}

export default GameCard;
