import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import { fetchQuestionsThunk } from '../store/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      answered: '',
      answerOptions: [],
      questionNumber: 0,
      time: 30,
      score: 0,
    };
  }

  componentDidMount() {
    const { fetchQuestions, questionsData } = this.props;
    fetchQuestions();
    if (questionsData) { this.shuffleArray(); }
  }

  nextClick = () => {
    const finished = 4;
    const { history } = this.props;
    const { questionNumber, score } = this.state;

    if (questionNumber === finished) {
      history.push('/feedback');
    } else {
      this.setState({ questionNumber: questionNumber + 1 }, () => (this.shuffleArray()));
    }
    this.setState({ answered: '' });
    localStorage.setItem('score', JSON.stringify(score));
  };

  selectAnswer = ({ target }) => {
    this.setState({ answered: target.value });
    const { questionNumber, time, score } = this.state;
    const { questionsData } = this.props;
    const { difficulty } = questionsData[questionNumber];
    console.log(difficulty);
    const TEN = 10;
    const scoreValue = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    let scoreTest = 0;
    if (target.value === questionsData[questionNumber].correct_answer) {
      this.setState({ score: score + TEN + (time * scoreValue[difficulty]) });
      scoreTest += TEN + (time * scoreValue[difficulty]);
    }
    // this.setState({ score });
    console.log(scoreTest);
    localStorage.setItem('score', JSON.stringify(scoreTest));
  };

  shuffleArray = () => {
    const randomNumber = 0.5;
    const { questionsData } = this.props;
    const { questionNumber } = this.state;
    const answers = [
      ...questionsData[questionNumber].incorrect_answers,
      questionsData[questionNumber].correct_answer,
    ];

    if (questionsData[questionNumber].type === 'multiple') {
      // Conseguimos a lógica de embaralhar as respostar nesse link:
      // https://stackoverflow.com/questions/52497270/how-do-i-randomly-shuffle-an-array-containing-strings-of-names
      const answerOptions = answers.sort(() => randomNumber - Math.random());
      this.setState({ answerOptions });
    } else {
      this.setState({ answerOptions: [answers[1], answers[0]] });
    }
  };

  render() {
    const { questionsData } = this.props;
    const { answered, answerOptions, questionNumber } = this.state;

    return (
      <div>
        <Header />

        {
          questionsData && (
            <GameCard
              answerOptions={ answerOptions }
              questionData={ questionsData[questionNumber] }
              selectAnswer={ this.selectAnswer }
              shuffleArray={ this.shuffleArray }
            />
          )
        }

        {
          answered && (
            <button
              data-testid="btn-next"
              onClick={ this.nextClick }
              type="button"
            >
              Next
            </button>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsData: state.gameReducer.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestionsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  history: PropType.shape().isRequired,
  fetchQuestions: PropType.func.isRequired,
  questionsData: PropType.arrayOf(Object).isRequired,
};
