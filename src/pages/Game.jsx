import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import { correct, fetchQuestionsThunk } from '../store/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      answered: '',
      answerOptions: [],
      correctAnswers: '',
      incorrectsAnswers: '',
      isAnswered: false,
      questionNumber: 0,
      timer: 30,
    };
  }

  componentDidMount() {
    const { fetchQuestions, questionsData } = this.props;
    fetchQuestions();
    if (questionsData) this.shuffleArray();
    this.setBtnTimer();
  }

  nextClick = () => {
    const finished = 4;
    const { history } = this.props;
    const { questionNumber } = this.state;

    if (questionNumber === finished) {
      history.push('/feedback');
    } else {
      this.setState({
        answered: '',
        correctAnswers: '',
        incorrectsAnswers: '',
        isAnswered: false,
        questionNumber: questionNumber + 1,
        timer: 30,
      }, () => this.shuffleArray());
    }

    this.setBtnTimer();
  };

  selectAnswer = ({ target }) => {
    const TEN = 10;
    const { questionNumber, timer } = this.state;
    const scoreValue = { easy: 1, hard: 3, medium: 2 };
    const { assertions, itsCorrect, questionsData, score } = this.props;
    const { difficulty } = questionsData[questionNumber];

    if (target.value === questionsData[questionNumber].correct_answer) {
      itsCorrect((assertions + 1), (score + TEN + (timer * scoreValue[difficulty])));
    }

    this.setState({
      answered: target.value,
      correctAnswers: '3px solid rgb(6, 240, 15)',
      incorrectsAnswers: '3px solid rgb(255, 0, 0)',
      isAnswered: true,
    });

    localStorage.setItem('score', JSON.stringify(score));
  };

  setBtnTimer = () => {
    const oneSecond = 1000;
    const { answered } = this.state;

    const timeCowntdown = setInterval(() => {
      const { timer } = this.state;
      if (timer >= 1 && answered === '') this.setState({ timer: timer - 1 });
      if (timer === 0) this.setState({ isAnswered: true });
    }, oneSecond);

    if (answered !== '') clearInterval(timeCowntdown);
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
      this.setState({ answerOptions: [answers[0], answers[1]] });
    }
  };

  render() {
    const { questionsData, score } = this.props;
    const {
      answered,
      answerOptions,
      correctAnswers,
      incorrectsAnswers,
      isAnswered,
      questionNumber,
      timer,
    } = this.state;

    return (
      <div>
        <Header score={ score } />

        <span>{ `Tempo: ${timer}` }</span>

        {
          questionsData && (
            <GameCard
              answerOptions={ answerOptions }
              correctAnswers={ correctAnswers }
              incorrectsAnswers={ incorrectsAnswers }
              isAnswered={ isAnswered }
              questionData={ questionsData[questionNumber] }
              selectAnswer={ this.selectAnswer }
              shuffleArray={ this.shuffleArray }
            />
          )
        }

        {
          answered !== '' || isAnswered === true ? (
            <button
              data-testid="btn-next"
              onClick={ this.nextClick }
              type="button"
            >
              Next
            </button>
          ) : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  questionsData: state.gameReducer.questions.results,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestionsThunk()),
  itsCorrect: (assertions, score) => dispatch(correct(assertions, score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  assertions: PropType.number.isRequired,
  fetchQuestions: PropType.func.isRequired,
  history: PropType.shape().isRequired,
  itsCorrect: PropType.func.isRequired,
  questionsData: PropType.arrayOf(Object).isRequired,
  score: PropType.number.isRequired,
};
